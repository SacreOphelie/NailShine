import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { logoIcon } from "@/config/assets";
import "@/styles/style.scss";


export const metadata = {
  title: "NailShine",
  description: "NailShine est une application de gestion de salon de manucure, offrant des fonctionnalités pour les clients, telles que la prise de rendez-vous, la gestion des services et des produits, et la communication entre les utilisateurs.",
  icons:{
    icon: logoIcon,
  }
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="fr">
      <body>
        <header>
          <Nav />
        </header>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
