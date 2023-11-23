import "./../SASS/style.scss";

let todos = [
  { text: "Gör uppgift", completed: false },
  { text: "Gör  uppgift2", completed: false },
  // Lägg till fler todos här
];

let completedTodos = []; // Ny array för slutförda uppgifter

// Funktion för att rendera todos på sidan
function renderTodos() {
  //skriv ut todoList
  const todoList = document.getElementById("todoList");
  todoList.innerHTML = "";
  //skriv ut completedList
  const completedList = document.getElementById("completedList");
  completedList.innerHTML = "";
  // forEach loop kallar på funktion
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    // Vad button
    document.getElementById("addTodoBtn").addEventListener("click", addTodo);
    li.textContent = todo.text;
    li.onclick = function () {
      toggleTodo(index);
    };

    if (todo.completed) {
      li.classList.add("completed");
      completedList.appendChild(li);
    } else {
      todoList.appendChild(li);
    }
  });
}

// Funktion för att ta bort en todo
function removeTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

// Funktion argument för att markera en todo som klar eller inte klar
function toggleTodo(arg) {
  let index;

  if (typeof arg === "object") {
    // om argumentet är ett objekt (todoElement) hitta index
    index = Array.from(arg.parentNode.children).indexOf(arg);
  } else if (typeof arg === "number") {
    // ifall argumentet är ett tal (index) använd det direkt
    index = arg;
  } else {
    // error kontroll
    console.error("Invalid argument for toggleTodo");
    return;
  }

  if (todos[index].completed) {
    // Uppgiften är redan slutförd, flytta till completedTodos
    completedTodos.push(todos[index]);
    todos.splice(index, 1);
  } else {
    // Uppgiften är inte slutförd, markera som slutförd
    todos[index].completed = true;
  }

  renderTodos();
}

// Funktion för att lägga till en ny todo och trim() metoden tar bort blankspace från båda sidorna av en string
export function addTodo() {
  const newTodoInput = document.getElementById("newTodo");
  const newTodoText = newTodoInput.value.trim();

  if (newTodoText !== "") {
    todos.push({ text: newTodoText, completed: false });
    newTodoInput.value = "";
    renderTodos();
  }
}
// Initial render
renderTodos();

//let dragsearch =null;
