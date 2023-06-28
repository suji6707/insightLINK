import { RecoilRoot } from "recoil";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";

declare global {
  // Make it accessible globally on Kakao
  interface Window {
    Kakao: any;
  }
}

const kakaoInit = () => {
  // Run when the page loads
  if (!window.Kakao.isInitialized()) {
    // Add an if statement to run only when not declared
    window.Kakao.init(process.env.NEXT_PUBLIC_JAVASCRIPT_KEY);
  }
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ThemeProvider enableColorScheme={true} attribute="class">
        <Script
          src="https://developers.kakao.com/sdk/js/kakao.js"
          onLoad={kakaoInit}
        />
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default MyApp;
