import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Category from "./models/Category";
import Item from "./models/Item";

const run = async () => {
    await mongoose.connect(config.database);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('categories');
        await db.dropCollection('items');

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
    await Item.create({
        user:user1,
        category: ComputersCategory,
        title:'Macintosh',
        image: 'fixtures/macintosh.jpg',
        description:'Macintosh или Mac — линейка персональных компьютеров производства корпорации Apple. Работают под управлением операционных систем семейства Mac OS, возможна также работа на ОС Windows NT, A/UX, NeXTSTEP, BeOS/Haiku, GNU/Linux и Rhapsody. Своё название получили от сорта яблок «Malus \'McIntosh\'».',
        price: 300,
        },{
        user:user1,
        category: ComputersCategory,
        title:'Agat-4',
        image: 'fixtures/agat-4.jpeg',
        description:'первый советский серийный персональный компьютер (микрокомпьютер). «Агат» является 8-разрядным универсальным компьютером, ориентированным для применения в образовательном процессе. Разработан в 1981—1983 годах в Научно-исследовательском институте вычислительных комплексов (НИИВК) как советский аналог американского компьютера Apple II Plus / Apple IIe[6], производившихся с модернизациями до конца 1990 года[7]. Главный конструктор — Анатолий Фёдорович Иоффе. «Агат» является первой персональной ЭВМ, разработанной в СССР[4][8][9], первые комплекты которых появились в 1982 году, а серийный выпуск отлажен к 1985 году[10].',
        price: 500,
    },{
        user:user1,
        category: CarsCategory,
        title:'Urus',
        image: 'fixtures/urus.jpg',
        description:'Lamborghini Urus — это высокопроизводительный внедорожник класса люкс , выпускаемый итальянским автопроизводителем Lamborghini . Он был представлен в декабре 2017 года как серийный автомобиль 2018 модельного года. [ 4 ] Urus — первый внедорожник Lamborghini и пятидверный автомобиль в современную эпоху (находящийся в собственности Volkswagen Group ), и второй внедорожник в истории бренда после LM002 , который производился в период с 1986 по 1993 год',
        price: 500,
    },{
        user:user1,
        category: CarsCategory,
        title:'Porshe911',
        image: 'fixtures/porsche911.png',
        description:'Lamborghini Urus — это высокопроизводительный внедорожник класса люкс , выпускаемый итальянским автопроизводителем Lamborghini . Он был представлен в декабре 2017 года как серийный автомобиль 2018 модельного года. [ 4 ] Urus — первый внедорожник Lamborghini и пятидверный автомобиль в современную эпоху (находящийся в собственности Volkswagen Group ), и второй внедорожник в истории бренда после LM002 , который производился в период с 1986 по 1993 год',
        price: 500,
    },{
        user:user1,
        category: PhoneCategory,
        title:'Iphone16',
        image: 'fixtures/iphone16.jpg',
        description:'iPhone 16 и iPhone 16 Plus — смартфоны, разработанные, созданные и продаваемые компанией Apple Inc. Восемнадцатое поколение iPhone, они были анонсированы во время специального мероприятия Apple 9 сентября 2024 года в Купертино, штат Калифорния, вместе с флагманскими моделями iPhone 16 Pro и Pro Max, пришедшими на смену iPhone 15 и iPhone 15 Plus[1]. Начало приема предварительных заказов намечено на 13 сентября 2024 года.',
        price: 500,
    },{
        user:user1,
        category: PhoneCategory,
        title:'Samsung S 24',
        image: 'fixtures/samsungS24.png',
        description:'Samsung Galaxy S24 — флагманские смартфоны компании Samsung, представленные 17 января 2024 года на мероприятии Galaxy Unpacked. Они отличаются высоким уровнем производительности, инновационными камерами с искусственным интеллектом, плоскими экранами с переменной частотой обновления 120 Гц и поддержкой S Pen (только для модели Ultra).',
        price: 500,
    }, {
        user:user2,
        category: ComputersCategory,
        title:'UNIVAC I',
        image: 'fixtures/UNIVAC.jpg',
        description:'UNIVAC I — первый условно коммерческий компьютер, созданный в Соединённых Штатах, и третий коммерческий компьютер в мире. Спроектирован, в основном, Джоном Эккертом и Джоном Мокли, изобретателями компьютера ENIAC, на средства из федерального бюджета по заказу Армии и Военно-воздушных сил США.',
        price: 1500,
    },{
        user:user2,
        category: CarsCategory,
        title:'Mercedes 35 PS',
        image: 'fixtures/Mercedes_35hp_01.jpg',
        description:'Mercedes 35 PS (PS от нем. Pferdestärke — «лошадиная сила») — один из самых ранних автомобилей с бензиновым двигателем в истории, разработанный инженером-конструктором Вилгельмом Майбахом по заказу известного предпринимателя и консула Австро-Венгрии Эмиля Еллинека в период между 1900 и 1901 годами.',
        price: 1500,
    },{
        user:user2,
        category: CarsCategory,
        title:'Porsche Cayenne',
        image: 'fixtures/cayenne.jpg',
        description:'Porsche Cayenne — пятиместный среднеразмерный спортивный[источник не указан 242 дня] кроссовер производства немецкой автомобилестроительной компании Porsche. Автомобиль создан при активном участии концерна Volkswagen. Впервые был представлен публике в декабре 2002 года. Производство и реализация первого поколения (Type 955/9PA) началось в 2003[1] году, в Северной Америке. Название модели, Cayenne, образовано по имени столицы Французской Гвианы.',
        price: 1500,
    }
    ,{
        user:user2,
        category: PhoneCategory,
        title:'Teletrofono',
        image: 'fixtures/telephone.jpg',
        description:'В 1860 году естествоиспытатель Антонио Меуччи опубликовал статью в итальянской газете Нью-Йорка, в которой рассказал о своём изобретении, способном передавать звуки по электрическим проводам. Свой аппарат Меуччи назвал',
        price: 1500,
    }, {
        user:user2,
        category: PhoneCategory,
        title:'Iphone15',
        image: 'fixtures/iphone15.jpg',
        description:'iPhone 15 и iPhone 15 Plus — смартфон производства корпорации Apple, работающий на базе операционной системы iOS 17 и процессора Apple A16. Презентация смартфонов была проведена во вторник 12 сентября 2023 года[1], в этот же день стартовали предзаказы гаджетов, смартфоны поступили в продажу 22 сентября 2023 года. Стартовая цена смартфонов от 799$ и 899$ соответственно.',
        price: 1500,
    },
    );

    await db.close();
};

run().catch(console.error);