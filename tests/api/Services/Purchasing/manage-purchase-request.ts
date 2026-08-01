import { BaseApi } from '../BaseApi';
import { AuthHeaders } from '../../auth/AuthHeaders';

export class ManagePurchaseRequest extends BaseApi {
  async getPurchaseRequests() {
    return await this.request.get('/api/purchasing/purchase-requests', {
      headers: AuthHeaders.getHeaders(),
    });
  }

  async ManagePurchaseRequest(params?: Record<string, any>) {
    return await this.request.get('/api/purchasing/purchase-requests', {
      headers: AuthHeaders.getHeaders(),
      params,
    });
  }
}
