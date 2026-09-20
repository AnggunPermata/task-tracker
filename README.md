# Task Tracker CLI

A simple command-line task tracker built with Node.js. Tasks are stored locally in
`tasks.json`, so no database or external service is required.

Project specification: https://roadmap.sh/projects/task-tracker

## Project Specification

The application provides a minimal interface for managing personal tasks:

- Add a task with a description.
- List tasks by status.
- Update a task's status.
- Mark a task as `in-progress` or `done` using shortcut commands.
- Delete a task by ID.
- Persist task data in a local JSON file.

### Task statuses

The default status for a new task is `todo`. The intended statuses are:

- `todo`
- `in-progress`
- `done`

Each task contains an ID, description, status, creation timestamp, and updated
timestamp.

## Requirements

- Node.js 14 or later
- npm (included with Node.js)

## How to Run

### Run from a cloned repository

Clone the repository and move into the CLI package directory:

```bash
git clone <repository-url>
cd <repository-folder>/task-tracker-manual/task-tracker
```

Install the project metadata and dependencies:

```bash
npm install
```

Run a command with npm:

```bash
npm start -- add "Buy groceries"
```

### Install and run as a CLI

From the `task-tracker` directory, install the package globally:

```bash
npm install -g .
```

The package registers the command as `task-cli`. You can then run:

```bash
task-cli add "Buy groceries"
task-cli list todo
task-cli mark-done 1
```

To remove the global installation later:

```bash
npm uninstall -g task-cli
```

On Windows, if the `task-cli` command is not found after installation, restart
the terminal so that npm's global binary directory is loaded into `PATH`.

The first command that reads or writes tasks creates `tasks.json` automatically
when it does not already exist.

## Usage

### Add a task

```bash
npm start -- add "Finish project documentation"
```

### List tasks by status

```bash
npm start -- list todo
npm start -- list in-progress
npm start -- list done
```

### Update a task status

```bash
npm start -- update 1 done
```

### Mark a task in progress or done

```bash
npm start -- mark-in-progress 1
npm start -- mark-done 1
```

### Delete a task

```bash
npm start -- delete 1
```

The equivalent direct Node.js form is:

```bash
node index.js <command> [arguments]
```

## Project Structure

```text
task-tracker/
├── index.js          # CLI entry point and command routing
├── task-tracker.js   # Task operations and JSON file persistence
├── tasks.json        # Local task data
├── package.json      # Project metadata and npm scripts
└── README.md        # Project documentation
```

## Data Storage

Tasks are stored as a JSON array in `tasks.json`. The file is created in the
current working directory when needed. Avoid editing it while the CLI is
running, and keep a backup if the task data is important.

## Available npm Scripts

| Script | Description |
| --- | --- |
| `npm start` | Runs the CLI entry point |
| `npm test` | Placeholder script; automated tests are not configured yet |

## Limitations

- Tasks are available only in the local project directory.
- There is no interactive menu or remote synchronization.
- The current CLI does not validate status names before saving them.