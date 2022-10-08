import { useContext } from "react";
import { CategoryEnumType } from "../../../api/types";
import PoolFixtureGrid from "../components/PoolFixtureGrid/PoolFixtureGrid";
import i18n from "../../../i18n";
import { RootContext } from "../../../providers/RootProvider";
import PageContainer from "../../../uikit/PageContainer/PageContainer";

const FixturePage = () => {
  const { selectedCategory, fixtures } = useContext(RootContext);

  return (
    <PageContainer title={i18n.t("navigation:ranking:title")}>
      <PoolFixtureGrid
        pools={fixtures?.[selectedCategory as CategoryEnumType]}
      />
    </PageContainer>
  );
};

export default FixturePage;
