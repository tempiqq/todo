import { useMemo } from "react"
import { formateDate } from "../utils/formateDate"

export const useTodayDate = (): string => {
  const formattedDate = useMemo<string>(() => formateDate(), []);

  return formattedDate;
}
