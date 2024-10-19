import { useAptabase } from "@aptabase/react";
import { useFetchChallengeRanking } from "../../../api/hooks";
import i18n from "../../../i18n";
import PageContainer from "../../../uikit/PageContainer/PageContainer";
import ChallengeRanking from "../components/ChallengeRanking";
import { useEffect } from "react";

const StatsPage = () => {
  const { data } = useFetchChallengeRanking();
  const { trackEvent } = useAptabase();

  useEffect(() => {
    trackEvent("page_view", { screenName: "stats_page" });
  }, [trackEvent]);

  return (
    <PageContainer title={i18n.t("navigation:stats:title")}>
      <ChallengeRanking clubs={data} />
    </PageContainer>
  );
};

export default StatsPage;
