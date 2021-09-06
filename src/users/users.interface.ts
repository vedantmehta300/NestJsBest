export interface User {
  id?: number;
  //username:string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profilePictureUrl: string;
  dateOfBirth: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
