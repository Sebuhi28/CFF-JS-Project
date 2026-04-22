let text = document.querySelector(".text-input");
let addButton = document.querySelector(".add-button");
let addTaskButton = document.querySelector(".add-task-button");
let inputDiv = document.querySelector(".input-div");
let downIcon = document.querySelector("#down-icon");
let deleteIcon = document.querySelector("#delete-icon");
let form = document.querySelector(".task-tracker-form");

let tasks = [];
let sortDirection = true; // true = ascending, false = descending

// Click + button to add task and hide input
addButton.addEventListener("click", function () {
    if (text.value.trim() === "") {
        alert("Please enter a task");
    } else {
        // Add task to array
        tasks.push(text.value);
        
        // Hide input div
        inputDiv.style.display = "none";
        
        // Render tasks
        renderTasks();
        
        // Clear input
        text.value = "";
    }
});

// Click Add button to show input again
addTaskButton.addEventListener("click", function () {
    inputDiv.style.display = "";
    text.focus();
});

// Render tasks as list
function renderTasks() {
    // Remove existing tasks list if it exists
    let existingList = document.querySelector(".tasks-list");
    if (existingList) {
        existingList.remove();
    }
    
    // If no tasks, don't create the list
    if (tasks.length === 0) {
        return;
    }
    
    // Create tasks list container
    let tasksList = document.createElement("div");
    tasksList.className = "tasks-list";
    
    // Display each task with number
    tasks.forEach((task, index) => {
        let taskItem = document.createElement("div");
        taskItem.className = "task-item";
        taskItem.innerHTML = `
            <span class="task-number">${index + 1}.</span>
            <span class="task-text">${task}</span>
            <div class="task-actions">
                <button class="edit-btn" data-index="${index}"><i class="fa-regular fa-pen-to-square"></i></button>
                <button class="delete-btn" data-index="${index}"><i class="fa-regular fa-circle-xmark"></i></button>
            </div>
        `;
        tasksList.appendChild(taskItem);
    });
    
    // Insert tasks list before input div
    form.insertBefore(tasksList, inputDiv);
    
    // Add event listeners to delete buttons
    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            let index = this.getAttribute("data-index");
            tasks.splice(index, 1);
            if (tasks.length === 0) {
                inputDiv.style.display = "";
            }
            renderTasks();
        });
    });
    
    // Add event listeners to edit buttons
    document.querySelectorAll(".edit-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            let index = this.getAttribute("data-index");
            text.value = tasks[index];
            inputDiv.style.display = "";
            text.focus();
            tasks.splice(index, 1);
            renderTasks();
        });
    });
}

// Delete/Cancel button for input
deleteIcon.addEventListener("click", function () {
    // Clear the input to cancel the adding process
    text.value = "";
    text.focus();
});

// Sort tasks alphabetically
downIcon.addEventListener("click", function () {
    if (tasks.length === 0) return; // Don't sort if no tasks
    
    sortDirection = !sortDirection;
    if (sortDirection) {
        tasks.sort();
        downIcon.classList.remove("fa-arrow-up-short-wide");
        downIcon.classList.add("fa-arrow-down-short-wide");
    } else {
        tasks.sort().reverse();
        downIcon.classList.remove("fa-arrow-down-short-wide");
        downIcon.classList.add("fa-arrow-up-short-wide");
    }
    renderTasks();
});