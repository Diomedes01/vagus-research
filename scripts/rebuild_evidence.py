#!/usr/bin/env python3
"""
Rebuild evidence.json by:
1. Keeping verified studies (1-79)
2. Searching PubMed for real VNS studies to replace unverified ones (80+)
3. Building entries from actual PubMed/NCBI data
"""

import json
import time
import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET
import os
import ssl
import re

ssl_ctx = ssl._create_unverified_context()

EVIDENCE_FILE = os.path.join(os.path.dirname(__file__), '..', 'content', 'evidence.json')
ESEARCH_URL = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi"
EFETCH_URL = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi"

def fetch_url(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'VagusResearch/1.0'})
    with urllib.request.urlopen(req, timeout=20, context=ssl_ctx) as response:
        return response.read().decode('utf-8')

def search_pubmed(query, retmax=40):
    """Search PubMed and return PMIDs."""
    params = urllib.parse.urlencode({
        'db': 'pubmed',
        'term': query,
        'retmode': 'xml',
        'retmax': retmax,
        'sort': 'relevance'
    })
    try:
        xml_data = fetch_url(f"{ESEARCH_URL}?{params}")
        root = ET.fromstring(xml_data)
        id_list = root.find('IdList')
        if id_list is not None:
            return [id_elem.text for id_elem in id_list.findall('Id')]
    except Exception as e:
        print(f"  Search error: {e}")
    return []

def fetch_article_details(pmids):
    """Fetch full article details for a list of PMIDs using efetch."""
    articles = []
    # Process in batches of 20
    for i in range(0, len(pmids), 20):
        batch = pmids[i:i+20]
        params = urllib.parse.urlencode({
            'db': 'pubmed',
            'id': ','.join(batch),
            'retmode': 'xml',
            'rettype': 'abstract'
        })
        try:
            xml_data = fetch_url(f"{EFETCH_URL}?{params}")
            root = ET.fromstring(xml_data)

            for article_elem in root.findall('.//PubmedArticle'):
                try:
                    art = parse_article(article_elem)
                    if art:
                        articles.append(art)
                except Exception as e:
                    print(f"  Parse error: {e}")
        except Exception as e:
            print(f"  Fetch error for batch: {e}")

        time.sleep(0.4)

    return articles

