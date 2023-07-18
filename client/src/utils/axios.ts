import axios from 'axios';
import { getAuthenticatedCookie } from './session';
import { serverUrl } from './constants';

type ArgsGet = {
  path: string;
  query: object;
};

type ArgsPost = {
  path: string;
  postBody: object;
};

type Return = {
  result?: any | undefined;
  error?: any;
};

export const axiosGet = async ({ path, query }: ArgsGet): Promise<Return> => {
  try {
    const url = `${serverUrl}api/${path}`;
    const accessToken = getAuthenticatedCookie();

    const response = await axios.get(url, {
      params: query,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { result } = await response.data;

    if (!!result) {
      return { result };
    }

    return { result: undefined };
  } catch (error: any) {
    return { error: error.response.data };
  }
};
