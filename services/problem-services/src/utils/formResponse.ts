import { httpStatusCodes } from "./httpStatusCodes";

export const formResponse = (code: number, data: any) => {
  return {
    status_code: code,
    flag: httpStatusCodes[code]?.flag,
    message: httpStatusCodes[code]?.message,
    data: data,
  };
};
