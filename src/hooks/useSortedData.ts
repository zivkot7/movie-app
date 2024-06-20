import { useMemo } from "react";

interface MediaItem {
  id: number;
  media_type: "movie" | "tv";
  release_date?: string;
  first_air_date?: string;
  // Add other necessary properties here
}

interface CachedData {
  status: string;
  data: {
    results: MediaItem[];
  };
}

const useSortedData = (
  cachedData: CachedData | undefined,
  sortOption: string
): MediaItem[] => {
  const sortedData = useMemo(() => {
    if (!cachedData || !cachedData.data || !cachedData.data.results) return [];

    let results = [...cachedData.data.results];

    if (sortOption === "movie") {
      results.sort((a, b) => (a.media_type === "movie" ? -1 : 1));
    } else if (sortOption === "tv") {
      results.sort((a, b) => (a.media_type === "tv" ? -1 : 1));
    } else if (sortOption === "year-asc") {
      results.sort((a, b) => {
        const dateA = new Date(a.release_date || a.first_air_date || "");
        const dateB = new Date(b.release_date || b.first_air_date || "");
        return dateA.getTime() - dateB.getTime();
      });
    } else if (sortOption === "year-desc") {
      results.sort((a, b) => {
        const dateA = new Date(a.release_date || a.first_air_date || "");
        const dateB = new Date(b.release_date || b.first_air_date || "");
        return dateB.getTime() - dateA.getTime();
      });
    }

    return results;
  }, [cachedData, sortOption]);

  return sortedData;
};

export default useSortedData;
