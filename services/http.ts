const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Get auth token from localStorage or window
function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  
  // Check window first (for immediate use after login)
  if ((window as any).__authToken) {
    return (window as any).__authToken;
  }
  
  // Fallback to localStorage
  return localStorage.getItem("auth_token");
}

export async function http<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  const isFormData = options.body instanceof FormData;

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> || {}),
  };

  if (!isFormData && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  console.log("🚀 HTTP REQUEST");
  console.log("URL:", `${BASE_URL}${url}`);
  console.log("Method:", options.method || "GET");
  console.log("Headers:", headers);

  if (options.body instanceof FormData) {
    console.log("Body: FormData");
    for (const pair of options.body.entries()) {
      console.log(`FD → ${pair[0]}:`, pair[1]);
    }
  } else {
    console.log("Body:", options.body);
  }

  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  });

  const rawText = await res.text();

  console.log("⬅️ HTTP RESPONSE");
  console.log("Status:", res.status);
  // console.log("Raw Response:", rawText);

  if (!res.ok) {
    throw new Error(rawText || `HTTP ${res.status}`);
  }

  try {
    return JSON.parse(rawText);
  } catch {
    throw new Error("Response is not JSON: " + rawText);
  }
}


