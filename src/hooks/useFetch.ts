import { useState, useCallback } from "react";

interface UseFetchOptions {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"; // Opcional
  body?: unknown;
}

interface UseFetchResult<T> {
  data: T | null;
  error: Error | null;
  status: number | null;
  fetchData: () => Promise<void>;
}

export const useFetch = <T>({
  url,
  method = "GET",
  body,
}: UseFetchOptions): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<number | null>(null);

  const fetchData = useCallback(async () => {
    setError(null); // Limpa erros anteriores ao tentar novamente
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      setStatus(response.status);

      if (!response.ok) {
        throw new Error(`Erro na requisição: Status ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err as Error);
    }
  }, [url, method, body]);

  return { data, error, status, fetchData };
};
