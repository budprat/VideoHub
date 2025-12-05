import { useState, useCallback } from 'react';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiReturn<T, P extends any[]> extends UseApiState<T> {
  execute: (...params: P) => Promise<T | null>;
  reset: () => void;
}

export function useApi<T, P extends any[] = []>(
  apiFunction: (...params: P) => Promise<{ success: boolean; data: T; error?: string }>
): UseApiReturn<T, P> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...params: P): Promise<T | null> => {
      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const response = await apiFunction(...params);

        if (response.success) {
          setState({ data: response.data, loading: false, error: null });
          return response.data;
        } else {
          setState({ data: null, loading: false, error: response.error || 'An error occurred' });
          return null;
        }
      } catch (err) {
        const error = err instanceof Error ? err.message : 'An unexpected error occurred';
        setState({ data: null, loading: false, error });
        return null;
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

// Hook for paginated data
interface UsePaginatedApiState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  total: number;
  hasMore: boolean;
}

interface UsePaginatedApiReturn<T, P extends Record<string, any>> extends UsePaginatedApiState<T> {
  fetch: (params?: P) => Promise<void>;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  reset: () => void;
}

export function usePaginatedApi<T, P extends Record<string, any> = Record<string, never>>(
  apiFunction: (params: P & { page: number; pageSize: number }) => Promise<{
    success: boolean;
    data: {
      data: T[];
      total: number;
      page: number;
      pageSize: number;
      totalPages: number;
    };
    error?: string;
  }>,
  defaultPageSize = 10
): UsePaginatedApiReturn<T, P> {
  const [state, setState] = useState<UsePaginatedApiState<T>>({
    data: [],
    loading: false,
    error: null,
    page: 1,
    totalPages: 1,
    total: 0,
    hasMore: false,
  });

  const [params, setParams] = useState<P | null>(null);

  const fetch = useCallback(
    async (newParams?: P) => {
      const currentParams = newParams || params || ({} as P);
      setParams(currentParams);

      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const response = await apiFunction({
          ...currentParams,
          page: 1,
          pageSize: defaultPageSize,
        });

        if (response.success) {
          setState({
            data: response.data.data,
            loading: false,
            error: null,
            page: response.data.page,
            totalPages: response.data.totalPages,
            total: response.data.total,
            hasMore: response.data.page < response.data.totalPages,
          });
        } else {
          setState(prev => ({
            ...prev,
            loading: false,
            error: response.error || 'An error occurred',
          }));
        }
      } catch (err) {
        const error = err instanceof Error ? err.message : 'An unexpected error occurred';
        setState(prev => ({ ...prev, loading: false, error }));
      }
    },
    [apiFunction, defaultPageSize, params]
  );

  const loadMore = useCallback(async () => {
    if (!state.hasMore || state.loading || !params) return;

    setState(prev => ({ ...prev, loading: true }));

    try {
      const response = await apiFunction({
        ...params,
        page: state.page + 1,
        pageSize: defaultPageSize,
      });

      if (response.success) {
        setState(prev => ({
          ...prev,
          data: [...prev.data, ...response.data.data],
          loading: false,
          page: response.data.page,
          hasMore: response.data.page < response.data.totalPages,
        }));
      } else {
        setState(prev => ({
          ...prev,
          loading: false,
          error: response.error || 'An error occurred',
        }));
      }
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An unexpected error occurred';
      setState(prev => ({ ...prev, loading: false, error }));
    }
  }, [apiFunction, defaultPageSize, params, state.hasMore, state.loading, state.page]);

  const refresh = useCallback(async () => {
    await fetch(params || undefined);
  }, [fetch, params]);

  const reset = useCallback(() => {
    setState({
      data: [],
      loading: false,
      error: null,
      page: 1,
      totalPages: 1,
      total: 0,
      hasMore: false,
    });
    setParams(null);
  }, []);

  return { ...state, fetch, loadMore, refresh, reset };
}

export default useApi;
