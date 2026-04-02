// Topical Authority Map — Single source of truth for internal linking and content gaps

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
      { id: "call-india", title: "Call India", href: "/call/india", type: "cluster", parentId: "call-hub", entities: ["India", "BSNL", "Jio", "Indian phone number"] },
      { id: "call-nigeria", title: "Call Nigeria", href: "/call/nigeria", type: "cluster", parentId: "call-hub", entities: ["Nigeria", "MTN", "Glo", "Nigerian phone number"] },
      { id: "call-philippines", title: "Call Philippines", href: "/call/philippines", type: "cluster", parentId: "call-hub", entities: ["Philippines", "Globe Telecom", "Smart", "Filipino phone number"] },
      { id: "call-mexico", title: "Call Mexico", href: "/call/mexico", type: "cluster", parentId: "call-hub", entities: ["Mexico", "Telcel", "Mexican phone number"] },
      { id: "call-uk", title: "Call United Kingdom", href: "/call/united-kingdom", type: "cluster", parentId: "call-hub", entities: ["United Kingdom", "BT", "Vodafone UK", "UK phone number"] },
      { id: "call-pakistan", title: "Call Pakistan", href: "/call/pakistan", type: "cluster", parentId: "call-hub", entities: ["Pakistan", "Jazz", "Telenor Pakistan"] },
      { id: "call-bangladesh", title: "Call Bangladesh", href: "/call/bangladesh", type: "cluster", parentId: "call-hub", entities: ["Bangladesh", "Grameenphone"] },
      { id: "call-kenya", title: "Call Kenya", href: "/call/kenya", type: "cluster", parentId: "call-hub", entities: ["Kenya", "Safaricom", "M-Pesa"] },
      { id: "call-ghana", title: "Call Ghana", href: "/call/ghana", type: "cluster", parentId: "call-hub", entities: ["Ghana", "MTN Ghana"] },
      { id: "call-canada", title: "Call Canada", href: "/call/canada", type: "cluster", parentId: "call-hub", entities: ["Canada", "Rogers", "Bell Canada"] },
      // Rates & Pricing cluster
      { id: "rates", title: "International Calling Rates", href: "/rates", type: "tool", parentId: "call-hub", entities: ["calling rates", "per-minute pricing", "pay-as-you-go"] },
      { id: "rate-calculator", title: "Rate Calculator", href: "/tools/rate-calculator", type: "tool", parentId: "call-hub", entities: ["rate calculator", "cost estimator"] },
      { id: "how-it-works", title: "How Browser Calling Works", href: "/how-it-works", type: "cluster", parentId: "call-hub", entities: ["WebRTC", "browser calling", "VoIP technology"] },
    ],
  },
  {
    id: "comparisons",
    name: "Service Comparisons",
    description: "How ZyraCall compares to other international calling services",
    pillarHref: "/compare",
    nodes: [
      { id: "compare-hub", title: "Compare ZyraCall", href: "/compare", type: "pillar", entities: ["VoIP comparison", "calling app comparison"] },
      { id: "vs-skype", title: "ZyraCall vs Skype", href: "/compare/zyracall-vs-skype", type: "cluster", parentId: "compare-hub", entities: ["Skype", "Skype Credit", "Microsoft"] },
      { id: "vs-google-voice", title: "ZyraCall vs Google Voice", href: "/compare/zyracall-vs-google-voice", type: "cluster", parentId: "compare-hub", entities: ["Google Voice", "Google", "US calling"] },
      { id: "vs-rebtel", title: "ZyraCall vs Rebtel", href: "/compare/zyracall-vs-rebtel", type: "cluster", parentId: "compare-hub", entities: ["Rebtel", "international calling app"] },
      { id: "vs-talk360", title: "ZyraCall vs Talk360", href: "/compare/zyracall-vs-talk360", type: "cluster", parentId: "compare-hub", entities: ["Talk360", "calling app"] },
      { id: "vs-vonage", title: "ZyraCall vs Vonage", href: "/compare/zyracall-vs-vonage", type: "cluster", parentId: "compare-hub", entities: ["Vonage", "enterprise VoIP"] },
      { id: "vs-yadaphone", title: "ZyraCall vs YadaPhone", href: "/compare/zyracall-vs-yadaphone", type: "cluster", parentId: "compare-hub", entities: ["YadaPhone"] },
    ],
  },
  {
    id: "alternatives",
    name: "Calling App Alternatives",
    description: "ZyraCall as an alternative to popular calling apps",
    pillarHref: "/alternatives",
    nodes: [
      { id: "alt-hub", title: "Best Calling App Alternatives", href: "/alternatives", type: "pillar", entities: ["calling app alternative", "Skype alternative"] },
      { id: "alt-skype", title: "Skype Alternative", href: "/alternatives/skype-alternative", type: "cluster", parentId: "alt-hub", entities: ["Skype", "Skype alternative"] },
      { id: "alt-whatsapp", title: "WhatsApp Alternative", href: "/alternatives/whatsapp-calling-alternative", type: "cluster", parentId: "alt-hub", entities: ["WhatsApp", "WhatsApp calling"] },
      { id: "alt-viber", title: "Viber Out Alternative", href: "/alternatives/viber-out-alternative", type: "cluster", parentId: "alt-hub", entities: ["Viber", "Viber Out"] },
      { id: "alt-google-voice", title: "Google Voice Alternative", href: "/alternatives/google-voice-alternative", type: "cluster", parentId: "alt-hub", entities: ["Google Voice"] },
    ],
  },
  {
    id: "network-quality",
    name: "Network Quality & Tools",
    description: "Tools for testing and optimizing call quality",
    pillarHref: "/tools",
    nodes: [
      { id: "tools-hub", title: "Free Calling Tools", href: "/tools", type: "pillar", entities: ["VoIP tools", "calling tools", "network test"] },
      { id: "connectivity-ping", title: "Global Connectivity Ping", href: "/tools/connectivity-ping", type: "tool", parentId: "tools-hub", entities: ["latency test", "jitter", "packet loss", "network quality"] },
      { id: "webrtc-tester", title: "WebRTC Tester", href: "/tools/webrtc-tester", type: "tool", parentId: "tools-hub", entities: ["WebRTC", "browser compatibility", "audio test"] },
      { id: "2fa-finder", title: "2FA Finder", href: "/tools/2fa-finder", type: "tool", parentId: "tools-hub", entities: ["two-factor authentication", "SMS verification", "2FA"] },
    ],
  },
  {
    id: "blog",
    name: "Blog & Guides",
    description: "Educational content about international calling and VoIP",
    pillarHref: "/blog",
    nodes: [
      { id: "blog-hub", title: "ZyraCall Blog", href: "/blog", type: "pillar", entities: ["VoIP blog", "calling tips"] },
      { id: "blog-guide", title: "International Calling Guide", href: "/blog/international-calling-guide", type: "blog", parentId: "blog-hub", entities: ["international calling", "calling guide", "VoIP"] },
      { id: "blog-save-money", title: "Save Money on International Calls", href: "/blog/save-money-international-calls-2025", type: "blog", parentId: "blog-hub", entities: ["cheap calls", "save money", "calling costs"] },
      { id: "blog-browser-future", title: "The Future of Browser-Based Calling", href: "/blog/browser-based-calling-future", type: "blog", parentId: "blog-hub", entities: ["WebRTC", "browser calling", "VoIP technology"] },
      { id: "blog-expat", title: "Expat Calling Guide", href: "/blog/expat-calling-guide", type: "blog", parentId: "blog-hub", entities: ["expat", "living abroad", "international communication"] },
      { id: "blog-voip-quality", title: "VoIP Call Quality Guide", href: "/blog/voip-call-quality", type: "blog", parentId: "blog-hub", entities: ["call quality", "VoIP", "audio quality", "jitter", "latency"] },
      { id: "blog-wifi-voip", title: "WiFi Calling vs VoIP", href: "/blog/wifi-calling-vs-voip", type: "blog", parentId: "blog-hub", entities: ["WiFi calling", "VoIP", "comparison"] },
    ],
  },
];

/**
 * Get related content for a given page based on the topical map.
 * Returns sibling pages, parent hub, and cross-topic suggestions.
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
    .slice(0, 3);

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
