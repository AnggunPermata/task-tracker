#!/usr/bin/env node

const tc = require('./task-tracker');

const command = process.argv[2];
const firstArg = process.argv[3];
const secondArg = process.argv[4];

switch (command) {
  case "add":
    tc.addTask(firstArg);
    break;
  case "list":
    tc.listTasksByStatus(firstArg); // Here, 'firstArg' is used as the status argument
    break;
  case "update":
    tc.updateTaskStatus(firstArg, secondArg); // Here, 'firstArg' is the task ID and 'secondArg' is the new status
    break;
  case "delete":
    tc.deleteTask(firstArg);
    break;
  case "mark-in-progress":
    tc.updateTaskStatus(firstArg, "in-progress");
    break;
  case "mark-done":
    tc.updateTaskStatus(firstArg, "done");
    break;
  default:
    console.log('Invalid command. Please use one of the following: add, list, update, delete');
}