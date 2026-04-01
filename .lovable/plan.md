

## Global Connectivity Ping Tool

### What We're Building
A new tool at `/tools/connectivity-ping` that wraps the existing WebRTC test engine with a destination-country context, a 0-100 reliability score, and international-calling-specific verdicts and CTAs.

### Key Differences from Existing WebRTC Tester
The WebRTC Tester is a generic network quality tool. The Global Connectivity Ping is framed around "Can I call [Country] reliably?" -- adding country selection, a computed reliability score, and country-aware recommendations.

### Implementation

**1. New hook: `src/hooks/useConnectivityPing.ts`**
- Wraps `useWebRTCTest` internally
- Adds `destinationCountry` state (selected by user)
- Computes a **Connection Reliability Score (0-100)** from latency, jitter, and packet loss using a weighted formula
- Attempts basic geolocation via `navigator.geolocation` or timezone for user location context (optional, no external API)

**2. New page: `src/pages/tools/ConnectivityPing.tsx`**
- SEO-optimized for `/tools/connectivity-ping` with Schema.org WebApplication markup
- Layout sections (top to bottom):

  **Pre-test:**
  - Country selector (searchable dropdown using existing call_rates countries from Supabase, with flag emoji via country code)
  - Optional: auto-detect user location via timezone
  - Single "Test My Connection" button
  - Trust badge: "Browser-based test -- no downloads required"

  **During test:**
  - Progress bar with stage messages (reuses existing hook)

  **Post-test results:**
  - **Verdict Badge** (large, prominent):
    - Green check: "Your network is ready to call [Country]"
    - Yellow warning: "Calls to [Country] may experience occasional issues"  
    - Red X: "Your network isn't reliable enough for stable calls to [Country]"
  - **Reliability Score** (0-100 circular gauge)
  - **Metric cards** (latency, jitter, packet loss) with plain-language explanations
  - **Recommendations card** (contextual based on results -- switch to wired, close apps, try different Wi-Fi)
  - **Contextual CTA** (only after results):
    - Good/Excellent: "Your network is ready -- start calling [Country] with ZyraCall" → /signup
    - Fair: "ZyraCall's adaptive quality can help -- see how it works" → /how-it-works
    - Poor: "Tips to improve your connection for international calls" (scroll to tips)
  - **Trust note**: "Results reflect current network conditions and may vary."
  - **Timestamp**: "Last tested: [time]"
  - Re-test button

  **Below results:**
  - FAQ accordion (What does latency mean for calls? etc.)
  - Tips for better call quality
  - Related tools links (WebRTC Tester, Rate Calculator)

**3. Update `src/pages/tools/ToolsHub.tsx`**
- Add "Global Connectivity Ping" to the tools array with Globe icon and "New" badge

**4. Update `src/App.tsx`**
- Add route: `/tools/connectivity-ping` → `ConnectivityPing`

**5. Update `public/sitemap.xml`**
- Add the new page entry

### Reliability Score Formula
```
score = 100 - (latencyPenalty + jitterPenalty + packetLossPenalty)

latencyPenalty = min(40, latency * 0.2)
jitterPenalty = min(30, jitter * 0.6)  
packetLossPenalty = min(30, packetLoss * 6)

Clamped to 0-100
```

### Files to Create
- `src/hooks/useConnectivityPing.ts`
- `src/pages/tools/ConnectivityPing.tsx`

### Files to Modify
- `src/App.tsx` -- add route
- `src/pages/tools/ToolsHub.tsx` -- add tool card
- `public/sitemap.xml` -- add URL

### Technical Details
- Reuses `useWebRTCTest` hook for actual network measurement (no duplication)
- Country list sourced from `call_rates` table (already fetched elsewhere) with fallback to a static list
- No external APIs needed for geolocation -- uses `Intl.DateTimeFormat().resolvedOptions().timeZone` for optional location hint
- Mobile-responsive with the same design system (Cards, Badges, existing color tokens)

