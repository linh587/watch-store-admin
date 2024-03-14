export interface UserModel {
  _id: string;
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  role: string;
  address: string;
  status: string | number;
}
