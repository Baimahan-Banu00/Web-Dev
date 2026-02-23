const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

document.querySelectorAll('.task-item').forEach(item => {
    const checkbox = item.querySelector('input');
    const text = item.querySelector('.task-text');
    const del = item.querySelector('.delete-btn');

    checkbox.addEventListener('change', () => {
        text.classList.toggle('done');
    });

    del.addEventListener('click', () => {
        taskList.removeChild(item);
    });
});

taskForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const value = taskInput.value.trim();
    if (value === '') return;

    const li = document.createElement('li');
    li.className = 'task-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = value;

    checkbox.addEventListener('change', () => {
        span.classList.toggle('done');
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '🗑';

    deleteBtn.addEventListener('click', () => {
        taskList.removeChild(li);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
    taskInput.value = '';
});