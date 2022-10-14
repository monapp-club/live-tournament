import { useQuery } from "@tanstack/react-query";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import {
  fetchGamesByCategories,
  fetchRankingByCategory,
  fetchCategories,
} from "../api/airtable";
import { CategoryEnumType, CategoryFieldsType } from "../api/types";
import { CategoryPoolRankingType, CategoryPoolGameType } from "../types";

type RootContextType = {
  selectedCategory?: CategoryEnumType;
  selectedPool?: string;
  ranking?: CategoryPoolRankingType;
  games?: CategoryPoolGameType;
  categories?: CategoryFieldsType[];
  dayPart?: "am" | "pm";
  setSelectedCategory: (category: CategoryEnumType) => void;
  setSelectedPool: (pool?: string) => void;
  setDayPart: (dayPart: "am" | "pm") => void;
};

export const RootContext = createContext<RootContextType>({
  selectedCategory: undefined,
  selectedPool: undefined,
  ranking: undefined,
  games: undefined,
  dayPart: "am",
  setSelectedCategory: (category: string) => {},
  setSelectedPool: (pool?: string) => {},
  setDayPart: (dayPart: "am" | "pm") => {},
});

export const RootProvider = ({ children }: PropsWithChildren) => {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryEnumType>("U12 - A");
  const [selectedPool, setSelectedPool] = useState<string>();
  const [dayPart, setDayPart] = useState<"am" | "pm">("am");

  const { data: categories } = useQuery(["categories"], fetchCategories);
  const { data: ranking, refetch: refetchRanking } = useQuery(
    ["rankingByCategories", selectedCategory],
    () => fetchRankingByCategory(selectedCategory, dayPart)
  );
  const { data: games, refetch: refetchGames } = useQuery(
    ["gameByCategories", selectedCategory, selectedPool],
    () => fetchGamesByCategories(selectedCategory, dayPart)
  );

  useEffect(() => {
    if (!selectedCategory && ranking) {
      setSelectedCategory(Object.keys(ranking)[0] as CategoryEnumType);
    }
  }, [ranking, selectedCategory]);

  useEffect(() => {
    refetchRanking();
    refetchGames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayPart]);

  return (
    <RootContext.Provider
      value={{
        selectedCategory,
        selectedPool,
        ranking,
        games,
        categories,
        dayPart,
        setSelectedCategory,
        setSelectedPool,
        setDayPart,
      }}
    >
      {children}
    </RootContext.Provider>
  );
};
