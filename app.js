const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const app = express();
app.use(express.static(__dirname + "public"));

const mongoClient = new MongoClient("mongodb://127.0.0.1:27017/");
const jsonParser = express.json();

//регистрация
app.post("/api", jsonParser, async (req, res) => {
  if (!req.body) return res.sendStatus(400);
  try {
    await mongoClient.connect();
    const db = mongoClient.db("users");
    const collection = db.collection("usersData");
    const matchUserName = await collection.findOne({
      userName: req.body.userName,
    });
    if (matchUserName !== null) {
      res.send("match");
      return;
    }
    const result = await collection.insertOne(req.body);
    res.end();
  } catch (err) {
    console.log(err);
  } finally {
    mongoClient.close();
  }
});

//Авторизация
app.post("/api/authorization", jsonParser, async (req, res) => {
  if (!req.body) res.sendStatus(400);
  try {
    await mongoClient.connect();
    const db = mongoClient.db("users");
    const collection = db.collection("usersData");
    let result = await collection.findOne({
      userName: req.body.userName,
      password: req.body.password,
    });
    if (result !== null) {
      result.status = "found";
      res.send(result);
    } else {
      result = { status: null };
      res.send(JSON.stringify(result));
    }
  } catch (err) {
    console.log(err);
  }
});

// Создание поста
app.post("/post", jsonParser, async (req, res) => {
  if (!req.body) return res.sendStatus(400);
  try {
    await mongoClient.connect();
    const db = mongoClient.db("users");
    const collection = db.collection("posts");
    result = await collection.insertOne(req.body);
  } catch (err) {
    console.log(err);
  }
});

// Получение всех постов

app.get("/all_posts", async (req, res) => {
  try {
    await mongoClient.connect();
    const db = mongoClient.db("users");
    const collection = db.collection("posts");
    const result = await collection.find({}).toArray();
    res.send(JSON.stringify(result));
  } catch (err) {
    console.log(err);
  } finally {
    await mongoClient.close();
  }
});

// все посты конкретного юзера

app.post("/my_posts", jsonParser, async (req, res) => {
  if (!req.body) return res.sendStatus(400);
  try {
    await mongoClient.connect();
    const db = mongoClient.db("users");
    const collection = db.collection("posts");
    const result = await collection
      .find({ userName: req.body.login })
      .toArray();
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

app.post("/add_favorite_post", jsonParser, async (req, res) => {
  try {
    await mongoClient.connect();
    const db = mongoClient.db("users");
    const collection = db.collection("usersData");
    const match = await collection
      .find({ userName: req.body.userName })
      .toArray();
    if (match[0].favoritePost.includes(req.body.id)) {
      return;
    }
    const result = await collection.updateOne(
      { userName: req.body.userName },
      { $push: { favoritePost: req.body.id } }
    );
    res.send(match[0].favoritePost);
  } catch (err) {
    console.log(err);
  }
});

app.post("/my_favorite_posts", jsonParser, async (req, res) => {
  try {
    await mongoClient.connect();
    const db = mongoClient.db("users");
    const collection = db.collection("usersData");
    const bestPosts = await collection.findOne({
      userName: req.body.name,
    });
    const postsIdArr = bestPosts.favoritePost;

    const collectionPosts = db.collection("posts");
    const result = await Promise.all(
      postsIdArr.map(async (item) => {
        const objID = new ObjectId(item);
        return await collectionPosts.findOne({ _id: objID });
      })
    );
    res.send(JSON.stringify(result));
  } catch (err) {
    console.log(err);
  }
});

app.post("/remove_favorite", jsonParser, async (req, res) => {
  try {
    await mongoClient.connect();
    const db = mongoClient.db("users");
    const collection = db.collection("usersData");
    const result = await collection.updateOne(
      { userName: req.body.userName },
      { $pull: { favoritePost: req.body.id } }
    );
  } catch (err) {
    console.log(err);
  }
});

app.listen(3001, () => {
  console.log("server started");
});
