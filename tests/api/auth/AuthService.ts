import { AuthStorage } from './AuthStorage';

export class AuthService {
  static initialize(): void {
    const accessToken =
      'eyJhbGciOiJSUzI1NiIsImtpZCI6IjM4NDIyMTc5OTY4MTg4NzgxOSIsInR5cCI6IkpXVCJ9.eyJSb2xlcyI6InN1cGVyQWRtaW4iLCJUZW5hbnRJZCI6InpldGEiLCJhdWQiOlsiMzAxODQ5NTMwNjY2NjQ3NTU1IiwiMzExNTY1MjQzNzQ4Nzc3OTg4IiwiMjk3MjMyNTUxNTAyNzQxNTA3IiwiMjk3MjMyNTAyNDEyNTQxOTU1Il0sImNsaWVudF9pZCI6IjI5NzIzMjU1MTUwMjc0MTUwNyIsImV4cCI6MTc4NTY4MzQxMiwiaWF0IjoxNzg1NTEwNjEyLCJpc3MiOiJodHRwczovL2lkZW50aXR5LmRldi5hY3RvcnNlcnAuY29tIiwianRpIjoiVjJfMzg0MjIyNzYyODQ1MDg4NTAxLWF0XzM4NDIyMjc2Mjg0NTE1NDAzNyIsIm5iZiI6MTc4NTUxMDYxMiwic3ViIjoiMzUzOTgxMTY3ODY4ODUzOTA0IiwidXJuOnppdGFkZWw6aWFtOm9yZzppZCI6IjM1Mzk4MTE2NjUyNjY3NzE3OCIsInVybjp6aXRhZGVsOmlhbTp1c2VyOnJlc291cmNlb3duZXI6aWQiOiIzNTM5ODExNjY1MjY2NzcxNzgiLCJ1cm46eml0YWRlbDppYW06dXNlcjpyZXNvdXJjZW93bmVyOm5hbWUiOiJ6ZXRhIiwidXJuOnppdGFkZWw6aWFtOnVzZXI6cmVzb3VyY2Vvd25lcjpwcmltYXJ5X2RvbWFpbiI6InpldGEuaWRlbnRpdHkuZGV2LmFjdG9yc2VycC5jb20ifQ.C4thNWL2jipd-4li3Kal-9MwSXf_fbY9pNaNK9dPgovfi5lBLuHHMwe7BwXJp4GI0az3pSKkdIzMgbyzLZ39VRxQQFzOuRNOGQ52rw5sV8XgQbREJB1Q1gisRergFbA5W3qoNogF7Uc0WzqRaq5pnMsAa--tyA4UAllPVglTB9jKb8R14yN_qPg4p8MYcudatA2cZKbH8jOYxW8JT4hbC8wSjgTu8ko1s2_-QY31aZCfMDfq2pX5uOTtg6TnnOdX9wq2M8T-n7e1zlgHLet3mWk_EQT1wJsR93UB0h9yi1knUXfo0_J1TfNTV3EnxWSXtSEDiLUBDEq8sp06r7ACNA'; // Replace with your actual access token value

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