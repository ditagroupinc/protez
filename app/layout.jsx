import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/resetCSS.css";
import "@/styles/fonts.css";
import "./globals.css";
import Script from "next/script";
import LanguageContextProvider from "@/contexts/LanguageContext";
import ScreenModeAndSizeContextProvider from "@/contexts/ScreenModeAndSizeContext";
// https://www.rodyvansambeek.com/blog/easiest-ga4-integration-nextjs-13-gtm-guide

const GTM_ID = "GTM-MP2L4TL";

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
    <>
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>

      <LanguageContextProvider>
        <ScreenModeAndSizeContextProvider>
          <html lang="en">
            <body>
              {children}
              <noscript>
                <iframe
                  src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                  height="0"
                  width="0"
                  style="display:none;visibility:hidden"
                ></iframe>
              </noscript>
            </body>
          </html>
        </ScreenModeAndSizeContextProvider>
      </LanguageContextProvider>
    </>
  );
}
