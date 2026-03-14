export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegistroDTO {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token?: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface RecuperarContrasena {
  email: string;
}

