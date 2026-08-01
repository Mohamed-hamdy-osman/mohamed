import { test, expect } from '@playwright/test';
import { AuthService } from '../../auth/AuthService';
import { GetPurchaseRequest } from '../../Services/Purchasing/GetPurchaseRequest';

test.beforeAll(() => {
  AuthService.initialize();
});
test('Get Purchase Requests without parameters', async ({ request }) => {
  const purchaseRequest = new GetPurchaseRequest(request);

  const response = await purchaseRequest.getPurchaseRequests();

  expect(response.status()).toBe(200);
});
test('Get Purchase Requests with pagination', async ({ request }) => {
  const purchaseRequest = new GetPurchaseRequest(request);

  const response = await purchaseRequest.getPurchaseRequests({
    'PagingOptions.PageSize': 10,
    'PagingOptions.PageNumber': 1,
  });

  expect(response.status()).toBe(200);
});
test('Get Purchase Requests with page number 2', async ({ request }) => {
  const purchaseRequest = new GetPurchaseRequest(request);

  const response = await purchaseRequest.getPurchaseRequests({
    'PagingOptions.PageSize': 10,
    'PagingOptions.PageNumber': 2,
  });

  expect(response.status()).toBe(200);
});
test('Get Purchase Requests filtered by department', async ({ request }) => {
  const purchaseRequest = new GetPurchaseRequest(request);

  const response = await purchaseRequest.getPurchaseRequests({
    DepartmentId: 'xxxxxxxx',
  });

  expect(response.status()).toBe(200);
});
