export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface JWTPayload {
  userId: string;
  email: string;
  name: string;
}
