import { getTodos, toggleTodo, removeTodo, saveTodos } from "./todos";
import { getFilters } from "./filters";

// Render application todos based on filters
const renderTodos = () => {
  const todosEl = document.querySelector("#todos");
  const filters = getFilters();
  const filteredTodos = getTodos().filter(function(todo) {
    const searchFilter = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const checkboxFilter = !todo.completed || !filters.hideCompleted;

    return searchFilter && checkboxFilter;
  });

  const incompleteTodos = filteredTodos.filter((todo) => !todo.completed);

  todosEl.innerHTML = "";
  todosEl.appendChild(generateSummaryDOM(incompleteTodos));

  if (filteredTodos.length > 0) {
    filteredTodos.forEach(function(todo) {
      todosEl.appendChild(generateTodoDOM(todo));
    });
  } else {
    const emptyEl = document.createElement("p");
    emptyEl.classList.add("empty-message");
    emptyEl.textContent = "No todos to show";
    todosEl.appendChild(emptyEl);
  }
};

// Get the DOM elements for an individual note
const generateTodoDOM = (todo) => {
  const todoEl = document.createElement("label");
  const containerEl = document.createElement("div");
  const checkboxEl = document.createElement("input");
  const textEL = document.createElement("span");
  const buttonEl = document.createElement("button");

  // Setup todo checkbox
  checkboxEl.setAttribute("type", "checkbox");
  checkboxEl.checked = todo.completed;
  containerEl.appendChild(checkboxEl);
  checkboxEl.addEventListener("change", () => {
    toggleTodo(todo.id);
    renderTodos();
  });

  // Setup the todo text
  textEL.textContent = todo.text;
  containerEl.appendChild(textEL);

  // Setup container
  todoEl.classList.add("list-item");
  containerEl.classList.add("list-item__container");
  todoEl.appendChild(containerEl);

  // Setup the remove button
  buttonEl.textContent = "Remove";
  buttonEl.classList.add("button", "button-text");
  todoEl.appendChild(buttonEl);
  buttonEl.addEventListener("click", () => {
    removeTodo(todo.id);
    renderTodos();
  });

  return todoEl;
};

// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
  const noice = incompleteTodos.length > 1 ? "todos" : "todo";
  const summary = document.createElement("h2");
  summary.classList.add("list-title");
  summary.textContent = `You have ${incompleteTodos.length} ${noice} left`;
  return summary;
};

export { generateTodoDOM, renderTodos, generateSummaryDOM };
