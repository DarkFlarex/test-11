export interface User {
    _id: string;
    username: string;
    token: string;
}

export interface RegisterMutation {
    username: string;
    password: string;
    displayName:string;
    phoneNumber:string;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        };
    };
    message: string;
    name: string;
    _message: string;
}

export interface GlobalError {
    error: string;
}

export interface Category {
    _id: string;
    title: string;
}

export interface ItemMutation{
    category:string;
    title:string;
    description:string;
    image:string;
    price: string;
}