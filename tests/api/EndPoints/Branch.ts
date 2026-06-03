import { expect, APIRequestContext, APIResponse } from '@playwright/test';

export class BranchesApi {

  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getBranches(
    token: string,
    pageSize?: number,
    pageNumber?: number,
    filterTerm?: string,
    filterField?: string,
    filterOperation?: string,
    filter?: string,
    sortingField?: string,
    sortingDirection?: string
  ): Promise<APIResponse> {

    const response = await this.request.get(
      'https://api.dev.actorserp.com/api/inventory/branches',
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        },

        params: {
          pageSize: pageSize ?? 10,
          pageNumber: pageNumber ?? 1,

          ...(filterTerm && { filterTerm }),
          ...(filterField && { filterField }),
          ...(filterOperation && { filterOperation }),
          ...(filter && { filter }),
          ...(sortingField && { sortingField }),
          ...(sortingDirection && { sortingDirection }),
        }
      }
    );

    return response;
  }

  async validateGetBranchesSuccess(response: APIResponse) {

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('pageSize');
    expect(responseBody).toHaveProperty('totalCount');
    expect(responseBody).toHaveProperty('currentPage');
    expect(responseBody).toHaveProperty('totalPages');
    expect(responseBody).toHaveProperty('items');

    expect(Array.isArray(responseBody.items)).toBe(true);

    if (responseBody.items.length > 0) {

      const firstItem = responseBody.items[0];

      expect(firstItem).toHaveProperty('id');
      expect(firstItem).toHaveProperty('nameEn');
      expect(firstItem).toHaveProperty('nameAr');
      expect(firstItem).toHaveProperty('code');
      expect(firstItem).toHaveProperty('costingMethod');
      expect(firstItem).toHaveProperty('start');
      expect(firstItem).toHaveProperty('creationDate');
      expect(firstItem).toHaveProperty('isActive');

      expect(typeof firstItem.id).toBe('string');
      expect(typeof firstItem.nameEn).toBe('string');
      expect(typeof firstItem.nameAr).toBe('string');
      expect(typeof firstItem.code).toBe('string');
      expect(typeof firstItem.isActive).toBe('boolean');
    }
  }
}