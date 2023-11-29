import { mockMutation, mockQuery } from "@/utils/libs/axios-mock";
import { buildUrl } from "@/utils/helpers/helper";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useToast } from "@chakra-ui/react";

type Query = {
  [key: string]: string | number | boolean | null | undefined;
};

export const FetchListSalesQuery = (query: Query) => {
  const toast = useToast()
  const link = buildUrl({
    baseUrl: "",
    query: query,
  });

  const resQuery = useQuery({
    queryKey: [link],
    queryFn: mockQuery,
    staleTime: 300000, // 5 minutes
  });

  if (resQuery?.isError) {
    const err = resQuery?.error as AxiosError<{ message: string }>;
    toast({
      title: "Error",
      description: err?.response?.data?.message,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: 'top-right'
    })
  }
  return resQuery;
};

type Error = {
  [key: string]: string[];
};

type Mutation = {
  id: string;
  onError: (error: AxiosError<{ errors: Error }>) => void;
  onSuccess: (data: { message: string }) => void;
}

type DataUser = {
  id: string;
  name: string;
  email: string;
}

export const MutationDeleteUser = ({ id, onError, onSuccess }: Mutation) => {
  const url = `users/${id}`;
  const mutationFn = async (data : DataUser) => {
    return await mockMutation(url, {
      id: data.id,
      name: data.name,
      email: data.email,
    }, "delete");
  };
  
  const resQuery = useMutation({
    mutationKey: [url],
    mutationFn: mutationFn,
    onError: onError,
    onSuccess: onSuccess
  });

  return resQuery;
};