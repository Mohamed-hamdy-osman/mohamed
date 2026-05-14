# Test Plans

This directory contains the test plans for the Zeta application.

## Directory Structure

- `HR-Module/` - Test plans for the HR module
  - `Personal/` - Test plans for the Personal section
    - `Departments/` - Test plans for departments
    - `Positions/` - Test plans for positions
    - `Grades/` - Test plans for grades
    - `Functions/` - Test plans for functions
    - `Shifts/` - Test plans for shifts
    - `Employees/` - Test plans for employees
- `login/` - Test plans for the login module

## Naming Convention

Test files follow the naming convention: `[Action][Entity].spec.ts`

- `[Action]` can be:
  - `create`: For creating a new entity
  - `manage`: For managing existing entities (view, edit, delete)
  - `edit`: For editing an entity
  - `delete`: For deleting an entity
- `[Entity]` can be:
  - `Departments`
  - `Positions`
  - `Grades`
  - `Functions`
  - `Shifts`
  - `Employees`
  - `login` (for the login module)

## Test Cases

Each test file contains detailed test cases with the following format:

- `test('TCXX - Description', async ({ page }) => { ... });`
- Each test case includes:
  - Preconditions (setup in beforeEach)
  - Step-by-step actions (using `test.step`)
  - Assertions (using `expect`)

## Examples

```typescript
// HR-Module/Personal/Departments/manageDepartments.spec.ts
test.describe('Manage Departments Module', () => {
  test.beforeEach(async ({ page }) => {
    // Login and navigate to departments
  });

  test('TC01 - Verify Navigation To Manage Departments Page', async () => {
    // Steps to verify navigation
  });

  test('TC02 - Verify Search Department by Name then by Status', async () => {
    // Steps to search by name
    // Steps to clear filters
    // Steps to search by status
  });
});
```
