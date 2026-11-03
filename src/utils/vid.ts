import crypto from 'node:crypto';

// BOTGUARD_PUBLIC_KEY from Naukri's web bundle (base64 DER, RSA-512)
const BOTGUARD_PUBLIC_KEY =
  'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBALbx2oNW1OsL+zv+GK4Ed70m4gr6sBjpzj1PCmLAYs3dQph0IS/DFWXMDN//CyC46DgSJZJZdaxT0xskFBIKNSMCAwEAAQ==';

const APP_ID = '1352';
const PAGE_UID = 'login';

// Mirrors the browser's DynamicTokenSDK: RSA(PKCS1 v1.5) of "v0|<ms>|<appId>_<pageUID>"
export const generateVid = (now: number = Date.now()): string => {
  const key = crypto.createPublicKey({
    key: Buffer.from(BOTGUARD_PUBLIC_KEY, 'base64'),
    format: 'der',
    type: 'spki'
  });

  return crypto
    .publicEncrypt(
      { key, padding: crypto.constants.RSA_PKCS1_PADDING },
      Buffer.from(`v0|${now}|${APP_ID}_${PAGE_UID}`)
    )
    .toString('base64');
};