def parse_article(article_elem):
    """Parse a PubmedArticle XML element into our study format."""
    medline = article_elem.find('.//MedlineCitation')
    if medline is None:
        return None

    pmid_elem = medline.find('PMID')
    pmid = pmid_elem.text if pmid_elem is not None else None
    if not pmid:
        return None

    article = medline.find('.//Article')
    if article is None:
        return None

    # Title
    title_elem = article.find('.//ArticleTitle')
    title = title_elem.text if title_elem is not None else None
    if not title:
        # Try to get title from mixed content
        title = ''.join(title_elem.itertext()) if title_elem is not None else None
    if not title:
        return None
    title = title.rstrip('.')

    # Journal
    journal_elem = article.find('.//Journal/Title')
    journal = journal_elem.text if journal_elem is not None else "Unknown"

    # Year
    year = None
    pub_date = article.find('.//Journal/JournalIssue/PubDate')
    if pub_date is not None:
        year_elem = pub_date.find('Year')
        if year_elem is not None:
            year = int(year_elem.text)
        else:
            medline_date = pub_date.find('MedlineDate')
            if medline_date is not None and medline_date.text:
                match = re.search(r'(\d{4})', medline_date.text)
                if match:
                    year = int(match.group(1))

    # Authors
    author_list = article.find('.//AuthorList')
    authors = ""
    if author_list is not None:
        author_elems = author_list.findall('Author')
        if author_elems:
            first = author_elems[0]
            last_name = first.find('LastName')
            if last_name is not None:
                authors = f"{last_name.text} et al." if len(author_elems) > 1 else last_name.text

    # DOI
    doi = None
    article_ids = article_elem.find('.//PubmedData/ArticleIdList')
    if article_ids is not None:
        for aid in article_ids.findall('ArticleId'):
            if aid.get('IdType') == 'doi':
                doi = aid.text

    # Abstract for key finding extraction
    abstract_elem = article.find('.//Abstract/AbstractText')
    abstract = ""
    if abstract_elem is not None:
        abstract = ''.join(abstract_elem.itertext()) or ""

    # Check all abstract sections
    abstract_sections = article.findall('.//Abstract/AbstractText')
    conclusion = ""
    for section in abstract_sections:
        label = section.get('Label', '').lower()
        text = ''.join(section.itertext()) or ""
        if label in ('conclusions', 'conclusion', 'results', 'findings'):
            conclusion = text
            break
        if not abstract:
            abstract = text

    # Subject count from abstract
    subjects = None
    if abstract or conclusion:
        full_text = abstract + " " + conclusion
        # Try to find subject count patterns
        patterns = [
            r'(\d+)\s*(?:patients|participants|subjects|individuals|adults|children)',
            r'n\s*=\s*(\d+)',
            r'sample\s*(?:of|size)\s*(?:of\s*)?(\d+)',
        ]
        for pat in patterns:
            match = re.search(pat, full_text, re.IGNORECASE)
            if match:
                n = int(match.group(1))
                if 5 <= n <= 50000:  # reasonable range
                    subjects = n
                    break

    # Key finding from conclusion
    key_finding = ""
    if conclusion:
        # Take first 1-2 sentences
        sentences = re.split(r'(?<=[.!?])\s+', conclusion)
        key_finding = sentences[0] if sentences else conclusion[:200]
    elif abstract:
        sentences = re.split(r'(?<=[.!?])\s+', abstract)
        # Try to find a results-like sentence
        for s in sentences:
            if any(w in s.lower() for w in ['significant', 'reduced', 'improved', 'showed', 'demonstrated', 'found', 'suggest']):
                key_finding = s
                break
        if not key_finding and sentences:
            key_finding = sentences[-1]  # Last sentence often has conclusion

    if len(key_finding) > 300:
        key_finding = key_finding[:297] + "..."

    return {
        'pmid': pmid,
        'title': title,
        'authors': authors,
        'journal': journal,
        'year': year,
        'doi': doi,
        'subjects': subjects,
        'keyFinding': key_finding,
        'abstract_preview': (abstract or conclusion)[:500]
    }

