import {Model, Types} from "mongoose";

export interface UserFields {
    username: string;
    password: string;
    token:string;
    phoneNumber:string;
    displayName:string;
}

export interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;

export interface ItemMutation{
    category:string;
    title:string;
    description:string;
    image:string;
    price:number;
}