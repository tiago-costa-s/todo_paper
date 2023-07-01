
// Inputs
const todoInput = document.querySelector("#to-do-input");
const searchInput = document.querySelector("#input-search");
const editInput = document.querySelector("#input-edit");
const todosList = document.querySelector(".to-dos-list");
// Botões
const buttonsThemes = document.querySelectorAll("#themes-colors li");
const createTodo = document.querySelector(".create-to-do");
const saveEdit = document.querySelector("#save-edit");
const returnEdit = document.querySelector("#return-edit");
// Elementos
const todoContainer = document.querySelector(".to-do-container");
const header = document.querySelector(".to-do-header");
const titleH2 = document.querySelector(".title-h2");
const toDoSearch = document.querySelector(".to-do-search");
const editTodo = document.querySelector(".edit-to-do");

let oldInputValue;

// Funções
// altera a cor do todo paper
buttonsThemes.forEach((btn) => {
    btn.addEventListener("click", (e) => {

        buttonsThemes.forEach((btn) => {
            btn.querySelector(".color").classList.remove("selected");
        });

        btn.querySelector(".color").classList.add("selected");

        if (btn.id === "paper") {
            console.log("Paper")
        }

        if (btn.id === "pink") {
            console.log("Pink")
        }

        if (btn.id === "violet") {
            header.classList.add("theme-violet-background");
            todoContainer.classList.add("theme-violet-lower-background");
            createTodo.classList.add("theme-violet-border");
            titleH2.classList.add("theme-violet-color");
            toDoSearch.classList.add("theme-violet-border");
            editTodo.classList.add("theme-violet-border");
            console.log("Violet")
        }
    });
});

// exibe a btnção de editar os to dos.
function toggleForms() {
    createTodo.classList.toggle("hide");
    toDoSearch.classList.toggle("hide");
    editTodo.classList.toggle("hide");
    todosList.classList.toggle("hide");
};

// atualizar um to do existente
const updateTodo = (text) => {
    const todos = document.querySelectorAll(".to-do");

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");

        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;
            console.log(todoTitle);
        }
    });
};

// cria o todo e salva
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
};

// salva os dados do to do e leva para edição.

// editar o to do criado.

// Eventos
// salva o valor do input dentro do h3
createTodo.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;
    if (inputValue) {
        // enableTodosLists();
        saveTodo(inputValue);
    }
});

// permite acionar as funções dos elementos dinâmicos do to do.
document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest(".to-do");

    let todoTitle;

    if (parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if (targetEl.classList.contains("btn-finish")) {
        parentEl.classList.toggle("done");
        console.log("Evento finish");
    }

    if (targetEl.classList.contains("btn-edit")) {
        toggleForms();

        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }

    if (targetEl.classList.contains("btn-delete")) {
        console.log("Evento delete");
        parentEl.remove();

        let todo = document.querySelector(".to-do")
        if (!todo) {
            todosList.classList.toggle("hide")
        }
    }
});


saveEdit.addEventListener("click", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;

    if (editInputValue) {
        updateTodo(editInputValue);
    }

    toggleForms();
});

// cancela a edição do to do.
returnEdit.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();
});