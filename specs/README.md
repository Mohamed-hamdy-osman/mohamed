# Test Plans

This directory contains the test plans for the Zeta application.

## Directory Structure

- `HR-Module/` - Test plans for the HR module
  - `Personal/` - Test plans for the Personal section
    - `Departments/` - Test plans for departments
    - `Positions/` - Test plans for positions
    - `Grades/` - Test plans for grades
    - `Functions/` - Test plans for functions
    - `Employees/` - Test plans for employees
    - `HierarchicalStructures/` - Test plans for hierarchical structures
  - `Attendance/` - Test plans for attendance section
    - `Settings/` - Test plans for attendance settings section
      - `WorkingDays/` - Test plans for working days
      - `FingerprintDevices/` - Test plans for fingerprint devices
      - `OfficialVacations/` - Test plans for official vacations
      - `RequestTypes/` - Test plans for request types
      - `Shifts/` - Test plans for shifts
      - `WorkRegulations/` - Test plans for work regulations
      - `OverTimeRegulations/` - Test plans for overtime regulations
    - `Operations/` - Test plans for operations section
      - `WorkEntries/` - Test plans for work entries
      - `EmployeeRequests/` - Test plans for employee requests
      - `DeductionRequests/` - Test plans for deduction requests
      - `PendingEmployeeRequests/` - Test plans for pending employee requests
  - `Payroll/` - Test plans for payroll section
    - `Settings/` - Test plans for payroll settings section
      - `PayrollConfigurations/` - Test plans for payroll configurations
      - `PayrollComponents/` - Test plans for payroll components
      - `TaxExemptions/` - Test plans for tax exemptions
      - `IncomeTaxBase/` - Test plans for income tax base
    - `Operation/` - Test plans for payroll operation section
      - `AssignFixedPayroll/` - Test plans for assign fixed payroll
      - `AssignVariablePayroll/` - Test plans for assign variable payroll
      - `PayrollCalculation/` - Test plans for payroll processing
      - `PayrollDisbursement/` - Test plans for payroll disbursement
    
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
