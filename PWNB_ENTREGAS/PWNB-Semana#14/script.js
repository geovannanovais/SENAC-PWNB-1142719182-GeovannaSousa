class Cliente {
  constructor(nome, sobrenome, ufCliente, dataNascimento, cep, cidade, endereco, numero) {
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.ufCliente = ufCliente;
    this.dataNascimento = dataNascimento;
    this.cep = cep;
    this.cidade = cidade;
    this.endereco = endereco;
    this.numero = numero;
  }
}

const nome = document.querySelector("#nome");
const sobrenome = document.querySelector("#sobrenome");
const ufCliente = document.querySelector("#uf-cliente");
const dataNascimento = document.querySelector("#data-nascimento");
const cep = document.querySelector("#cep");
const cidade = document.querySelector("#cidade");
const endereco = document.querySelector("#endereco");
const numero = document.querySelector("#numero");

let clientesSalvos = localStorage.getItem('clientes');

const regNome = new RegExp("[A-z ]{6,100}");

const regSobrenome = new RegExp("[A-z ]{2,100}");

const regCep = new RegExp("[0-9]{5}-[0-9]{3}");

const regUfCliente = new RegExp("^(al|am|ap|ba|ce|df|es|go|ma|mg|ms|mt|pa|pb|pe|pi|pr|rj|rn|ro|rr|rs|sc|se|sp|to)$");

const regDataNascimento = /^(19\d{2}|20\d{2})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

function validar() {

  if (!regNome.test(nome.value)) {
    alert("Informe um nome completo!");
    nome.focus();
    return false;
  }

  if (!regSobrenome.test(sobrenome.value)) {
    alert("Informe um sobrenome!");
    sobrenome.focus();
    return false;
  }

  if (!regCep.test(cep.value)) {
    alert("Informe um CEP válido!");
    cep.focus();
    return false;
  }

  if (!regUfCliente.test(ufCliente.value)) {
    alert("Selecione um uf de cliente válido!");
    ufCliente.focus();
    return false;
  }

  if (!regDataNascimento.test(dataNascimento.value)) {
    alert("Informe uma data de nascimento válida: AAAA-MM-DD!");
    dataNascimento.focus();
    return false;
  }

  return true;
}

const clientes = [];
let clienteIndex = -1;

function preencherFormulario(index) {
  const cliente = clientes[index];
  document.getElementById("nome").value = cliente.nome;
  document.getElementById("sobrenome").value = cliente.sobrenome;
  document.getElementById("uf-cliente").value = cliente.ufCliente;
  document.getElementById("data-nascimento").value = cliente.dataNascimento;
  document.getElementById("cep").value = cliente.cep;
  document.getElementById("cidade").value = cliente.cidade;
  document.getElementById("endereco").value = cliente.endereco;
  document.getElementById("numero").value = cliente.numero;
  clienteIndex = index;
  document.getElementById("salvar").style.display = "none";
}

function salvarCliente() {
  const nomeCliente = nome.value;
  const sobrenomeCliente = sobrenome.value;
  const ufClienteCliente = ufCliente.value;
  const dataNascimentoCliente = dataNascimento.value;
  const cepCliente = cep.value;
  const cidadeCliente = cidade.value;
  const enderecoCliente = endereco.value;
  const numeroCliente = numero.value;

  if (nomeCliente && sobrenomeCliente && ufClienteCliente && dataNascimentoCliente && cepCliente && cidadeCliente && enderecoCliente && numeroCliente) {
    const novoCliente = new Cliente(nomeCliente, sobrenomeCliente, ufClienteCliente, dataNascimentoCliente, cepCliente, cidadeCliente, enderecoCliente, numeroCliente);
    adicionarCliente(novoCliente);

    if (!clientesSalvos) {
      clientesSalvos = [];
    } else {
      clientesSalvos = JSON.parse(clientesSalvos);
    }

    clientesSalvos.push(novoCliente);

    localStorage.setItem('clientes', JSON.stringify(clientesSalvos));

    alert("Cliente salvo!");
    document.getElementById("cliente-form").reset();

  } else {
    alert("Preencha todos os campos corretamente.");
  }
}

function adicionarCliente(cliente) {
  if (clienteIndex === -1) {
    clientes.push(cliente);
  } else {
    clientes[clienteIndex] = cliente;
    clienteIndex = -1;
  }

}

function limparCampos() {
  document.getElementById("cliente-form").reset();
  clienteIndex = -1;
  document.getElementById("alterar").style.display = "none";
  document.getElementById("salvar").style.display = "block";
}