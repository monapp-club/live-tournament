import { useFetchChallengeRanking } from "../../../api/hooks";
import i18n from "../../../i18n";
import PageContainer from "../../../uikit/PageContainer/PageContainer";
import ChallengeRanking from "../components/ChallengeRanking";

const StatsPage = () => {
  const { data } = useFetchChallengeRanking();
  return (
    <PageContainer title={i18n.t("navigation:stats:title")}>
      <ChallengeRanking clubs={data} />
    </PageContainer>
  );
};

export default StatsPage;
