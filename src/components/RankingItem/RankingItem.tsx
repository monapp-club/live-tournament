import { TeamsFieldsType } from "../../api/types";
import "./RankingItem.css";

interface RankingItemProps {
  ranking: TeamsFieldsType;
}

const RankingItem = ({ ranking }: RankingItemProps) => {
  return (
    <tr>
      <td className="start">
        <p className="rank">{ranking.rank}</p>
      </td>
      <td>
        <img src={ranking.logo} alt={ranking.name} />
      </td>
      <td className="name">
        <p>{ranking.name}</p>
      </td>
      <td>
        <p>{ranking.points}</p>
      </td>
    </tr>
  );
};

export default RankingItem;
