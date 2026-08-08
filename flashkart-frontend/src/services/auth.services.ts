import api from "../api/axios";
import type {
  LoginRequest,
  RegisterRequest,
  LoginResponse,
} from "../types/auth.types";

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post("/users/login", data);
  return response.data;
};

export const register = async (data: RegisterRequest) => {
  const response = await api.post("/users/register", {
    name: data.name,
    email: data.email,
    password: data.password,
  });

  return response.data;
};
