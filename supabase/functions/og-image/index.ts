import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Generate SVG-based OG image
function generateOGImage(
  title: string,
  subtitle: string,
  pageType: 'default' | 'comparison' | 'alternative' | 'rates' | 'about'
): string {
  // Color schemes based on page type
  const colorSchemes = {
    default: { gradient: '#1a1a2e', accent: '#00D4AA', secondary: '#00B894' },
    comparison: { gradient: '#1a1a2e', accent: '#00D4AA', secondary: '#FF6B6B' },
    alternative: { gradient: '#1a1a2e', accent: '#00D4AA', secondary: '#4ECDC4' },
    rates: { gradient: '#1a1a2e', accent: '#00D4AA', secondary: '#FFE66D' },
    about: { gradient: '#1a1a2e', accent: '#00D4AA', secondary: '#A8E6CF' },
  };

  const colors = colorSchemes[pageType] || colorSchemes.default;
  
  // Wrap title text for better display
  const maxTitleLength = 40;
  const titleLines: string[] = [];
  const words = title.split(' ');
  let currentLine = '';
  
  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length <= maxTitleLength) {
      currentLine = (currentLine + ' ' + word).trim();
    } else {
      if (currentLine) titleLines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) titleLines.push(currentLine);

  // Wrap subtitle text
  const maxSubtitleLength = 60;
  const subtitleLines: string[] = [];
  const subWords = subtitle.split(' ');
  let currentSubLine = '';
  
  for (const word of subWords) {
    if ((currentSubLine + ' ' + word).trim().length <= maxSubtitleLength) {
      currentSubLine = (currentSubLine + ' ' + word).trim();
    } else {
      if (currentSubLine) subtitleLines.push(currentSubLine);
      currentSubLine = word;
    }
  }
  if (currentSubLine) subtitleLines.push(currentSubLine);

  const titleYStart = 280 - (titleLines.length - 1) * 35;
  
  const titleText = titleLines.map((line, i) => 
    `<tspan x="80" dy="${i === 0 ? 0 : 70}">${escapeXml(line)}</tspan>`
  ).join('');

  const subtitleYStart = titleYStart + titleLines.length * 70 + 30;
  const subtitleText = subtitleLines.map((line, i) => 
    `<tspan x="80" dy="${i === 0 ? 0 : 35}">${escapeXml(line)}</tspan>`
  ).join('');

  // Icon based on page type
  const icons = {
    default: `<circle cx="1080" cy="315" r="80" fill="${colors.accent}" opacity="0.2"/>
              <path d="M1060 295 L1060 335 L1100 315 Z" fill="${colors.accent}"/>`,
    comparison: `<circle cx="1040" cy="315" r="50" fill="${colors.accent}" opacity="0.3"/>
                 <circle cx="1120" cy="315" r="50" fill="${colors.secondary}" opacity="0.3"/>
                 <text x="1080" y="325" font-family="Arial, sans-serif" font-size="32" fill="white" text-anchor="middle" font-weight="bold">VS</text>`,
    alternative: `<rect x="1030" y="265" width="100" height="100" rx="20" fill="${colors.accent}" opacity="0.2"/>
                  <path d="M1070 295 L1090 295 L1080 275 Z M1070 335 L1090 335 L1080 355 Z" fill="${colors.accent}"/>`,
    rates: `<circle cx="1080" cy="315" r="70" fill="${colors.secondary}" opacity="0.2"/>
            <text x="1080" y="330" font-family="Arial, sans-serif" font-size="40" fill="${colors.secondary}" text-anchor="middle" font-weight="bold">$</text>`,
    about: `<circle cx="1080" cy="315" r="70" fill="${colors.secondary}" opacity="0.2"/>
            <text x="1080" y="335" font-family="Arial, sans-serif" font-size="50" fill="${colors.secondary}" text-anchor="middle">ℹ</text>`,
  };

  const svg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.gradient};stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0d0d1a;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${colors.accent};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colors.secondary};stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  
  <!-- Decorative elements -->
  <circle cx="100" cy="100" r="200" fill="${colors.accent}" opacity="0.05"/>
  <circle cx="1100" cy="530" r="300" fill="${colors.secondary}" opacity="0.03"/>
  
  <!-- Accent line -->
  <rect x="80" y="200" width="120" height="6" rx="3" fill="url(#accent)"/>
  
  <!-- Title -->
  <text x="80" y="${titleYStart}" font-family="Arial, Helvetica, sans-serif" font-size="56" fill="white" font-weight="bold">
    ${titleText}
  </text>
  
  <!-- Subtitle -->
  <text x="80" y="${subtitleYStart}" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#9CA3AF">
    ${subtitleText}
  </text>
  
  <!-- Icon -->
  ${icons[pageType] || icons.default}
  
  <!-- Logo area -->
  <text x="80" y="560" font-family="Arial, Helvetica, sans-serif" font-size="36" fill="${colors.accent}" font-weight="bold">ZyraCall</text>
  <text x="260" y="560" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="#6B7280">International Calling from Your Browser</text>
  
  <!-- Border accent -->
  <rect x="0" y="620" width="1200" height="10" fill="url(#accent)"/>
</svg>`;

  return svg;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const title = url.searchParams.get('title') || 'ZyraCall';
    const subtitle = url.searchParams.get('subtitle') || 'International Calls from Your Browser';
    const pageType = (url.searchParams.get('type') as 'default' | 'comparison' | 'alternative' | 'rates' | 'about') || 'default';

    console.log(`Generating OG image: title="${title}", subtitle="${subtitle}", type="${pageType}"`);

    const svg = generateOGImage(title, subtitle, pageType);

    return new Response(svg, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error: unknown) {
    console.error('Error generating OG image:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: 'Failed to generate image', details: message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
