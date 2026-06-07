import Link from "next/link";
import Button from "@/components/Button";

export default function Footer() {
  return (
    <div className="footer">
      <div className="logo">

      </div>
      <div className="menu">

      </div>
      <div className="info">

      </div>
      <div className="legal">

      </div>
      <div className="reseaux">

      </div>
      <div className="btn">
        <Button text="Prendre rendez-vous" link="/prendre-rdv" className="button-secondary" />
      </div>
    </div>
  );
}