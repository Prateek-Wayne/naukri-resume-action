// Login URL
export const loginUrl =
  'https://www.naukri.com/central-login-services/v1/login';

// Resume upload URL
export const resumeUploadUrl = 'https://filevalidation.naukri.com/file';

// Resume Update URL

export const resumeUpdateUrl = (profileId: string) => {
  return `https://www.naukri.com/cloudgateway-mynaukri/resman-aggregator-services/v0/users/self/profiles/${profileId}/advResume`;
};

// Profile complete URL used to update profile summary and other personal details
export const profileCompleteUrl =
  'https://www.naukri.com/cloudgateway-ncjobseeker/fn-jobseeker-profile-services/v0/users/self/profile-complete?flowId=mobile-mnj';

// Profile fetch URL to get current profile data
export const profileFetchUrl =
  'https://www.naukri.com/cloudgateway-ncjobseeker/fn-jobseeker-profile-services/v0/users/self/profile-complete?flowId=mobile-mnj';
