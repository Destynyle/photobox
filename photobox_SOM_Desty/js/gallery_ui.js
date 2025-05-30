import { API_URL, buildUrl } from './config.js';

/**
 * Affiche la galerie de photos
 * @param {Array} photos - Tableau des photos à afficher
 */
export const displayGallery = (photos) => {
    const galleryContainer = document.querySelector('#gallery');
    if (!galleryContainer) return;

    const photosHTML = photos.map(photo => {
        // Utiliser buildUrl pour construire l'URL complète de la vignette
        const thumbnailUrl = buildUrl(photo.photo.thumbnail.href);
        return `
            <div class="gallery-item" data-photo-id="${photo.photo.id}">
                <img src="${thumbnailUrl}" alt="${photo.photo.titre}">
                <div class="gallery-item-info">
                    <h3>${photo.photo.titre}</h3>
                </div>
            </div>
        `;
    }).join('');

    galleryContainer.innerHTML = photosHTML;
};

/**
 * Met à jour l'état des boutons de navigation
 * @param {Object} gallery - Instance de la galerie
 */
export const updateNavigationButtons = (gallery) => {
    const prevButton = document.querySelector('#prev-page');
    const nextButton = document.querySelector('#next-page');
    const firstButton = document.querySelector('#first-page');
    const lastButton = document.querySelector('#last-page');

    if (prevButton) prevButton.disabled = !gallery.hasPrev();
    if (nextButton) nextButton.disabled = !gallery.hasNext();
    if (firstButton) firstButton.disabled = gallery.isFirst();
    if (lastButton) lastButton.disabled = gallery.isLast();
};

/**
 * Affiche ou masque la section de détail d'une photo
 * @param {boolean} show - true pour afficher, false pour masquer
 */
export const togglePhotoDetail = (show) => {
    const photoSection = document.querySelector('#photo');
    if (photoSection) {
        photoSection.style.display = show ? 'block' : 'none';
    }
}; 