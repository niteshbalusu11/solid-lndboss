import { isJwtValid, jwtDecode } from './jwt';
import nookies, { destroyCookie, parseCookies, setCookie } from 'nookies';

import axios from 'axios';
import { serverUrl } from './constants';

const lndbossCookie = 'lndboss-cookie';
const diff = (m: number, n: number) => Math.round(m - n);

type LoginForm = {
  username: string;
  password: string;
};
export async function register({ username, password }: LoginForm) {
  const url = `${serverUrl}api/auth/register`;

  const postData = {
    username,
    password,
  };

  const result = await axios.post(url, postData);

  return result.data;
}

export async function login({ username, password }: LoginForm) {
  const url = `${serverUrl}api/auth/login`;

  const postData = {
    username,
    password,
  };

  const result = await axios.post(url, postData);
  setAuthenticatedCookie({ token: result.data.accessToken });
}

// Get cookie from browser
export const getAuthenticatedCookie = () => {
  const cookie = parseCookies();

  return cookie[lndbossCookie];
};

// Remove cookie from browser
export const removeAuthenticatedCookie = () => {
  destroyCookie(null, lndbossCookie);
};

// Set cookie to browser
export const setAuthenticatedCookie = async ({ token }: { token: string }) => {
  const maxAge = jwtDecode({ token });

  if (!maxAge) {
    return false;
  }

  const currentTimeStamp = new Date().getTime() / 1000;

  const cookieOptions = {
    maxAge: diff(maxAge, currentTimeStamp),
    path: '/',
    sameSite: true,
    secure: false,
  };

  setCookie(null, lndbossCookie, token, cookieOptions);
};

export const isValidCookie = () => {
  const token = getAuthenticatedCookie();

  if (!token) {
    return false;
  }

  const isValid = isJwtValid({ token });

  return isValid;
};
