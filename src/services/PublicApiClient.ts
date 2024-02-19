import axios from "axios";

const publicAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

class PublicAPIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  post = (data: Partial<T>) => {
    return publicAxiosInstance
      .post<T>(this.endpoint, data)
      .then((res) => res.data);
  };
}

export default PublicAPIClient;
