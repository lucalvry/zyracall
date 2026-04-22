

# Koray Framework Audit — Complete Status & Final Implementation Plan

## Part 1 — Koray's Framework Reference (what we measure against)

The Koray Tuğberk Gübür framework rests on **6 pillars** and **41 authorship rules**. The principles that map to a website implementation are:

1. **Topical Map** — A hierarchical inventory of every entity, subtopic, attribute, and question in the niche. One macro context per page.
2. **Semantic Content Network** — Hub-and-spoke architecture; pages connected with descriptive, intent-progressive anchor text (no generic "click here").
3. **Semantic Content Brief** — Each page declares: macro context, central entity, target entities, attribute-value pairs, Question H2s, 40-word answer targets.
4. **Semantic Audit / Content Configuration** — Continuous rewriting based on query patterns and NLP shifts.
5. **Authorship Rules (the 41)** — Question H2/H3, 40-word extractive answers, EAV (Entity-Attribute-Value) coverage, SPO (Subject-Predicate-Object) triples, no fluff, factual numerics, qualified entities, descriptive anchors, FAQPage/Article/BreadcrumbList schema.
6. **Topical Authority** — The compounding outcome.

Five fundamentals of a topical map (per Koray's CMSEO talk): **Source Context, Central Entity, Central Search Intent, Core Section, Outer Section**.

---

## Part 2 — What is DONE (verified in code)

| Pillar / Rule | Implementation | Status |
|---|---|---|
| Topical Map data layer | `src/data/topical-map.ts` with 5 groups, entity arrays per node | ✅ |
| `getRelatedContent()` helper | Defined and used by `CountryPage` | ✅ partial |
| Question H2 + 40-word answer (landing) | Features, HowItWorks, PricingPreview, TrustSection all have Question + `data-speakable` snippet | ✅ |
| Question H2 + speakable (blog) | 9 blog files (VoIP, WiFi, Save Money, Mobile vs Landline, Browser Future, Expat, International Guide, Free, Business) carry Q-H2 + speakable | ✅ |
| Country page Q&A FAQ | 4 Q&A items per country with FAQPage microdata + `data-speakable` | ✅ |
| Speakable schema helper | `generateSpeakableSchema` in SEOHead | ✅ |
| HowTo schema helper | `generateHowToSchema` in SEOHead | ✅ |
| Comparison schema with entities | `generateComparisonSchema` includes Wikipedia `sameAs` for VoIP and International Calling | ✅ |
| SoftwareApplication + entity `about` | `index.html` carries SoftwareApplication with VoIP/International Calling/WebRTC entity links | ✅ |
| AI bot allowances | `robots.txt` whitelists GPTBot, ClaudeBot, PerplexityBot, Google-Extended | ✅ |
| `ai.txt` citation file | Present | ✅ |
| Sitemap with current `lastmod` | All entries dated 2026-04-03 | ✅ |
| Footer hub-and-spoke | Top Destinations, Free Tools, Compare, Alternatives columns | ✅ |
| FAQPage microdata | Landing FAQ + CountryPage FAQ | ✅ |
| BreadcrumbList schema | Generated everywhere via `SEOHead` | ✅ |

**Overall: ~70% of the framework is implemented.**

---

## Part 3 — REMAINING GAPS (audit findings)

### Gap A — RelatedContent topical map only used on ONE page
`getRelatedContent()` is imported only by `CountryPage.tsx`. Comparison pages, alternative pages, blog articles, and tool pages still pass hardcoded link arrays to `<RelatedContent>`. This breaks the **Semantic Content Network** principle (rule: every page must link to its parent hub, siblings, and a cross-topic node).

### Gap B — Blog hub (`/blog`) and `BlogPost` template not Koray-aligned
- `Blog.tsx` uses raw `<Helmet>` instead of `SEOHead`, has no Question H1, no 40-word answer snippet, no speakable schema, no `Blog`/`ItemList` Schema.org `about` annotations.
- `BlogPost.tsx` (the legacy generic template) needs the same Q&A + speakable upgrade applied to other blog files.

### Gap C — Comparison & alternative pages missing Q&A pillar sections
The comparison pages (e.g. `ZyraCallVsSkype.tsx`) and alternative pages render a feature table but no Question H2 + 40-word answer block (e.g. *"Is ZyraCall a better Skype alternative for international calling?"*). They also don't link to the country pages or blog posts mentioned in the comparison — violating the contextual inline link rule.

### Gap D — Tool pages (`TwoFAFinder`, `WebRTCTester`, `ConnectivityPing`, `RateCalculatorTool`) lack semantic Q&A enrichment and topical-map links
Tool pages have schema but no Question H2 with answer snippet, no `RelatedContent` block driving traffic into the network, and no `about` entity annotations on their schema.

### Gap E — `HowItWorks.tsx` page heading not in Question format
H1 reads "How ZyraCall Works" — should be a question (e.g. *"How do you call any country from a browser with ZyraCall?"*) with a 40-word answer immediately under it. Page also still uses raw `<Helmet>` mixed with structured data (verify migration to `SEOHead` was completed).

### Gap F — `Hero.tsx` semantic enrichment not verified
Audit indicated this was implemented in a prior pass — needs confirmation that `itemScope itemType="https://schema.org/WebApplication"` and `data-speakable` are actually present.

### Gap G — Pillar pages (CallHub, Compare, Alternatives) missing entity-disambiguation `about`
Their structured data does not yet declare `about: [{Thing, sameAs: Wikipedia}]` for VoIP / International Calling / their respective competitors. This is a core EAV requirement.

### Gap H — Topical map missing entries for pages that exist on the site
The map omits: 2FA platform pages (`/tools/2fa-finder/[platform]`), `/tools/webrtc-tester`, `/tools/rate-calculator`, the rest of the country pages (China, USA, Brazil, Vietnam, Colombia, South Africa exist as data but not as nodes), all 4 alternative pages aren't fully listed (Viber path is wrong: code uses `/alternatives/viber-out-alternative`), and the `/blog/business-international-calling`, `/blog/free-international-calling`, `/blog/mobile-vs-landline-rates` blog nodes.

### Gap I — Article schema missing `about` + `mentions` entity blocks on blog posts
Each blog `articleSchema` lacks `about: [{Thing, sameAs}]` and `mentions: [...]` arrays — required for Knowledge Graph integration per Koray's authorship rules.

### Gap J — No Article/BlogPosting `mainEntityOfPage`, `wordCount`, `keywords` on blog posts
Koray's authorship rules require complete Article schema (the "structured data" rule). Blog `articleSchema` objects skip `mainEntityOfPage`, `wordCount`, `keywords`, `image`, `inLanguage`.

### Gap K — Anchor text discipline not enforced
Many CTAs say "Try Free Now", "Get Started", "Learn More" — generic anchors. Koray's framework demands **descriptive anchors that match the target page's macro context** (e.g. "Call India from your browser", "Compare ZyraCall with Skype").

### Gap L — No "Definition" / "Quick Answer" boxes on pillar pages
Koray's pattern: every pillar/cluster page opens with a definition box (`<div role="definition">`) carrying the canonical 40-word definition of the central entity. CallHub, Compare, Alternatives don't have these.

### Gap M — Missing `inLanguage`, `isPartOf` on key Schema.org objects
Site-wide WebSite schema lacks `inLanguage: "en"` and pages don't declare `isPartOf: { @id: "https://zyracall.com/#website" }` linking them to the site graph — a Knowledge Graph integration signal.

---

## Part 4 — Implementation Plan (final closure)

### Step 1 — Wire `getRelatedContent` everywhere
Replace hardcoded link arrays in these files with `getRelatedContent(currentHref)`:
- `src/pages/Compare.tsx`, all 6 `src/pages/compare/ZyraCall*.tsx`
- `src/pages/Alternatives.tsx`, all 4 `src/pages/alternatives/*.tsx`
- All 9 `src/pages/blog/*.tsx` files (replace footer `<RelatedContent variant="footer">` link arrays)
- `src/pages/tools/TwoFAFinder.tsx`, `WebRTCTester.tsx`, `ConnectivityPing.tsx`, `RateCalculatorTool.tsx`, `ToolsHub.tsx`
- `src/pages/CallHub.tsx`

### Step 2 — Expand `src/data/topical-map.ts`
Add missing nodes: rest of country pages from `useCallRates` data, all tool pages, missing blog posts (Business, Free, Mobile vs Landline), 2FA platform pages. Fix Viber path. Add `entities` arrays for each.

### Step 3 — Migrate `Blog.tsx` and `BlogPost.tsx` to Koray pattern
- Replace `<Helmet>` with `SEOHead`
- H1 → Question format: *"What does the ZyraCall blog cover about international calling and VoIP?"*
- Add 40-word `data-speakable` answer paragraph under H1
- Add `about` entity annotations to blog schema
- Add `Blog` + `ItemList` Schema.org with full `about: [Thing, sameAs]`
- Apply the same Q&A + speakable + Article schema enrichment to `BlogPost.tsx`

### Step 4 — Add Question H2 + 40-word answer + `RelatedContent` to Compare/Alternative pages
For each `compare/ZyraCall*.tsx` and `alternatives/*.tsx`:
- Insert a Q&A intro block: *"Is ZyraCall a better [Competitor] alternative for international calling?"* + 40-word `data-speakable` answer
- Inline-link to 2 country pages and 1 blog article in the body using descriptive anchors
- Replace any existing related links with `getRelatedContent(...)`

### Step 5 — Enrich tool pages with Q&A + entity schema
For `TwoFAFinder`, `WebRTCTester`, `ConnectivityPing`, `RateCalculatorTool`, `ToolsHub`:
- Add a Q&A intro: *"What does [tool name] do?"* + 40-word `data-speakable` answer
- Add `about: [{Thing, sameAs Wikipedia}]` to their tool schemas
- Add `<RelatedContent>` driven by `getRelatedContent(currentHref)` at page bottom

### Step 6 — Fix `HowItWorks.tsx` page H1
- H1 → *"How do you call any country from a browser with ZyraCall?"*
- 40-word `data-speakable` answer under H1
- Confirm full migration to `SEOHead` (no leftover `<Helmet>`)

### Step 7 — Verify & enrich `Hero.tsx`
- Confirm `itemScope itemType="https://schema.org/WebApplication"` + `data-speakable` on subtitle. Add if missing.

### Step 8 — Add `about` entity annotations to pillar pages
In `CallHub.tsx`, `Compare.tsx`, `Alternatives.tsx`, push a `WebPage` schema with `about: [VoIP, International calling]` (Wikipedia `sameAs`) into their `structuredData` arrays.

### Step 9 — Add definition / quick-answer box to pillar pages
At the top of `CallHub`, `Compare`, `Alternatives`, render a styled card containing the 40-word canonical definition of the central entity, marked with `data-speakable="true"` and `itemProp="description"`.

### Step 10 — Enrich blog `articleSchema` objects (all 9 + BlogPost)
Add to each: `mainEntityOfPage`, `wordCount` (estimate), `keywords` array, `image`, `inLanguage: "en"`, `about: [{Thing, sameAs}]`, `mentions: [...]` entities specific to that article.

### Step 11 — Anchor text cleanup pass
Replace generic CTAs ("Try Free Now", "Learn More", "Get Started") in pillar/blog/comparison pages with descriptive anchors that include the target page's macro context (e.g. *"Start calling India from your browser"*, *"Read the international calling rates guide"*).

### Step 12 — Add `inLanguage` and `isPartOf` to global schemas
Update `websiteSchema` in `SEOHead.tsx` to include `inLanguage: "en"` and an `@id`. Add `isPartOf: { @id }` to the WebPage-typed schemas generated by helpers.

---

## Files to modify

**Core framework:**
- `src/data/topical-map.ts` — expand nodes (Step 2)
- `src/components/seo/SEOHead.tsx` — `websiteSchema` enrichment, `isPartOf` defaults (Step 12)

**Hub & pillar pages:**
- `src/pages/CallHub.tsx`, `src/pages/Compare.tsx`, `src/pages/Alternatives.tsx` — Steps 1, 8, 9, 11
- `src/pages/HowItWorks.tsx` — Step 6
- `src/components/landing/Hero.tsx` — Step 7

**Blog system (10 files):**
- `src/pages/Blog.tsx`, `src/pages/blog/BlogPost.tsx` — Step 3
- All 9 `src/pages/blog/*.tsx` — Steps 1, 10, 11

**Comparisons & alternatives (10 files):**
- 6 `src/pages/compare/ZyraCall*.tsx`, 4 `src/pages/alternatives/*.tsx` — Steps 1, 4, 11

**Tools (5 files):**
- `src/pages/tools/TwoFAFinder.tsx`, `WebRTCTester.tsx`, `ConnectivityPing.tsx`, `RateCalculatorTool.tsx`, `ToolsHub.tsx` — Steps 1, 5

## Outcome
After this pass, ZyraCall will satisfy all 6 Koray pillars and the implementation-relevant subset of the 41 authorship rules: complete topical map → fully wired semantic content network → Q-H2/40-word EAV coverage on every page → entity-disambiguated schema everywhere → descriptive anchor discipline.

