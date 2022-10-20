import { useContext, useEffect, useState } from "react";
import { useFetchFieldGames } from "../../../api/hooks";
import { MainFieldEnumType } from "../../../api/types";
import i18n from "../../../i18n";
import { RootContext } from "../../../providers/RootProvider";
import PageContainer from "../../../uikit/PageContainer/PageContainer";
import SelectDropdown from "../../../uikit/SelectDropdown/SelectDropdown";
import FieldGames from "../components/FieldGames";
import { getFields } from "../fields.config";

const FieldsPage = () => {
  const { dayPart, fields } = useContext(RootContext);
  const [selectedField, setSelectedField] = useState<string | undefined>(
    fields?.[0].name
  );
  const fieldsConfig = getFields();
  const selectedImage = fieldsConfig?.find((field) =>
    selectedField?.includes(field.name)
  );
  const selectedChallenge = fields?.find(
    (field) => field.name === selectedField
  )?.challenge;

  const { data } = useFetchFieldGames({
    field: selectedField,
    dayPart,
  });

  useEffect(() => {
    if (fields?.length && !selectedField) {
      setSelectedField(fields?.[0].name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields]);

  return (
    <PageContainer title={i18n.t("navigation:fields:title")}>
      <div className="flex flex-row justify-between items-end">
        {/** Show field challenge label */}
        {selectedChallenge && (
          <div className="text-center text-2xl font-bold mt-4">
            {selectedChallenge}
          </div>
        )}
        {fields && (
          <SelectDropdown
            options={fields?.map((field) => field.name)}
            onSelect={(value) => setSelectedField(value as MainFieldEnumType)}
            selected={selectedField}
            placeholder={i18n.t("navigation:header:selector:field")}
            direction="left"
          />
        )}
      </div>

      <div className="pt-5 lg:grid lg:grid-cols-2 lg:gap-4">
        <div className="col-span-1">
          <img
            src={selectedImage?.image}
            alt={selectedImage?.name}
            className="w-full"
          />
        </div>
        <div className="col-span-1 pt-5 lg:pt-0">
          <FieldGames games={data} />
        </div>
      </div>
    </PageContainer>
  );
};

export default FieldsPage;
