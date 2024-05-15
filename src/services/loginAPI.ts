import { FormValues } from "../pages/Login/Login";
import api from "./api";



export async function loginUser(credentials: FormValues) {
  try {
    const response = await api.post("/auth/login/", credentials);

    console.log(response)

    return { success: true, data: response.data, status: response.status };
  } catch (error) {
    let message = "Erro ao efetuar o login.";
    let status = 500;

    return { success: false, message, status };
  }
}
