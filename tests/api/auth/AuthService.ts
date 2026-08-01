import { AuthStorage } from './AuthStorage';

export class AuthService {
  static initialize(): void {
    const accessToken ='eyJhbGciOiJSUzI1NiIsImtpZCI6IjM4NDMyMjQ4OTI2Nzc5MTg4NiIsInR5cCI6IkpXVCJ9.eyJSb2xlcyI6InN1cGVyQWRtaW4iLCJUZW5hbnRJZCI6InpldGEiLCJhdWQiOlsiMzAxODQ5NTMwNjY2NjQ3NTU1IiwiMzExNTY1MjQzNzQ4Nzc3OTg4IiwiMjk3MjMyNTUxNTAyNzQxNTA3IiwiMjk3MjMyNTAyNDEyNTQxOTU1Il0sImNsaWVudF9pZCI6IjI5NzIzMjU1MTUwMjc0MTUwNyIsImV4cCI6MTc4NTc1NDc4MywiaWF0IjoxNzg1NTgxOTg0LCJpc3MiOiJodHRwczovL2lkZW50aXR5LmRldi5hY3RvcnNlcnAuY29tIiwianRpIjoiVjJfMzg0MzQyNTAzNTQ2OTQ5MTk1LWF0XzM4NDM0MjUwMzU0NzAxNDczMSIsIm5iZiI6MTc4NTU4MTk4NCwic3ViIjoiMzUzOTgxMTY3ODY4ODUzOTA0IiwidXJuOnppdGFkZWw6aWFtOm9yZzppZCI6IjM1Mzk4MTE2NjUyNjY3NzE3OCIsInVybjp6aXRhZGVsOmlhbTp1c2VyOnJlc291cmNlb3duZXI6aWQiOiIzNTM5ODExNjY1MjY2NzcxNzgiLCJ1cm46eml0YWRlbDppYW06dXNlcjpyZXNvdXJjZW93bmVyOm5hbWUiOiJ6ZXRhIiwidXJuOnppdGFkZWw6aWFtOnVzZXI6cmVzb3VyY2Vvd25lcjpwcmltYXJ5X2RvbWFpbiI6InpldGEuaWRlbnRpdHkuZGV2LmFjdG9yc2VycC5jb20ifQ.B-cZtU-ABEFHdR5dt7qOE6rB_dbpHVqKEo2GXMD1yY2E-R3IaYZd0vsrLndTpnE410qBhz1CY1_NQ0gDn7UKMFgtUZV6HXS4tZOPScaa6OgDCt48Vk0Go_b4zprnSkL80dsujaobKTwNNAdR5EZ8o1NVxvjfUhrEv6eZ7DnU9f_3O-lhcdFA1Fu8Z4FhMhz7j-xyjGQRSxU6t-C8mJ8j_jSWYL6oAYzT_Nph8GE-L72n5sYGgmZz9pv1zsdMhg1JHSMRQ-9SgkvwqXSOFgloj2mLTt_CxPX0jTLjWKaWoPaKa1tSDd1DyBvYIds3dxS_euHtJRxaYX6lTGN22m-jnQ';
    const tenantId = 'zeta';
    const corporateId = 'd27ffcf0-1fad-465c-96bc-c580dc300c3c';

    if (!accessToken || !tenantId || !corporateId) {
      throw new Error(
        'Authentication values are missing. Please set Access Token, TenantId, and CorporateId.'
      );
    }

    AuthStorage.setAccessToken(accessToken);
    AuthStorage.setTenantId(tenantId);
    AuthStorage.setCorporateId(corporateId);
  }
} 