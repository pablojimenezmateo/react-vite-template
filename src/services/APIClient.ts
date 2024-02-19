import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
  count: number;
  next: string | null;
  results: T[];
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    // Only allow requests if there is a Token
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Token ${token}`;
    } else {
      throw new Error("No token saved!");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Used to catch Token errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      (error.response.status === 401 &&
        error.response.data.error === "Token has expired") ||
      (error.response.status === 403 &&
        error.response.data.error === "No token found")
    ) {
      const tokenErrorEvent = new CustomEvent("tokenError", {
        detail: error.response.data.error,
      });
      window.dispatchEvent(tokenErrorEvent);
    }
    return Promise.reject(error);
  }
);

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  };

  get = (id: number | string | null) => {
    return axiosInstance
      .get<T>(id ? this.endpoint + id + "/" : this.endpoint)
      .then((res) => res.data);
  };

  patch = (id: number | string, data: Partial<T>) => {
    return axiosInstance
      .patch<T>(this.endpoint + id + "/", data)
      .then((res) => res.data);
  };

  delete = (id: number | string) => {
    return axiosInstance
      .delete<T>(this.endpoint + id + "/")
      .then((res) => res.data);
  };

  post = (data: Partial<T>) => {
    return axiosInstance.post<T>(this.endpoint, data).then((res) => res.data);
  };
}

export default APIClient;
