import { API_URL, buildUrl } from './config.js';

/**
 * Affiche une photo et ses informations dans la page
 * @param {Object} photoData - Les données de la photo à afficher
 */
export const displayPicture = (photoData) => {
    const photoContainer = document.querySelector('#la_photo');
    if (!photoContainer) return;

    // Utiliser buildUrl pour construire l'URL complète de l'image
    const imageUrl = buildUrl(photoData.photo.url.href);

    const template = `
        <div class="photo-details">
            <h2>${photoData.photo.titre}</h2>
            <img src="${imageUrl}" alt="${photoData.photo.titre}">
            <p class="description">${photoData.photo.descr || ''}</p>
            <div class="metadata">
                <p>Format: ${photoData.photo.format}</p>
                <p>Taille: ${photoData.photo.size} octets</p>
                <p>Dimensions: ${photoData.photo.width}x${photoData.photo.height}</p>
            </div>
        </div>
    `;

    photoContainer.innerHTML = template;
};

/**
 * Affiche la catégorie d'une photo
 * @param {Object} categoryData - Les données de la catégorie
 */
export const displayCategory = (categoryData) => {
    const categoryContainer = document.querySelector('#la_categorie');
    if (!categoryContainer) return;

    categoryContainer.innerHTML = `
        <h3>Catégorie: ${categoryData.categorie.nom}</h3>
        <p>${categoryData.categorie.descr || ''}</p>
    `;
};

/**
 * Affiche les commentaires d'une photo
 * @param {Object} commentsData - Les données des commentaires
 */
export const displayComments = (commentsData) => {
    const commentsContainer = document.querySelector('#les_commentaires');
    if (!commentsContainer) return;

    const commentsList = commentsData.comments.map(comment => `
        <li class="comment">
            <h4>${comment.titre}</h4>
            <p>${comment.content}</p>
            <div class="metadata">
                Par ${comment.pseudo} le ${comment.created_at}
            </div>
        </li>
    `).join('');

    commentsContainer.innerHTML = commentsList;
}; 