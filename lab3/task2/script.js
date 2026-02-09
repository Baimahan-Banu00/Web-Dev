"use strict";

const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

function createTaskItem(text) {
  const listItem = document.createElement("li");

  const leftSide = document.createElement("div");
  leftSide.className = "task-left";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const taskText = document.createElement("span");
  taskText.textContent = text;

  checkbox.addEventListener("change", () => {
    taskText.classList.toggle("done", checkbox.checked);
  });

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-btn";
  deleteButton.textContent = "🗑️";

  deleteButton.addEventListener("click", () => {
    taskList.removeChild(listItem);
  });

  leftSide.appendChild(checkbox);
  leftSide.appendChild(taskText);

  listItem.appendChild(leftSide);
  listItem.appendChild(deleteButton);

  return listItem;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const taskValue = input.value.trim();
  if (taskValue === "") {
    return;
  }

  const taskItem = createTaskItem(taskValue);
  taskList.appendChild(taskItem);

  input.value = "";
});