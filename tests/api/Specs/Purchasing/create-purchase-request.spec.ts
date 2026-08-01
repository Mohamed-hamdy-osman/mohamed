import { test, expect } from '@playwright/test';
import { AuthService } from '../../auth/AuthService';
import { CreatePurchaseRequest } from '../../Services/Purchasing/create-purchase-request';
import { AddPurchaseRequestLine } from '../../Services/Purchasing/add-purchase-request-line';
import { SubmitPurchaseRequest } from '../../Services/Purchasing/submit-purchase-request';

test.beforeAll(() => {
  AuthService.initialize();
});

test('Verify user can create purchase request', async ({ request }) => {
  const purchaseRequest = new CreatePurchaseRequest(request);

  // Create Purchase Request
  const createResponse = await purchaseRequest.createPurchaseRequest();
  expect(createResponse.status()).toBe(200);

  const purchaseRequestId = await createResponse.json();

  console.log('Purchase Request Id:', purchaseRequestId);

  // Add Purchase Request Line
  const addPurchaseRequestLine = new AddPurchaseRequestLine(request);
  const addLineResponse = await addPurchaseRequestLine.addPurchaseRequestLine(purchaseRequestId);
  expect(addLineResponse.status()).toBe(202);

  // Submit Purchase Request
  const submitPurchaseRequest = new SubmitPurchaseRequest(request);
  const submitResponse = await submitPurchaseRequest.submitPurchaseRequest(
    purchaseRequestId
  );

  // Accept both 200 (OK) and 202 (Accepted)
  expect([200, 202]).toContain(submitResponse.status());
});