import { Logger } from "@nestjs/common";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export default class RestHelper{
  constructor() {
  }

  private createHeaders() {
    return {
      
    };
  }

  private createAxiosConfig(
    method: "GET" | "POST" | "PUT" | "DELETE",
    url: string, // Move the 'url' parameter to the end
    headers?: Record<string, any>,
    data?: Record<string, any>,
    
  ): AxiosRequestConfig {
    return {
      url: url,
      method,
      headers: { ...this.createHeaders(), ...headers },
      data,
    };
  }
  

  async get(
    url: string,
    headers?: Record<string, any>
  ): Promise<AxiosResponse> {
    const config = this.createAxiosConfig("GET",url, headers);
    return axios.request({ ...config, url });
  }

  async post(
    url: string,
    data: Record<string, any>,
    headers?: Record<string, any>
  ) {
    const config = this.createAxiosConfig("POST",url, headers, data);
    return axios.request({ ...config, url });
  }

  async put(
    url: string,
    data: Record<string, any>,
    headers?: Record<string, any>
  ) {
    const config = this.createAxiosConfig("PUT",url, headers, data);
    return axios.request({ ...config, url });
  }

  async delete(url: string, headers?: Record<string, any>) {
    const config = this.createAxiosConfig("DELETE",url, headers);
    return axios.request({ ...config, url });
  }

  setBasicAuthHeader(username: string, password: string) {
    
  }
}