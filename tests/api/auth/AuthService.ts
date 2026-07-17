import { AuthStorage } from './AuthStorage';

export class AuthService {
  static initialize(): void {
    const accessToken =
      'eyJhbGciOiJSUzI1NiIsImtpZCI6IjM4MjE3MTUzODI4OTMzMDY3NyIsInR5cCI6IkpXVCJ9.eyJSb2xlcyI6InN1cGVyQWRtaW4iLCJUZW5hbnRJZCI6InpldGEiLCJhdWQiOlsiMzAxODQ5NTMwNjY2NjQ3NTU1IiwiMzExNTY1MjQzNzQ4Nzc3OTg4IiwiMjk3MjMyNTUxNTAyNzQxNTA3IiwiMjk3MjMyNTAyNDEyNTQxOTU1Il0sImNsaWVudF9pZCI6IjI5NzIzMjU1MTUwMjc0MTUwNyIsImV4cCI6MTc4NDQ2ODM3MCwiaWF0IjoxNzg0Mjk1NTcwLCJpc3MiOiJodHRwczovL2lkZW50aXR5LmRldi5hY3RvcnNlcnAuY29tIiwianRpIjoiVjJfMzgyMTg0MjYwNTAyNTYyODMwLWF0XzM4MjE4NDI2MDUwMjYyODM2NiIsIm5iZiI6MTc4NDI5NTU3MCwic3ViIjoiMzUzOTgxMTY3ODY4ODUzOTA0IiwidXJuOnppdGFkZWw6aWFtOm9yZzppZCI6IjM1Mzk4MTE2NjUyNjY3NzE3OCIsInVybjp6aXRhZGVsOmlhbTp1c2VyOnJlc291cmNlb3duZXI6aWQiOiIzNTM5ODExNjY1MjY2NzcxNzgiLCJ1cm46eml0YWRlbDppYW06dXNlcjpyZXNvdXJjZW93bmVyOm5hbWUiOiJ6ZXRhIiwidXJuOnppdGFkZWw6aWFtOnVzZXI6cmVzb3VyY2Vvd25lcjpwcmltYXJ5X2RvbWFpbiI6InpldGEuaWRlbnRpdHkuZGV2LmFjdG9yc2VycC5jb20ifQ.OHH4KLst2TSDzN0hte1nmMtDNg3shCfonhnlNMKKQ1G1NAEv6XZSnJFF4NLN15B6TfbroS2kN2UAm_-hBzNoQvQ5yPmdvnWMbM_gyDI2DO7O5Aoy57vvc9NcVdqbDkf0hja32PP5ReBYBAd5ab23W2yM4ehZcx5uM5somxdjhVpxcclyQV-t1QhPIT86igzlUXQLO4m0lS3ZI9r7Fi1N5ua7KzBu7om44omD4_UlQuxeDUzw2mXNZ5FWkE5rzfoIzbAedCCHldzlP9x4yEzDxIVw0OviGVJq5a_EEgoG2VZlxzWRFFbodlS7NMsRGoaBSmbnxe2TGCepYJLzYXiCXA';

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