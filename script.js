let values = [];
let input = document.getElementById("task");
let ul = document.getElementById("list");

//Ao pressionar enter adiciona a tarefa
document.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addItem();
  }
});

//Recarrega as funções e os valores do localStorage
window.onload = function () {
  values = JSON.parse(localStorage.getItem("valuesList")) || [];
  updateScreen();
};
//Adiciona tarefas
function addItem() {
  if (input.value.length > 0) {
    let value = {
      id: Date.now(),
      description: input.value,
      done: false,
    };
    values.push(value);
    updateScreen();
    input.value = "";
  } else {
    alert("O campo não pode estar em branco, digite o nome da tarefa");
  }
}

function updateScreen() {
  ul.innerHTML = "";
  values.forEach((value) => {
    //Cria elemento li e atribui o texto ao html de cada valor do array
    let li = document.createElement("li");
    li.textContent = value.description;
    //Adiciona o id a cada li
    li.setAttribute("id", value.id);
    //Recarrega função crossOut
    li.addEventListener("click", function () {
      crossOut(value.id);
    });
    //Cria o elemento botão para excluír a tarefa
    let DelBtn = document.createElement("button");
    DelBtn.appendChild(document.createTextNode(""));
    //Recarrega função deleteItem
    DelBtn.addEventListener("click", function () {
      deleteItem(value.id);
    });

    //Altera classe da tarefa para marcar como concluída
    if (value.done) li.classList.add("done");

    //Adiciona elemento filho ao pai (botão excluir ---> li e li ---> ul)
    li.appendChild(DelBtn);
    ul.appendChild(li);
  });
  //Adiciona valores ao localStorage
  localStorage.setItem("valuesList", JSON.stringify(values));
}
//Marca a tarefa como concluída, filtra pelo id e remove o item do array
function crossOut(id) {
  values = values.filter((value) => {
    if (value.id == id) {
      value.done = !value.done;
    }
    return value;
  });
  updateScreen();
}
//Deletar tarefa
function deleteItem(id) {
  let deleteItem = confirm("Deseja excluir a tarefa?");
  if (deleteItem) {
    values = values.filter((value) => value.id != id);
    updateScreen();
    //Delay ao realizar a exclusão da tarefa
    setTimeout(() => alert("Tarefa excluída com sucesso"), 10);
  }
}
