import axiosInstances from "../axios";

export const executeCodeApi = async (data: {
  programId: string;
  language: string;
  code: string;
}) => {
  const response = await axiosInstances.instance.post(`/evaluate/code`, {
    data,
  });
  return response;
};
