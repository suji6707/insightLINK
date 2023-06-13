import React, { useEffect, useState } from "react";
// Component
import NavBar from "../components/NavBar";
import LoginButton from "../components/LoginButton";
import { Button, Divider, Input } from 'antd';

export default function Home() {

  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    async function loadGapi() {
      const { gapi } = await import('gapi-script');

      // const clientId = process.env.GOOGLE_CLIENT_ID;
      const clientId = '862985060268-bns768k2p01btrjkdk94f8hkrvqlt5d8.apps.googleusercontent.com';

      if (gapi && gapi.client) {
        await gapi.client.init({
          clientId,
          scope: ""
        });
      }
    }

    loadGapi();
  }, []);

  return (
    <div>
      <NavBar />
        <div className='container mx-auto' style={{ width: '350px' }}>
          <Divider />
            <div className="flex flex-col items-center space-y-4">
                <div className="flex flex-col space-y-4">
                    <Input
                        value={userEmail}
                        onChange={(event) => setUserEmail(event.target.value)}
                        placeholder="Email"
                        size="large"
                        className="form_input"
                        style={{ width: '300px' }} // Set the width here
                    />
                    <Input
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Password"
                        size="large"
                        type="password"
                        className="form_input"
                        style={{ width: '300px' }} // Set the width here
                    />
                </div>
            </div>
            <div className="flex justify-center mt-4">
            {/* <div className="flex flex-col items-center space-y-4"> */}
            <Button size="large" className="bg-black text-white font-bold py-2 px-4 rounded mr-2">
                login
            </Button>
            <LoginButton />
            </div>
      </div>
    </div>
  );
}
