import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/resetCSS.css";
import "@/styles/fonts.css";
import "./globals.css";
export const metadata = {
  title: "Prosthetics for Ukraine",
  description: `Main page of the "Prosthetics for Ukraine" foundation`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
