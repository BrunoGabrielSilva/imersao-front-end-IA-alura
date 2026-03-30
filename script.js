// Script para alternar entre dark e light mode e capturar perfil selecionado

document.addEventListener('DOMContentLoaded', function() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Ícones
    const sunIcon = '☀️';
    const moonIcon = '🌙';

    // Função para atualizar ícone baseado no modo atual
    function updateIcon() {
        if (body.classList.contains('light-mode')) {
            themeToggleBtn.innerHTML = sunIcon;
        } else {
            themeToggleBtn.innerHTML = moonIcon;
        }
    }

    // Verificar se há preferência salva no localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
    }
    updateIcon();

    // Event listener para o botão
    themeToggleBtn.addEventListener('click', function() {
        body.classList.toggle('light-mode');
        updateIcon();

        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });

    // Capturar clique nos perfis e guardar dados no localStorage
    const profileLinks = document.querySelectorAll('.profile');
    profileLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const profileName = this.getAttribute('data-name');
            const profileImage = this.getAttribute('data-image');
            
            // Guardar dados do perfil no localStorage com os nomes que o catálogo espera
            localStorage.setItem('perfilAtivoNome', profileName);
            localStorage.setItem('perfilAtivoImagem', profileImage);
        });
    });
});