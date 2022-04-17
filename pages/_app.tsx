import type { AppProps } from "next/app";
import Header from "../components/ui/Header/Header";
import { GlobalStyle, styledTheme } from "../components/styles/global.styled";
import Footer from "../components/ui/Footer/Footer";
import { ThemeProvider } from "styled-components";
import { RecoilRoot } from "recoil";
import MainContent from "../components/MainContent/MainContent";

function MyApp({ Component, pageProps }: AppProps) {
   return (
      <ThemeProvider theme={styledTheme}>
         <GlobalStyle />
         <RecoilRoot>
            <Header />
            <MainContent>
               <Component {...pageProps} />
               <Footer />
            </MainContent>
         </RecoilRoot>
      </ThemeProvider>
   );
}

export default MyApp;
