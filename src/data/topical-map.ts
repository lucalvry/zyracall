// Topical Authority Map — Single source of truth for internal linking and content gaps
// Implements Koray Tuğberk Gübür's Semantic Content Network principle.

export interface TopicNode {
  id: string;
  title: string;
  href: string;
  type: "pillar" | "cluster" | "tool" | "blog";
  parentId?: string;
  entities: string[]; // Semantic entities for this page
}

export interface TopicGroup {
  id: string;
  name: string;
  description: string;
  pillarHref: string;
  nodes: TopicNode[];
}

export const topicalMap: TopicGroup[] = [
  {
    id: "international-calling",
    name: "International Calling",
    description: "Everything about making international phone calls from a browser",
    pillarHref: "/call",
    nodes: [
      { id: "call-hub", title: "Call Any Country", href: "/call", type: "pillar", entities: ["VoIP", "international calling", "browser calling", "phone call"] },
      { id: "call-india", title: "Call India from your browser", href: "/call/india", type: "cluster", parentId: "call-hub", entities: ["India", "BSNL", "Jio", "Indian phone number"] },
      { id: "call-nigeria", title: "Call Nigeria from your browser", href: "/call/nigeria", type: "cluster", parentId: "call-hub", entities: ["Nigeria", "MTN", "Glo", "Nigerian phone number"] },
      { id: "call-philippines", title: "Call Philippines from your browser", href: "/call/philippines", type: "cluster", parentId: "call-hub", entities: ["Philippines", "Globe Telecom", "Smart", "Filipino phone number"] },
      { id: "call-mexico", title: "Call Mexico from your browser", href: "/call/mexico", type: "cluster", parentId: "call-hub", entities: ["Mexico", "Telcel", "Mexican phone number"] },
      { id: "call-uk", title: "Call United Kingdom from your browser", href: "/call/united-kingdom", type: "cluster", parentId: "call-hub", entities: ["United Kingdom", "BT", "Vodafone UK", "UK phone number"] },
      { id: "call-pakistan", title: "Call Pakistan from your browser", href: "/call/pakistan", type: "cluster", parentId: "call-hub", entities: ["Pakistan", "Jazz", "Telenor Pakistan"] },
      { id: "call-bangladesh", title: "Call Bangladesh from your browser", href: "/call/bangladesh", type: "cluster", parentId: "call-hub", entities: ["Bangladesh", "Grameenphone"] },
      { id: "call-kenya", title: "Call Kenya from your browser", href: "/call/kenya", type: "cluster", parentId: "call-hub", entities: ["Kenya", "Safaricom", "M-Pesa"] },
      { id: "call-ghana", title: "Call Ghana from your browser", href: "/call/ghana", type: "cluster", parentId: "call-hub", entities: ["Ghana", "MTN Ghana"] },
      { id: "call-canada", title: "Call Canada from your browser", href: "/call/canada", type: "cluster", parentId: "call-hub", entities: ["Canada", "Rogers", "Bell Canada"] },
      { id: "call-china", title: "Call China from your browser", href: "/call/china", type: "cluster", parentId: "call-hub", entities: ["China", "China Mobile", "China Unicom"] },
      { id: "call-usa", title: "Call USA from your browser", href: "/call/united-states", type: "cluster", parentId: "call-hub", entities: ["United States", "USA", "AT&T", "Verizon"] },
      { id: "call-brazil", title: "Call Brazil from your browser", href: "/call/brazil", type: "cluster", parentId: "call-hub", entities: ["Brazil", "Vivo", "Claro Brazil"] },
      { id: "call-vietnam", title: "Call Vietnam from your browser", href: "/call/vietnam", type: "cluster", parentId: "call-hub", entities: ["Vietnam", "Viettel", "Vinaphone"] },
      { id: "call-colombia", title: "Call Colombia from your browser", href: "/call/colombia", type: "cluster", parentId: "call-hub", entities: ["Colombia", "Claro Colombia", "Movistar"] },
      { id: "call-south-africa", title: "Call South Africa from your browser", href: "/call/south-africa", type: "cluster", parentId: "call-hub", entities: ["South Africa", "MTN SA", "Vodacom"] },
      // Rates & Pricing cluster
      { id: "rates", title: "International Calling Rates", href: "/rates", type: "tool", parentId: "call-hub", entities: ["calling rates", "per-minute pricing", "pay-as-you-go"] },
      { id: "rate-calculator", title: "International Rate Calculator", href: "/tools/rate-calculator", type: "tool", parentId: "call-hub", entities: ["rate calculator", "cost estimator"] },
      { id: "how-it-works", title: "How browser calling works with WebRTC", href: "/how-it-works", type: "cluster", parentId: "call-hub", entities: ["WebRTC", "browser calling", "VoIP technology"] },
    ],
  },
  {
    id: "comparisons",
    name: "Service Comparisons",
    description: "How ZyraCall compares to other international calling services",
    pillarHref: "/compare",
    nodes: [
      { id: "compare-hub", title: "Compare ZyraCall with other calling services", href: "/compare", type: "pillar", entities: ["VoIP comparison", "calling app comparison"] },
      { id: "vs-skype", title: "ZyraCall vs Skype for international calling", href: "/compare/zyracall-vs-skype", type: "cluster", parentId: "compare-hub", entities: ["Skype", "Skype Credit", "Microsoft"] },
      { id: "vs-google-voice", title: "ZyraCall vs Google Voice for global calling", href: "/compare/zyracall-vs-google-voice", type: "cluster", parentId: "compare-hub", entities: ["Google Voice", "Google", "US calling"] },
      { id: "vs-rebtel", title: "ZyraCall vs Rebtel for cheap international calls", href: "/compare/zyracall-vs-rebtel", type: "cluster", parentId: "compare-hub", entities: ["Rebtel", "international calling app"] },
      { id: "vs-talk360", title: "ZyraCall vs Talk360 for browser calling", href: "/compare/zyracall-vs-talk360", type: "cluster", parentId: "compare-hub", entities: ["Talk360", "calling app"] },
      { id: "vs-vonage", title: "ZyraCall vs Vonage for VoIP calling", href: "/compare/zyracall-vs-vonage", type: "cluster", parentId: "compare-hub", entities: ["Vonage", "enterprise VoIP"] },
      { id: "vs-yadaphone", title: "ZyraCall vs YadaPhone for international calls", href: "/compare/zyracall-vs-yadaphone", type: "cluster", parentId: "compare-hub", entities: ["YadaPhone"] },
    ],
  },
  {
    id: "alternatives",
    name: "Calling App Alternatives",
    description: "ZyraCall as an alternative to popular calling apps",
    pillarHref: "/alternatives",
    nodes: [
      { id: "alt-hub", title: "Best browser-based calling app alternatives", href: "/alternatives", type: "pillar", entities: ["calling app alternative", "Skype alternative"] },
      { id: "alt-skype", title: "Best Skype alternative for international calls", href: "/alternatives/skype-alternative", type: "cluster", parentId: "alt-hub", entities: ["Skype", "Skype alternative"] },
      { id: "alt-whatsapp", title: "Best WhatsApp calling alternative for any phone number", href: "/alternatives/whatsapp-calling-alternative", type: "cluster", parentId: "alt-hub", entities: ["WhatsApp", "WhatsApp calling"] },
      { id: "alt-viber", title: "Best Viber Out alternative with transparent pricing", href: "/alternatives/viber-out-alternative", type: "cluster", parentId: "alt-hub", entities: ["Viber", "Viber Out"] },
      { id: "alt-google-voice", title: "Best Google Voice alternative available worldwide", href: "/alternatives/google-voice-alternative", type: "cluster", parentId: "alt-hub", entities: ["Google Voice"] },
    ],
  },
  {
    id: "network-quality",
    name: "Network Quality & Tools",
    description: "Tools for testing and optimizing call quality",
    pillarHref: "/tools",
    nodes: [
      { id: "tools-hub", title: "Free calling tools for international VoIP", href: "/tools", type: "pillar", entities: ["VoIP tools", "calling tools", "network test"] },
      { id: "connectivity-ping", title: "Test your network for international calls", href: "/tools/connectivity-ping", type: "tool", parentId: "tools-hub", entities: ["latency test", "jitter", "packet loss", "network quality"] },
      { id: "webrtc-tester", title: "WebRTC compatibility and quality tester", href: "/tools/webrtc-tester", type: "tool", parentId: "tools-hub", entities: ["WebRTC", "browser compatibility", "audio test"] },
      { id: "2fa-finder", title: "Find phone numbers that work for 2FA verification", href: "/tools/2fa-finder", type: "tool", parentId: "tools-hub", entities: ["two-factor authentication", "SMS verification", "2FA"] },
      { id: "rate-calc-tool", title: "Calculate international call costs by country", href: "/tools/rate-calculator", type: "tool", parentId: "tools-hub", entities: ["rate calculator", "cost estimator", "savings"] },
    ],
  },
  {
    id: "blog",
    name: "Blog & Guides",
    description: "Educational content about international calling and VoIP",
    pillarHref: "/blog",
    nodes: [
      { id: "blog-hub", title: "ZyraCall blog about international calling and VoIP", href: "/blog", type: "pillar", entities: ["VoIP blog", "calling tips"] },
      { id: "blog-guide", title: "The complete international calling guide", href: "/blog/international-calling-guide", type: "blog", parentId: "blog-hub", entities: ["international calling", "calling guide", "VoIP"] },
      { id: "blog-save-money", title: "How to save money on international calls", href: "/blog/save-money-international-calls-2025", type: "blog", parentId: "blog-hub", entities: ["cheap calls", "save money", "calling costs"] },
      { id: "blog-browser-future", title: "The future of browser-based calling", href: "/blog/browser-based-calling-future", type: "blog", parentId: "blog-hub", entities: ["WebRTC", "browser calling", "VoIP technology"] },
      { id: "blog-expat", title: "Expat guide to staying connected abroad", href: "/blog/expat-calling-guide", type: "blog", parentId: "blog-hub", entities: ["expat", "living abroad", "international communication"] },
      { id: "blog-voip-quality", title: "VoIP call quality factors explained", href: "/blog/voip-call-quality", type: "blog", parentId: "blog-hub", entities: ["call quality", "VoIP", "audio quality", "jitter", "latency"] },
      { id: "blog-wifi-voip", title: "WiFi calling vs VoIP for international calls", href: "/blog/wifi-calling-vs-voip", type: "blog", parentId: "blog-hub", entities: ["WiFi calling", "VoIP", "comparison"] },
      { id: "blog-business", title: "Business international calling guide", href: "/blog/business-international-calling", type: "blog", parentId: "blog-hub", entities: ["business calling", "SMB", "team calling"] },
      { id: "blog-free", title: "Free international calling: what really works", href: "/blog/free-international-calling", type: "blog", parentId: "blog-hub", entities: ["free calling", "WhatsApp", "Skype"] },
      { id: "blog-mobile-landline", title: "Mobile vs landline international calling rates", href: "/blog/mobile-vs-landline-rates", type: "blog", parentId: "blog-hub", entities: ["mobile rates", "landline rates", "calling costs"] },
    ],
  },
];

