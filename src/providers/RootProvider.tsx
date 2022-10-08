import { useQuery } from "@tanstack/react-query";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import {
  fetchGamesByCategories,
  fetchFixtureByCategory,
  fetchCategories,
} from "../api/airtable";
import { CategoryEnumType, CategoryFieldsType } from "../api/types";
import { CategoryPoolFixtureType, CategoryPoolGameType } from "../types";

type RootContextType = {
  selectedCategory?: CategoryEnumType;
  selectedPool?: string;
  fixtures?: CategoryPoolFixtureType;
  games?: CategoryPoolGameType;
  categories?: CategoryFieldsType[];
  setSelectedCategory: (category: CategoryEnumType) => void;
  setSelectedPool: (pool?: string) => void;
};

export const RootContext = createContext<RootContextType>({
  selectedCategory: undefined,
  selectedPool: undefined,
  fixtures: undefined,
  games: undefined,
  setSelectedCategory: (category: string) => {},
  setSelectedPool: (pool?: string) => {},
});

export const RootProvider = ({ children }: PropsWithChildren) => {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryEnumType>("U12 - A");
  const [selectedPool, setSelectedPool] = useState<string>();

  const { data: categories } = useQuery(["categories"], fetchCategories);
  const { data: fixtures } = useQuery(
    ["fixtureByCategories", selectedCategory],
    () => fetchFixtureByCategory(selectedCategory)
  );
  const { data: games } = useQuery(
    ["gameByCategories", selectedCategory, selectedPool],
    () => fetchGamesByCategories(selectedCategory)
  );

  useEffect(() => {
    if (!selectedCategory && fixtures) {
      setSelectedCategory(Object.keys(fixtures)[0] as CategoryEnumType);
    }
  }, [fixtures, selectedCategory]);

  return (
    <RootContext.Provider
      value={{
        selectedCategory,
        selectedPool,
        fixtures,
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
