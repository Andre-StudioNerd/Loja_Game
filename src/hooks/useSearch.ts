import { useCallback, useEffect, useMemo, useState } from "react";

interface UseSearchOptions {
  initialValue?: string;
  debounceMs?: number;
  minLength?: number;
  maxLength?: number; // Adicionado para suportar isTooLong
  caseSensitive?: boolean;
  trimWhitespace?: boolean;
}

interface UseSearchResult<T> {
  searchTerm: string;
  debouncedSearchTerm: string;
  setSearchTerm: (value: string) => void;
  clearSearch: () => void;
  isSearching: boolean;
  hasSearchTerm: boolean;
  isValidSearch: boolean;
  isEmptySearch: boolean;
  isTooShort: boolean;
  isTooLong: boolean;
  isCaseSensitive: boolean;
  isTrimmed: boolean;
  searchInText: (text: string) => boolean;
  searchInArray: (array: T[], getSearchableText: (item: T) => string) => T[];
}

export const useSearch = <T = unknown>(
  options: UseSearchOptions = {},
): UseSearchResult<T> => {
  const {
    initialValue = "",
    debounceMs = 300,
    minLength = 1,
    maxLength = Infinity,
    caseSensitive = false,
    trimWhitespace = false,
  } = options;

  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchTerm, debounceMs]);

  const clearSearch = useCallback(() => {
    setSearchTerm("");
    setDebouncedSearchTerm("");
  }, []);

  const effectiveTerm = useMemo(() => {
    return trimWhitespace ? searchTerm.trim() : searchTerm;
  }, [searchTerm, trimWhitespace]);

  const isSearching = useMemo(() => {
    return searchTerm !== debouncedSearchTerm;
  }, [searchTerm, debouncedSearchTerm]);

  const hasSearchTerm = useMemo(() => {
    return effectiveTerm.length > 0;
  }, [effectiveTerm]);

  const isEmptySearch = useMemo(() => {
    return effectiveTerm.length === 0;
  }, [effectiveTerm]);

  const isTooShort = useMemo(() => {
    return hasSearchTerm && effectiveTerm.length < minLength;
  }, [effectiveTerm, minLength, hasSearchTerm]);

  const isTooLong = useMemo(() => {
    return effectiveTerm.length > maxLength;
  }, [effectiveTerm, maxLength]);

  const isValidSearch = useMemo(() => {
    return (
      effectiveTerm.length >= minLength && effectiveTerm.length <= maxLength
    );
  }, [effectiveTerm, minLength, maxLength]);

  const searchInText = useCallback(
    (text: string): boolean => {
      if (!hasSearchTerm) return true;

      const textValue = trimWhitespace ? text.trim() : text;

      if (caseSensitive) {
        return textValue.includes(effectiveTerm);
      } else {
        return textValue.toLowerCase().includes(effectiveTerm.toLowerCase());
      }
    },
    [hasSearchTerm, effectiveTerm, trimWhitespace, caseSensitive],
  );

  const searchInArray = useCallback(
    (array: T[], getSearchableText: (item: T) => string): T[] => {
      if (!hasSearchTerm) return array;
      return array.filter((item) => searchInText(getSearchableText(item)));
    },
    [hasSearchTerm, searchInText],
  );

  return {
    searchTerm,
    debouncedSearchTerm,
    setSearchTerm,
    clearSearch,
    isSearching,
    hasSearchTerm,
    isValidSearch,
    isEmptySearch,
    isTooShort,
    isTooLong,
    isCaseSensitive: caseSensitive,
    isTrimmed: trimWhitespace,
    searchInText,
    searchInArray,
  };
};
