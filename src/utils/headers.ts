import type { LoginCookies } from './types';

// `vid` is a per-request bot-guard token and must be added by the caller (see utils/vid.ts)
export const loginHeaders = (vid: string) => ({
  accept: 'application/json',
  'accept-language': 'en-US,en;q=0.9',
  appid: '103',
  'cache-control': 'no-cache',
  clientid: 'd3skt0p',
  'content-type': 'application/json',
  origin: 'https://www.naukri.com',
  pragma: 'no-cache',
  priority: 'u=1, i',
  referer: 'https://www.naukri.com/',
  'sec-ch-ua':
    '"Not:A-Brand";v="8", "Chromium";v="156", "Google Chrome";v="156"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"macOS"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
  systemid: 'jobseeker',
  'user-agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36',
  vid
});

export const uploadFileHeader = (cookieHeader: LoginCookies) => {
  // Create cookie string from the LoginCookies object
  const cookieString = `MYNAUKRI[UNID]=${cookieHeader.unid}; NKWAP=${cookieHeader.nkwap}; nauk_at=${cookieHeader.nauk_at}; nauk_rt=${cookieHeader.nauk_rt}; nauk_sid=${cookieHeader.nauk_sid}`;

  const uploadHeader = {
    accept: 'application/json, text/javascript, */*; q=0.01',
    'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
    'access-control-allow-origin': '*',
    appid: '109',
    origin: 'https://www.naukri.com',
    priority: 'u=1, i',
    referer: 'https://www.naukri.com/',
    'sec-ch-ua':
      '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
    'sec-ch-ua-mobile': '?0',
    'cache-control': 'no-cache',
    clientid: 'd3skt0p',
    // 'content-type': 'application/json',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    systemid: 'fileupload',
    'user-agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
    Cookie: cookieString // Now passing a string instead of an object
  };
  return uploadHeader;
};
