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
  setSelectedCategory: (category: CategoryEnumType) => void;
  setSelectedPool: (pool?: string) => void;
};

export const RootContext = createContext<RootContextType>({
  selectedCategory: undefined,
  selectedPool: undefined,
  ranking: undefined,
  games: undefined,
  setSelectedCategory: (category: string) => {},
  setSelectedPool: (pool?: string) => {},
});

export const RootProvider = ({ children }: PropsWithChildren) => {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryEnumType>("U12 - A");
  const [selectedPool, setSelectedPool] = useState<string>();

  const { data: categories } = useQuery(["categories"], fetchCategories);
  const { data: ranking } = useQuery(
    ["rankingByCategories", selectedCategory],
    () => fetchRankingByCategory(selectedCategory)
  );
  const { data: games } = useQuery(
    ["gameByCategories", selectedCategory, selectedPool],
    () => fetchGamesByCategories(selectedCategory)
  );

  useEffect(() => {
    if (!selectedCategory && ranking) {
      setSelectedCategory(Object.keys(ranking)[0] as CategoryEnumType);
    }
  }, [ranking, selectedCategory]);

  return (
    <RootContext.Provider
      value={{
        selectedCategory,
        selectedPool,
        ranking,
        games,
        categories,
        setSelectedCategory,
        setSelectedPool,
      }}
    >
      {children}
    </RootContext.Provider>
  );
};
