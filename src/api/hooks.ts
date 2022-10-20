import { useQuery } from "@tanstack/react-query";
import {
  fetchCategories,
  fetchChallengeRanking,
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
  useQuery(["rankingByCategories", selectedCategory, dayPart], () =>
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
  useQuery(["gameByCategories", selectedCategory, selectedPool, dayPart], () =>
    fetchGamesByCategories(selectedCategory, dayPart)
  );

export const useFetchChallengeRanking = () =>
  useQuery(["challengeRanking"], fetchChallengeRanking);

export const useFetchFields = () => useQuery(["fields"], fetchFields);

export const useFetchFieldGames = ({
  field,
  dayPart = "am",
}: {
  field?: string;
  dayPart?: "am" | "pm";
}) =>
  useQuery(["fieldGames", { field, dayPart }], () =>
    fetchFieldGames({ field, dayPart })
  );
