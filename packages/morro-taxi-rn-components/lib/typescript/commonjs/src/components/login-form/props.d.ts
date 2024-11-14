export interface ILoginFormProps {
    loginUser: (user: ILoginUser) => void;
    isLoading: boolean;
    onGoToRegister?: () => void;
}
export interface ILoginUser {
    email: string;
    password: string;
}
//# sourceMappingURL=props.d.ts.map