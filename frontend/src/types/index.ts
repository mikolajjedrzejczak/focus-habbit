export interface User {
  id: string;
  email: string;
}

export interface RegisterBody {
  email: string;
  password: string;
}

export type LoginBody = RegisterBody;

export interface Habit {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
}
z