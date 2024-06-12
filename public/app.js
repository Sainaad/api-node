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
                  <button class="btn btn-secondary" onclick="editTask(${task.id}, '${task.title}', '${task.description}')">Edit</button>
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

  window.editTask = (id, title, description) => {
      // Preencher os campos de edição com os valores da tarefa selecionada
      titleInput.value = title;
      descriptionInput.value = description;

      // Mudar o texto do botão de adicionar para "Salvar Edição"
      addTaskButton.innerText = "Salvar Edição";

      // Adicionar um event listener para o botão de adicionar que chama a função updateTask
      addTaskButton.removeEventListener('click', addTask);
      addTaskButton.addEventListener('click', () => updateTask(id));

      // Esconder o formulário de adicionar
      document.getElementById('addForm').style.display = 'none';
  };

  const updateTask = async (id) => {
      const title = titleInput.value;
      const description = descriptionInput.value;
      if (title && description) {
          await fetch(`/tasks/${id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ title, description })
          });
          fetchTasks();
          titleInput.value = '';
          descriptionInput.value = '';

          // Restaurar o texto e event listener do botão de adicionar
          addTaskButton.innerText = "Adicionar";
          addTaskButton.removeEventListener('click', updateTask);
          addTaskButton.addEventListener('click', addTask);

          // Exibir o formulário de adicionar
          document.getElementById('addForm').style.display = 'block';
      }
  };

  addTaskButton.addEventListener('click', addTask);
  fetchTasks();
});