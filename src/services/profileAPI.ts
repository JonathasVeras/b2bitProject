import api from "./api";
import axios from 'axios';

export async function getProfileInfoApi() {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("Token não encontrado.");
    }

    const config = {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json;version=v1_web',
        'Content-Type': 'application/json'
      }
    };

    const response = await api.get("/auth/profile/", config);

    return { success: true, data: response.data, status: response.status };
  } catch (error) {
    let message = "Erro ao recuperar informações do perfil.";
    let status = 500;

    if (axios.isAxiosError(error) && error.response) {
      return { success: false, data: error.response.data.detail, status: error.response.status };
    } else {
      return { success: false, data: message, status: status };
    }
  }
}
