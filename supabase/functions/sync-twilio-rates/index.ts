import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ISO to dialing code mapping (200+ countries)
const countryDialingCodes: Record<string, string> = {
  "AF": "93", "AL": "355", "DZ": "213", "AS": "1684", "AD": "376", "AO": "244",
  "AI": "1264", "AG": "1268", "AR": "54", "AM": "374", "AW": "297", "AU": "61",
  "AT": "43", "AZ": "994", "BS": "1242", "BH": "973", "BD": "880", "BB": "1246",
  "BY": "375", "BE": "32", "BZ": "501", "BJ": "229", "BM": "1441", "BT": "975",
  "BO": "591", "BA": "387", "BW": "267", "BR": "55", "BN": "673", "BG": "359",
  "BF": "226", "BI": "257", "KH": "855", "CM": "237", "CA": "1", "CV": "238",
  "KY": "1345", "CF": "236", "TD": "235", "CL": "56", "CN": "86", "CO": "57",
  "KM": "269", "CG": "242", "CD": "243", "CK": "682", "CR": "506", "CI": "225",
  "HR": "385", "CU": "53", "CW": "599", "CY": "357", "CZ": "420", "DK": "45",
  "DJ": "253", "DM": "1767", "DO": "1809", "EC": "593", "EG": "20", "SV": "503",
  "GQ": "240", "ER": "291", "EE": "372", "SZ": "268", "ET": "251", "FJ": "679",
  "FI": "358", "FR": "33", "GF": "594", "PF": "689", "GA": "241", "GM": "220",
  "GE": "995", "DE": "49", "GH": "233", "GI": "350", "GR": "30", "GL": "299",
  "GD": "1473", "GP": "590", "GU": "1671", "GT": "502", "GN": "224", "GW": "245",
  "GY": "592", "HT": "509", "HN": "504", "HK": "852", "HU": "36", "IS": "354",
  "IN": "91", "ID": "62", "IR": "98", "IQ": "964", "IE": "353", "IL": "972",
  "IT": "39", "JM": "1876", "JP": "81", "JO": "962", "KZ": "7", "KE": "254",
  "KI": "686", "KP": "850", "KR": "82", "KW": "965", "KG": "996", "LA": "856",
  "LV": "371", "LB": "961", "LS": "266", "LR": "231", "LY": "218", "LI": "423",
  "LT": "370", "LU": "352", "MO": "853", "MG": "261", "MW": "265", "MY": "60",
  "MV": "960", "ML": "223", "MT": "356", "MH": "692", "MQ": "596", "MR": "222",
  "MU": "230", "YT": "262", "MX": "52", "FM": "691", "MD": "373", "MC": "377",
  "MN": "976", "ME": "382", "MS": "1664", "MA": "212", "MZ": "258", "MM": "95",
  "NA": "264", "NR": "674", "NP": "977", "NL": "31", "NC": "687", "NZ": "64",
  "NI": "505", "NE": "227", "NG": "234", "NU": "683", "NF": "672", "MK": "389",
  "MP": "1670", "NO": "47", "OM": "968", "PK": "92", "PW": "680", "PS": "970",
  "PA": "507", "PG": "675", "PY": "595", "PE": "51", "PH": "63", "PL": "48",
  "PT": "351", "PR": "1787", "QA": "974", "RE": "262", "RO": "40", "RU": "7",
  "RW": "250", "SH": "290", "KN": "1869", "LC": "1758", "PM": "508", "VC": "1784",
  "WS": "685", "SM": "378", "ST": "239", "SA": "966", "SN": "221", "RS": "381",
  "SC": "248", "SL": "232", "SG": "65", "SX": "1721", "SK": "421", "SI": "386",
  "SB": "677", "SO": "252", "ZA": "27", "SS": "211", "ES": "34", "LK": "94",
  "SD": "249", "SR": "597", "SE": "46", "CH": "41", "SY": "963", "TW": "886",
  "TJ": "992", "TZ": "255", "TH": "66", "TL": "670", "TG": "228", "TK": "690",
  "TO": "676", "TT": "1868", "TN": "216", "TR": "90", "TM": "993", "TC": "1649",
  "TV": "688", "UG": "256", "UA": "380", "AE": "971", "GB": "44", "US": "1",
  "UY": "598", "UZ": "998", "VU": "678", "VA": "39", "VE": "58", "VN": "84",
  "VG": "1284", "VI": "1340", "WF": "681", "YE": "967", "ZM": "260", "ZW": "263"
};

