let currentBaseUrl = (
  process.env.EXPO_PUBLIC_API_URL || 'http://20.5.23.2:3000'
).replace(/\/$/, '');

export function getBaseUrl() {
  return currentBaseUrl;
}

export function setBaseUrl(newUrl) {
  if (!newUrl) return;
  let formatted = String(newUrl).trim().replace(/\/$/, '');
  if (!formatted.startsWith('http://') && !formatted.startsWith('https://')) {
    formatted = `http://${formatted}`;
  }
  currentBaseUrl = formatted;
  return currentBaseUrl;
}

export async function checkHealth(url) {
  const targetUrl = (url || currentBaseUrl).replace(/\/$/, '');
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4000);
  try {
    const res = await fetch(`${targetUrl}/pengeluaran`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Bypass-Tunnel-Reminder': 'true',
        'bypass-tunnel-reminder': 'true',
      },
      signal: controller.signal,
    });
    return res.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

export async function request(path, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 6000);
  const activeUrl = currentBaseUrl;

  try {
    const response = await fetch(`${activeUrl}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Bypass-Tunnel-Reminder': 'true',
        'bypass-tunnel-reminder': 'true',
        ...(options.headers || {}),
      },
      signal: controller.signal,
    });

    if (response.status === 204) return null;

    const raw = await response.text();
    let data;
    try {
      data = raw ? JSON.parse(raw) : null;
    } catch {
      throw new Error(`Respons bukan JSON (${response.status})`);
    }

    if (!response.ok) {
      const error = new Error(data?.pesan || `HTTP ${response.status}`);
      error.status = response.status;
      throw error;
    }
    return data;
  } catch (error) {
    if (
      error.name === 'AbortError' ||
      error.message?.includes('canceled') ||
      error.message?.includes('Network request failed') ||
      error.message?.includes('fetch failed')
    ) {
      throw new Error(
        `Tidak dapat terhubung ke server (${activeUrl}). Pastikan backend aktif dan HP berada di jaringan yang sama.`
      );
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

export const api = {
  getBaseUrl,
  setBaseUrl,
  checkHealth,
  list: () => request('/pengeluaran'),
  detail: (id) => request(`/pengeluaran/${id}`),
  categories: () => request('/kategori'),
  create: (body) =>
    request('/pengeluaran', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  update: (id, body) =>
    request(`/pengeluaran/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),
  remove: (id) => request(`/pengeluaran/${id}`, { method: 'DELETE' }),
};