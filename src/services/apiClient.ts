import axios from "axios";

    export const apiClient = axios.create({
        baseURL: "http://localhost:4000",
        headers: {
          "Content-type": "application/json",
        },
      });