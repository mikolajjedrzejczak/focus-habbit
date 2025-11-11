import type { LoginBody, RegisterBody, User } from '../types';
import apiClient from './apiClient';

interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

interface RegisterResponse {
  id: string;
  email: string;
}

export const registerRequest = (data: RegisterBody) => {
  return apiClient.post<RegisterResponse>('/auth/register', data);
};

export const loginRequest = (data: LoginBody) => {
  return apiClient.post<LoginResponse>('/auth/login', data);
};

export const getMeRequest = () => {
  return apiClient.get<User>('/auth/me');
};
