import seriesData from "../data/stm-series.json";

export type StmSeriesEntry = {
  slug: string;
  title: string;
  description: string;
  section: string;
};

export const STM_SERIES_INDEX = seriesData.index;
export const STM_SERIES = seriesData.posts as StmSeriesEntry[];

export function getStmSeriesPosition(slug: string) {
  if (slug === STM_SERIES_INDEX.slug) {
    return {
      index: -1,
      entry: null,
      previous: null,
      next: STM_SERIES[0] ?? null,
    };
  }

  const index = STM_SERIES.findIndex(entry => entry.slug === slug);
  if (index === -1) return null;

  return {
    index,
    entry: STM_SERIES[index],
    previous: index > 0 ? STM_SERIES[index - 1] : STM_SERIES_INDEX,
    next: index < STM_SERIES.length - 1 ? STM_SERIES[index + 1] : null,
  };
}

export function isStmSeriesPost(slug: string) {
  return (
    slug === STM_SERIES_INDEX.slug ||
    STM_SERIES.some(entry => entry.slug === slug)
  );
}
