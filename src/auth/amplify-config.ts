import { Amplify } from 'aws-amplify';
import config from '../config/env';

// Helper to extract User Pool ID and Region from Authority URL
// Expected format: https://cognito-idp.{region}.amazonaws.com/{userPoolId}
const parseAuthority = (authority: string) => {
  try {
    const url = new URL(authority);
    const parts = url.hostname.split('.');
    // cognito-idp.us-east-1.amazonaws.com
    const region = parts[1];
    const userPoolId = url.pathname.replace(/^\//, '');
    return { region, userPoolId };
  } catch (e) {
    console.error('Failed to parse OIDC Authority URL', e);
    return { region: '', userPoolId: '' };
  }
};

const { userPoolId } = parseAuthority(config.oidcAuthority);

export const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: userPoolId,
      userPoolClientId: config.oidcClientId,
      loginWith: {
        email: true,
      },
      signUpVerificationMethod: 'code' as const,
      userAttributes: {
        email: {
          required: true,
        },
      },
    },
  },
};

export const configureAmplify = () => {
  Amplify.configure(amplifyConfig);
};
