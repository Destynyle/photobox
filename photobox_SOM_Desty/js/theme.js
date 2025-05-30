// Gestionnaire de thème
export class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.icon = this.themeToggle.querySelector('i');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        this.initialize();
        this.setupEventListeners();
    }

    initialize() {
        // Appliquer le thème sauvegardé
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.updateIcon();
    }

    setupEventListeners() {
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        this.updateIcon();
    }

    updateIcon() {
        // Mettre à jour l'icône en fonction du thème
        this.icon.className = this.currentTheme === 'light' 
            ? 'fas fa-moon' 
            : 'fas fa-sun';
    }
} 