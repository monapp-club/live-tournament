import { ChallengeFieldsType } from "../../../api/types";

interface ChallengeRankingProps {
  clubs?: ChallengeFieldsType[];
}

const ChallengeRanking = ({ clubs }: ChallengeRankingProps) => {
  return (
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
                    Club
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    ESSAIS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {clubs?.map((club, index) => {
                  return (
                    <tr key={club.id}>
                      {/* Position */}
                      <td className="whitespace-nowrap py-4">
                        <p className="text-blue-800 text-center text-2xl font-semibold">
                          {String(index + 1)}
                        </p>
                      </td>
                      {/* Équipe */}
                      <td className="whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded object-contain"
                              src={club.club_logo?.[0]?.url}
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">
                              {club.name}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Points */}
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-blue-600">
                          {club.total_tries || "0"}
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
  );
};

export default ChallengeRanking;
