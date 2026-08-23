"use client";

import '@/styles/compte.scss';
import Button from '@/components/Button';

export default function CompteClient() {

    return(
        <div className="slide " id="admin">
            <Button url="/ajouter-une-realisation" text="Ajouter une réalisation"className="btn-add"/>
            <div className="box-compte wrapper">
                <h2>Mon compte</h2>
                <p>Rôle : Administrateur</p>
            </div>
        </div>
    );
}