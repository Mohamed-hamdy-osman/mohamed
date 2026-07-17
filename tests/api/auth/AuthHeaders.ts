import { AuthStorage } from './AuthStorage';

export class AuthHeaders {
  static getHeaders(): Record<string, string> {
    return {
      Authorization: `Bearer ${AuthStorage.getAccessToken()}`,
      TenantId: AuthStorage.getTenantId(),
      CorporateId: AuthStorage.getCorporateId(),
      'Content-Type': 'application/json',
    };
  }
}