export type RegisterRequest = {
    email: string;
    fullName: string;
    password: string;
    passwordConfirmation: string,
    phone: string;
};

export type LoginRequest = {
    email: string;
    password: string;
};

export type UserGet = {
    id: string;
    email: string;
    phoneNumber: string;
    fullName: string;
};

export type LoginResponse = {
    access_token: string;
    user: UserGet;
};