/**
 * Blaaiz API Integration
 * Handles OAuth authentication and API calls to Blaaiz
 */

const CLIENT_ID = (import.meta as any).env.VITE_BLAAIZ_CLIENT_ID || '';
const CLIENT_SECRET = (import.meta as any).env.VITE_BLAAIZ_CLIENT_SECRET || '';
const TOKEN_URL = (import.meta as any).env.VITE_BLAAIZ_TOKEN_URL || 'https://api-dev.blaaiz.com/oauth/token';
const API_URL = (import.meta as any).env.VITE_BLAAIZ_API_URL || 'https://api-dev.blaaiz.com';

let cachedToken: { access_token: string; expires_at: number } | null = null;

/**
 * Get OAuth access token from Blaaiz
 */
export async function getBlaaizToken(): Promise<string> {
  // Return cached token if still valid
  if (cachedToken && cachedToken.expires_at > Date.now()) {
    return cachedToken.access_token;
  }

  try {
    const response = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
    });

    if (!response.ok) {
      throw new Error(`OAuth error: ${response.statusText}`);
    }

    const data = await response.json();

    // Cache the token (expires in ~1 hour)
    cachedToken = {
      access_token: data.access_token,
      expires_at: Date.now() + (data.expires_in - 300) * 1000, // Refresh 5 min before expiry
    };

    return data.access_token;
  } catch (error) {
    console.error('Failed to get Blaaiz token:', error);
    throw error;
  }
}

/**
 * Make an authenticated API request to Blaaiz
 */
async function blaaizRequest(
  endpoint: string,
  options: RequestInit = {}
): Promise<any> {
  if (!CLIENT_ID || !CLIENT_SECRET) {
    console.warn('Blaaiz credentials not configured, using demo mode');
    return null;
  }

  try {
    const token = await getBlaaizToken();

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Blaaiz API request failed: ${endpoint}`, error);
    throw error;
  }
}

/**
 * Get FX rate for a currency pair
 */
export async function getFXRate(
  fromCurrency: string,
  toCurrency: string,
  amount: number
): Promise<{ rate: number; fee: number; receiveAmount: number } | null> {
  try {
    const result = await blaaizRequest(`/v1/rates`, {
      method: 'POST',
      body: JSON.stringify({
        from_currency: fromCurrency,
        to_currency: toCurrency,
        amount,
      }),
    });

    if (!result) return null;

    return {
      rate: result.rate || 1,
      fee: result.fees?.amount || amount * 0.02,
      receiveAmount: result.you_get || amount * result.rate - (result.fees?.amount || 0),
    };
  } catch (error) {
    console.error('Failed to fetch FX rate:', error);
    return null;
  }
}

/**
 * Get supported corridors
 */
export async function getCorridors(): Promise<
  Array<{
    id: string;
    fromCurrency: string;
    toCurrency: string;
    minAmount: number;
    maxAmount: number;
    estimatedTime: string;
  }> | null
> {
  try {
    const result = await blaaizRequest(`/v1/corridors`);

    if (!result || !result.corridors) return null;

    return result.corridors.map((c: any) => ({
      id: `${c.from_currency.toLowerCase()}-${c.to_currency.toLowerCase()}`,
      fromCurrency: c.from_currency,
      toCurrency: c.to_currency,
      minAmount: c.min_amount || 10,
      maxAmount: c.max_amount || 100000,
      estimatedTime: c.estimated_time || '5-15 minutes',
    }));
  } catch (error) {
    console.error('Failed to fetch corridors:', error);
    return null;
  }
}

/**
 * Create a new payout
 */
export async function createPayout(payload: {
  senderName: string;
  senderEmail: string;
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  recipientName: string;
  recipientAccount?: string;
}): Promise<{ id: string; status: string } | null> {
  try {
    const result = await blaaizRequest(`/v1/payouts`, {
      method: 'POST',
      body: JSON.stringify({
        sender_name: payload.senderName,
        sender_email: payload.senderEmail,
        from_currency: payload.fromCurrency,
        to_currency: payload.toCurrency,
        amount: payload.amount,
        recipient_name: payload.recipientName,
        recipient_account: payload.recipientAccount,
      }),
    });

    if (!result) return null;

    return {
      id: result.payout_id || result.id,
      status: result.status || 'confirmed',
    };
  } catch (error) {
    console.error('Failed to create payout:', error);
    return null;
  }
}

/**
 * Get payout status
 */
export async function getPayoutStatus(payoutId: string): Promise<
  { status: string; amount: number; receiveAmount: number } | null
> {
  try {
    const result = await blaaizRequest(`/v1/payouts/${payoutId}`);

    if (!result) return null;

    return {
      status: result.status || 'processing',
      amount: result.amount || 0,
      receiveAmount: result.you_get || 0,
    };
  } catch (error) {
    console.error('Failed to fetch payout status:', error);
    return null;
  }
}

/**
 * Check if Blaaiz is configured
 */
export function isBlaaizConfigured(): boolean {
  return !!(CLIENT_ID && CLIENT_SECRET);
}
