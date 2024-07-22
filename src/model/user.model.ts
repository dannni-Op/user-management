
export class UserResponse {
  id: number;
  username: string;
  name: string;
  email: string;
  token?: string;
}

export class RegisterUserRequest {
  username: string;
  password: string;
  name: string;
  email: string;
}

export class LoginUserRequest {
  username: string;
  password: string;
}

export class UpdateUserRequest {
  username?: string;
  password?: string;
  name?: string;
  email?: string;
}
