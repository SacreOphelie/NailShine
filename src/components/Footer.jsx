
import Link from "next/link";
import Button from "@/components/Button";
import { navItems } from "@/config/navigation";
import '@/styles/footer.scss';
import Logo from "@/components/Logo";
import { contact } from "@/config/contact";
import Image from "next/image";

export default function Footer() {

    
  return (
    <footer>
        <div className="container-footer wrapper">
            <Logo />
            <div className="menu div-footer">
                {navItems.slice(1).map((item) => (
                <Link key={item.href} href={item.href} className="footer-link">
                    {item.name}
                </Link>
                ))}
            </div>
            <div className="info div-footer">
                <Link href={`tel:${contact.tel}`} className="tel info-link">
                    <p>{contact.tel}</p>
                </Link>
                <Link href={`mailto:${contact.mail}`} className="mail info-link">
                    <p>{contact.mail}</p>
                </Link>
                <Link href={`map:${contact.lieu}`} className="lieu info-link">
                    <p>{contact.lieu}</p>
                </Link>
            </div>
            <div className="legal div-footer">
                <Link href="/conditions-generales" className="legal-link">Conditions générales</Link>
                <Link href="/politique-de-confidentialite" className="legal-link">Politique de confidentialité</Link>
            </div>
            <div className="reseaux div-footer">
                <Link href={contact.facebook} target="_blank" rel="noopener noreferrer">
                    <Image src="/icones/icon_fb.png" alt="Facebook" width={100} height={100} />
                </Link>
                <Link href={contact.instagram} target="_blank" rel="noopener noreferrer">
                    <Image src="/icones/icon_insta.png" alt="Instagram" width={100} height={100} />
                </Link>
                <Link href={contact.tiktok} target="_blank" rel="noopener noreferrer">
                    <Image src="/icones/icon_tiktok.png" alt="Tik Tok" width={100} height={100} />
                </Link>
            </div>
            <div className="btn">
                <Button text="Prendre rendez-vous" url="/prendre-rdv" className="button-secondary" />
            </div>
        </div>
    </footer>
  );
}