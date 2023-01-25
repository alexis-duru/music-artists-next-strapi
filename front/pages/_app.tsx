import '@/styles/globals.css'
import { createContext } from "react";
import Head from 'next/head';

export const GlobalContext = createContext({});

// export default function App({ Component, pageProps }: AppProps) {
  
//   return <Component {...pageProps} />
// }

const MyApp = ({ Component, pageProps }) => {
  const { global } = pageProps;

  return (
    <>
    <Head>
      <title>Electronic Artist</title>
      </Head>
        <Component {...pageProps} />
    </>
  );
};

export default MyApp;
