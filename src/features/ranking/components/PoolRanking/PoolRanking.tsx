import { PoolRankingType } from "../../../../types";
import { dataRankingColumns, getDataRankingConfig } from "../../ranking.config";

interface PoolRankingProps {
  pool: PoolRankingType;
}

const PoolRanking = ({ pool }: PoolRankingProps) => {
  return (
    <div>
      <div className="flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Position
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Équipe
                    </th>
                    {dataRankingColumns.map((column) => (
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        {column}
                      </th>
                    ))}

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      PTS
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {pool.ranking.map((ranking) => {
                    const data = getDataRankingConfig(ranking);
                    return (
                      <tr key={ranking.id}>
                        {/* Position */}
                        <td className="whitespace-nowrap py-4">
                          <p className="text-blue-800 text-center text-2xl font-semibold">
                            {ranking.rank}
                          </p>
                        </td>
                        {/* Équipe */}
                        <td className="whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded object-contain"
                                src={ranking.club_logo_url[0]}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">
                                {ranking.name}
                              </div>
                              <div className="text-gray-500">
                                {ranking.pool}
                              </div>
                            </div>
                          </div>
                        </td>
                        {data.map(({ value }) => (
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <p className="text-xl font-semibold text-gray-500">
                              {value}
                            </p>
                          </td>
                        ))}

                        {/* Points */}
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <dd className="mt-1 text-3xl font-semibold tracking-tight text-blue-600">
                            {ranking.points || "0"}
                          </dd>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoolRanking;
