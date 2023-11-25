let clientesSalvos = localStorage.getItem('clientes');
clientesSalvos = JSON.parse(clientesSalvos);
const container = document.querySelector(".clientes-cadastrados");
const saveBtn = document.querySelector("#saveEdit");
const closeBtn = document.querySelector("#closeEdit");
const editform = document.querySelector("#update-form");
const modal = document.querySelector(".modal-container");


editform.addEventListener("submit", (e) => {
    e.preventDefault()
})

saveBtn.addEventListener("click", () => {
    salvaEdit();
})

closeBtn.addEventListener("click", () => {
    modal.classList.remove("on");
})

// Função para carregar os clientes ao carregar a página
function carregarClientes() {
    let clientesSalvos = localStorage.getItem('clientes');

    if (!clientesSalvos) {
        clientesSalvos = [];
    } else {
        clientesSalvos = JSON.parse(clientesSalvos);
    }

    if (!Array.isArray(clientesSalvos)) {
        clientesSalvos = [];
    }

    clientesSalvos.forEach((cliente, index) => {
        criaCard(cliente, index);
    });
}

// Função para excluir um cliente da localStorage e atualizar a lista
function excluirClienteConsulta(index) {
    let clientesSalvos = localStorage.getItem('clientes');

    if (!clientesSalvos) {
        clientesSalvos = [];
    } else {
        clientesSalvos = JSON.parse(clientesSalvos);
    }

    clientesSalvos.splice(index, 1); // Remove o cliente da lista
    localStorage.setItem('clientes', JSON.stringify(clientesSalvos)); // Atualiza a lista na localStorage
    carregarClientes(); // Recarrega a lista na página
    window.location.reload();

}

// Função para criar um card para cada cliente
function criaCard(cliente, index) {
    // Cria uma div
    const clienteDiv = document.createElement("div");
    // Adiciona essa div à classe cliente
    clienteDiv.classList.add("cliente");

    const nome = document.createElement("h3");
    nome.innerText = `${cliente.nome} ${cliente.sobrenome}`;

    const uf = document.createElement("p");
    uf.innerText = `Uf: ${cliente.ufCliente}`;

    const data = document.createElement("p");
    data.innerText = `Data de nascimento: ${cliente.dataNascimento}`;

    const cep = document.createElement("p");
    cep.innerText = `Cep: ${cliente.cep}`;

    const cidade = document.createElement("p");
    cidade.innerText = `Cidade: ${cliente.cidade}`;

    const endereco = document.createElement("p");
    endereco.innerText = `Endereço: ${cliente.endereco}`;

    const numero = document.createElement("p");
    numero.innerText = `N°: ${cliente.numero}`;

    const btns = document.createElement("div");
    btns.classList.add("btns");

    btns.innerHTML = `<button class="editar" onclick="abreModal(${index})">Editar</button>
    <button class="excluir" onclick="excluirClienteConsulta(${index})">Excluir</button>`;

    clienteDiv.appendChild(nome);
    clienteDiv.appendChild(uf);
    clienteDiv.appendChild(data);
    clienteDiv.appendChild(cep);
    clienteDiv.appendChild(cidade);
    clienteDiv.appendChild(endereco);
    clienteDiv.appendChild(numero);
    clienteDiv.appendChild(btns);

    container.appendChild(clienteDiv);
}

//abre o modal/formulario de edição e preenche com os dados do cliente
function abreModal(index) {
    modal.classList.add("on");
    const nome = document.querySelector("#nome");
    nome.value = clientesSalvos[index].nome;

    const sobrenome = document.querySelector("#sobrenome");
    sobrenome.value = clientesSalvos[index].sobrenome;

    const uf = document.querySelector("#uf-cliente"); // Alterado para #uf-cliente
    uf.value = clientesSalvos[index].ufCliente;

    const dataNasc = document.querySelector("#data-nasc");
    dataNasc.value = clientesSalvos[index].dataNascimento;

    const cep = document.querySelector("#cep");
    cep.value = clientesSalvos[index].cep;

    const cidade = document.querySelector("#cidade");
    cidade.value = clientesSalvos[index].cidade;

    const endereco = document.querySelector("#endereco");
    endereco.value = clientesSalvos[index].endereco;

    const numero = document.querySelector("#numero");
    numero.value = clientesSalvos[index].numero;

    saveBtn.dataset.index = index;
}

//salva as alterações no objeto cliente e salva no array clientes
function salvaEdit() {
    const nome = document.querySelector("#nome").value;
    const sobrenome = document.querySelector("#sobrenome").value;
    const uf = document.querySelector("#uf-cliente").value; // Alterado para #uf-cliente
    const dataNasc = document.querySelector("#data-nasc").value;
    const cep = document.querySelector("#cep").value;
    const cidade = document.querySelector("#cidade").value;
    const endereco = document.querySelector("#endereco").value;
    const numero = document.querySelector("#numero").value;

    const index = parseInt(saveBtn.dataset.index);

    if (index >= 0 && index < clientesSalvos.length) {
        clientesSalvos[index] = {
            nome: nome,
            sobrenome: sobrenome,
            dataNascimento: dataNasc,
            ufCliente: uf,
            cep: cep,
            cidade: cidade,
            endereco: endereco,
            numero: numero
        };

        localStorage.setItem('clientes', JSON.stringify(clientesSalvos));
        modal.classList.remove("on");
        window.location.reload(); // Recarrega a página apenas após a atualização dos dados
    }
}

// Carregar cliente
window.onload = function () {
    carregarClientes(); // Carrega a lista de clientes quando a página é carregada
};