# Search queries organized by condition and study type
SEARCH_QUERIES = [
    # Depression
    ("vagus nerve stimulation depression randomized controlled trial", "Depression", "RCT", "taVNS"),
    ("transcutaneous auricular vagus nerve stimulation depression", "Depression", "clinical trial", "taVNS"),
    ("vagus nerve stimulation treatment resistant depression", "Depression", "clinical trial", "iVNS"),

    # Epilepsy
    ("vagus nerve stimulation epilepsy randomized", "Epilepsy", "RCT", "iVNS"),
    ("vagus nerve stimulation drug resistant epilepsy long term", "Epilepsy", "long-term study", "iVNS"),
    ("transcutaneous auricular vagus nerve stimulation epilepsy", "Epilepsy", "clinical trial", "taVNS"),

    # Anxiety
    ("vagus nerve stimulation anxiety randomized", "Anxiety", "RCT", "taVNS"),
    ("transcutaneous vagus nerve stimulation anxiety", "Anxiety", "clinical trial", "taVNS"),

    # Migraine / Headache
    ("vagus nerve stimulation migraine randomized", "Migraine", "RCT", "tcVNS"),
    ("vagus nerve stimulation cluster headache", "Cluster Headache", "RCT", "tcVNS"),

    # Inflammation
    ("vagus nerve stimulation inflammation cytokine", "Inflammation", "clinical trial", "iVNS"),
    ("cholinergic anti-inflammatory pathway vagus", "Inflammation", "preclinical", "iVNS"),

    # Heart
    ("vagus nerve stimulation heart failure randomized", "Heart Failure", "RCT", "iVNS"),
    ("vagus nerve stimulation atrial fibrillation", "Heart Health", "RCT", "taVNS"),

    # Stroke
    ("vagus nerve stimulation stroke rehabilitation", "Stroke Rehabilitation", "RCT", "iVNS"),
    ("vagus nerve stimulation upper limb stroke", "Stroke Rehabilitation", "clinical trial", "iVNS"),

    # Pain
    ("vagus nerve stimulation chronic pain randomized", "Pain", "RCT", "tcVNS"),
    ("transcutaneous vagus nerve stimulation pain", "Pain", "clinical trial", "taVNS"),

    # Gut
    ("vagus nerve stimulation Crohn's disease", "Gut Health", "clinical trial", "iVNS"),
    ("vagus nerve stimulation irritable bowel", "Gut Health", "RCT", "taVNS"),
    ("vagus nerve stimulation gastrointestinal", "Gut Health", "clinical trial", "taVNS"),

    # PTSD
    ("vagus nerve stimulation PTSD", "PTSD", "RCT", "taVNS"),

    # Sleep
    ("vagus nerve stimulation insomnia sleep", "Sleep", "clinical trial", "taVNS"),

    # Tinnitus
    ("vagus nerve stimulation tinnitus", "Tinnitus", "clinical trial", "iVNS"),

    # COVID
    ("vagus nerve stimulation COVID", "Long COVID", "clinical trial", "taVNS"),

    # Obesity / Metabolic
    ("vagus nerve stimulation obesity weight", "Obesity", "clinical trial", "taVNS"),
    ("vagus nerve stimulation glucose diabetes", "Metabolic", "clinical trial", "taVNS"),

    # Neuroplasticity / Cognition
    ("vagus nerve stimulation neuroplasticity", "Neuroplasticity", "preclinical", "iVNS"),
    ("vagus nerve stimulation cognition memory", "Cognitive Function", "clinical trial", "taVNS"),

    # Parkinson's
    ("vagus nerve stimulation Parkinson", "Parkinson's Disease", "clinical trial", "taVNS"),

    # Alzheimer's
    ("vagus nerve stimulation Alzheimer cognition", "Alzheimer's Disease", "clinical trial", "iVNS"),

    # Rheumatoid Arthritis
    ("vagus nerve stimulation rheumatoid arthritis", "Rheumatoid Arthritis", "clinical trial", "iVNS"),

    # Safety
    ("vagus nerve stimulation safety tolerability systematic review", "Safety", "systematic review", "taVNS"),
    ("transcutaneous vagus nerve stimulation adverse effects meta-analysis", "Safety", "meta-analysis", "taVNS"),

    # Neuroimaging
    ("vagus nerve stimulation fMRI brain activation", "Neuroimaging", "clinical trial", "taVNS"),

    # Recovery
    ("vagus nerve stimulation postoperative recovery", "Postoperative Recovery", "RCT", "tcVNS"),

    # Fibromyalgia
    ("vagus nerve stimulation fibromyalgia", "Fibromyalgia", "clinical trial", "taVNS"),

    # Multiple Sclerosis
    ("vagus nerve stimulation multiple sclerosis", "Multiple Sclerosis", "clinical trial", "taVNS"),

    # TBI
    ("vagus nerve stimulation traumatic brain injury", "Traumatic Brain Injury", "clinical trial", "iVNS"),

    # Addiction
    ("vagus nerve stimulation addiction craving", "Addiction", "clinical trial", "taVNS"),

    # Autism
    ("vagus nerve stimulation autism", "Autism", "clinical trial", "taVNS"),

    # Schizophrenia
    ("vagus nerve stimulation schizophrenia", "Schizophrenia", "clinical trial", "iVNS"),

    # Disorders of Consciousness
    ("vagus nerve stimulation disorders of consciousness", "Disorders of Consciousness", "clinical trial", "iVNS"),

    # Sepsis
    ("vagus nerve stimulation sepsis inflammation", "Sepsis", "preclinical", "iVNS"),

    # Kidney
    ("vagus nerve stimulation kidney renal", "Kidney Disease", "preclinical", "iVNS"),

    # Endometriosis
    ("vagus nerve stimulation endometriosis pain", "Endometriosis", "clinical trial", "taVNS"),

    # ADHD
    ("vagus nerve stimulation ADHD attention", "ADHD", "clinical trial", "taVNS"),

    # CFS
    ("vagus nerve stimulation chronic fatigue", "Chronic Fatigue Syndrome", "clinical trial", "taVNS"),

    # Cancer
    ("vagus nerve stimulation cancer", "Cancer Support", "clinical trial", "taVNS"),

    # Sports
    ("vagus nerve stimulation athletic recovery performance", "Sports Recovery", "clinical trial", "taVNS"),

    # Respiratory
    ("vagus nerve stimulation asthma respiratory", "Respiratory", "clinical trial", "tcVNS"),

    # Ageing
    ("vagus nerve stimulation healthy aging autonomic", "Ageing", "clinical trial", "taVNS"),

    # Stress
    ("vagus nerve stimulation stress cortisol", "Stress & Performance", "clinical trial", "taVNS"),
]

