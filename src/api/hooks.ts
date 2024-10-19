import { useQuery } from "@tanstack/react-query";
import {
  fetchCategories,
  fetchChallengeRanking,
  fetchFeatureFlags,
  fetchFieldGames,
  fetchFields,
  fetchGamesByCategories,
  fetchRankingByCategory,
  fetchSponsors,
} from "./airtable";
import { CategoryEnumType } from "./types";

export const useFetchSponsors = () => useQuery(["sponsors"], fetchSponsors);

export const useFetchCategories = () =>
  useQuery(["categories"], fetchCategories);

export const useFetchRankingByCategory = ({
  selectedCategory,
  dayPart,
}: {
  selectedCategory: CategoryEnumType;
  dayPart: "am" | "pm";
}) =>
  useQuery(["ranking-by-categories", selectedCategory, dayPart], () =>
    fetchRankingByCategory(selectedCategory, dayPart)
  );

export const useFetchGameByCategoryByPool = ({
  selectedCategory,
  selectedPool,
  dayPart,
}: {
  selectedCategory: CategoryEnumType;
  selectedPool?: string;
  dayPart: "am" | "pm";
}) =>
  useQuery(
    ["game-by-categories", selectedCategory, selectedPool, dayPart],
    () => fetchGamesByCategories(selectedCategory, dayPart)
  );

export const useFetchChallengeRanking = () =>
  useQuery(["challenge-ranking"], fetchChallengeRanking);

export const useFetchFields = () => useQuery(["fields"], fetchFields);

export const useFetchFieldGames = ({
  field,
  dayPart = "am",
}: {
  field?: string;
  dayPart?: "am" | "pm";
}) =>
  useQuery(
    ["field-games", { field, dayPart }],
    () => fetchFieldGames({ field, dayPart }),
    {
      staleTime: 30 * 1000,
    }
  );

export const useFetchFeatureFlags = () =>
  useQuery(["feature-flags"], fetchFeatureFlags);