/**
 * Get related content for a given page based on the topical map.
 * Returns sibling pages, parent hub, and cross-topic suggestions.
 * Implements Koray's hub-and-spoke linking discipline.
 */
export const getRelatedContent = (currentHref: string) => {
  const allNodes = topicalMap.flatMap((g) => g.nodes);
  const currentNode = allNodes.find((n) => n.href === currentHref);

  if (!currentNode) {
    // Fallback: return pillar pages
    return {
      countries: topicalMap[0].nodes.filter((n) => n.type === "cluster").slice(0, 4).map(n => ({ title: n.title, href: n.href })),
      comparisons: topicalMap[1].nodes.filter((n) => n.type === "cluster").slice(0, 3).map(n => ({ title: n.title, href: n.href })),
      articles: topicalMap[4].nodes.filter((n) => n.type === "blog").slice(0, 3).map(n => ({ title: n.title, href: n.href })),
    };
  }

  // Find the group this node belongs to
  const group = topicalMap.find((g) => g.nodes.some((n) => n.id === currentNode.id));

  // Siblings: same parent, different page
  const siblings = group
    ? group.nodes
        .filter((n) => n.id !== currentNode.id && n.type === currentNode.type)
        .slice(0, 4)
    : [];

  // Cross-topic: nodes from other groups
  const crossTopic = topicalMap
    .filter((g) => g.id !== group?.id)
    .flatMap((g) => g.nodes.filter((n) => n.type === "cluster" || n.type === "blog"))
    .slice(0, 6);

  // Categorize
  const countries = [...siblings, ...crossTopic]
    .filter((n) => n.href.startsWith("/call/"))
    .slice(0, 4)
    .map((n) => ({ title: n.title, href: n.href }));

  const comparisons = [...siblings, ...crossTopic]
    .filter((n) => n.href.startsWith("/compare/") || n.href.startsWith("/alternatives/"))
    .slice(0, 3)
    .map((n) => ({ title: n.title, href: n.href }));

  const articles = [...siblings, ...crossTopic]
    .filter((n) => n.href.startsWith("/blog/"))
    .slice(0, 3)
    .map((n) => ({ title: n.title, href: n.href }));

  return { countries, comparisons, articles };
};

/**
 * Canonical entity definitions for Schema.org `about` annotations.
 * Use these to disambiguate the central entities of the topical map for the Knowledge Graph.
 */
export const entityDefinitions = {
  voip: { "@type": "Thing", name: "Voice over IP", sameAs: "https://en.wikipedia.org/wiki/Voice_over_IP" },
  internationalCalling: { "@type": "Thing", name: "International calling", sameAs: "https://en.wikipedia.org/wiki/International_call" },
  webrtc: { "@type": "Thing", name: "WebRTC", sameAs: "https://en.wikipedia.org/wiki/WebRTC" },
  twoFA: { "@type": "Thing", name: "Two-factor authentication", sameAs: "https://en.wikipedia.org/wiki/Multi-factor_authentication" },
  pstn: { "@type": "Thing", name: "Public switched telephone network", sameAs: "https://en.wikipedia.org/wiki/Public_switched_telephone_network" },
  sip: { "@type": "Thing", name: "Session Initiation Protocol", sameAs: "https://en.wikipedia.org/wiki/Session_Initiation_Protocol" },
} as const;
