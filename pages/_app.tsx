import Wrapper from "@/components/Wrapper";
import store from "@/store/store";
import "@/styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Metadata } from "next";
import type { AppProps } from "next/app";
import { Poppins } from 'next/font/google';
import Head from "next/head";
import { Provider } from "react-redux";

export const poppins = Poppins({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

const theme = extendTheme({
  colors: {
    primary: '#F9DBBA',
    secondary: '#5B99C2',
    tertiary: '#1A4870',
    quaternary: '#1F316F',
  },
  fonts: {
    heading: poppins.className,
    body: poppins.className,
  }
});


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <Head>
          <title>Eswift</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head> 
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </Provider>
    </ChakraProvider>
  );
}
