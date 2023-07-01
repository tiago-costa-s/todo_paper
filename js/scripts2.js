// Elementos
const createTodo = document.querySelector(".create-to-do");
const editTodo = document.querySelector(".edit-to-do");
const toDoSearch = document.querySelector(".to-do-search");
// Inputs
const todoInput = document.querySelector("#to-do-input");
const searchInput = document.querySelector("#input-search");
const editInput = document.querySelector("#input-edit");

// const createBtn = document.querySelector("#create-btn");
const todosList = document.querySelector(".to-dos-list");

const cancelBtn = document.querySelector("#btn-cancelar");

let oldInputValue;

// Funções


// Altera a cor do todo



// Exibe a opção de editar os to dos.
function toggleForms(text) {
    createTodo.classList.toggle("hide");
    toDoSearch.classList.toggle("hide");
    editTodo.classList.toggle("hide");
    todosList.classList.toggle("hide");
}

// Cria o todo e salva
function saveTodo(text) {

    todosList.classList.remove("hide");

    const todo = document.createElement("div");
    todo.classList.add("to-do");
    todosList.appendChild(todo);

    const h3 = document.createElement("h3");
    h3.innerHTML = text;
    todo.appendChild(h3)

    const todoControlButtons = document.createElement("div");
    todoControlButtons.classList.add("to-do-control-buttons");
    todo.appendChild(todoControlButtons);

    const finshBtn = document.createElement("button");
    finshBtn.classList.add("btn-finish");
    finshBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
    todoControlButtons.appendChild(finshBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("btn-edit");
    editBtn.innerHTML = `<i class="fa-solid fa-pencil"></i>`;
    todoControlButtons.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn-delete");
    deleteBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    todoControlButtons.appendChild(deleteBtn);

    todoInput.value = "";

    todoInput.focus();
}


// Salva os dados do to do e leva para edição



// Editar o to do criado



// Cancelar edição do to do.
function cancelEditTodo() {
    toggleForms();
    console.log("Acionado 1");
}

// Eventos
// Salva o valor do input dentro do h3
createTodo.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;
    if (inputValue) {
        // enableTodosLists();
        saveTodo(inputValue);
    }
});

// Permite acionar as funções dos elementos dinâmicos do to do.
document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest(".to-do");

    if (targetEl.classList.contains("btn-finish")) {
        parentEl.classList.toggle("done");
        console.log("Evento finish");
    }

    if (targetEl.classList.contains("btn-edit")) {
        console.log("Evento edit");
        toggleForms();
    }

    if (targetEl.classList.contains("btn-delete")) {
        console.log("Evento delete");
        parentEl.remove();
        disableTodosLists();
    }
});


// Salva a edição do to do.

// Cancela a edição do to do.
cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();

    cancelEditTodo();
});

