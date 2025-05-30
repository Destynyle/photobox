import { API_URL, buildUrl } from './config.js';

/**
 * Charge les données d'une photo à partir de son ID
 * @param {number} idPicture - L'ID de la photo à charger
 * @returns {Promise} Une promesse qui se résout avec les données de la photo
 */
export const loadPicture = async (idPicture) => {
    try {
        const response = await fetch(`${API_URL}/photos/${idPicture}`, {
            credentials: 'include'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Correction des URLs dans les liens
        if (data.links) {
            Object.entries(data.links).forEach(([key, value]) => {
                if (value && value.href) {
                    data.links[key].href = buildUrl(value.href);
                }
            });
        }
        
        return data;
    } catch (error) {
        console.error('Erreur lors du chargement de la photo:', error);
        throw error;
    }
};

/**
 * Charge une ressource à partir de son URI
 * @param {string} uri - L'URI de la ressource à charger
 * @returns {Promise} Une promesse qui se résout avec les données de la ressource
 */
export const loadResource = async (uri) => {
    try {
        // S'assurer que l'URI est complète
        const fullUri = buildUrl(uri);
        const response = await fetch(fullUri, {
            credentials: 'include'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Erreur lors du chargement de la ressource:', error);
        throw error;
    }
}; 