// ISO country code to region mapping
const countryToRegion: Record<string, string> = {
  // Africa
  "DZ": "Africa", "AO": "Africa", "BJ": "Africa", "BW": "Africa", "BF": "Africa",
  "BI": "Africa", "CV": "Africa", "CM": "Africa", "CF": "Africa", "TD": "Africa",
  "KM": "Africa", "CG": "Africa", "CD": "Africa", "DJ": "Africa", "EG": "Africa",
  "GQ": "Africa", "ER": "Africa", "SZ": "Africa", "ET": "Africa", "GA": "Africa",
  "GM": "Africa", "GH": "Africa", "GN": "Africa", "GW": "Africa", "CI": "Africa",
  "KE": "Africa", "LS": "Africa", "LR": "Africa", "LY": "Africa", "MG": "Africa",
  "MW": "Africa", "ML": "Africa", "MR": "Africa", "MU": "Africa", "MA": "Africa",
  "MZ": "Africa", "NA": "Africa", "NE": "Africa", "NG": "Africa", "RW": "Africa",
  "ST": "Africa", "SN": "Africa", "SC": "Africa", "SL": "Africa", "SO": "Africa",
  "ZA": "Africa", "SS": "Africa", "SD": "Africa", "TZ": "Africa", "TG": "Africa",
  "TN": "Africa", "UG": "Africa", "ZM": "Africa", "ZW": "Africa", "SH": "Africa",
  "YT": "Africa", "RE": "Africa",
  
  // South Asia
  "AF": "South Asia", "BD": "South Asia", "BT": "South Asia", "IN": "South Asia",
  "MV": "South Asia", "NP": "South Asia", "PK": "South Asia", "LK": "South Asia",
  
  // Southeast Asia
  "BN": "Southeast Asia", "KH": "Southeast Asia", "ID": "Southeast Asia",
  "LA": "Southeast Asia", "MY": "Southeast Asia", "MM": "Southeast Asia",
  "PH": "Southeast Asia", "SG": "Southeast Asia", "TH": "Southeast Asia",
  "TL": "Southeast Asia", "VN": "Southeast Asia",
  
  // East Asia
  "CN": "East Asia", "HK": "East Asia", "JP": "East Asia", "KP": "East Asia",
  "KR": "East Asia", "MO": "East Asia", "MN": "East Asia", "TW": "East Asia",
  
  // Middle East
  "BH": "Middle East", "IR": "Middle East", "IQ": "Middle East", "IL": "Middle East",
  "JO": "Middle East", "KW": "Middle East", "LB": "Middle East", "OM": "Middle East",
  "PS": "Middle East", "QA": "Middle East", "SA": "Middle East", "SY": "Middle East",
  "AE": "Middle East", "YE": "Middle East",
  
  // Europe
  "AL": "Europe", "AD": "Europe", "AT": "Europe", "BY": "Europe", "BE": "Europe",
  "BA": "Europe", "BG": "Europe", "HR": "Europe", "CY": "Europe", "CZ": "Europe",
  "DK": "Europe", "EE": "Europe", "FI": "Europe", "FR": "Europe", "DE": "Europe",
  "GR": "Europe", "HU": "Europe", "IS": "Europe", "IE": "Europe", "IT": "Europe",
  "XK": "Europe", "LV": "Europe", "LI": "Europe", "LT": "Europe", "LU": "Europe",
  "MT": "Europe", "MD": "Europe", "MC": "Europe", "ME": "Europe", "NL": "Europe",
  "MK": "Europe", "NO": "Europe", "PL": "Europe", "PT": "Europe", "RO": "Europe",
  "RU": "Europe", "SM": "Europe", "RS": "Europe", "SK": "Europe", "SI": "Europe",
  "ES": "Europe", "SE": "Europe", "CH": "Europe", "TR": "Europe", "UA": "Europe",
  "GB": "Europe", "VA": "Europe", "GI": "Europe", "GL": "Europe", "GE": "Europe",
  "AM": "Europe", "AZ": "Europe", "KZ": "Europe", "KG": "Europe", "TJ": "Europe",
  "TM": "Europe", "UZ": "Europe",
  
  // North America
  "US": "North America", "CA": "North America",
  
  // Latin America
  "AR": "Latin America", "BZ": "Latin America", "BO": "Latin America",
  "BR": "Latin America", "CL": "Latin America", "CO": "Latin America",
  "CR": "Latin America", "CU": "Latin America", "EC": "Latin America",
  "SV": "Latin America", "GF": "Latin America", "GT": "Latin America",
  "GY": "Latin America", "HN": "Latin America", "MX": "Latin America",
  "NI": "Latin America", "PA": "Latin America", "PY": "Latin America",
  "PE": "Latin America", "SR": "Latin America", "UY": "Latin America",
  "VE": "Latin America",
  
  // Caribbean
  "AI": "Caribbean", "AG": "Caribbean", "AW": "Caribbean", "BS": "Caribbean",
  "BB": "Caribbean", "BM": "Caribbean", "VG": "Caribbean", "KY": "Caribbean",
  "CW": "Caribbean", "DM": "Caribbean", "DO": "Caribbean", "GD": "Caribbean",
  "GP": "Caribbean", "HT": "Caribbean", "JM": "Caribbean", "MQ": "Caribbean",
  "MS": "Caribbean", "PR": "Caribbean", "KN": "Caribbean", "LC": "Caribbean",
  "VC": "Caribbean", "SX": "Caribbean", "TT": "Caribbean", "TC": "Caribbean",
  "VI": "Caribbean",
  
  // Oceania
  "AS": "Oceania", "AU": "Oceania", "CK": "Oceania", "FJ": "Oceania",
  "PF": "Oceania", "GU": "Oceania", "KI": "Oceania", "MH": "Oceania",
  "FM": "Oceania", "NR": "Oceania", "NC": "Oceania", "NZ": "Oceania",
  "NU": "Oceania", "NF": "Oceania", "MP": "Oceania", "PW": "Oceania",
  "PG": "Oceania", "WS": "Oceania", "SB": "Oceania", "TK": "Oceania",
  "TO": "Oceania", "TV": "Oceania", "VU": "Oceania", "WF": "Oceania",
};

