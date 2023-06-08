// import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { AppProps } from "next/app";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider enableColorScheme={true} attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
