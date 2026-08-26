import '@/styles/conditions.scss';

export default function PolitiqueDeConfidentialite() {
  return (
    <div className="slide" id="politique-de-confidentialite">
        <div className="container wrapper"> 
            <h1>Politique de Confidentialité</h1>

            <h2>1. Responsable du traitement</h2>
            <p>
                Le présent site <strong>nailshine.sacreophelie.com</strong> est édité
                par <strong>NailShine</strong>, exploité sous le statut d'auto-entrepreneur (micro-entreprise),
                immatriculé sous le numéro SIRET .
            </p>
            <p>
                Adresse de correspondance : Tubize<br />
                Adresse e-mail de contact : nathalie.nailshine@hotmail.com
            </p>
            <p>
                NailShine est responsable du traitement des données personnelles collectées via le Site, au
                sens du Règlement Général sur la Protection des Données (RGPD - Règlement (UE) 2016/679).
            </p>

            <h2>2. Données collectées</h2>
            <p>Selon les fonctionnalités utilisées, les données suivantes peuvent être collectées :</p>
            <ul>
                <li>Nom, prénom</li>
                <li>Adresse e-mail et/ou numéro de téléphone</li>
                <li>Informations liées à la prise de rendez-vous (date, créneau, prestation choisie)</li>
                <li>Contenu des avis et commentaires laissés sur les réalisations, ainsi que la note associée</li>
                <li>Identifiant de compte utilisateur (si un compte est créé pour gérer les rendez-vous ou avis)</li>
                <li>Données techniques de connexion (adresse IP, type de navigateur) à des fins de sécurité et de bon fonctionnement du Site</li>
            </ul>

            <h2>3. Finalités du traitement</h2>
            <p>Les données collectées sont utilisées pour :</p>
            <ul>
                <li>Gérer la prise, la confirmation et le suivi des rendez-vous</li>
                <li>Permettre la publication et la gestion des avis/commentaires sur les réalisations</li>
                <li>Répondre aux demandes de contact des utilisateurs</li>
                <li>Assurer la sécurité, la maintenance et l'amélioration du Site</li>
                <li>Respecter les obligations légales et comptables liées à l'activité de NailShine</li>
            </ul>

            <h2>4. Base légale des traitements</h2>
            <p>
                Les traitements reposent selon les cas sur : l'exécution de mesures précontractuelles ou
                contractuelles (prise de rendez-vous), le consentement de l'utilisateur (publication d'un avis,
                création d'un compte) et l'intérêt légitime de NailShine (sécurité et amélioration du Site).
            </p>

            <h2>5. Hébergement et destinataires des données</h2>
            <p>
                Les données sont stockées via <strong>Supabase</strong>, prestataire technique assurant
                l'hébergement de la base de données du Site. Les données ne sont ni vendues, ni cédées à des
                tiers à des fins commerciales.
            </p>
            <p>
                Elles peuvent être transmises à des sous-traitants techniques strictement nécessaires au
                fonctionnement du Site (hébergement, envoi d'e-mails de confirmation), dans le respect du RGPD.
            </p>

            <h2>6. Durée de conservation</h2>
            <p>
                Les données liées aux rendez-vous et à la relation client sont conservées pendant [durée à
                compléter, ex. 3 ans à compter du dernier contact], sauf obligation légale de conservation
                plus longue (notamment comptable et fiscale).
            </p>
            <p>
                Les avis et commentaires publiés sont conservés tant qu'ils restent affichés sur le Site, ou
                jusqu'à leur suppression à la demande de leur auteur.
            </p>

            <h2>7. Droits des utilisateurs</h2>
            <p>Conformément au RGPD, tout utilisateur dispose des droits suivants sur ses données personnelles :</p>
            <ul>
                <li>Droit d'accès et de rectification</li>
                <li>Droit à l'effacement (« droit à l'oubli »)</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit d'opposition</li>
                <li>Droit à la portabilité des données</li>
            </ul>
            <p>
                Ces droits peuvent être exercés en contactant NailShine à l'adresse e-mail indiquée à
                l'article 1. Une réponse sera apportée dans un délai maximal d'un mois.
            </p>
            <p>
                L'utilisateur dispose également du droit d'introduire une réclamation auprès de l'autorité de
                contrôle compétente en matière de protection des données [Autorité de protection des données
                (Belgique) ou CNIL (France), selon le pays applicable].
            </p>

            <h2>8. Cookies</h2>
            <p>
                Le Site peut utiliser des cookies strictement nécessaires à son fonctionnement (par exemple,
                pour maintenir une session utilisateur connectée). [À compléter si des cookies de mesure
                d'audience ou publicitaires sont utilisés : préciser leur nature et le mécanisme de recueil
                du consentement.]
            </p>

            <h2>9. Sécurité des données</h2>
            <p>
                NailShine met en œuvre les mesures techniques et organisationnelles raisonnables pour protéger
                les données personnelles contre tout accès non autorisé, perte, altération ou divulgation.
            </p>

            <h2>10. Mineurs</h2>
            <p>
                Le Site n'est pas destiné aux personnes mineures sans l'accord de leur représentant légal.
                NailShine invite les mineurs à ne pas transmettre de données personnelles sans cet accord.
            </p>

            <h2>11. Modification de la politique de confidentialité</h2>
            <p>
                NailShine se réserve le droit de modifier la présente politique à tout moment. La version
                applicable est celle publiée sur le Site à la date de consultation.
            </p>

            <h2>12. Contact</h2>
            <p>
                Pour toute question relative à la présente politique ou à l'exercice de vos droits, vous
                pouvez contacter NailShine à l'adresse suivante : [e-mail à compléter].
            </p>
        </div>
    </div>
  );
}