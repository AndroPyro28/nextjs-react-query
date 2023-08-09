import axios from "axios";
import {useQuery,useMutation,useQueryClient,} from "@tanstack/react-query";

const apiClient = axios.create({
  baseURL: "http://localhost:4000", headers: { "Content-type": "application/json"},
});

export const query = <T>(url: string, key: any[] = [], options = {}) => {
  return useQuery({
    queryKey: key,
    queryFn: async () => (await apiClient.get<T>(url)).data,
    ...options,
  });
};

type HttpMutationMethod = "DELETE" | "POST" | "PUT" | "PATCH";
const mutationMethod = async <T>( url: string, method: HttpMutationMethod, value: T) => {
  switch(method) {
    case 'DELETE' : return (await apiClient.delete<T>(url)).data
    case 'PATCH' : return (await apiClient.patch<T>(url, value)).data
    case 'POST' : return (await apiClient.post<T>(url, value)).data
    case 'PUT' : return (await apiClient.put<T>(url, value)).data

    default: throw new Error('Invalid mutation method')
  }
};

export const mutate = <T>(url: string, method: HttpMutationMethod, key: any[], options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: async (value: T) => mutationMethod<T>(url, method, value),
    onMutate: (newData: T) => {

      const previousData = queryClient.getQueryData<T>(key);
      const isArray = Array.isArray(previousData);

      if (isArray) { //checking if the previous data is an array type if yes then update the array data
        queryClient.setQueryData(key, (old) => [...old, newData]);
      } else { // if not then update the single object data with the new data
        queryClient.setQueryData(key, newData);
      }
      return { previousData };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(key, context.previousData);
    },
    onSettled: (data) => {
      queryClient.invalidateQueries(key);
    },
  });
};
