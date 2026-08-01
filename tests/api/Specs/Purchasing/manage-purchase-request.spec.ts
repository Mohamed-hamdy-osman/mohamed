import { test, expect } from '@playwright/test';
import { AuthService } from '../../auth/AuthService';
import { ManagePurchaseRequest } from '../../Services/Purchasing/manage-purchase-request';

test.beforeAll(() => {
  AuthService.initialize();
});
test('Get Purchase Requests without parameters', async ({ request }) => {
  const purchaseRequest = new ManagePurchaseRequest(request);

  const response = await purchaseRequest.getPurchaseRequests();

  expect(response.status()).toBe(200);
});
test('Get Purchase Requests with pagination', async ({ request }) => {
  const purchaseRequest = new ManagePurchaseRequest(request);

  const response = await purchaseRequest.ManagePurchaseRequest({
    'PagingOptions.PageSize': 10,
    'PagingOptions.PageNumber': 1,
  });

  expect(response.status()).toBe(200);
});
test('Get Purchase Requests with page number 2', async ({ request }) => {
  const purchaseRequest = new ManagePurchaseRequest(request);

  const response = await purchaseRequest.ManagePurchaseRequest({
    'PagingOptions.PageSize': 10,
    'PagingOptions.PageNumber': 2,
  });

  expect(response.status()).toBe(202);
});
test('Get Purchase Requests filtered by department', async ({ request }) => {
  const purchaseRequest = new ManagePurchaseRequest(request);

  const response = await purchaseRequest.ManagePurchaseRequest({
    DepartmentId: 'xxxxxxxx',
  });

  expect(response.status()).toBe(202);
});
