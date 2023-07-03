// Inputs
const todoInput = document.querySelector("#to-do-input");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const editInput = document.querySelector("#input-edit");
const todosList = document.querySelector(".to-dos-list");
// Botões
const buttonsThemes = document.querySelectorAll("#themes-colors li");
const createTodo = document.querySelector(".create-to-do");
const filterBtn = document.querySelector("#filter-btn");
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

// desabilita o autocomplete dos inputs
function desableAutocomplete() {
    todoInput.setAttribute("autocomplete", "off");
    searchInput.setAttribute("autocomplete", "off");
    editInput.setAttribute("autocomplete", "off");
};

desableAutocomplete();

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


// cria a tarefa e salva
const saveTodo = (text, done = 0, save = 1) => {
    todosList.classList.remove("hide");

    const todo = document.createElement("div");
    todo.classList.add("to-do");

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
    deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    todoControlButtons.appendChild(deleteBtn);

    // utilizando dados da localStorage
    if (done) {
        todo.classList.add("done");
    }

    if (save) {
        saveTodoLocalStorage({ text, done: 0 });
    }

    todosList.appendChild(todo);

    todoInput.value = "";

    todoInput.focus();
};

// exibe e oculta as opições de criação, busca e edição.
function toggleForms() {
    createTodo.classList.toggle("hide");
    toDoSearch.classList.toggle("hide");
    editTodo.classList.toggle("hide");
    todosList.classList.toggle("hide");
};

// atualiza um tarefa existente
const updateTodo = (text) => {
    const todos = document.querySelectorAll(".to-do");

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");

        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;

            updateTodoLocalStorage(oldInputValue, text);
        }
    });
};

const getSearchTodos = (search) => {
    const todos = document.querySelectorAll(".to-do");

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3").innerText.toLowerCase();

        const normalizedSearch = search.toLowerCase();
        todo.style.display = "flex";
        if (!todoTitle.includes(normalizedSearch)) {
            todo.style.display = "none";
            console.log(todoTitle);
        }
    });
};

const filterTodos = (filterValue) => {
    const todos = document.querySelectorAll(".to-do");

    switch (filterValue) {
        case "all":
            todos.forEach((todo) => todo.style.display = "flex");
            break;

        case "done":
            todos.forEach((todo) =>
                todo.classList.contains("done")
                    ? (todo.style.display = "flex")
                    : (todo.style.display = "none")
            );
            break;

        case "todo":
            todos.forEach((todo) =>
                !todo.classList.contains("done")
                    ? (todo.style.display = "flex")
                    : (todo.style.display = "none")
            );
            break;

        default:
            break;
    }
};

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

        updateTodoStatusLocalStorage(todoTitle);
    }

    if (targetEl.classList.contains("btn-edit")) {
        toggleForms();

        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }

    if (targetEl.classList.contains("btn-delete")) {
        parentEl.remove();

        let todo = document.querySelector(".to-do")
        if (!todo) {
            todosList.classList.toggle("hide")
        }

        removeTodoLocalStorage(todoTitle);
    }
});

// salva a edição da tarefa
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

//busca uma tarefa
searchInput.addEventListener("keyup", (e) => {
    const search = e.target.value;

    getSearchTodos(search);
});

// limpa o input de busca
eraseBtn.addEventListener("click", (e) => {
    e.preventDefault();

    searchInput.value = "";

    searchInput.dispatchEvent(new Event("keyup"));
});

// aciona o filtro de tarefas
filterBtn.addEventListener("change", (e) => {
    const filterValue = e.target.value;

    filterTodos(filterValue);
});

// Local Storage

// pega todos os to dos da local storage
const getTodosLocalStorage = () => {
    const todos = JSON.parse(localStorage.getItem("to-do")) || [];

    return todos;
};

// pegar os to dos da localstorage
const loadTodos = () => {
    const todos = getTodosLocalStorage();

    todos.forEach((todo) => {
        saveTodo(todo.text, todo.done, 0);
    });
};

// salvar todos
const saveTodoLocalStorage = (todo) => {
    const todos = getTodosLocalStorage();

    todos.push(todo);

    localStorage.setItem("to-do", JSON.stringify(todos));
};

// remove o to do da local storage
const removeTodoLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage();

    const filteredTodos = todos.filter((todo) => todo.text !== todoText);

    localStorage.setItem("to-do", JSON.stringify(filteredTodos));
};

//atualiza o status to do na localstorage
const updateTodoStatusLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage();

    todos.map((todo) =>
        todo.text === todoText ? (todo.done = !todo.done) : null
    );

    localStorage.setItem("to-do", JSON.stringify(todos));
};


const updateTodoLocalStorage = (todoOldText, todoNewText) => {
    const todos = getTodosLocalStorage();

    todos.map((todo) =>
        todo.text === todoOldText ? (todo.text = todoNewText) : null
    );

    localStorage.setItem("to-do", JSON.stringify(todos));
};

loadTodos();