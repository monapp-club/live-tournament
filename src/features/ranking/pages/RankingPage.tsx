import { useContext } from "react";
import { CategoryEnumType } from "../../../api/types";
import PoolRankingGrid from "../components/PoolRankingGrid/PoolRankingGrid";
import i18n from "../../../i18n";
import { RootContext } from "../../../providers/RootProvider";
import PageContainer from "../../../uikit/PageContainer/PageContainer";

const RankingPage = () => {
  const { selectedCategory, ranking } = useContext(RootContext);

  return (
    <PageContainer title={i18n.t("navigation:ranking:title")}>
      <PoolRankingGrid
        pools={ranking?.[selectedCategory as CategoryEnumType]}
      />
    </PageContainer>
  );
};

export default RankingPage;
