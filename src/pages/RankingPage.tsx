import { useQuery } from "@tanstack/react-query";
import { fetchPools } from "../api/airtable";
import Header from "../components/Header/Header";
import PoolRankingGrid from "../components/PoolRankingGrid/PoolRankingGrid";

const RankingPage = () => {
  const { data } = useQuery(["pools"], fetchPools);
  return (
    <div>
      <Header />
      <PoolRankingGrid pools={data} />
    </div>
  );
};

export default RankingPage;
