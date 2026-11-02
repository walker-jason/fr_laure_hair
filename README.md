# ✂️ France Laure — Haute Coiffure & Visagisme d'Exception

Site vitrine ultra-luxe, moderne et interactif pour le salon de coiffure **France Laure**, situé au **390 Chaussée de Gand, 1080 Molenbeek-Saint-Jean (Bruxelles, Belgique)**.

---

## 🌟 Identité & Direction Artistique

- **Design Persona** : Haute-Coiffure & Salon Boutique parisien intimiste.
- **Palette chromatique** :
  - *Noir Onyx Profond* (`#0D0D10` / `#141419`)
  - *Or Chaud Haute Couture* (`#D4AF37` / `#F3E5AB` / `#A38222`)
  - *Bronze Poudré & Reflets Miel* (`#C5A059`)
  - *Crème Cachemire & Verre Givré* (`rgba(23, 23, 30, 0.75)`)
- **Typographie** :
  - Titres & accents éditoriaux : *Playfair Display* & *Cormorant Garamond* (italiques couture)
  - Textes courants & UI : *Plus Jakarta Sans*
- **Savoir-Faire & Spécialités** :
  - Balayage lumière fondu sans démarcation
  - Coupe visagiste & morphologie du visage
  - Sauvetage et régénération capillaire (protocole SOS pour cheveux décolorés ou cassants)
  - Rituels profonds *Kérastase Paris* (Fusio-Dose™)
  - Colorations végétales & soins gloss miroir
  - Espace Hommes de précision & taille de barbe

---

## 📦 Extraction Automatique des Images

Pour extraire directement l'archive ZIP `coiffurefrancelaure_images.zip` dans l'arborescence du projet (`assets/images/`), exécutez la commande suivante selon votre terminal :

### Sous Windows PowerShell :
```powershell
# 1. Création du dossier de destination s'il n'existe pas
New-Item -ItemType Directory -Force -Path "assets\images"

# 2. Extraction complète de l'archive ZIP
Expand-Archive -LiteralPath "C:\Users\mark computer\Documents\vscode\business_finder\france_laure\coiffurefrancelaure_images.zip" -DestinationPath "assets\images" -Force

# 3. Copie directe des images à la racine de assets/images/
Copy-Item "assets\images\coiffurefrancelaure\*.jpg" "assets\images\" -Force
```

### Sous Bash / macOS / Linux :
```bash
mkdir -p assets/images
unzip -o "/chemin/vers/coiffurefrancelaure_images.zip" -d assets/images/
cp assets/images/coiffurefrancelaure/*.jpg assets/images/ 2>/dev/null || true
```

---

## 🚀 Fonctionnalités & Expérience Utilisateur

1. **Indicateur de Statut en Temps Réel** :
   - Détection automatique de l'heure et du jour (fuseau horaire de Bruxelles).
   - Badge animé avec pulsation verte lorsque le salon est ouvert.
   - Message intelligent en cas de fermeture indiquant le prochain jour et l'heure de réouverture.
   - Mise en avant automatique du jour courant dans le tableau hebdomadaire avec le badge doré `AUJ`.

2. **Hero Section Éditoriale Haute Coiffure** :
   - Mise en scène en grille magazine avec effets de profondeur et parallaxe.
   - Inset photo dynamique du balayage blond solaire wavy.
   - Badge d'avis Google authentique valorisant le témoignage réel d'Edessa C. (*"Ce salon a sauvé mes cheveux blonds !"*).
   - Boutons d'action instantanés (Réservation en ligne, Consultation des tarifs, Appel direct).

3. **Ruban Défilant Haute Joaillerie (Marquee)** :
   - Ticker infini fluide mettant en avant les prestations phares du salon (*Coupe Visagiste Sur Mesure • Balayage Lumière Prestige • Sauvetage & Régénération Capillaire • Rituels Kérastase Paris*).

