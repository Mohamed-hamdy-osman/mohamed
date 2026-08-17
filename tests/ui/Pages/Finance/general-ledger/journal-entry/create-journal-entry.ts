import { expect, type Locator, type Page } from '@playwright/test';

export class CreateJournalEntryPage {

  readonly page: Page;
  readonly addJournalEntry_btn: Locator;
  readonly journalName_textbox: Locator;
  readonly journalDate_input: Locator;
  readonly category_dropdown: Locator;
  readonly addLine_btn: Locator;
  readonly selectAccount_text: Locator;
  readonly radioButtons: Locator;
  readonly dr_cells: Locator;
  readonly cr_cells: Locator;
  readonly save_btn: Locator;

  readonly edit_buttons: Locator;

  readonly post_btn: Locator;

  constructor(page: Page) {

    this.page = page;
    this.addJournalEntry_btn = page.getByRole(
  'button',
  { name: 'Add Journal Entry' }
);

    this.journalName_textbox = page
      .locator('input[placeholder="Journal Name"]')
      .first();

    this.journalDate_input = page
      .locator('input[placeholder="Journal Date"]')
      .first();

   this.category_dropdown = page.getByRole(
  'combobox',
  { name: 'Category' }
);

    this.addLine_btn = page.getByRole(
      'button',
      { name: 'Add Line' }
    );

    this.selectAccount_text = page.getByText(
      'Select Account'
    );

    this.radioButtons = page.locator(
      'p-radiobutton'
    );

    this.dr_cells = page.locator(
      'td[peditablecolumnfield="debitValue"]'
    );

    this.cr_cells = page.locator(
      'td[peditablecolumnfield="creditValue"]'
    );

    this.save_btn = page.getByRole(
      'button',
      { name: 'Save' }
    );

    this.edit_buttons = page.locator(
      'tbody tr td:last-child button'
    );

    this.post_btn = page.getByRole(
      'button',
      { name: 'Post' }
    );
  }
  async clickAddJournalEntry() {

  await expect(
    this.addJournalEntry_btn
  ).toBeVisible();

  await this.addJournalEntry_btn.click();

}


 async enterJournalName(index: number) {

  await expect(
    this.journalName_textbox
  ).toBeVisible();

  await this.journalName_textbox.click();

  await this.journalName_textbox.press(
    'Meta+A'
  );

  await this.journalName_textbox.fill(
    `auto test ${Date.now()}`
  );

  await expect(
    this.journalName_textbox
  ).toHaveValue(
    /auto test/
  );
}async selectFirstCategory(index: number) {

  await this.category_dropdown.click();

  const firstOption = this.page
    .locator('[role="option"]')
    .first();

  await expect(firstOption).toBeVisible({ timeout: 10000 });

  await firstOption.click();

  await this.page.keyboard.press('Escape');

  await expect(
    this.page.locator('[role="option"]')
  ).toHaveCount(0, { timeout: 10000 });

}
  async selectTodayDate(index: number) {

  const today = new Date();

  const day = String(
    today.getDate()
  ).padStart(2, '0');

  const month = String(
    today.getMonth() + 1
  ).padStart(2, '0');

  const year = today.getFullYear();

  const formattedDate =
    `${day}/${month}/${year}`;

  await this.journalDate_input.click();

  await this.journalDate_input.pressSequentially(
    formattedDate,
    { delay: 50 }
  );

  await this.page.keyboard.press('Tab');

  await this.page.waitForTimeout(500);

  await expect(
    this.journalDate_input
  ).toHaveValue(formattedDate);

}
  async clickAddLine(index: number) {

  await expect(
    this.addLine_btn
  ).toBeVisible();

  await expect(
    this.addLine_btn
  ).toBeEnabled();

  await this.addLine_btn.scrollIntoViewIfNeeded();

  await this.addLine_btn.click();

  // نتأكد إن عدد الصفوف بقى 2
  await expect(
    this.page.locator('table tbody tr')
  ).toHaveCount(2, {
    timeout: 10000
  });
}

  async selectFirstAccount(
  index: number,
  radioIndex: number
) {

  const row = this.page
    .locator('table tbody tr')
    .nth(index);

  await expect(
    row
  ).toBeVisible();

  await row
    .getByText('Select Account')
    .click();

  await expect(
    this.radioButtons
      .nth(radioIndex)
  ).toBeVisible({
    timeout: 10000
  });

  await this.radioButtons
    .nth(radioIndex)
    .click();

  await this.page.waitForTimeout(
    1000
  );

  await this.page.keyboard.press(
    'Escape'
  );

  await this.page.waitForTimeout(
    1000
  );
}
  async enterDrValue(
    index: number,
    value: string
  ) {

    const drCell = this.dr_cells.nth(index);

    await this.page.locator('.loader-wrapper').waitFor({ state: 'hidden', timeout: 20000 });
    await drCell.waitFor({ state: 'visible' });
    await drCell.click({ force: true });

    const input = drCell.locator('input');
    await input.waitFor({ state: 'visible', timeout: 10000 });
    await input.fill(value);

    await this.page.keyboard.press('Tab');
  }


  async enterCrValue(
    index: number,
    value: string
  ) {

    const crCell = this.cr_cells
      .nth(index);

    await crCell.click({
      force: true
    });

    await this.page.waitForTimeout(
      500
    );

    const input = crCell.locator(
      'input'
    );

    await input.fill(value);

    await this.page.keyboard.press(
      'Tab'
    );
  }


  async clickSave(index: number) {

    await this.save_btn.click();

    await this.page.waitForLoadState('load');
  }

  async clickBack() {
    await this.page.getByRole('link', { name: 'Journal Entries' }).click();
    await this.page.waitForURL(/\/journal-entry$/, { timeout: 15000 });
    await this.page.waitForLoadState('load');
    await this.page.locator('.loader-wrapper').waitFor({ state: 'hidden', timeout: 20000 });
  }

  async clickEditButton(index: number) {
    await this.page.locator('.loader-wrapper').waitFor({ state: 'hidden', timeout: 20000 });
    const editBtn = this.page
        .locator('tbody tr')
        .nth(index)
        .locator('button:has(i.ki-notepad-edit)');
    await expect(editBtn).toBeVisible({ timeout: 15000 });
    await editBtn.click();
    await this.page.waitForURL(/edit-journal-entry/, { timeout: 20000 });
    await this.page.waitForLoadState('load');
    await this.page.locator('.loader-wrapper').waitFor({ state: 'hidden', timeout: 20000 });
  }


  async clickPostButton() {

    await this.page.locator('.loader-wrapper').waitFor({ state: 'hidden', timeout: 20000 });

    await expect(this.post_btn).toBeVisible({ timeout: 15000 });
    await expect(this.post_btn).toBeEnabled({ timeout: 15000 });
    await this.post_btn.click();

    await this.page.locator('.loader-wrapper').waitFor({ state: 'hidden', timeout: 30000 });

    await this.page.waitForURL(/\/journal-entry$/, { timeout: 20000 });
    const firstRowStatus = this.page.locator('tbody tr').first().locator('td').nth(4);
    await expect(firstRowStatus).toContainText('Posted', { timeout: 15000 });
  }


  


  
}