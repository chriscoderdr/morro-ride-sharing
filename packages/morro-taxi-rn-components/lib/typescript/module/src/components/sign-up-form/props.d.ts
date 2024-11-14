export interface ISignUpFormProps {
    registerUser: (user: IRegisterUser) => void;
    isLoading: boolean;
    onGoToLogin?: () => void;
}
export interface IRegisterUser {
    name: string;
    email: string;
    phone: string;
    password: string;
}
//# sourceMappingURL=props.d.ts.map