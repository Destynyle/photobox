import { API_URL, buildUrl } from './config.js';
import { loadResource } from './photoloader.js';

class Gallery {
    constructor() {
        this.currentPage = null;
        this.links = {};
        this.photos = [];
    }

    /**
     * Charge la galerie initiale ou une page spécifique
     * @param {string} url - URL de la page à charger (optionnel)
     * @returns {Promise} Une promesse qui se résout avec les données de la galerie
     */
    async load(url = `${API_URL}/photos`) {
        try {
            const data = await fetch(url, {
                credentials: 'include'
            }).then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            });

            this.photos = data.photos || [];
            
            // Correction des URLs dans les liens
            this.links = {};
            if (data.links) {
                Object.entries(data.links).forEach(([key, value]) => {
                    if (value && value.href) {
                        // Construire l'URL complète pour chaque lien
                        this.links[key] = {
                            href: buildUrl(value.href)
                        };
                    }
                });
            }
            
            this.currentPage = url;
            return data;
        } catch (error) {
            console.error('Erreur lors du chargement de la galerie:', error);
            throw error;
        }
    }

    /**
     * Charge la page suivante de la galerie
     * @returns {Promise} Une promesse qui se résout avec les données de la page suivante
     */
    async next() {
        if (this.links.next) {
            return this.load(this.links.next.href);
        }
        throw new Error('Pas de page suivante disponible');
    }

    /**
     * Charge la page précédente de la galerie
     * @returns {Promise} Une promesse qui se résout avec les données de la page précédente
     */
    async prev() {
        if (this.links.prev) {
            return this.load(this.links.prev.href);
        }
        throw new Error('Pas de page précédente disponible');
    }

    /**
     * Charge la première page de la galerie
     * @returns {Promise} Une promesse qui se résout avec les données de la première page
     */
    async first() {
        if (this.links.first) {
            return this.load(this.links.first.href);
        }
        throw new Error('Lien vers la première page non disponible');
    }

    /**
     * Charge la dernière page de la galerie
     * @returns {Promise} Une promesse qui se résout avec les données de la dernière page
     */
    async last() {
        if (this.links.last) {
            return this.load(this.links.last.href);
        }
        throw new Error('Lien vers la dernière page non disponible');
    }

    /**
     * Vérifie si une page suivante est disponible
     * @returns {boolean}
     */
    hasNext() {
        return !!this.links.next;
    }

    /**
     * Vérifie si une page précédente est disponible
     * @returns {boolean}
     */
    hasPrev() {
        return !!this.links.prev;
    }

    /**
     * Vérifie si on est sur la première page
     * @returns {boolean}
     */
    isFirst() {
        return !this.links.prev;
    }

    /**
     * Vérifie si on est sur la dernière page
     * @returns {boolean}
     */
    isLast() {
        return !this.links.next;
    }
}

export default new Gallery(); 