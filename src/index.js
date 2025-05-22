// Classe factory que cria os usuários
class UsuarioFactory {
    static criarUsuario(nome, sobrenome, email, telefone, dataNascimento) {
        return { nome, sobrenome, email, telefone, dataNascimento };
    }
}

// funcao para obter os dados do formulário e criar um usuário
function cadastrarUsuario(event) {
    event.preventDefault();

    // obtem os dados do formulário
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('numero').value;
    const dataNascimento = document.getElementById('data').value;

    if (!nome || !sobrenome || !email || !telefone || !dataNascimento) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    if (usuarios.some(usuario => usuario.email === email)) {
        alert('Este e-mail já está cadastrado.');
        return;
    }

    // cricão e armazenamento do novo usuário
    const usuario = UsuarioFactory.criarUsuario(nome, sobrenome, email, telefone, dataNascimento);
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    console.log('Usuário cadastrado:', usuario);
    document.querySelector('form').reset();
}

// função para atualizar a lista de usuários cadastrados
function atualizarListaUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuariosDiv = document.getElementById('usuariosCadastrados');

    usuariosDiv.innerHTML = '';

    if (usuarios.length === 0) {
        usuariosDiv.innerHTML = '<p>Nenhum usuário cadastrado.</p>';
        return;
    }

    // cria uma lista para exibir os usuários
    const lista = document.createElement('ul');
    usuarios.forEach((usuario, index) => {
        const item = document.createElement('h2');
        item.textContent = `${usuario.nome} - ${usuario.email}`;

        // botão para remover o usuário
        const removerBtn = document.createElement('button');
        removerBtn.textContent = 'Remover';
        removerBtn.onclick = () => {
            if (confirm('Tem certeza que deseja remover este usuário?')) {
                removerUsuario(index);
            }
        };

        item.appendChild(removerBtn);
        lista.appendChild(item);
    });
  usuariosDiv.appendChild(lista);
}

// mostra a lista de usuários cadastrados
function consultarUsuario(event) {
    event.preventDefault();
    toggleContainers('.containerCadastrar', '.containerConsultar');
    atualizarListaUsuarios();
}

// funcão para voltar ao container de cadastro
function voltarCadastro(event) {
    event.preventDefault();
    toggleContainers('.containerConsultar', '.containerCadastrar');
    atualizarListaUsuarios();
}

// funcão para alternar a exibição de containers
function toggleContainers(containerToHide, containerToShow) {
    document.querySelector(containerToHide).style.display = 'none';
    document.querySelector(containerToShow).style.display = 'block';
}

// funcao para remover um usuário
function removerUsuario(index) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.splice(index, 1); // Remove o usuário pelo índice
    localStorage.setItem('usuarios', JSON.stringify(usuarios)); // Atualiza o localStorage
    atualizarListaUsuarios(); // Atualiza a lista na tela
}

window.onload = atualizarListaUsuarios;

// Adiciona os eventos dos botões
document.querySelector('form').addEventListener('submit', cadastrarUsuario);
document.getElementById('consultar').addEventListener('click', consultarUsuario);
document.getElementById('cadastrar').addEventListener('click', voltarCadastro);