import { BaseApi } from '../BaseApi';
import { AuthHeaders } from '../../auth/AuthHeaders';

export class GetPurchaseRequest extends BaseApi {
  async getPurchaseRequests() {
    return await this.request.get('/api/purchasing/purchase-requests', {
      headers: AuthHeaders.getHeaders(),
    });
  }
}