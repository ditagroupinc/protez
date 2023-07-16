import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/resetCSS.css";
import "@/styles/fonts.css";
import "./globals.css";
import LanguageContextProvider from "@/contexts/LanguageContext";
import ScreenModeAndSizeContextProvider from "@/contexts/ScreenModeAndSizeContext";
// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
export const metadata = {
  title: "Prosthetics for Ukraine",
  description: `Main page of the "Prosthetics for Ukraine" foundation`,
  creator: "Ditagoup",
  publisher: "Ditagroup",
  openGraph: {
    title: "Prosthetics for Ukraine",
    description: `Main page of the "Prosthetics for Ukraine" foundation`,
    url: "http://www.protezfoundation.com/",
    siteName: "protezfoundation.org",
    images: "https://dita-group.com/ogdita5.png",
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    domain: "protezfoundation.org",
    url: "http://www.protezfoundation.com/",
    image: "https://dita-group.com/ogdita5.png",
    title: "Prosthetics for Ukraine",
    description: `Main page of the "Prosthetics for Ukraine" foundation`,
    images: "https://dita-group.com/ogdita5.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <LanguageContextProvider>
      <ScreenModeAndSizeContextProvider>
        <html lang="en">
          <body>{children}</body>
        </html>
      </ScreenModeAndSizeContextProvider>
    </LanguageContextProvider>
  );
}
