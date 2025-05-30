import { API_URL, buildUrl } from './config.js';

/**
 * Crée et gère une lightbox pour afficher les photos en plein écran
 */
class Lightbox {
    constructor() {
        this.currentPhotoId = null;
        this.createLightbox();
    }

    /**
     * Crée les éléments HTML de la lightbox
     */
    createLightbox() {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close">&times;</button>
                <button class="lightbox-prev">&lt;</button>
                <button class="lightbox-next">&gt;</button>
                <div class="lightbox-image-container">
                    <img src="" alt="">
                </div>
            </div>
        `;

        document.body.appendChild(lightbox);
        this.setupEventListeners();
    }

    /**
     * Configure les écouteurs d'événements
     */
    setupEventListeners() {
        const lightbox = document.querySelector('.lightbox');
        if (!lightbox) return;

        // Fermeture de la lightbox
        lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
            this.hide();
        });

        // Navigation précédent/suivant
        lightbox.querySelector('.lightbox-prev').addEventListener('click', () => {
            const prevItem = this.findAdjacentPhoto('prev');
            if (prevItem) {
                this.show(prevItem.dataset.photoId);
            }
        });

        lightbox.querySelector('.lightbox-next').addEventListener('click', () => {
            const nextItem = this.findAdjacentPhoto('next');
            if (nextItem) {
                this.show(nextItem.dataset.photoId);
            }
        });

        // Fermeture avec la touche Echap
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hide();
            } else if (e.key === 'ArrowLeft') {
                const prevItem = this.findAdjacentPhoto('prev');
                if (prevItem) {
                    this.show(prevItem.dataset.photoId);
                }
            } else if (e.key === 'ArrowRight') {
                const nextItem = this.findAdjacentPhoto('next');
                if (nextItem) {
                    this.show(nextItem.dataset.photoId);
                }
            }
        });
    }

    /**
     * Trouve la photo adjacente (précédente ou suivante) dans la galerie
     * @param {string} direction - 'prev' ou 'next'
     * @returns {Element|null} L'élément HTML de la photo adjacente ou null
     */
    findAdjacentPhoto(direction) {
        const currentItem = document.querySelector(`[data-photo-id="${this.currentPhotoId}"]`);
        if (!currentItem) return null;

        return direction === 'prev' 
            ? currentItem.previousElementSibling 
            : currentItem.nextElementSibling;
    }

    /**
     * Affiche une photo dans la lightbox
     * @param {string} photoId - L'ID de la photo à afficher
     */
    async show(photoId) {
        const lightbox = document.querySelector('.lightbox');
        if (!lightbox) return;

        this.currentPhotoId = photoId;
        lightbox.classList.add('active');

        try {
            const response = await fetch(`${API_URL}/photos/${photoId}`, {
                credentials: 'include'
            });
            const data = await response.json();
            
            const img = lightbox.querySelector('img');
            const imageUrl = buildUrl(data.photo.url.href);
            img.src = imageUrl;
            img.alt = data.photo.titre;
        } catch (error) {
            console.error('Erreur lors du chargement de la photo:', error);
        }
    }

    /**
     * Cache la lightbox
     */
    hide() {
        const lightbox = document.querySelector('.lightbox');
        if (lightbox) {
            lightbox.classList.remove('active');
        }
    }
}

export default new Lightbox(); 