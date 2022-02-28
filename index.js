const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
const port = 5000;


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://nayeem:zxnmqwop@cluster0.gubml.mongodb.net/ema-john?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("ema-john").collection("productfinal");
    const ordersCollection = client.db("ema-john").collection("orders");
    // perform actions on the collection object
    console.log("database conencted")

    app.post("/addProduct", (req, res) => {
        const products = req.body;
        collection.insertOne(products)
            .then(res => {
                console.log("posted fine", res.insertedCount)
            })
    })


    app.get("/getProduct", (req, res) => {
        collection.find().limit(20)
            .toArray((err, documents) => {
                res.send(documents);
            })
    })


    //shipment
    app.post("/addOrder", (req, res) => {
        const orders = req.body;
        ordersCollection.insertOne(orders)
            .then(data => {
                res.send(data);
                
            
            })
    })



    app.get("/getProduct/:key", (req, res) => {
        collection.find({ key: req.params.key })
            .toArray((err, documents) => {
                res.send(documents[0]);
            })
    })


    app.post("/productByKeys", (req, res) => {
        const productKeys = req.body;
        collection.find({ key: { $in: productKeys } })
            .toArray((err, documents) => {
                res.send(documents)
            })
    })



});



app.listen(process.env.NODE_ENV || port);