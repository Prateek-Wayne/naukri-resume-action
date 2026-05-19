import axios from 'axios';
import { uploadFileHeader } from '../utils/headers';
import type { LoginCookies } from '../utils/types';
import { profileCompleteUrl, profileFetchUrl } from '../utils/constants';

/**
 * Update the jobseeker profile summary.
 * - If the remote API requires additional profile fields, pass a full payload
 *   using the `fullPayload` parameter. If omitted, a minimal payload containing
 *   `profileId` and `summary` will be sent.
 */
export const updateProfileSummary = async (
  cookieHeader: LoginCookies,
  profileId: string,
  summary: string,
  fullPayload?: unknown
): Promise<boolean> => {
  try {
    let data = fullPayload;

    // If no full payload provided, fetch current profile and merge summary
    if (!fullPayload) {
      // eslint-disable-next-line no-console
      console.log('📥 Fetching current profile data...');

      try {
        // Headers for GET request (without x-http-method-override)
        const getHeaders = {
          ...uploadFileHeader(cookieHeader),
          'content-type': 'application/json',
          'x-requested-with': 'XMLHttpRequest',
          appid: '801',
          systemid: '90',
          authorization: `Bearer ${cookieHeader.nauk_at}`
        };

        const profileResp = await axios.get(profileFetchUrl, {
          headers: getHeaders
        });

        if (profileResp.status === 200 && profileResp.data) {
          // eslint-disable-next-line no-console
          console.log('✓ Profile data fetched successfully');

          // Extract only resumeMakerPersonalDetails to avoid formKey/fileKey errors from other sections
          const personalDetails =
            profileResp.data.jobseekerData?.resumeMakerPersonalDetails;

          if (personalDetails) {
            // Remove uploadPhoto as it may contain null formKey/fileKey
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { uploadPhoto, ...cleanPersonalDetails } = personalDetails;

            // Send only the personal details section with updated summary
            data = {
              jobseekerData: {
                resumeMakerPersonalDetails: {
                  ...cleanPersonalDetails,
                  summary,
                  profileId
                }
              }
            };

            // eslint-disable-next-line no-console
            console.log(
              '✓ Using resumeMakerPersonalDetails (removed uploadPhoto)'
            );
          } else {
            // eslint-disable-next-line no-console
            console.warn(
              '⚠️ Personal details not found, using minimal payload'
            );
            data = {
              jobseekerData: {
                resumeMakerPersonalDetails: {
                  summary,
                  profileId
                }
              }
            };
          }
        } else {
          // eslint-disable-next-line no-console
          console.warn('⚠️ Could not fetch profile, using minimal payload');
          data = {
            jobseekerData: {
              resumeMakerPersonalDetails: {
                summary,
                profileId
              }
            }
          };
        }
      } catch (fetchErr) {
        // eslint-disable-next-line no-console
        console.warn(
          '⚠️ Profile fetch failed, using minimal payload:',
          fetchErr
        );
        data = {
          jobseekerData: {
            resumeMakerPersonalDetails: {
              summary,
              profileId
            }
          }
        };
      }
    }

    // Headers for POST request (same pattern as uploadResume.ts)
    const updateHeaders = {
      ...uploadFileHeader(cookieHeader),
      'content-type': 'application/json',
      'x-http-method-override': 'PUT',
      'x-requested-with': 'XMLHttpRequest',
      appid: '801',
      systemid: '90',
      authorization: `Bearer ${cookieHeader.nauk_at}`
    };

    const url = profileCompleteUrl;

    // eslint-disable-next-line no-console
    console.log('Updating profile...');

    const resp = await axios.post(url, data, { headers: updateHeaders });

    if (resp.status !== 200) {
      console.error('Profile update failed:', resp.status, resp.data);
      return false;
    }

    console.log('Profile updated successfully!');
    return true;
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const axiosError = error as any;
    if (axiosError.response) {
      console.error(
        'Error in updateProfileSummary:',
        axiosError.response.status,
        axiosError.response.data
      );
    } else {
      console.error('Error in updateProfileSummary:', error);
    }
    return false;
  }
};