interface TwilioCountry {
  country: string;
  iso_country: string;
  url: string;
}

interface TwilioPriceInfo {
  country: string;
  iso_country: string;
  outbound_prefix_prices: Array<{
    friendly_name: string;
    prefixes: string[];
    base_price: string;
    current_price: string;
  }>;
  price_unit: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify admin access
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Check admin role
    const { data: roleData, error: roleError } = await supabaseClient
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle();

    if (roleError) {
      console.error('Error checking admin role:', roleError);
    }

    if (!roleData) {
      console.log('User does not have admin role:', user.id);
      return new Response(JSON.stringify({ error: 'Admin access required' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Get Twilio credentials
    const accountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
    const authToken = Deno.env.get('TWILIO_AUTH_TOKEN');

    if (!accountSid || !authToken) {
      return new Response(JSON.stringify({ error: 'Twilio credentials not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const serviceClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Fetch regional markup settings
    const { data: regionalSettings } = await serviceClient
      .from('regional_markup_settings')
      .select('region, default_markup_percentage');
    
    const markupMap = new Map<string, number>(
      regionalSettings?.map(s => [s.region, Number(s.default_markup_percentage)]) || []
    );
    const defaultMarkup = markupMap.get('Other') || 40;

    const twilioAuth = btoa(`${accountSid}:${authToken}`);

    console.log('Fetching countries from Twilio Pricing API...');

    // Fetch all countries from Twilio
    const countriesResponse = await fetch(
      'https://pricing.twilio.com/v2/Voice/Countries?PageSize=300',
      {
        headers: {
          'Authorization': `Basic ${twilioAuth}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!countriesResponse.ok) {
      const errorText = await countriesResponse.text();
      console.error('Twilio API error:', errorText);
      throw new Error(`Failed to fetch countries: ${countriesResponse.status}`);
    }

    const countriesData = await countriesResponse.json();
    const countries: TwilioCountry[] = countriesData.countries || [];

    console.log(`Found ${countries.length} countries to sync`);

    let synced = 0;
    let failed = 0;
    const errors: string[] = [];

    // Process countries in batches of 10 for rate limiting
    const batchSize = 10;
    for (let i = 0; i < countries.length; i += batchSize) {
      const batch = countries.slice(i, i + batchSize);
      
      await Promise.all(batch.map(async (country) => {
        try {
          // Fetch detailed pricing for this country
          const priceResponse = await fetch(
            `https://pricing.twilio.com/v2/Voice/Countries/${country.iso_country}`,
            {
              headers: {
                'Authorization': `Basic ${twilioAuth}`,
                'Content-Type': 'application/json'
              }
            }
          );

          if (!priceResponse.ok) {
            console.warn(`Failed to fetch pricing for ${country.iso_country}`);
            failed++;
            return;
          }

          const priceData: TwilioPriceInfo = await priceResponse.json();

          // Extract mobile and landline rates with improved detection
          let mobileRate = 0;
          let landlineRate = 0;
          let genericRate = 0;

          for (const prefix of priceData.outbound_prefix_prices || []) {
            const price = parseFloat(prefix.current_price) || parseFloat(prefix.base_price) || 0;
            if (price === 0) continue;
            
            const friendlyName = prefix.friendly_name.toLowerCase();
            
            // Skip premium/toll-free as they're not standard rates
            if (friendlyName.includes('premium') || friendlyName.includes('toll free') || friendlyName.includes('tollfree') || friendlyName.includes('shared cost')) {
              continue;
            }

            // Identify mobile rates
            const isMobile = friendlyName.includes('mobile') || 
                             friendlyName.includes('cellular') || 
                             friendlyName.includes('wireless');
            
            // Identify landline rates (expanded keywords)
            const isLandline = friendlyName.includes('landline') || 
                               friendlyName.includes('fixed') || 
                               friendlyName.includes('national') ||
                               friendlyName.includes('geographic') ||
                               friendlyName.includes('local') ||
                               friendlyName.includes('city');

            if (isMobile) {
              // Take highest mobile rate (usually more expensive)
              if (price > mobileRate) mobileRate = price;
            } else if (isLandline) {
              // Take lowest landline rate 
              if (landlineRate === 0 || price < landlineRate) landlineRate = price;
            } else {
              // Track generic rate for fallback (use lowest)
              if (genericRate === 0 || price < genericRate) genericRate = price;
            }
          }

          // Apply fallbacks
          if (landlineRate === 0 && genericRate > 0) {
            landlineRate = genericRate;
          }
          if (landlineRate === 0 && mobileRate > 0) {
            landlineRate = mobileRate;
          }
          if (mobileRate === 0 && landlineRate > 0) {
            mobileRate = landlineRate;
          }

          // Final fallback to first valid price
          if (mobileRate === 0 && landlineRate === 0 && priceData.outbound_prefix_prices?.length > 0) {
            const firstValidPrice = priceData.outbound_prefix_prices.find(p => 
              (parseFloat(p.current_price) > 0 || parseFloat(p.base_price) > 0) &&
              !p.friendly_name.toLowerCase().includes('premium') &&
              !p.friendly_name.toLowerCase().includes('toll free')
            );
            if (firstValidPrice) {
              const price = parseFloat(firstValidPrice.current_price) || parseFloat(firstValidPrice.base_price) || 0;
              mobileRate = price;
              landlineRate = price;
            }
          }

          // Get dialing code
          const dialingCode = countryDialingCodes[country.iso_country] || '';
          if (!dialingCode) {
            console.warn(`No dialing code for ${country.iso_country}`);
          }

          // Determine region for this country
          const region = countryToRegion[country.iso_country] || 'Other';
          
          // Get regional markup (or existing markup if manually set)
          const { data: existingRate } = await serviceClient
            .from('call_rates')
            .select('markup_percentage, sync_source')
            .eq('country_name', country.country)
            .maybeSingle();

          // Use regional markup for new rates or if synced from Twilio
          // Preserve manual overrides
          let markupPercentage: number;
          if (existingRate && existingRate.sync_source === 'manual') {
            markupPercentage = existingRate.markup_percentage;
          } else {
            markupPercentage = markupMap.get(region) ?? defaultMarkup;
          }

          // Calculate customer rates with markup
          const customerMobileRate = mobileRate * (1 + markupPercentage / 100);
          const customerLandlineRate = landlineRate * (1 + markupPercentage / 100);

          // Upsert the rate
          const { error: upsertError } = await serviceClient
            .from('call_rates')
            .upsert({
              country_code: dialingCode,
              country_name: country.country,
              base_cost_mobile: mobileRate,
              base_cost_landline: landlineRate,
              mobile_rate: customerMobileRate,
              landline_rate: customerLandlineRate,
              twilio_base_price_mobile: mobileRate,
              twilio_base_price_landline: landlineRate,
              markup_percentage: markupPercentage,
              region: region,
              provider: 'twilio',
              is_active: true,
              last_synced_at: new Date().toISOString(),
              sync_source: 'twilio_api',
              currency: priceData.price_unit || 'USD'
            }, {
              onConflict: 'country_name'
            });

          if (upsertError) {
            console.error(`Error upserting ${country.iso_country}:`, upsertError);
            errors.push(`${country.country}: ${upsertError.message}`);
            failed++;
          } else {
            synced++;
          }
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Unknown error';
          console.error(`Error processing ${country.iso_country}:`, err);
          errors.push(`${country.country}: ${errorMessage}`);
          failed++;
        }
      }));

      // Small delay between batches to avoid rate limiting
      if (i + batchSize < countries.length) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    console.log(`Sync complete: ${synced} synced, ${failed} failed`);

    return new Response(JSON.stringify({
      success: true,
      synced,
      failed,
      total: countries.length,
      errors: errors.slice(0, 10)
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Sync error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to sync rates';
    return new Response(JSON.stringify({ 
      error: errorMessage 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});