import { BaseApi } from '../BaseApi';
import { AuthHeaders } from '../../auth/AuthHeaders';

export class CreatePurchaseRequest extends BaseApi {
  async createPurchaseRequest() {
    const response = await this.request.post(
      '/api/purchasing/purchase-requests',
      {
        headers: AuthHeaders.getHeaders(),
        data: {
          number: 3242,
          name: 'Purchase Request',
          branchId: '3648b00f-edf5-4cf3-b991-5180b8b12712',
          requesterId: 'af906979-0131-4d31-8b0b-00c15ed6ac57',
          financialPeriodId: 'cd38249c-199b-46ff-8a6b-f665ebf31e7f',
        },
      }
    );

    return response;
  }
}