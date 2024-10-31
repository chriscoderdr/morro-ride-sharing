import { registerDriver } from "@/src/api/index";
import { ApiResponse, DriverData } from "@/src/api/models";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const useRegisterDriver = (): UseMutationResult<
  ApiResponse,
  Error,
  DriverData
> => {
  return useMutation<ApiResponse, Error, DriverData>({
    mutationFn: registerDriver,
  });
};
