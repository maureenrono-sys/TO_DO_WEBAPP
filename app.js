const API_URL = "http://localhost:5000/api/todos";

// Load tasks from backend
async function loadTasks() {
    const res = await fetch(API_URL);
    const data = await res.json();

    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Clear existing tasks

    data.data.forEach(task => {
        const li = document.createElement("li");

        // Color based on priority
        let color = '';
        if(task.priority === 'high') color = 'tomato';
        else if(task.priority === 'medium') color = 'orange';
        else color = 'lightgreen';

        li.innerHTML = `
            <div class="task-card" style="border-left: 5px solid ${color}; padding: 10px; margin-bottom: 10px; background: #f9f9f9; border-radius: 5px;">
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleCompleted('${task._id}', this.checked)">
                <strong>${task.name}</strong> - ${task.description || ''}
                <br>
                <small>Priority: ${task.priority}</small>
                <br>
                <small>Due Date: ${task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Not set'}</small>
                <br>
                <button class="delete-btn" onclick="deleteTask('${task._id}')">Delete</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

// Handle form submission
document.getElementById('taskForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const description = document.getElementById("description").value.trim();
    const priority = document.getElementById("priority").value;
    const dueDate = document.getElementById("dueDate").value;

    const payload = { name, description, priority, dueDate };

    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        document.getElementById("taskForm").reset();
        loadTasks(); // refresh the list
    } else {
        const errorData = await res.json();
        console.error("Error:", errorData);
    }
});

// Delete task
async function deleteTask(id) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    if (res.ok) {
        loadTasks();
    }
}

// Completed tasks
async function toggleCompleted(id, completed) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed })
    });

    if (res.ok) {
        loadTasks(); // refresh list
    } else {
        const errorData = await res.json();
        console.error("Error updating task:", errorData);
    }
}

// Load tasks on page load
loadTasks();


// const API_URL = "http://localhost:5000/api/todos";

// // Load tasks from backend
// async function loadTasks() {
//     const res = await fetch(API_URL);
//     const data = await res.json();

//     const taskList = document.getElementById("taskList");
//     taskList.innerHTML = ""; // Clear existing tasks

//     data.data.forEach(task => {
//         const li = document.createElement("li");

//         li.innerHTML = `
//             <strong>${task.name}</strong> - ${task.description || ''}
//             <br>
//             <small>Priority: ${task.priority}</small>
//             <br>
//             <button onclick="deleteTask('${task._id}')">Delete</button>
//         `;

//         taskList.appendChild(li);
//     });
// }

// // Handle form submission
// document.getElementById('taskForm').addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const name = document.getElementById("name").value.trim();
//     const description = document.getElementById("description").value.trim();

//     const payload = { name, description };

//     const res = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload)
//     });

//     if (res.ok) {
//         document.getElementById("taskForm").reset();
//         loadTasks(); // refresh the list
//     } else {
//         const errorData = await res.json();
//         console.error("Error:", errorData);
//     }
// });

// // Delete task
// async function deleteTask(id) {
//     const res = await fetch(`${API_URL}/${id}`, {
//         method: "DELETE"
//     });

//     if (res.ok) {
//         loadTasks();
//     }
// }

// // Load tasks on page load
// loadTasks();








// const API_URL = "http://localhost:5000/api/todos";

// document.getElementById('taskForm').addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const name = document.getElementById("task-title").value.trim();
//     const description = document.getElementById("description").value.trim();

//     if (!name) {
//         alert("Task name is required");
//         return;
//     }

//     const payload = { name, description };

//     const res = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload)
//     });

//     const data = await res.json();

//     if (res.ok) {
//         console.log("Added:", data);
//         document.getElementById("taskForm").reset();
//     } else {
//         console.error("Error:", data);
//     }
// });


// const API_URL = "http://localhost:5000/api/todos";

// // handle form submission
// document.getElementById('taskForm').addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const title = document.getElementById("task-title").value.trim();
//     const description = document.getElementById("description").value.trim();

//     const payload = { name: title, description }; // backend expects "name"

//     const res = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload)
//     });

//     const data = await res.json();

//     if (res.ok) {
//         document.getElementById("taskForm").reset();
//     } else {
//         console.error("Error:", data);
//     }
// });


// const API_URL="http://localhost:5000/api/todos";

// // handle form submission
// document.getElementById('taskForm').addEventListener('submit',async(e) =>{
//     e.preventDefault();
//     const title = document.getElementById("task-title").Value.trim();

//     const payload= {title,description};
//     const res = await fetch(API_URL,{
//         method: "POST",
//         headers: {"Content-Type" : "application/json"},
//         body:JSON.stringify(payload)
//     });
//     const data = await res.json();
//     if(res.ok){
//         loadTask();
//         document.getElementById("taskForm").reset();
//     }else{
//         console.error("Error:",data);
//     }
// })

