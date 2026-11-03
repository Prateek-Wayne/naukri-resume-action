import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { loginHeaders } from '../utils/headers';
import { loginUrl } from '../utils/constants';
import { generateVid } from '../utils/vid';
import type { LoginCookies } from '../utils/types';

const extractCookieObject = (cookies: string[] = []): LoginCookies => {
  let unid = '';
  let nkwap = '';
  let nauk_at = '';
  let nauk_rt = '';
  let nauk_sid = '';

  for (const cookie of cookies) {
    if (cookie.startsWith('MYNAUKRI[UNID]=')) {
      unid = cookie.split(';')[0].split('=')[1];
    } else if (cookie.startsWith('NKWAP=')) {
      nkwap = cookie.split(';')[0].split('=')[1];
    } else if (cookie.startsWith('nauk_at=')) {
      nauk_at = cookie.split(';')[0].split('=')[1];
    } else if (cookie.startsWith('nauk_rt=')) {
      nauk_rt = cookie.split(';')[0].split('=')[1];
    } else if (cookie.startsWith('nauk_sid=')) {
      nauk_sid = cookie.split(';')[0].split('=')[1];
    }
  }

  return { unid, nkwap, nauk_at, nauk_rt, nauk_sid };
};

export const login = async (
  username: string,
  password: string
): Promise<LoginCookies | null> => {
  if (!username || !password) {
    throw new Error('USERNAME and PASSWORD environment variables must be set.');
  }

  try {
    const response: AxiosResponse = await axios.post(
      loginUrl,
      { username, password },
      {
        headers: loginHeaders(generateVid()),
        maxRedirects: 0,
        validateStatus: (status) => status < 400
      }
    );

    const cookies = response.headers['set-cookie'];
    if (cookies) {
      const cookiesData = extractCookieObject(cookies);
      return cookiesData;
    } else {
      console.warn('cookie not found in response.');
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Login failed:', error.message);
    throw error;
  }
};
