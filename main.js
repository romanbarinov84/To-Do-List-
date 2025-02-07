document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const addTaskButton = document.getElementById("add-task");
    const todoList = document.querySelector(".todo-list");
    const filterButtons = document.querySelectorAll(".filter");
  
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
    const saveTasks = () => {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    };
  
    const renderTasks = (filter = "all") => {
      todoList.innerHTML = "";
      const filteredTasks = tasks.filter(task => {
        if (filter === "completed") return task.completed;
        if (filter === "active") return !task.completed;
        return true;
      });
  
      filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = `todo-item ${task.completed ? "completed" : ""}`;
        li.innerHTML = `
          <span>${task.text}</span>
          <div>
            <button class="toggle">${task.completed ? "Undo" : "Done"}</button>
            <button class="delete">Delete</button>
          </div>
        `;
  
        li.querySelector(".toggle").addEventListener("click", () => {
          tasks[index].completed = !tasks[index].completed;
          saveTasks();
          renderTasks(filter);
        });
  
        li.querySelector(".delete").addEventListener("click", () => {
          tasks.splice(index, 1);
          saveTasks();
          renderTasks(filter);
        });
  
        todoList.appendChild(li);
      });
    };
  
    addTaskButton.addEventListener("click", () => {
      const taskText = taskInput.value.trim();
      if (taskText) {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = "";
        saveTasks();
        renderTasks();
      }
    });
  
    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        renderTasks(button.dataset.filter);
      });
    });
  
    renderTasks();
  });
  