4. **L'Expérience France Laure (À Propos)** :
   - Triptyque photographique asymétrique issu des clichés réels du salon (bar à rituels Kérastase, fauteuils de coiffage, miroir France Laure).
   - Les 3 piliers fondateurs : *Visagisme & Morphologie*, *Sauvetage Capillaire*, *Bienveillance & Écoute*.
   - Compteurs de chiffres clés animés à l'apparition (*15+ années d'expertise, 4.9/5 satisfaction, 100% diagnostic offert, +3500 chevelures sublimées*).

5. **Prestations & Tarifs Interactifs** :
   - 5 onglets fluides : *Femmes (Coupe & Brushing)*, *Balayages & Éclaircissements*, *Colorations & Gloss*, *Soins & Sauvetage*, *Espace Hommes*.
   - Tarification transparente avec durée estimée, description détaillée et bouton « Réserver » pré-sélectionnant la prestation dans le formulaire.

6. **Focus Sauvetage Capillaire (SOS Cheveux Abîmés)** :
   - Carte lumineuse dédiée à la reconstruction des fibres sensibilisées par les décolorations ou traitements chimiques.

7. **Portfolio & Galerie Interactive avec Lightbox** :
   - Filtres instantanés par catégorie : *Toutes*, *Blonds & Balayages*, *Bruns & Cuivrés*, *Coupes & Brushings*, *Le Salon & Soins*.
   - Zoom plein écran au clic avec légendes, catégorie et bouton direct pour réserver le style visualisé.
   - Navigation clavier (Flèche gauche, Flèche droite, Échap) et navigation tactile.

8. **Avis Clients Vérifiés & Badge Google** :
   - Note moyenne **4.9 / 5** avec lien direct vers la fiche Google Maps.
   - Carrousel automatique avec pause au survol, flèches de navigation, points indicateurs et support du glissement tactile (swipe).

9. **Horaires Hebdomadaires & Accès Pratique** :
   - Tableau dynamique des horaires :
     - **Mercredi à Vendredi** : 08h30 – 18h00
     - **Samedi** : 07h30 – 16h00 (créneaux matinaux)
     - **Dimanche, Lundi & Mardi** : Fermé
   - Informations d'accès : Métro (Étangs Noirs / Osseghem), Tram 82, Plus Code Google Maps (`V859+2Q Sint-Jans-Molenbeek`).
   - Carte interactive intégrée avec lien d'itinéraire GPS.

10. **Module de Réservation en 3 Étapes (Wizard Modal)** :
    - Étape 1 : Choix de la prestation avec prévisualisation du tarif et diagnostic offert.
    - Étape 2 : Date & créneau horaire avec blocage automatique des jours de fermeture (dimanche, lundi, mardi) et adaptation aux horaires spécifiques du samedi.
    - Étape 3 : Coordonnées du client et récapitulatif instantané.
    - Écran de succès avec génération automatique d'un message pré-rempli pour envoi via **WhatsApp** ou confirmation par appel direct au `+32 2 410 60 04`.

11. **Curseur Magnétique & Micro-Interactions** :
    - Curseur personnalisé sur ordinateur avec point d'or et aura fluide qui s'agrandit au survol des éléments interactifs.
    - Barre fixe d'action rapide sur mobile (Appeler / Prendre RDV).

---

## 📁 Structure du Projet

```
MyFirstProject/
├── index.html              # Balisage sémantique HTML5 complet
├── css/
│   └── style.css           # Feuille de style CSS3 luxury & animations fluides
├── js/
│   └── main.js             # Logique applicative, calcul horaire & wizard
├── assets/
│   └── images/             # 33 photographies réelles du salon France Laure
├── package.json            # Configuration et scripts de démarrage
└── README.md               # Documentation complète du projet
```

---

## 💻 Démarrage Local

Le projet est conçu en HTML5/CSS3/JavaScript pur, sans dépendance lourde, prêt pour tout hébergement statique (GitHub Pages, Netlify, Vercel, Apache, Nginx).

Pour lancer un serveur local :

```bash
# Avec Node.js :
npx serve .

# Ou avec Python 3 :
python -m http.server 8080
```

Puis ouvrez votre navigateur à l'adresse : `http://localhost:8080` (ou le port affiché par serve).
