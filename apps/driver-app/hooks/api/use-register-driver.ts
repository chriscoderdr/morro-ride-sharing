import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { registerDriver } from "../../api/index";
import { ApiResponse, DriverData } from "../../api/models";

export const useRegisterDriver = (): UseMutationResult<
  ApiResponse,
  Error,
  DriverData
> => {
  return useMutation<ApiResponse, Error, DriverData>({
    mutationFn: registerDriver,
  });
};