def classify_study_type(title, abstract):
    """Determine study type from title and abstract."""
    text = (title + " " + abstract).lower()
    if 'meta-analysis' in text or 'meta analysis' in text:
        return 'meta-analysis'
    if 'systematic review' in text:
        return 'systematic review'
    if 'randomized' in text or 'randomised' in text:
        if 'controlled' in text or 'trial' in text:
            return 'RCT'
    if 'narrative review' in text:
        return 'narrative review'
    if 'scoping review' in text:
        return 'scoping review'
    if 'pilot' in text:
        return 'pilot'
    if 'cohort' in text:
        return 'cohort'
    if 'retrospective' in text:
        return 'retrospective analysis'
    if 'observational' in text:
        return 'observational'
    if 'preclinical' in text or 'rat' in text or 'mice' in text or 'mouse' in text or 'animal' in text or 'rodent' in text:
        return 'preclinical'
    if 'review' in text:
        return 'narrative review'
    return 'clinical trial'

def classify_stim_type(title, abstract):
    """Determine stimulation type from title and abstract."""
    text = (title + " " + abstract).lower()
    if 'transcutaneous auricular' in text or 'tavns' in text or 'ta-vns' in text:
        return 'taVNS'
    if 'transcutaneous cervical' in text or 'tcvns' in text or 'gammacore' in text or 'noninvasive cervical' in text or 'non-invasive cervical' in text:
        return 'tcVNS'
    if 'transcutaneous' in text or 'tvns' in text:
        return 'taVNS'
    if 'implant' in text or 'invasive vagus' in text or 'ivns' in text:
        return 'iVNS'
    if 'noninvasive' in text or 'non-invasive' in text:
        return 'tcVNS'
    return 'VNS'

def generate_tags(title, condition, stim_type):
    """Generate relevant tags."""
    tags = [condition.lower()]
    if stim_type:
        tags.append(stim_type)

    title_lower = title.lower()
    tag_keywords = {
        'depression': 'depression', 'anxiety': 'anxiety', 'epilepsy': 'epilepsy',
        'migraine': 'migraine', 'headache': 'headache', 'stroke': 'stroke',
        'heart': 'cardiac', 'inflammation': 'inflammation', 'pain': 'pain',
        'sleep': 'sleep', 'insomnia': 'sleep', 'tinnitus': 'tinnitus',
        'covid': 'COVID-19', 'parkinson': 'Parkinson', 'alzheimer': 'Alzheimer',
        'obesity': 'obesity', 'diabetes': 'diabetes', 'gut': 'gut-brain',
        'crohn': 'IBD', 'arthritis': 'arthritis', 'ptsd': 'PTSD',
        'safety': 'safety', 'tolerability': 'safety', 'cognition': 'cognition',
        'memory': 'memory', 'neuroplasticity': 'neuroplasticity',
        'fmri': 'neuroimaging', 'brain activation': 'neuroimaging',
    }
    for keyword, tag in tag_keywords.items():
        if keyword in title_lower and tag not in tags:
            tags.append(tag)

    return tags[:6]

