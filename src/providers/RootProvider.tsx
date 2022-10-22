import { createContext, PropsWithChildren, useEffect, useState } from "react";
import {
  useFetchCategories,
  useFetchFields,
  useFetchGameByCategoryByPool,
  useFetchRankingByCategory,
} from "../api/hooks";
import {
  CategoryEnumType,
  CategoryFieldsType,
  FieldsFieldsType,
} from "../api/types";
import { CategoryPoolRankingType, CategoryPoolGameType } from "../types";

type RootContextType = {
  selectedCategory?: CategoryEnumType;
  selectedPool?: string;
  ranking?: CategoryPoolRankingType;
  games?: CategoryPoolGameType;
  categories?: CategoryFieldsType[];
  dayPart?: "am" | "pm";
  fields?: FieldsFieldsType[];
  setSelectedCategory: (category: CategoryEnumType) => void;
  setSelectedPool: (pool?: string) => void;
  setDayPart: (dayPart: "am" | "pm") => void;
};

export const RootContext = createContext<RootContextType>({
  selectedCategory: undefined,
  selectedPool: undefined,
  ranking: undefined,
  games: undefined,
  dayPart: "pm",
  fields: undefined,
  setSelectedCategory: (category: string) => {},
  setSelectedPool: (pool?: string) => {},
  setDayPart: (dayPart: "am" | "pm") => {},
});

export const RootProvider = ({ children }: PropsWithChildren) => {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryEnumType>("U12 - A");
  const [selectedPool, setSelectedPool] = useState<string>();
  const [dayPart, setDayPart] = useState<"am" | "pm">("am");

  const { data: categories } = useFetchCategories();
  const { data: ranking, refetch: refetchRanking } = useFetchRankingByCategory({
    selectedCategory,
    dayPart,
  });
  const { data: games, refetch: refetchGames } = useFetchGameByCategoryByPool({
    selectedCategory,
    selectedPool,
    dayPart,
  });
  const { data: fields } = useFetchFields();

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
        fields,
        setSelectedCategory,
        setSelectedPool,
        setDayPart,
      }}
    >
      {children}
    </RootContext.Provider>
  );
};
