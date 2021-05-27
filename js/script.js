


// 1) referenciar o input

let input = document.querySelector('input[name=tarefa]');


//2)referenciar o button

let button = document.getElementById('botao');

//3)referencia a lista

let lista = document.getElementById('lista');

// pega o json do banco de dados e transforma em um array para ser reproduzido dnv
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function renderizar_tarefas() {
  //Limpar a listagem de itens antes de renderizar novamente a tela

  lista.innerHTML = '';

  for (tarefa of tarefas) { // para cada tarefa dentro de tarefas

    //criar o item da lista
    let itemLista = document.createElement('li'); // cria um elemento 'li'

    //adicionar classes nos itens da lista criada acima
    itemLista.setAttribute('class', 'list-group-item list-group-item-action')

    //adicionar evento de click no item da lista
    itemLista.onclick = function () {   // adicionar um evento de clique ao item da listar que ira realizar uma função
      deletarTarefa(this);
    }

    //criar um texto 
    let itemTexto = document.createTextNode(tarefa); // cada item da lista tarefa
    // sera criado um texto que sera o texto em cada tarefa, ou seja cada tarefa sera o texto da li

    //Adiciona o texto no item da lista 
    itemLista.appendChild(itemTexto);

    //adicionar o item da lista na lista
    lista.appendChild(itemLista);
  }
  removespan(); // remove os spans de erro
}

//executando a função para renderizar as tarefas
renderizar_tarefas();

// 1 Precisamos esccutar o evento de clqiue no botao
button.onclick = function () {

  // 2 capturar o valor digitado pelo usuario

  let nova_tarefa = input.value;
  if (nova_tarefa !== "") {
    tarefas.push(nova_tarefa);

    renderizar_tarefas();

    // limpar o input 
    input.value = '';
    removespan();

    //Salva os novos dados no banco de dados.
    SalvarDadosnoStorage();
  } else {
    removespan(); // remove os spans de erro
    let card = document.querySelector('.card'); // seleciona a classe card

    let span = document.createElement('span'); //seleciona o span
    span.setAttribute('class', 'alert alert-warning'); // atribui ao span um alerta do bootstrap

    let msg = document.createTextNode('Você precisa informar a tarefa'); // cria um texto a variavel msg

    span.appendChild(msg); // a variavel msg vira filha de span
    card.appendChild(span);// span vira filho de card


  }

}

function removespan() {
  let spans = document.querySelectorAll('span'); // recuperando todos spans que são as mensagens de erro

  let card = document.querySelector('.card'); // recuperando o card onde os spans são filhos

  for (let i = 0; i < spans.length; i++) {  // enquanto a variavel i for menor do numero de spans
    card.removeChild(spans[i]);  // remova os filhos spans da classe card
  }
}



function deletarTarefa(tar) { // a função vai receber um parametro

  console.log(tar);

  //remove a tarefa do array
  tarefas.splice(tarefas.indexOf(tar.textContent), 1); // vai remover o texto 

  //renderizar novamente a tela
  renderizar_tarefas();

  //Salva os novos dados no banco de dados.
  SalvarDadosnoStorage();


}
function SalvarDadosnoStorage() {

  //todo navegador web possui essa capacidade de armazenar dados no banco de dados local (storage local)

  // criar um item banco de dados local de nome 'tarefas' , e transforma o array de dados em uma string json.
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}



