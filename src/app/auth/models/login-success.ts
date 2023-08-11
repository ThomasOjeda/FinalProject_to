export interface LoginSuccess {
  success: boolean;
  message: string;
  user: {
    name: {
      first: string;
      last: string;
    };
    _id: string;
    email: string;
    username: string;
    __v: number;
  };
  token: string;
}
