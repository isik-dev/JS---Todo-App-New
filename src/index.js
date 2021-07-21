import { setFilters } from "./filters";
import { createTodo, loadTodos } from "./todos";
import { renderTodos } from "./views";

renderTodos();

document.querySelector("#add-form").addEventListener("submit", (e) => {
  const text = e.target.elements.addTodo.value.trim();
  e.preventDefault();
  if (text.length > 0) {
    createTodo(text);
    renderTodos();
    e.target.elements.addTodo.value = "";
  } else {
  }
});

//Listen for search todo text change
document.querySelector("#search-text").addEventListener("input", (e) => {
  setFilters({
    searchText: e.target.value,
  });
  renderTodos();
});

// Listen for the Checkbox
document.querySelector("#filter-todos").addEventListener("change", (e) => {
  setFilters({
    hideCompleted: e.target.checked,
  });
  renderTodos();
});

window.addEventListener("storage", (e) => {
  if (e.key === "todos") {
    loadTodos();
    renderTodos();
  }
});
