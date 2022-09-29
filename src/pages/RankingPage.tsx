import pools from "../api/pools";
import Header from "../components/Header/Header";
import PoolRanking from "../components/PoolRanking/PoolRanking";
import TagLabel from "../components/TagLabel/TagLabel";

const RankingPage = () => {
  return (
    <div>
      <Header />
      <h1>Classement</h1>
      <TagLabel>{"Poule 1"}</TagLabel>
      <PoolRanking pool={pools[0]} />
    </div>
  );
};

export default RankingPage;
