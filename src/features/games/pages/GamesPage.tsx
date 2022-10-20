import { useContext } from "react";
import { CategoryEnumType } from "../../../api/types";
import i18n from "../../../i18n";
import { RootContext } from "../../../providers/RootProvider";
import PageContainer from "../../../uikit/PageContainer/PageContainer";
import PoolGameList from "../components/PoolGamesList/PoolGamesList";

const GamesPage = () => {
  const { selectedCategory, games, selectedPool } = useContext(RootContext);
  return (
    <PageContainer title={i18n.t("navigation:games:title")}>
      <PoolGameList
        selectedPool={selectedPool}
        pools={games?.[selectedCategory as CategoryEnumType]}
      />
    </PageContainer>
  );
};

export default GamesPage;
