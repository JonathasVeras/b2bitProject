import { FormValues } from "../pages/Login/Login";
import api from "./api";
import axios from 'axios';

export async function loginUserApi(credentials: FormValues) {
  try {
    const response = await api.post("/auth/login/", credentials);

    console.log(response);
    const accessToken: string = response.data.tokens.access;
    const refreshToken: string = response.data.tokens.refresh;

    // Armazenando os tokens no localStorage
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return { success: true, data: response.data, status: response.status };
  } catch (error) {
    let message = "Erro ao efetuar o login.";
    let status = 500;

    if (axios.isAxiosError(error) && error.response) {
      return { success: false, data: error.response.data.detail, status: error.response.status };
    } else {
      return { success: false, data: message, status: status };
    }
  }
}
