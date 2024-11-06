export interface ISignUpFormProps {
  registerUser: (user: IRegisterUser) => void;
  isLoading: boolean;
}

export interface IRegisterUser {
  name: string;
  email: string;
  phone: string;
  password: string;
}
