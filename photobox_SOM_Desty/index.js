import { loadPicture, loadResource } from './js/photoloader.js';
import { displayPicture, displayCategory, displayComments } from './js/ui.js';
import { displayGallery, updateNavigationButtons, togglePhotoDetail } from './js/gallery_ui.js';
import gallery from './js/gallery.js';
import lightbox from './js/lightbox.js';
import { ThemeManager } from './js/theme.js';

/**
 * Charge et affiche une photo avec sa catégorie et ses commentaires
 * @param {number} id - L'ID de la photo à afficher
 */
const getPicture = async (id) => {
    try {
        togglePhotoDetail(true);
        
        // Chargement et affichage de la photo
        const photoData = await loadPicture(id);
        displayPicture(photoData);

        // Chargement et affichage de la catégorie
        if (photoData.links && photoData.links.categorie) {
            const categoryData = await loadResource(photoData.links.categorie.href);
            displayCategory(categoryData);
        }

        // Chargement et affichage des commentaires
        if (photoData.links && photoData.links.comments) {
            const commentsData = await loadResource(photoData.links.comments.href);
            displayComments(commentsData);
        }
    } catch (error) {
        console.error('Erreur lors du chargement de la photo:', error);
    }
};

/**
 * Charge et affiche la galerie
 */
const loadAndDisplayGallery = async () => {
    try {
        const data = await gallery.load();
        displayGallery(data.photos);
        updateNavigationButtons(gallery);
    } catch (error) {
        console.error('Erreur lors du chargement de la galerie:', error);
    }
};

// Gestionnaires d'événements pour la navigation dans la galerie
document.querySelector('#load-gallery')?.addEventListener('click', loadAndDisplayGallery);

document.querySelector('#next-page')?.addEventListener('click', async () => {
    try {
        const data = await gallery.next();
        displayGallery(data.photos);
        updateNavigationButtons(gallery);
    } catch (error) {
        console.error('Erreur lors du chargement de la page suivante:', error);
    }
});

document.querySelector('#prev-page')?.addEventListener('click', async () => {
    try {
        const data = await gallery.prev();
        displayGallery(data.photos);
        updateNavigationButtons(gallery);
    } catch (error) {
        console.error('Erreur lors du chargement de la page précédente:', error);
    }
});

document.querySelector('#first-page')?.addEventListener('click', async () => {
    try {
        const data = await gallery.first();
        displayGallery(data.photos);
        updateNavigationButtons(gallery);
    } catch (error) {
        console.error('Erreur lors du chargement de la première page:', error);
    }
});

document.querySelector('#last-page')?.addEventListener('click', async () => {
    try {
        const data = await gallery.last();
        displayGallery(data.photos);
        updateNavigationButtons(gallery);
    } catch (error) {
        console.error('Erreur lors du chargement de la dernière page:', error);
    }
});

// Gestionnaire d'événements pour le clic sur une photo de la galerie
document.querySelector('#gallery')?.addEventListener('click', (event) => {
    const galleryItem = event.target.closest('.gallery-item');
    if (galleryItem) {
        const photoId = galleryItem.dataset.photoId;
        if (photoId) {
            // Affiche la photo en mode lightbox
            lightbox.show(photoId);
            // Met à jour les détails sous la galerie
            getPicture(photoId);
        }
    }
});

// Chargement initial basé sur le hash de l'URL
const init = () => {
    const hash = window.location.hash;
    if (hash) {
        const photoId = hash.substring(1); // Enlève le # du début
        getPicture(photoId);
    }
};

// Écoute les changements de hash dans l'URL
window.addEventListener('hashchange', () => {
    const photoId = window.location.hash.substring(1);
    if (photoId) {
        getPicture(photoId);
    }
});

// Initialisation au chargement de la page
window.addEventListener('load', () => {
    init();
    // Initialiser le gestionnaire de thème
    new ThemeManager();
});
