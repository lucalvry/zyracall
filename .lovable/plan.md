

# Gap Analysis: Koray's Semantic SEO Framework Implementation

## Status Summary

Most of the plan has been implemented. Below are the specific gaps that remain.

---

## IMPLEMENTED (No Action Needed)

| Item | Status |
|------|--------|
| Phase 1A: SEOHead with speakable, SoftwareApplication, sameAs, organization schema | Done |
| Phase 1B: Topical map (`src/data/topical-map.ts`) | Done |
| Phase 2A: Q&A headings on Features, HowItWorks (landing), PricingPreview, TrustSection, FAQ | Done |
| Phase 2B: Q&A sections on CallHub, Compare, Alternatives | Done |
| Phase 2C: CountryPage FAQ with 4 Q&A items + FAQPage microdata + speakable | Done |
| Phase 3C: `generateSpeakableSchema` and `generateHowToSchema` helpers in SEOHead | Done |
| Phase 4C: Footer with Top Destinations, Free Tools (incl. Connectivity Ping), Compare, Alternatives columns | Done |
| Phase 5A: robots.txt with AI bots, sitemap ref, disallow private routes | Done |
| Phase 5B: `public/ai.txt` created | Done |
| Phase 5D: Preconnect for Supabase in index.html | Done |
| Landing.tsx: speakable + FAQ schema in structured data | Done |
| index.html: SoftwareApplication schema with `about` entity annotations | Done |

---

## GAPS TO FIX

### Gap 1: Hero.tsx — No semantic HTML enrichment
**Plan item:** Phase 3A — "Modify `Hero.tsx` — semantic HTML enrichment"
**Current state:** Hero has no `itemScope`, `itemType`, or semantic `<section>` attributes. No `data-speakable` on the hero description.
**Fix:** Add `itemScope itemType="https://schema.org/WebApplication"` to the hero section and `data-speakable="true"` to the hero subtitle paragraph.

### Gap 2: HowItWorks.tsx (standalone page) — Missing speakable schema and Q&A format
**Plan item:** Phase 3B — "Add HowTo schema to the How It Works page"
**Current state:** The standalone `/how-it-works` page has HowTo JSON-LD and HowToStep microdata, but:
- Uses raw `<Helmet>` instead of `SEOHead` (inconsistent with rest of site)
- No `speakable` schema
- No `data-speakable` attributes on answer text
- H1 is "How ZyraCall Works" (not Q&A format)
**Fix:** Migrate to `SEOHead`, add speakable schema, add `data-speakable` to the description paragraph.

### Gap 3: RelatedContent not using topical map automatically
**Plan item:** Phase 4A — "Upgrade RelatedContent with topical-map-driven suggestions via `topicId` prop"
**Current state:** `RelatedContent.tsx` accepts manual `countries`, `comparisons`, `articles` props. The `getRelatedContent()` function exists in `topical-map.ts` but is **never imported or used** by any page. CountryPage still passes hardcoded related links instead of using the topical map.
**Fix:** Update pages (especially `CountryPage.tsx`) to import `getRelatedContent` from the topical map and pass its output to `RelatedContent`, instead of hardcoding links.

### Gap 4: Blog articles missing Q&A heading format and speakable attributes
**Plan item:** Phase 6A — "Verify blog articles follow Q&A format with 40-word snippets"
**Current state:** Blog articles (`VoIPQuality.tsx`, `WiFiVsVoIP.tsx`, and others) use standard headings, not Q&A format. No `data-speakable` attributes on any blog content. No speakable schema in their structured data.
**Fix:** For each blog article, rewrite key H2 headings to Q&A format, add `data-speakable="true"` to ~40-word answer snippets, and add `generateSpeakableSchema()` to their `SEOHead` structured data.

### Gap 5: Comparison pages missing entity-rich schema
**Plan item:** Phase 3B — "Add Product schema with AggregateRating placeholder to comparison pages"
**Current state:** Individual comparison pages (e.g., `ZyraCallVsSkype.tsx`) use `generateComparisonSchema` which has basic Product schema but no `about` entity annotations linking to Wikipedia/Wikidata for entity disambiguation.
**Fix:** Enhance `generateComparisonSchema` to include `about` entity annotations (e.g., `"about": {"@type": "Thing", "name": "Voice over IP", "sameAs": "https://en.wikipedia.org/wiki/Voice_over_IP"}`).

### Gap 6: Sitemap lastmod dates not updated to current date
**Plan item:** Phase 5C — "Update lastmod dates to current date"
**Current state:** Need to verify sitemap dates are set to 2026-04-02 or later.
**Fix:** Update all `<lastmod>` entries to `2026-04-03`.

---

## Implementation Plan

### Step 1: Hero.tsx semantic enrichment
- Add `data-speakable="true"` to the hero subtitle paragraph
- Add semantic section attributes

### Step 2: HowItWorks.tsx (page) migration
- Replace raw `<Helmet>` with `SEOHead` component
- Add `generateSpeakableSchema()` and `generateHowToSchema()` to structured data
- Add `data-speakable="true"` to the page description

### Step 3: Wire up topical map to RelatedContent
- In `CountryPage.tsx`: import `getRelatedContent` from topical-map, use it to populate `RelatedContent` props dynamically instead of hardcoded links
- Optionally do the same for blog articles and comparison pages

### Step 4: Blog articles Q&A + speakable upgrade
- For `VoIPQuality.tsx`, `WiFiVsVoIP.tsx`, and other blog articles:
  - Rewrite key H2s to Q&A format
  - Add `data-speakable="true"` to answer snippets
  - Add `generateSpeakableSchema()` to structured data array
- Affects ~9 blog article files

### Step 5: Comparison schema entity enrichment
- Update `generateComparisonSchema` in `SEOHead.tsx` to include `about` entity annotations with Wikipedia sameAs links

### Step 6: Sitemap date update
- Update all `<lastmod>` values in `public/sitemap.xml` to `2026-04-03`

### Files to Modify
- `src/components/landing/Hero.tsx` — semantic attributes
- `src/pages/HowItWorks.tsx` — migrate to SEOHead, add speakable
- `src/pages/call/CountryPage.tsx` — use topical map for RelatedContent
- `src/components/seo/SEOHead.tsx` — enhance comparison schema with entities
- `src/pages/blog/VoIPQuality.tsx` — Q&A headings + speakable
- `src/pages/blog/WiFiVsVoIP.tsx` — Q&A headings + speakable
- `src/pages/blog/SaveMoneyCalls.tsx` — Q&A headings + speakable
- `src/pages/blog/InternationalCallingGuide.tsx` — Q&A headings + speakable
- `src/pages/blog/BrowserCallingFuture.tsx` — Q&A headings + speakable
- `src/pages/blog/ExpatCallingGuide.tsx` — Q&A headings + speakable
- `src/pages/blog/FreeInternationalCalling.tsx` — Q&A headings + speakable
- `src/pages/blog/MobileVsLandline.tsx` — Q&A headings + speakable
- `src/pages/blog/BusinessInternationalCalling.tsx` — Q&A headings + speakable
- `public/sitemap.xml` — update dates

