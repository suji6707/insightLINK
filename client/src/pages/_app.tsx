import { RecoilRoot } from "recoil";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ThemeProvider enableColorScheme={true} attribute="class">
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default MyApp;
