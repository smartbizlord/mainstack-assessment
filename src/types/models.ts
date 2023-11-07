import { Model, Mongoose, ObjectId, Schema } from "mongoose"

export interface indexDb {
    mongo?: Mongoose
    users?: Model<any>
    products?: Model<any>
}

export interface productSchema {
    name: string,
    img: string,
    owner: ObjectId,
    category: string,
    price: number
}

export interface userSchema {
    name: string,
    email: string,
    password: string,
    refreshToken: string,
}

// RequestHandler<ParamsDictionary>