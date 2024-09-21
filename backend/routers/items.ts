import express from "express";
import mongoose from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../multer";
import {ItemMutation} from "../types";
import Item from "../models/Item";
import item from "../models/Item";

const itemsRouter = express.Router();

itemsRouter.get('/', async (req, res, next) => {
    try {
        const filter: Record<string, unknown> = {};

        if (req.query.category) {
            filter.category = req.query.category;
        }

        const products = await item.find(filter).populate('category', 'title');
        return res.send(products);
    } catch (error) {
        next(error);
    }
});

itemsRouter.get('/:id', async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.id).populate('category', 'title');

        if (item === null) {
            return res.status(404).send({ error: 'Item not found' });
        }

        return res.send(item);
    } catch (error) {
        next(error);
    }
});

itemsRouter.delete('/:id',  auth,async (req: RequestWithUser, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).send({ error: 'User not found' });
        }

        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).send({ error: 'Item not found' });
        }

        if (item.user.toString() !== req.user._id.toString()) {
            return res.status(403).send({ error: 'Forbidden: The user does not have enough access rights to delete' });
        }
        await Item.deleteOne({_id: req.params.id});
        return res.send(item);
    } catch (error) {
        next(error);
    }
});

itemsRouter.post('/', auth ,imagesUpload.single('image'),async (req: RequestWithUser,res,next) => {
    try {
        if (!req.user) {
            return res.status(401).send({ error: 'User not found' });
        }

        const itemMutation:ItemMutation = {
            user: req.user._id.toString(),
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
