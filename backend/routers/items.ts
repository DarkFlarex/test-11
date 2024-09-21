import express from "express";
import mongoose from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../multer";
import {ItemMutation} from "../types";
import Item from "../models/Item";


const itemsRouter = express.Router();

itemsRouter.post('/', auth ,imagesUpload.single('image'),async (req: RequestWithUser,res,next) => {
    try {
        if (!req.user) {
            return res.status(401).send({ error: 'User not found' });
        }

        const itemMutation:ItemMutation = {
            category: req.body.category,
            title: req.body.title,
            description: req.body.description,
            image: req.file!.filename,
            price: req.body.price,
        };
        const post = new Item(itemMutation);
        await post.save();
        return res.send(post);
    } catch (error){
        if (error instanceof mongoose.Error.ValidationError){
            return  res.status(400).send(error);
        }
        return next(error);
    }
});

export default itemsRouter;
