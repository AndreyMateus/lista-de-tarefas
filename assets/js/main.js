const inputTarefa = document.querySelector(".input-tarefa");
const botaoAdicionartarefa = document.querySelector(".botao-adicionar-tarefa");
const listaTarefas = document.querySelector(".lista-tarefas");

function criaItemTarefaDaLista(tarefaStorage) {
  const itemListaTarefa = document.createElement("li");

  if (tarefaStorage !== undefined) {
    itemListaTarefa.innerText = tarefaStorage;
  } else {
    itemListaTarefa.innerText = inputTarefa.value;
  }

  itemListaTarefa.setAttribute("class", "tarefa-da-lista");

  const botaoExcluir = criarBotaoExcluir();
  itemListaTarefa.appendChild(botaoExcluir);

  listaTarefas.appendChild(itemListaTarefa);
  limparInputTarefa();
  salvarTarefasNoStorage();
}

function criarBotaoExcluir() {
  const botao = document.createElement("button");
  botao.setAttribute("class", "botao-excluir");
  botao.setAttribute("type", "text");
  botao.setAttribute("title", "Tarefa da lista de tarefas");
  return botao;
}

function limparInputTarefa() {
  inputTarefa.value = "";
  inputTarefa.focus();
}

function deletarTarefa(elementoClicado) {
  if (elementoClicado.classList.contains("botao-excluir"))
    elementoClicado.parentElement.remove();
}

function listarTarefasNoStorage() {
  const todasAstarefasDoJson = localStorage.getItem("tarefas");
  const todasAstarefasDoJsonAoNormal = JSON.parse(todasAstarefasDoJson);

  for (let tarefa of todasAstarefasDoJsonAoNormal) {
    criaItemTarefaDaLista(tarefa);
  }
}

function salvarTarefasNoStorage() {
  const todasLiDeTarefas = document.querySelectorAll("li");
  const todasAstarefas = [];

  for (let li of todasLiDeTarefas) {
    todasAstarefas.push(li.innerText);
  }
  const todasAstarefasEmJson = JSON.stringify(todasAstarefas);
  localStorage.setItem("tarefas", todasAstarefasEmJson);
}

function deletarTarefaNoStorage() {
  //! Se você está lendo o código, saiba que aqui "não excluimos as tarefas do localStorage", apenas retiramos o ELEMENTO do HTML e fazemos o RECADASTRAMENTO de todos que ficaram por lá, automaticamente a tarefa sumirá do localStorage.
  salvarTarefasNoStorage();
}

botaoAdicionartarefa.addEventListener("click", function (event) {
  if (inputTarefa.value === "") return;
  criaItemTarefaDaLista();
});

inputTarefa.addEventListener("keypress", function (event) {
  if (inputTarefa.value === "") return;
  if (event.keyCode === 13) criaItemTarefaDaLista();
});

document.addEventListener("click", function (event) {
  const elementoClicado = event.target;

  deletarTarefa(elementoClicado);
  deletarTarefaNoStorage();
});

// Execução das funções
listarTarefasNoStorage();
