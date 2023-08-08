import { apiClient } from "./apiClient";

export type post = {id: number, title: string, author: string};
export type posts = post[]

export const findAll = async () => {
    const response = await apiClient.get<posts>("/posts");
    return response.data;
  }
  
  export const findById = async (id: any) => {
    const response = await apiClient.get<post>(`/posts/${id}`);
    return response.data;
  }
  
  export const findByTitle = async (title: string) => {
    const response = await apiClient.get(`/tutorials?title`);
    return response.data;
  }
  
  export const create = async (value: post) => {
    const response = await apiClient.post<post>("/posts", value);
    return response.data;
  }
  
  export const update = async () => {
    const response = await apiClient.put(`/tutorials`);
    return response.data;
  }
  
  export const deleteById = async () => {
    const response = await apiClient.delete<any>(`/tutorials/`);
    return response.data;
  }