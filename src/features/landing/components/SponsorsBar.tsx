import { useAptabase } from "@aptabase/react";
import { SponsorsFieldsType } from "../../../api/types";

interface SponsorsBarProps {
  sponsors?: SponsorsFieldsType[];
}

const SponsorsBar = ({ sponsors }: SponsorsBarProps) => {
  const { trackEvent } = useAptabase();

  const onClickPartner = (partner: string) => {
    trackEvent("click", { screenName: "landing_page", partner });
  };

  return (
    <div className="bg-indigo-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <p className="text-base text-green-600 font-semibold tracking-wide uppercase">
            Partenaires
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mt-2 items-center">
            {sponsors?.map((sponsor, index) => (
              <a
                key={index.toString()}
                href={sponsor.external_url}
                target="_blank"
                rel="noreferrer"
                onClick={() => onClickPartner(sponsor.name)}
              >
                <img
                  className="h-20 w-20 object-contain bg-white"
                  src={sponsor.logo?.[0]?.url}
                  alt={sponsor.name}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorsBar;
