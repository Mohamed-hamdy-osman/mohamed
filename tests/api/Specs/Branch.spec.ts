import { test } from '@playwright/test';
import { BranchesApi } from '../EndPoints/Branch';

let branchesApi: BranchesApi;

test.beforeEach(async ({ request }) => {

  branchesApi = new BranchesApi(request);

});

test('Get Branches Successfully', async () => {

  const token = process.env.TOKEN!;

  const pageSize = 10;
  const pageNumber = 1;

  const response = await branchesApi.getBranches(
    token,
    pageSize,
    pageNumber
  );

  await branchesApi.validateGetBranchesSuccess(response);

});