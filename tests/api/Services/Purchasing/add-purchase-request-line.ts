import { BaseApi } from '../BaseApi';
import { AuthHeaders } from '../../auth/AuthHeaders';

export class AddPurchaseRequestLine extends BaseApi {

  async addPurchaseRequestLine(purchaseRequestId: string) {

    const response = await this.request.post(
      `/api/purchasing/purchase-requests/${purchaseRequestId}/lines`,
      {
        headers: AuthHeaders.getHeaders(),

        data: {
          productType: 'Service',
          serviceName: 'Miscellaneous',
          description: 'Services',
          unitPrice: 10,
          quantity: 1,
          neededAt: null,
          branchItemId: null,
          unitOfMeasureId: null,
          costCenterId: '971c51d7-3f88-4a47-a32d-17601125fc71',
        },
      }
    );

    return response;
  }
}