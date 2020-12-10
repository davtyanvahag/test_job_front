import {FileEntity} from './file.entity';

export class UserEntity {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  registrationDate: string;
  ipAddress: string;
  status: string;
  Files?: [FileEntity];

  constructor(firstName,
              lastName,
              email,
              birthDate,
              registrationDate,
              ipAddress,
              status) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.birthDate = birthDate;
    this.registrationDate = registrationDate;
    this.ipAddress = ipAddress;
    this.status = status;
  }
}
