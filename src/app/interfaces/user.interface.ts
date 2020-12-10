import {File} from './file.interface';

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  registrationDate: string;
  ipAddress: string;
  status: string;
  Files?: File[];
}
