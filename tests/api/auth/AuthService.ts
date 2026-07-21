import { AuthStorage } from './AuthStorage';

export class AuthService {
  static initialize(): void {
    const accessToken =
      'eyJhbGciOiJSUzI1NiIsImtpZCI6IjM4MjMxMjU1NDM0NjU4MDQ2OSIsInR5cCI6IkpXVCJ9.eyJSb2xlcyI6InN1cGVyQWRtaW4iLCJUZW5hbnRJZCI6InpldGEiLCJhdWQiOlsiMzAxODQ5NTMwNjY2NjQ3NTU1IiwiMzExNTY1MjQzNzQ4Nzc3OTg4IiwiMjk3MjMyNTUxNTAyNzQxNTA3IiwiMjk3MjMyNTAyNDEyNTQxOTU1Il0sImNsaWVudF9pZCI6IjI5NzIzMjU1MTUwMjc0MTUwNyIsImV4cCI6MTc4NDU1MDA4MSwiaWF0IjoxNzg0Mzc3MjgxLCJpc3MiOiJodHRwczovL2lkZW50aXR5LmRldi5hY3RvcnNlcnAuY29tIiwianRpIjoiVjJfMzgyMzIxMzQ3OTczMzU5NjMwLWF0XzM4MjMyMTM0Nzk3MzQyNTE2NiIsIm5iZiI6MTc4NDM3NzI4MSwic3ViIjoiMzUzOTgxMTY3ODY4ODUzOTA0IiwidXJuOnppdGFkZWw6aWFtOm9yZzppZCI6IjM1Mzk4MTE2NjUyNjY3NzE3OCIsInVybjp6aXRhZGVsOmlhbTp1c2VyOnJlc291cmNlb3duZXI6aWQiOiIzNTM5ODExNjY1MjY2NzcxNzgiLCJ1cm46eml0YWRlbDppYW06dXNlcjpyZXNvdXJjZW93bmVyOm5hbWUiOiJ6ZXRhIiwidXJuOnppdGFkZWw6aWFtOnVzZXI6cmVzb3VyY2Vvd25lcjpwcmltYXJ5X2RvbWFpbiI6InpldGEuaWRlbnRpdHkuZGV2LmFjdG9yc2VycC5jb20ifQ.nOFBfSVgPRBsK7_QFyrHECTf--GZ9P16DQ1CUo5L2TpESDXW1wPovvYWKKto-BHXVPzO2cofFFxz3yTUP0OALOv1navIxFq39o2nc7JYo-hb5vwiP1p9lz2QrCcbuHoFOxTniyEnAW-ffDLtFp44nymfra0Qj1xATD1e3_fpuh0yHXn_V-D5wbhSLkYZ7BJD52_4n-MjvXMFoPe4tNgCIn85chkGF0LWCSqTacb9vJq_OePljzgN1oY8wgAnoFQd3YJNdhcw2Zk0xsiE8ajShNpJSDOQU4rG44UtO2OcKa2yRsicTDWbg7KPY4EEzEDZWrMfP78nsIA30V-7I6Tx6A';

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