import React from 'react';
import { GoogleLogout, UseGoogleLogoutResponse } from 'react-google-login';
import { useRouter } from 'next/router';

// const clientId = process.env.GOOGLE_CLIENT_ID ?? '';
const clientId = '862985060268-bns768k2p01btrjkdk94f8hkrvqlt5d8.apps.googleusercontent.com';

function LogoutButton() {
  const router = useRouter();

  const onSuccess = () => {
    alert('Logout successful!');
    localStorage.removeItem('token');

    // Redirect to the main page(index.js)
    router.push('/');
  };

  return (
    <div id="signOutButton">
      <GoogleLogout
        clientId = {clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}

export default LogoutButton;
