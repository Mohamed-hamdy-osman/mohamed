import { BaseApi } from '../BaseApi';
import { AuthHeaders } from '../../auth/AuthHeaders';

export class SubmitPurchaseRequest extends BaseApi {

  async submitPurchaseRequest(id: string) {

    return await this.request.post(
      `/api/purchasing/purchase-requests/${id}/submit`,
      {
        headers: AuthHeaders.getHeaders(),
      }
    );

  }
}