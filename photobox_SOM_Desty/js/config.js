export const API_URL = "https://webetu.iutnc.univ-lorraine.fr/www/canals5/phox/api";

// Fonction utilitaire pour construire des URLs complètes
export const buildUrl = (path) => {
    const baseUrl = "https://webetu.iutnc.univ-lorraine.fr/www/canals5/phox";
    return new URL(path, baseUrl).href;
}; 