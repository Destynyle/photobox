# PhotoBox - Galerie de Photos

Projet réalisé par Desty SOM dans le cadre du TD6 sur la programmation web en JavaScript.

## Description du Projet

PhotoBox est une application web de galerie photos qui utilise l'API REST de l'IUT Nancy-Charlemagne. Le projet met en pratique l'utilisation des promesses et des requêtes AJAX asynchrones avec l'API Fetch.

## Exercices Réalisés

### Exercice 1 : Afficher une Image

#### Étape 1 : Récupération des Données
- Création du module `photoloader` pour l'interaction avec l'API
- Implémentation de la fonction `loadPicture(idPicture)`
- Configuration séparée dans un module dédié

#### Étape 2 : Affichage de l'Image
- Création du module `ui` pour la gestion de l'interface
- Implémentation de `displayPicture` avec template Handlebars
- Affichage des données descriptives de l'image

#### Étape 3 : Requêtes Complémentaires
- Ajout de la fonction `loadResource` pour les requêtes supplémentaires
- Affichage de la catégorie de l'image
- Intégration des commentaires
- Utilisation des liens (URI) fournis dans les réponses

### Exercice 2 : Afficher une Galerie de Photos

- Implémentation de l'affichage des vignettes
- Création du module `gallery` pour la gestion des galeries
- Mise en place du module `gallery_ui` pour l'affichage
- Gestion des événements de clic sur les vignettes

### Exercice 3 : Navigation dans les Galeries

- Implémentation de la pagination
- Ajout des boutons de navigation (suivant/précédent)
- Gestion des pages première/dernière
- Stockage des informations de navigation

### Exercice 4 : Affichage Détaillé des Photos

- Affichage des photos en format original
- Intégration avec la galerie
- Gestion des métadonnées et des commentaires

### Exercice 5 (Bonus) : Mode Lightbox

- Implémentation du mode plein écran
- Navigation entre les images en mode lightbox
- Bouton de fermeture
- Navigation précédent/suivant dans la lightbox

## Améliorations Personnalisées

### 1. Système de Thèmes
- Implémentation d'un mode clair/sombre
- Transition fluide entre les thèmes
- Persistance du choix utilisateur
- Variables CSS personnalisées pour une cohérence visuelle

### 2. Interface Utilisateur Améliorée
- Design responsive
- Animations fluides
- Meilleure organisation visuelle des commentaires
- Hiérarchie visuelle claire

### 3. Gestion des Droits d'Auteur
- Ajout des mentions de copyright
- Attribution claire du projet
- Protection des droits d'auteur

## Technologies Utilisées

- HTML5
- CSS3 (avec variables CSS personnalisées)
- JavaScript (ES6+)
- API Fetch
- Handlebars (templating)
- LocalStorage pour la persistance

## Installation et Utilisation

1. Cloner le repository https://github.com/Destynyle/photobox/tree/main
2. S'assurer d'avoir une connexion à l'API de l'IUT (VPN @etu ou credentials)
3. Ouvrir le fichier `index.html` dans un navigateur

## Configuration de l'API

Pour accéder à l'API, deux options sont disponibles :
1. Utiliser le VPN avec à la fin de l'identifiant @etu (ou @prof pour vous ?)
2. Ajouter `{ credentials: 'include' }` dans les requêtes fetch



Application disponible en ligne :  https://photobox-desty-som.netlify.app
## Auteur

Desty SOM

## Droits d'Auteur

© 2024 PhotoBox - Tous droits réservés 
