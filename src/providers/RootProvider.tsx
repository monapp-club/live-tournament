import { useQuery } from "@tanstack/react-query";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import {
  fetchGamesByCategories,
  fetchRankingByCategories,
} from "../api/airtable";
import { CategoryEnumType } from "../api/types";
import { CategoryPoolGameType, CategoryPoolRankingType } from "../types";

type RootContextType = {
  selectedCategory?: CategoryEnumType;
  selectedPool?: string;
  categories?: CategoryPoolRankingType;
  games?: CategoryPoolGameType;
  setSelectedCategory: (category: CategoryEnumType) => void;
  setSelectedPool: (pool?: string) => void;
};

export const RootContext = createContext<RootContextType>({
  selectedCategory: undefined,
  selectedPool: undefined,
  categories: undefined,
  games: undefined,
  setSelectedCategory: (category: string) => {},
  setSelectedPool: (pool?: string) => {},
});

export const RootProvider = ({ children }: PropsWithChildren) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryEnumType>();
  const [selectedPool, setSelectedPool] = useState<string>();

  const { data: categories } = useQuery(
    ["poolByCategories"],
    fetchRankingByCategories
  );
  const { data: games } = useQuery(
    ["gameByCategories"],
    fetchGamesByCategories
  );

  useEffect(() => {
    if (!selectedCategory && categories) {
      setSelectedCategory(Object.keys(categories)[0] as CategoryEnumType);
    }
  }, [categories, selectedCategory]);

  return (
    <RootContext.Provider
      value={{
        selectedCategory,
        selectedPool,
        categories,
        games,
        setSelectedCategory,
        setSelectedPool,
      }}
    >
      {children}
    </RootContext.Provider>
  );
};
