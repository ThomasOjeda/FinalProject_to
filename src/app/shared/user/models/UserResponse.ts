import { User } from 'src/models/user';

export interface UserResponse {
  status: string;
  data: User;
}