def main():
    # Load existing data
    with open(EVIDENCE_FILE, 'r') as f:
        all_studies = json.load(f)

    # Keep verified studies (0-78, i.e., study-001 to study-079)
    verified = all_studies[:79]
    print(f"Keeping {len(verified)} verified studies (study-001 to study-079)")

    # Collect all PMIDs from verified studies to avoid duplicates
    existing_pmids = set()
    for s in verified:
        url = s.get('pubmedUrl', '') or ''
        match = re.search(r'/(\d+)/?$', url)
        if match:
            existing_pmids.add(match.group(1))
    print(f"Existing PMIDs: {len(existing_pmids)}")

    # Search PubMed for real VNS studies
    all_new_pmids = []
    pmid_metadata = {}  # pmid -> (condition, default_study_type, default_stim_type)

    for query, condition, study_type, stim_type in SEARCH_QUERIES:
        print(f"\nSearching: {query[:60]}...")
        pmids = search_pubmed(query, retmax=30)

        new_count = 0
        for pmid in pmids:
            if pmid not in existing_pmids and pmid not in pmid_metadata:
                all_new_pmids.append(pmid)
                pmid_metadata[pmid] = (condition, study_type, stim_type)
                new_count += 1

        print(f"  Found {len(pmids)} results, {new_count} new")
        time.sleep(0.4)

    print(f"\nTotal new unique PMIDs to fetch: {len(all_new_pmids)}")

    # Fetch article details
    print("\nFetching article details...")
    articles = fetch_article_details(all_new_pmids)
    print(f"Successfully fetched {len(articles)} articles")

    # Build new study entries
    new_studies = []
    study_num = 80

    for art in articles:
        pmid = art['pmid']
        condition, default_type, default_stim = pmid_metadata.get(pmid, ("Unknown", "clinical trial", "VNS"))

        # Classify from actual content
        actual_type = classify_study_type(art['title'], art.get('abstract_preview', ''))
        actual_stim = classify_stim_type(art['title'], art.get('abstract_preview', ''))

        # Use actual classification if available, else defaults
        study_type = actual_type if actual_type != 'clinical trial' else default_type
        stim_type = actual_stim if actual_stim != 'VNS' else default_stim

        tags = generate_tags(art['title'], condition, stim_type)

        study = {
            'id': f'study-{study_num:03d}',
            'title': art['title'],
            'authors': art['authors'],
            'journal': art['journal'],
            'year': art['year'],
            'condition': condition,
            'studyType': study_type,
            'subjects': art['subjects'],
            'keyFinding': art['keyFinding'] or f"Study examining {condition.lower()} using {stim_type}.",
            'pubmedUrl': f"https://pubmed.ncbi.nlm.nih.gov/{pmid}/",
            'doi': f"https://doi.org/{art['doi']}" if art.get('doi') else None,
            'stimulationType': stim_type,
            'tags': tags
        }

        new_studies.append(study)
        study_num += 1

    # Combine verified + new
    final = verified + new_studies

    # Save
    with open(EVIDENCE_FILE, 'w') as f:
        json.dump(final, f, indent=2)

    print(f"\n=== DONE ===")
    print(f"Verified studies kept: {len(verified)}")
    print(f"New studies from PubMed: {len(new_studies)}")
    print(f"Total: {len(final)}")

    # Stats
    conditions = {}
    for s in final:
        c = s.get('condition', 'Unknown')
        conditions[c] = conditions.get(c, 0) + 1

    print(f"\nStudies by condition:")
    for c, n in sorted(conditions.items(), key=lambda x: -x[1]):
        print(f"  {c}: {n}")

if __name__ == '__main__':
    main()
