// src/interfaces/app.js
function createTask() {
  const title = document.getElementById("taskTitle").value;
  const description = document.getElementById("taskDescription").value;
  const dueDate = document.getElementById("dueDate").value;

  const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
  if (!dateRegex.test(dueDate)) {
    alert("Invalid due date format. Please use DD-MM-YYYY.");
    return;
  }

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/tasks", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = function () {
    if (xhr.status === 200) {
      fetchTasks();
    }
  };

  xhr.send(JSON.stringify({ title, description, dueDate }));
}

function updateTask(id) {
  const title = document.getElementById("taskTitle").value;
  const description = document.getElementById("taskDescription").value;
  const dueDate = document.getElementById("dueDate").value;

  const xhr = new XMLHttpRequest();
  xhr.open("PUT", `/tasks/${id}`, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = function () {
    if (xhr.status === 200) {
      fetchTasks();
    }
  };

  xhr.send(JSON.stringify({ title, description, dueDate }));
}

function deleteTask(id) {
  const xhr = new XMLHttpRequest();
  xhr.open("DELETE", `/tasks/${id}`, true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      fetchTasks();
    }
  };

  xhr.send();
}

function fetchTasks() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/tasks", true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const tasks = JSON.parse(xhr.responseText);
      displayTasks(tasks);
    }
  };

  xhr.send();
}

function displayTasks(tasks) {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = `${task.title} - ${task.description} (Due: ${task.dueDate})`;
    const updateButton = document.createElement("button");
    updateButton.textContent = "Update";
    updateButton.onclick = function () {
      updateTask(task.id);
    };
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
      deleteTask(task.id);
    };
    li.appendChild(updateButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
}

// Fetch tasks on page load
fetchTasks();
