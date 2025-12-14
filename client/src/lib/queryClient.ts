import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

// Function overloads to support both patterns
export async function apiRequest(
  method: string,
  url: string,
  data?: unknown
): Promise<Response>;

export async function apiRequest(
  url: string,
  options?: {
    method?: string;
    body?: string;
    headers?: Record<string, string>;
  }
): Promise<any>;

export async function apiRequest(
  methodOrUrl: string,
  urlOrOptions?: string | {
    method?: string;
    body?: string;
    headers?: Record<string, string>;
  },
  data?: unknown
): Promise<any> {
  let method: string;
  let url: string;
  let requestData: unknown;
  let returnJson = true;

  // Check if first parameter looks like HTTP method (legacy pattern)
  if (typeof urlOrOptions === 'string' && 
      ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].includes(methodOrUrl.toUpperCase())) {
    // Legacy pattern: apiRequest(method, url, data)
    method = methodOrUrl;
    url = urlOrOptions;
    requestData = data;
    returnJson = false; // Legacy expects Response object
  } else {
    // New pattern: apiRequest(url, options)
    url = methodOrUrl;
    const options = urlOrOptions as { method?: string; body?: string; headers?: Record<string, string>; } | undefined;
    method = options?.method || 'GET';
    requestData = options?.body;
  }

  const res = await fetch(url, {
    method,
    headers: {
      ...(requestData ? { "Content-Type": "application/json" } : {}),
      ...(typeof urlOrOptions === 'object' && urlOrOptions?.headers ? urlOrOptions.headers : {})
    },
    body: requestData ? (typeof requestData === 'string' ? requestData : JSON.stringify(requestData)) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  
  if (returnJson) {
    return await res.json();
  }
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey[0] as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes cache for better performance
      retry: 1, // Retry once for network issues
      retryDelay: 1000, // 1 second delay between retries
      gcTime: 10 * 60 * 1000, // 10 minutes garbage collection
    },
    mutations: {
      retry: 1,
      retryDelay: 1000,
    },
  },
});
