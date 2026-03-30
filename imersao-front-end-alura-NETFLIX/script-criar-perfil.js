// Elementos do DOM
const profileForm = document.getElementById('profile-form');
const profileNameInput = document.getElementById('profile-name');
const charUsedSpan = document.getElementById('char-used');
const previewSection = document.getElementById('preview');
const previewAvatar = document.getElementById('preview-avatar');
const previewName = document.getElementById('preview-name');
const avatarRadios = document.querySelectorAll('input[name="avatar"]');

// Contador de caracteres
profileNameInput.addEventListener('input', (e) => {
    const count = e.target.value.length;
    charUsedSpan.textContent = count;
    updatePreview();
});

// Atualizar preview ao mudar avatar
avatarRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
        updatePreview();
    });
});

// Função para atualizar preview
function updatePreview() {
    const profileName = profileNameInput.value.trim();
    const selectedAvatar = document.querySelector('input[name="avatar"]:checked');

    if (profileName && selectedAvatar) {
        previewSection.hidden = false;
        previewAvatar.src = selectedAvatar.value;
        previewAvatar.alt = `Avatar do perfil ${profileName}`;
        previewName.textContent = profileName;
    } else {
        previewSection.hidden = true;
    }
}

// Submeter formulário
profileForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const profileName = profileNameInput.value.trim();
    const selectedAvatar = document.querySelector('input[name="avatar"]:checked').value;

    if (!profileName) {
        alert('Por favor, digite um nome para o perfil.');
        return;
    }

    // Salvar novo perfil no localStorage
    const newProfile = {
        name: profileName,
        image: selectedAvatar,
        createdAt: new Date().toISOString(),
    };

    // Obter perfis existentes ou criar array vazio
    const existingProfiles = JSON.parse(localStorage.getItem('novosPerfs') || '[]');

    // Adicionar novo perfil
    existingProfiles.push(newProfile);

    // Salvar de volta no localStorage
    localStorage.setItem('novosPerfs', JSON.stringify(existingProfiles));

    // Definir como perfil ativo e redirecionar
    localStorage.setItem('perfilAtivoNome', profileName);
    localStorage.setItem('perfilAtivoImagem', selectedAvatar);

    // Redirecionar para a página inicial após 1 segundo
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
});

// Inicializar preview vazio
updatePreview();
