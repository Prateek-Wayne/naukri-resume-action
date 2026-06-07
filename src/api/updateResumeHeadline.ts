import axios from 'axios';
import { uploadFileHeader } from '../utils/headers';
import type { LoginCookies } from '../utils/types';
import { resumeHeadlineUrl } from '../utils/constants';

export const updateResumeHeadline = async (
  cookieHeader: LoginCookies,
  profileId: string,
  headline: string
): Promise<boolean> => {
  try {
    const headers = {
      ...uploadFileHeader(cookieHeader),
      'content-type': 'application/json',
      'x-http-method-override': 'PUT',
      'x-requested-with': 'XMLHttpRequest',
      appid: '105',
      systemid: 'Naukri',
      clientid: 'd3skt0p',
      authorization: `Bearer ${cookieHeader.nauk_at}`
    };

    const data = {
      profile: {
        resumeHeadline: headline
      },
      profileId
    };

    // eslint-disable-next-line no-console
    console.log('📝 Updating resume headline...');

    const resp = await axios.post(resumeHeadlineUrl, data, { headers });

    if (resp.status !== 200) {
      console.error('Headline update failed:', resp.status, resp.data);
      return false;
    }

    // eslint-disable-next-line no-console
    console.log('✅ Resume headline updated successfully!');
    return true;
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const axiosError = error as any;
    if (axiosError.response) {
      console.error(
        'Error in updateResumeHeadline:',
        axiosError.response.status,
        axiosError.response.data
      );
    } else {
      console.error('Error in updateResumeHeadline:', error);
    }
    return false;
  }
};
