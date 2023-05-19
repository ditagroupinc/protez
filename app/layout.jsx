import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/resetCSS.css";
import "@/styles/fonts.css";
import "./globals.css";
export const metadata = {
  title: "Prosthetics for Ukraine",
  description: `Main page of the "Prosthetics for Ukraine" foundation`,
  creator: "Ditagoup",
  publisher: "Ditagroup",
  openGraph: {
    title: "Prosthetics for Ukraine",
    description: `Main page of the "Prosthetics for Ukraine" foundation`,
    url: "http://www.protezfoundation.com/",
    siteName: "protezfoundation.com",
    images: "https://dita-group.com/ogdita5.png",
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    domain: "protezfoundation.com",
    url: "http://www.protezfoundation.com/",
    image: "https://dita-group.com/ogdita5.png",
    title: "Prosthetics for Ukraine",
    description: `Main page of the "Prosthetics for Ukraine" foundation`,
    images: "https://dita-group.com/ogdita5.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
