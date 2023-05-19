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
    siteName: "ProtezFoundation.com",
    images: "/og-image.png",
    locale: "en-US",
    type: "website",
    // url: "http://protezfoundation.com",
    // title: "Prosthetics for Ukraine",
    // description:
    //   "Main page of the &quot;Prosthetics for Ukraine&quot; foundation",
    // type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
