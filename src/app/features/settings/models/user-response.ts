export interface UserResponse {
  status: string;
  data: {
    _id: string;
    name?: {
      first?: string;
      last?: string;
    };
    email: string;
    username: string;
    password?: string;
    __v?: number;
  };
}
