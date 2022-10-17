import { TeamsFieldsType } from "../../api/types";

export const dataRankingColumns = ["J", "G", "N", "P", "B+", "B-", "D"];

export const getDataRankingConfig = (data: TeamsFieldsType) => [
  {
    title: "J",
    value: data.played || "",
  },
  {
    title: "G",
    value: data.wins || "",
  },
  {
    title: "N",
    value: data.draws || "",
  },
  {
    title: "P",
    value: data.losses || "",
  },
  {
    title: "B+",
    value: data.total_tries_scored || "",
  },
  {
    title: "B-",
    value: data.total_tries_taken || "",
  },
  {
    title: "Diff",
    value: data.diff || "",
  },
];
