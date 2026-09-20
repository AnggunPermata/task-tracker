
const fs = require("fs");
function loadTasks() {
    if (!fs.existsSync('tasks.json')) {
        console.log('tasks.json does not exist. Creating a new file.');
        fs.writeFileSync('tasks.json', '[]');
    }
    const data = fs.readFileSync('tasks.json', 'utf8');
    
    return JSON.parse(data);
}

function saveTasks(tasks) {
    fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));
}

function addTask(description) {
    if (!description) {
        console.log('Description is required.');
        return;
    }
    const tasks = loadTasks();
    const now = new Date().toISOString();
    const nextId = tasks.length === 0 ? 1 : Math.max(...tasks.map(task => task.id)) + 1;
    tasks.push({
        id: nextId,
        description,
        status: "todo",
        createdAt: now,
        updatedAt: now
    });
    saveTasks(tasks);
    console.log(`Task added successfully (ID: ${nextId}, Description: ${description})`);
}

function listTasksByStatus(status) {
    const tasks = loadTasks();
    const filteredTasks = tasks.filter(task => task.status === status);
    if (filteredTasks.length === 0) {
        console.log(`No tasks found with status: ${status}, run 'task-cli2 list {{status}}' to see all tasks.`);
        return;
    }
    filteredTasks.forEach(task => {
        console.log(`${task.id}. ${task.description} [${task.status}]`);
    });
}

function findTaskById(tasks, id) {
    return tasks.find(task => task.id == id);
}

function updateTaskStatus(id, newStatus) {
    const tasks = loadTasks();
    const task = findTaskById(tasks, id);
    if (!task){
        console.log(`Task with ID ${id} not found.`);
        return;
    }
    task.status = newStatus;
    task.updatedAt = new Date().toISOString();
    saveTasks(tasks);
    console.log(`Task ID ${id} status updated to ${newStatus}.`);
}

function deleteTask(id) {
    const tasks = loadTasks();
    const task = findTaskById(tasks, id);
    if (!task) {
        console.log(`Task with ID ${id} not found.`);
        return;
    }
    const updatedTaskList = tasks.filter(task => task.id != id);
    saveTasks(updatedTaskList);
    console.log(`Task ID ${id} deleted successfully.`);
}

module.exports = {
    loadTasks,
    saveTasks,
    addTask,
    listTasksByStatus,
    updateTaskStatus,
    deleteTask
};