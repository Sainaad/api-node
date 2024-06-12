document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('taskList');
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const addTaskButton = document.getElementById('addTask');
  
    const fetchTasks = async () => {
      const response = await fetch('/tasks');
      const tasks = await response.json();
      taskList.innerHTML = '';
      tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span>
            <strong>${task.title}</strong>: ${task.description}
          </span>
          <span>
            <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTask(${task.id}, ${task.completed})">
            <button class="btn btn-primary" onclick="deleteTask(${task.id})">Delete</button>
          </span>
        `;
        taskList.appendChild(li);
      });
    };
  
    const addTask = async () => {
      const title = titleInput.value;
      const description = descriptionInput.value;
      if (title && description) {
        await fetch('/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, description, completed: false })
        });
        fetchTasks();
        titleInput.value = '';
        descriptionInput.value = '';
      }
    };
  
    window.toggleTask = async (id, completed) => {
      await fetch(`/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed })
      });
      fetchTasks();
    };
  
    window.deleteTask = async (id) => {
      await fetch(`/tasks/${id}`, {
        method: 'DELETE'
      });
      fetchTasks();
    };
  
    addTaskButton.addEventListener('click', addTask);
    fetchTasks();
  });
  