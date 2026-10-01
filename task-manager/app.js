const STORAGE_KEY = "task-manager.tasks";

const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const taskCount = document.querySelector("#task-count");
const clearCompletedButton = document.querySelector("#clear-completed");
const filterButtons = document.querySelectorAll("[data-filter]");

let tasks = loadTasks();
let activeFilter = "all";
let editingTaskId = null;

// Local storage keeps the task list between visits to this browser.
function loadTasks() {
  try {
    const savedTasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(savedTasks) ? savedTasks : [];
  } catch {
    return [];
    
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Task creation adds one pending task, then refreshes the saved list and view.
function addTask(title) {
  const task = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    title,
    completed: false,
  };

  tasks.push(task);
  saveTasks();
  renderTasks();
}

// Task deletion is kept separate so it can be changed independently.
function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  saveTasks();
  renderTasks();
}

// Completion can be toggled in either direction.
function toggleTask(taskId) {
  tasks = tasks.map((task) => (
    task.id === taskId ? { ...task, completed: !task.completed } : task
  ));
  saveTasks();
  renderTasks();
}

function editTask(taskId) {
  editingTaskId = taskId;
  renderTasks();
  const editInput = taskList.querySelector('[data-action="edit-input"]');
  editInput.focus();
  editInput.select();
}

function saveEditedTask(taskId, title) {
  if (!title.trim()) return;

  tasks = tasks.map((task) => (
    task.id === taskId ? { ...task, title: title.trim() } : task
  ));
  editingTaskId = null;
  saveTasks();
  renderTasks();
}

function cancelEditingTask() {
  editingTaskId = null;
  renderTasks();
}

function clearCompletedTasks() {
  tasks = tasks.filter((task) => !task.completed);
  saveTasks();
  renderTasks();
}

// Filtering only changes which tasks are shown, not the saved task list.
function getVisibleTasks() {
  if (activeFilter === "pending") return tasks.filter((task) => !task.completed);
  if (activeFilter === "completed") return tasks.filter((task) => task.completed);
  return tasks;
}

// Rendering builds task rows with text nodes so task titles stay plain text.
function renderTasks() {
  const remainingCount = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.length - remainingCount;
  const visibleTasks = getVisibleTasks();

  taskCount.textContent = `${remainingCount} ${remainingCount === 1 ? "task" : "tasks"} remaining`;
  clearCompletedButton.disabled = completedCount === 0;

  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === activeFilter;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  taskList.replaceChildren();

  if (visibleTasks.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.className = "empty-state";
    emptyMessage.textContent = tasks.length === 0
      ? "Your list is clear. Add a task to get started."
      : "No tasks in this view.";
    taskList.append(emptyMessage);
    return;
  }

  visibleTasks.forEach((task) => {
    const row = document.createElement("li");
    row.className = `task-row${task.completed ? " is-completed" : ""}`;
    row.dataset.taskId = task.id;

    if (task.id === editingTaskId) {
      const editForm = document.createElement("form");
      editForm.className = "inline-edit-form";

      const editInput = document.createElement("input");
      editInput.className = "edit-input";
      editInput.type = "text";
      editInput.maxLength = 120;
      editInput.value = task.title;
      editInput.required = true;
      editInput.dataset.action = "edit-input";
      editInput.setAttribute("aria-label", "Edit task title");

      const saveButton = document.createElement("button");
      saveButton.className = "task-action";
      saveButton.type = "submit";
      saveButton.textContent = "Save";

      const cancelButton = document.createElement("button");
      cancelButton.className = "task-action";
      cancelButton.type = "button";
      cancelButton.dataset.action = "cancel-edit";
      cancelButton.textContent = "Cancel";

      editForm.append(editInput, saveButton, cancelButton);
      row.append(editForm);
      taskList.append(row);
      return;
    }

    const checkbox = document.createElement("input");
    checkbox.className = "task-checkbox";
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.dataset.action = "toggle";
    checkbox.setAttribute("aria-label", `Mark ${task.title} ${task.completed ? "pending" : "completed"}`);

    const title = document.createElement("p");
    title.className = "task-title";
    title.textContent = task.title;

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const editButton = document.createElement("button");
    editButton.className = "task-action";
    editButton.type = "button";
    editButton.dataset.action = "edit";
    editButton.textContent = "Edit";
    editButton.setAttribute("aria-label", `Edit ${task.title}`);

    const deleteButton = document.createElement("button");
    deleteButton.className = "task-action";
    deleteButton.type = "button";
    deleteButton.dataset.action = "delete";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", `Delete ${task.title}`);

    actions.append(editButton, deleteButton);
    row.append(checkbox, title, actions);
    taskList.append(row);
  });
}

// Event listeners connect the form and task controls to their actions.
taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = taskInput.value.trim();
  if (!title) return;

  addTask(title);
  taskForm.reset();
  taskInput.focus();
});

taskList.addEventListener("change", (event) => {
  if (event.target.matches('[data-action="toggle"]')) {
    toggleTask(event.target.closest(".task-row").dataset.taskId);
  }
});

taskList.addEventListener("submit", (event) => {
  if (!event.target.matches(".inline-edit-form")) return;

  event.preventDefault();
  const row = event.target.closest(".task-row");
  saveEditedTask(row.dataset.taskId, event.target.querySelector(".edit-input").value);
});

taskList.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-action]");
  if (!actionButton) return;

  const taskId = actionButton.closest(".task-row").dataset.taskId;
  if (actionButton.dataset.action === "edit") editTask(taskId);
  if (actionButton.dataset.action === "delete") deleteTask(taskId);
  if (actionButton.dataset.action === "cancel-edit") cancelEditingTask();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    renderTasks();
  });
});

clearCompletedButton.addEventListener("click", clearCompletedTasks);

renderTasks();