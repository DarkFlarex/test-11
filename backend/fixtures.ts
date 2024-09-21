import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Category from "./models/Category";

const run = async () => {
    await mongoose.connect(config.database);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('categories');

    } catch (e) {
        console.log('Skipping drop...');
    }

    const user1 = new User({
        username: 'userMusic',
        password: '123',
        displayName: 'display userMusic',
        phoneNumber: '0774',
    });

    user1.generateToken();

    const user2 = new User({
        username: 'amantai',
        password: '123',
        displayName: 'display amantai',
        phoneNumber: '0773',
    });
    user2.generateToken();

    await user1.save();
    await user2.save();

    const [
        ComputersCategory,
        CarsCategory,
        PhoneCategory]
        = await Category.create([
        { title: 'Computers' },
        { title: 'Cars' },
        { title: 'Phones' }
    ]);


    await db.close();
};

run().catch(console.error);