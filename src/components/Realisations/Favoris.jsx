/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/config/Auth';
import { supabase } from '@/config/supabase';
import Heart from '@/components/Heart';

export default function FavorisButton({ realisationId }) {
  const { isConnected, loading: authLoading, userProfil } = useAuth();
  const [isFavori, setIsFavori] = useState(false);
  const [favoriId, setFavoriId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Vérifie si cette réalisation est déjà en favoris pour le client connecté
  useEffect(() => {
    if (authLoading || !isConnected || !userProfil?.id) {
      setIsFavori(false);
      setFavoriId(null);
      return;
    }
    
    const checkFavori = async () => {
      const { data, error } = await supabase
        .from('favoris')
        .select('id')
        .eq('client_id', userProfil.id)
        .eq('realisation_id', realisationId)
        .maybeSingle();
      if (!error && data) {
        setIsFavori(true);
        setFavoriId(data.id);
      }
    };

    checkFavori();
  }, [authLoading, isConnected, userProfil?.id, realisationId]);

  
  const toggleFavori = async (e) => {
    e.preventDefault(); 
    e.stopPropagation();

    if (!isConnected || !userProfil?.id || actionLoading) return;
    setActionLoading(true);

    if (isFavori) {
      const { error } = await supabase
        .from('favoris')
        .delete()
        .eq('id', favoriId);

      if (!error) {
        setIsFavori(false);
        setFavoriId(null);
      }
    } else {
      const { data, error } = await supabase
        .from('favoris')
        .insert({ client_id: userProfil.id, realisation_id: realisationId })
        .select('id')
        .single();

      if (!error && data) {
        setIsFavori(true);
        setFavoriId(data.id);
      }
    }

    setActionLoading(false);
  };

  // Tant qu'on ne sait pas si l'utilisateur est connecté, on n'affiche rien (évite le flash)
  if (authLoading || !isConnected) return null;

  return (
    <div className={`favoris ${isFavori ? 'active' : ''}`} onClick={toggleFavori}>
      <p>{isFavori ? 'Retirer des favoris' : 'Mettre en favoris'}</p>
      <Heart />
    </div>
  );
}