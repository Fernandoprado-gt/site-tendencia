
/**
 * Meta Conversions API integration utilities
 * These functions handle API calls and data preparation for Meta Pixel events
 */

// SHA-256 hashing function for secure data transmission
async function hashData(input: string): Promise<string> {
  if (!input) return '';
  
  // Convert the string to an ArrayBuffer
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  
  // Hash the data using SHA-256
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
  // Convert the ArrayBuffer to a hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashedValue = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashedValue;
}

// Normalize and extract first name from full name
function extractFirstName(fullName: string): string {
  if (!fullName) return '';
  
  // Remove extra spaces and get the first part of the name
  return fullName.trim().split(' ')[0].toLowerCase();
}

// Constants for Conversions API
const PIXEL_ID = '1192081965630021'; // Using the Meta Pixel ID from your index.html
const API_VERSION = 'v19.0';
const API_ENDPOINT = `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events`;

// Generate event data according to Conversions API format
interface UserData {
  em?: string[]; // Hashed email
  ph?: string[]; // Hashed phone
  fn?: string[]; // Hashed first name
}

interface EventData {
  event_name: string;
  event_time: number;
  action_source: string;
  user_data: UserData;
  custom_data?: {
    lead_status?: string;
    origem?: string;
    [key: string]: any;
  };
}

/**
 * Send event to Meta Conversions API
 * @param accessToken - API access token
 * @param eventData - Prepared event data object
 * @returns Promise with API response
 */
async function sendEventToConversionsAPI(accessToken: string, eventData: EventData[]): Promise<any> {
  if (!accessToken) {
    console.error('Meta Conversions API: No access token provided');
    return null;
  }

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: eventData,
        access_token: accessToken,
        test_event_code: process.env.NODE_ENV === 'development' ? 'TEST12345' : undefined, // Optional test event code
      }),
    });

    const responseData = await response.json();
    
    if (!response.ok) {
      throw new Error(`Meta Conversions API Error: ${JSON.stringify(responseData)}`);
    }
    
    console.log('Meta Conversions API event sent successfully:', responseData);
    return responseData;
  } catch (error) {
    console.error('Failed to send event to Meta Conversions API:', error);
    return null;
  }
}

/**
 * Track form submission lead event with Meta Conversions API and standard Pixel
 * @param formData - User form data (name, email, phone)
 * @param accessToken - Meta API access token
 */
export async function trackFormLeadEvent(
  formData: { name: string; email: string; phone: string }, 
  accessToken: string
): Promise<void> {
  try {
    // Track with browser Pixel (client-side)
    if (window.fbq) {
      try {
        window.fbq('track', 'Lead', {
          content_name: 'form_submission',
          lead_status: 'cadastrado_completo',
          origem: 'formulario_landing_page'
        });
        console.log("FB Pixel: Lead event triggered from form submission");
      } catch (err) {
        console.error("FB Pixel tracking error:", err);
      }
    }
    
    // Early return if no access token (will still use client-side Pixel)
    if (!accessToken) {
      console.warn('Meta Conversions API: No access token provided. Using only client-side Pixel tracking.');
      return;
    }

    // Prepare hashed user data for secure transmission
    const hashedEmail = await hashData(formData.email.trim().toLowerCase());
    const hashedPhone = await hashData(formData.phone.replace(/\D/g, ''));
    const hashedFirstName = await hashData(extractFirstName(formData.name));
    
    const eventTime = Math.floor(Date.now() / 1000);
    
    const eventData: EventData[] = [
      {
        event_name: 'Lead',
        event_time: eventTime,
        action_source: 'website',
        user_data: {
          em: hashedEmail ? [hashedEmail] : undefined,
          ph: hashedPhone ? [hashedPhone] : undefined,
          fn: hashedFirstName ? [hashedFirstName] : undefined,
        },
        custom_data: {
          lead_status: 'cadastrado_completo',
          origem: 'formulario_landing_page',
        }
      }
    ];
    
    // Send to Conversions API
    await sendEventToConversionsAPI(accessToken, eventData);
    
  } catch (error) {
    console.error('Error tracking form lead event:', error);
  }
}

/**
 * Track WhatsApp button click lead event
 * @param userEmail - User email if available (optional)
 * @param accessToken - Meta API access token 
 */
export async function trackWhatsAppLeadEvent(
  userEmail: string | null,
  accessToken: string
): Promise<void> {
  try {
    // Track with browser Pixel (client-side)
    if (window.fbq) {
      try {
        window.fbq('track', 'Lead', {
          content_name: 'whatsapp_click',
          lead_status: 'clicou_whatsapp',
          origem: 'botao_whatsapp_lp'
        });
        console.log("FB Pixel: Lead event triggered from WhatsApp button click");
      } catch (err) {
        console.error("FB Pixel tracking error:", err);
      }
    }
    
    // Early return if no access token (will still use client-side Pixel)
    if (!accessToken) {
      console.warn('Meta Conversions API: No access token provided. Using only client-side Pixel tracking.');
      return;
    }
    
    const eventTime = Math.floor(Date.now() / 1000);
    
    // Prepare user data (only email if available)
    const userData: UserData = {};
    
    if (userEmail) {
      const hashedEmail = await hashData(userEmail.trim().toLowerCase());
      if (hashedEmail) {
        userData.em = [hashedEmail];
      }
    }
    
    const eventData: EventData[] = [
      {
        event_name: 'Lead',
        event_time: eventTime,
        action_source: 'website',
        user_data: userData,
        custom_data: {
          lead_status: 'clicou_whatsapp',
          origem: 'botao_whatsapp_lp',
        }
      }
    ];
    
    // Send to Conversions API
    await sendEventToConversionsAPI(accessToken, eventData);
    
  } catch (error) {
    console.error('Error tracking WhatsApp lead event:', error);
  }
}
