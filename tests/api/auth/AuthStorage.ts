export class AuthStorage {
  private static accessToken = '';
  private static tenantId = '';
  private static corporateId = '';

  static setAccessToken(token: string): void {
    this.accessToken = token;
  }

  static getAccessToken(): string {
    return this.accessToken;
  }

  static setTenantId(tenantId: string): void {
    this.tenantId = tenantId;
  }

  static getTenantId(): string {
    return this.tenantId;
  }

  static setCorporateId(corporateId: string): void {
    this.corporateId = corporateId;
  }

  static getCorporateId(): string {
    return this.corporateId;
  }

  static clear(): void {
    this.accessToken = '';
    this.tenantId = '';
    this.corporateId = '';
  }
}