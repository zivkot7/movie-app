import { useMemo } from "react";

type CachedData = {
  status: string;
  data: {
    results: any;
  };
};

const useSortedData = (
  cachedData: CachedData | undefined,
  sortOption: string
): any => {
  const sortedData = useMemo(() => {
    if (!cachedData || !cachedData.data) return [];

    let results = [...cachedData.data.results];

    if (sortOption === "movie") {
      results.sort((a, b) => (a.media_type === "movie" ? -1 : 1));
    } else if (sortOption === "tv") {
      results.sort((a, b) => (a.media_type === "tv" ? -1 : 1));
    } else if (sortOption === "year-asc") {
      results.sort((a, b) => {
        const dateA = new Date(a.release_date || a.first_air_date);
        const dateB = new Date(b.release_date || b.first_air_date);
        return dateA.getTime() - dateB.getTime();
      });
    } else if (sortOption === "year-desc") {
      results.sort((a, b) => {
        const dateA = new Date(a.release_date || a.first_air_date);
        const dateB = new Date(b.release_date || b.first_air_date);
        return dateB.getTime() - dateA.getTime();
      });
    }

    return results;
  }, [cachedData, sortOption]);

  return sortedData;
};

export default useSortedData;
