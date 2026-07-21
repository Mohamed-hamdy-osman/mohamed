import { test, expect } from '@playwright/test';
import { AuthService } from '../../auth/AuthService';
import { GetPurchaseRequest } from '../../Services/Purchasing/GetPurchaseRequest';

test.beforeAll(() => {
  AuthService.initialize();
});

test('Get Purchase Requests', async ({ request }) => {
  const purchaseRequest = new GetPurchaseRequest(request);

  const response = await purchaseRequest.getPurchaseRequests();

  expect(response.status()).toBe(200);
});