/* eslint-disable @next/next/no-img-element */
"use client";

import '@/styles/rdv.scss';
import {useAuth} from "@/config/Auth";
import {supabase} from "@/config/supabase";

export default function PrendreRdv() {
    const {isConnected, userProfil} = useAuth();

    return(
            <div className="slide" id="prendre-rdv">
            {isConnected && userProfil ? (
                <div className="box">
                    <h2>Prendre rendez-vous</h2>
                </div>
            ) : (
                <div className="box">
                    <h4>Vous devez être connecté pour prendre rendez-vous.</h4>
                </div>
            )}
            </div>
    );
}