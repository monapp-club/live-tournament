import { TeamRanking } from "../../types";
import "./RankingItem.css";

interface RankingItemProps {
  ranking: TeamRanking;
}

const RankingItem = ({ ranking }: RankingItemProps) => {
  return (
    <tr className="ranking-item">
      <td>
        <p>{ranking.ranking}</p>
      </td>
      <td>
        <img src={ranking.logo} alt={ranking.name} />
      </td>
      <td>
        <p>{ranking.name}</p>
      </td>
    </tr>
  );
};

export default RankingItem;
