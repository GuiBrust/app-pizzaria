import { createContext, ReactNode, useState } from "react";

import { api } from '../services/apiClient';

import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router';

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SiginProps) => Promise<void>;
  signOut: () => void;
}

type UserProps = {
  id: string;
  name: string;
  email: string;
}

type SiginProps = {
  email: string;
  password: string;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  try {
    destroyCookie(undefined, '@nextauth.token')
    Router.push('/')
  } catch {
    console.log('error')
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SiginProps) {
    try {
      const response = await api.post('session', { email, password });
      const { id, name, token } = response.data;

      setCookie(undefined, '@nextauth.token',token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/' // all routes possuem acesso ao cookie
      })

      setUser({
        id,
        name,
        email
      })

      // Passar para as proximas requisições o token
      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      Router.push('/dashboard');

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}