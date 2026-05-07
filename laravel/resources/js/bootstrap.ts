import axiosClient from './axios';

declare global {
  interface Window {
      axios: typeof axiosClient;
  }
}

axiosClient.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

window.axios = axiosClient;
