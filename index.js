let text = document.querySelector(".text-input");
let addButton = document.querySelector(".add-button");
let addTaskButton = document.querySelector(".add-task-button");
let inputDiv = document.querySelector(".input-div");
let downIcon = document.querySelector("#down-icon");
let deleteIcon = document.querySelector("#delete-icon");
let form = document.querySelector(".task-tracker-form");

let tasks = [];
let sortDirection = true; // true = ascending

addButton.addEventListener("click", function () {
    if (text.value.trim() === "") {
        alert("Please enter a task");
    } else {
        tasks.push(text.value);
        
        inputDiv.style.display = "none";
        
        renderTasks();
        
        text.value = "";
    }
});

addTaskButton.addEventListener("click", function () {
    inputDiv.style.display = "";
    text.focus();
});

function renderTasks() {
    let existingList = document.querySelector(".tasks-list");
    if (existingList) {
        existingList.remove();
    }
    
    if (tasks.length === 0) {
        return;
    }
    
    let tasksList = document.createElement("div");
    tasksList.className = "tasks-list";
    
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
    
    form.insertBefore(tasksList, inputDiv);
    
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

deleteIcon.addEventListener("click", function () {
    text.value = "";
    text.focus();
});

downIcon.addEventListener("click", function () {
    if (tasks.length === 0) return;
    
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
