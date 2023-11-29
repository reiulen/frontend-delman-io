import { mockMutation, mockQuery } from "@/utils/libs/axios-mock";
import { buildUrl } from "@/utils/helpers/helper";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useToast } from "@chakra-ui/react";

type Query = {
  [key: string]: string | number | boolean | null | undefined;
};

export const FetchListUserQuery = (query: Query) => {
  const toast = useToast()
  const link = buildUrl({
    baseUrl: "users",
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

type MutationDelete = {
  id: string;
  onError: (error: AxiosError<{ errors: Error }>) => void;
  onSuccess: (data: { message: string }) => void;
}

type DataDeleteUser = {
  id: string;
  name: string;
  email: string;
}

export const MutationDeleteUser = ({ id, onError, onSuccess }: MutationDelete) => {
  const url = `users/${id}`;
  const mutationFn = async (data : DataDeleteUser) => {
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


type MutationAdd = {
  onError: (error: any) => void;
  onSuccess: (data: { message: string }) => void;
}

type DataAddUser = {
  name: string;
  email: string;
}

export const MutationAddUser = ({ onError, onSuccess }: MutationAdd) => {
  const url = `users`;
  const mutationFn = async (data : DataAddUser) => {
    return await mockMutation(url, {
      name: data.name,
      email: data.email,
    }, "post");
  };

  const resQuery = useMutation({
    mutationKey: [url],
    mutationFn: mutationFn,
    onError: onError,
    onSuccess: onSuccess
  });

  return resQuery;
};