# Task Manager

A small, browser-only task list built with HTML, CSS, and vanilla JavaScript. It is also a practical demo repository for testing GitHub Development Integration activity.

## Features

- Add, edit, and delete tasks
- Mark tasks completed or pending
- Filter the list by all, pending, or completed tasks
- See how many tasks remain
- Clear all completed tasks
- Keep tasks in browser `localStorage`
- Responsive layout for desktop and mobile

## Project Structure

```text
task-manager/
|-- index.html       Page structure and controls
|-- style.css        Layout, colors, and responsive styles
|-- app.js           Task actions, filtering, rendering, and storage
|-- README.md        Project guide and GitHub activity examples
|-- .gitignore       Ignores common operating-system files
`-- docs/
    `-- DEVELOPMENT.md  Manual checks and activity ideas
```

## Run the App

No installation or build step is needed. Open `index.html` in a browser. Tasks are stored in that browser only; clearing site data or using another browser gives you a separate list.

## Manual Testing

1. Add two tasks and confirm the remaining count increases.
2. Edit one task, then mark it completed and pending again.
3. Use each filter and confirm tasks appear in the expected view.
4. Clear completed tasks and confirm pending tasks remain.
5. Delete a task and reload the page to check that the saved list persists.
6. Narrow the browser window to check the mobile layout.

See [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) for a concise test checklist.

## Development Integration Testing

Use small changes to generate repository activity for commits, branches, pull requests, reviews, and merges. These are examples only; no Git operations are performed by this project.

### Commit Testing

Try one change per commit, such as:

- Change the application title or a button label.
- Add a task field, such as a priority selector.
- Fix a JavaScript bug in task filtering or deletion.
- Modify spacing, colors, or mobile styles in `style.css`.
- Update this README or the manual testing guide.

Example commit messages:

```text
feat: add task priority
fix: correct task filtering
style: improve task layout
refactor: simplify task rendering
docs: update project documentation
```

### Branch Testing

Create branches with names that describe the change:

```text
feature/add-priority
feature/dark-mode
feature/task-search
fix/delete-task
fix/filter-bug
refactor/task-rendering
docs/update-readme
```

### Pull Request Testing

1. Create a feature branch, for example `feature/task-search`.
2. Make a small change and test the app in a browser.
3. Stage and commit the change with a descriptive message.
4. Push the branch to GitHub.
5. Open a Pull Request from the branch into the default branch.
6. Add a PR title and description explaining the change and how it was tested.
7. Request a review, then comment on the PR or review the changes.
8. Push another commit to the same branch and confirm it appears in the open PR.
9. Merge the PR using one of the enabled merge methods.

Example command sequence (replace the branch and remote as needed):

```sh
git switch -c feature/task-search
# Make and test a change
git add index.html style.css app.js
git commit -m "feat: add task search"
git push -u origin feature/task-search
```

### Merge Testing

Depending on repository settings, test each enabled method with a separate PR:

- **Normal merge:** preserves the individual PR commits and adds a merge commit.
- **Squash merge:** combines the PR commits into one commit on the base branch.
- **Rebase merge:** reapplies the PR commits on the base branch without a merge commit.

### Other GitHub Activity Testing

- Make multiple commits on one branch; create multiple branches for separate changes.
- Open a PR with multiple commits, add a PR comment, request a review, and submit a review.
- Approve a PR in one test and request changes in another.
- Close a PR without merging, then reopen it.
- Comment on a commit from its GitHub page.
- Push changes, update the README, or modify several files in a single commit.
- Revert a commit using GitHub or `git revert` and push the result.
- Create and push a version tag, for example `git tag v0.2.0 && git push origin v0.2.0`.

Repository permissions and enabled merge methods affect which actions are available. Follow your organization's review and branch protection rules when testing.

## Example PR Scenarios

- Add task priority as a small feature PR.
- Fix the completed filter and include steps to reproduce in the PR description.
- Refactor task rendering without changing visible behavior.
- Update mobile spacing and include a screenshot in the PR.
- Open a draft PR, add another commit, request review, and then mark it ready.
- Close a test PR without merging, then reopen it to generate lifecycle activity.

## Example Merge Scenarios

Create separate test PRs for a normal merge, squash merge, and rebase merge when those options are enabled. Compare the resulting commit history on the base branch. See [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) for activity prompts and manual app checks.