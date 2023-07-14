// Get references to HTML elements
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const filterOptions = document.getElementsByName("filter");

// Array to store tasks
let tasks = [];

// Add event listener for form submission
taskForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const task = {
      id: Date.now(),
      text: taskText,
      completed: false
    };
    tasks.push(task);
    taskInput.value = ""; // Clear input field
    renderTasks();
  }
});

// Function to render the tasks
function renderTasks() {
  taskList.innerHTML = ""; // Clear task list
  const filter = getSelectedFilter();
  const filteredTasks = filterTasks(filter);

  filteredTasks.forEach(function (task) {
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
      <input type="checkbox" ${task.completed ? "checked" : ""} />
      <span>${task.text}</span>
      <button class="delete-button" data-id="${task.id}">Delete</button>
    `;
    taskList.appendChild(taskItem);
  });

  addDeleteListeners();
}

// Function to filter tasks based on completion status
function filterTasks(filter) {
  if (filter === "all") {
    return tasks;
  } else if (filter === "completed") {
    return tasks.filter(task => task.completed);
  } else if (filter === "pending") {
    return tasks.filter(task => !task.completed);
  }
}

// Function to get the selected filter
function getSelectedFilter() {
  for (const option of filterOptions) {
    if (option.checked) {
      return option.value;
    }
  }
}

// Function to add event listeners for delete buttons
function addDeleteListeners() {
  const deleteButtons = document.getElementsByClassName("delete-button");
  for (const button of deleteButtons) {
    button.addEventListener("click", function () {
      const taskId = Number(button.getAttribute("data-id"));
      tasks = tasks.filter(task => task.id !== taskId);
      renderTasks();
    });
  }
}

// Function to add event listener for filter change
for (const option of filterOptions) {
  option.addEventListener("change", renderTasks);
}
