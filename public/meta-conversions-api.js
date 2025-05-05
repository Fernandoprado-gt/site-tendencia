
/**
 * Meta Conversions API Integration
 * Standalone script for direct HTML embedding
 * 
 * Usage:
 * 1. Add this script to your HTML
 * 2. Call window.metaConversionsApi.trackFormLead() or window.metaConversionsApi.trackWhatsAppLead()
 */

(function() {
  // Meta API Configuration - REPLACE WITH YOUR VALUES
  const META_PIXEL_ID = '1192081965630021';
  const META_ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN_HERE';
  const API_VERSION = 'v19.0';
  
  // Hash function for secure data transmission
  async function hashData(input) {
    if (!input) return '';
    
    try {
      // Convert the string to an ArrayBuffer
      const encoder = new TextEncoder();
      const data = encoder.encode(input);
      
      // Hash the data using SHA-256
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      
      // Convert the ArrayBuffer to a hex string
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashedValue = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      return hashedValue;
    } catch (error) {
      console.error('Error hashing data:', error);
      return '';
    }
  }
  
  // Send event to Meta Conversions API
  async function sendToConversionsApi(eventData) {
    try {
      const apiEndpoint = `https://graph.facebook.com/${API_VERSION}/${META_PIXEL_ID}/events`;
      
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: eventData,
          access_token: META_ACCESS_TOKEN,
          // Test event code for testing in development
          test_event_code: window.location.hostname === 'localhost' ? 'TEST12345' : undefined,
        }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(`API Error: ${JSON.stringify(result)}`);
      }
      
      console.log('Meta Conversions API event sent successfully:', result);
      return true;
    } catch (error) {
      console.error('Failed to send to Meta Conversions API:', error);
      return false;
    }
  }
  
  // Track form submission lead
  async function trackFormLead(userData) {
    try {
      // Standard Pixel tracking
      if (window.fbq) {
        window.fbq('track', 'Lead', {
          content_name: 'form_submission',
          lead_status: 'cadastrado_completo',
          origem: 'formulario_landing_page'
        });
      }
      
      // Early return if access token is not set
      if (!META_ACCESS_TOKEN || META_ACCESS_TOKEN === 'YOUR_ACCESS_TOKEN_HERE') {
        console.warn('Meta Conversions API: Access token not configured');
        return false;
      }
      
      // Hash user data
      const hashedEmail = userData.email ? await hashData(userData.email.trim().toLowerCase()) : '';
      const hashedPhone = userData.phone ? await hashData(userData.phone.replace(/\D/g, '')) : '';
      
      let hashedFirstName = '';
      if (userData.name) {
        const firstName = userData.name.trim().split(' ')[0].toLowerCase();
        hashedFirstName = await hashData(firstName);
      }
      
      const eventTime = Math.floor(Date.now() / 1000);
      
      const eventData = [{
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
      }];
      
      return await sendToConversionsApi(eventData);
    } catch (error) {
      console.error('Error tracking form lead:', error);
      return false;
    }
  }
  
  // Track WhatsApp button click
  async function trackWhatsAppLead(userEmail) {
    try {
      // Standard Pixel tracking
      if (window.fbq) {
        window.fbq('track', 'Lead', {
          content_name: 'whatsapp_click',
          lead_status: 'clicou_whatsapp',
          origem: 'botao_whatsapp_lp'
        });
      }
      
      // Early return if access token is not set
      if (!META_ACCESS_TOKEN || META_ACCESS_TOKEN === 'YOUR_ACCESS_TOKEN_HERE') {
        console.warn('Meta Conversions API: Access token not configured');
        return false;
      }
      
      const eventTime = Math.floor(Date.now() / 1000);
      
      // Prepare user data object
      const userData = {};
      
      // Add hashed email if available
      if (userEmail) {
        const hashedEmail = await hashData(userEmail.trim().toLowerCase());
        if (hashedEmail) {
          userData.em = [hashedEmail];
        }
      }
      
      const eventData = [{
        event_name: 'Lead',
        event_time: eventTime,
        action_source: 'website',
        user_data: userData,
        custom_data: {
          lead_status: 'clicou_whatsapp',
          origem: 'botao_whatsapp_lp',
        }
      }];
      
      return await sendToConversionsApi(eventData);
    } catch (error) {
      console.error('Error tracking WhatsApp lead:', error);
      return false;
    }
  }
  
  // Expose the functions to the global scope
  window.metaConversionsApi = {
    trackFormLead: trackFormLead,
    trackWhatsAppLead: trackWhatsAppLead
  };
  
  console.log('Meta Conversions API script loaded successfully');
})();
