import { Farm } from "../models/farm.model";

export const getIndicesFromKey = (key: string, delimiter = ":"): number[] => {
  return (key?.split(delimiter) ?? [])?.map((index) => Number.parseInt(index));
};
