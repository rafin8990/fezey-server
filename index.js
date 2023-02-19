const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config()

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nuouh7o.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const productCollection=client.db('fezey').collection('products-collection');
const categoryCollection=client.db('fezey').collection('category-collection');
const bookingCollection=client.db('fezey').collection('booking-collection')

app.get('/', (req, res) => {
    res.send('fezey server is running')
})

async function run() {
    try {
        app.get('/products', async(req, res)=>{
            const query={};
            const result= await productCollection.find(query).limit(4).toArray();
            res.send(result)
        });

        app.get('/allproducts', async(req,res)=>{
            const query={};
            const result= await productCollection.find(query).toArray();
            res.send(result)
        })

        app.get('/product/:id', async(req, res)=>{
            const id=req.params.id;
            const query={_id: ObjectId(id)};
            const result=await productCollection.findOne(query);
            res.send(result)
        });

        app.post('/addtocart', async(req, res)=>{
            const data= req.body;
            const result=await orderCollection.insertOne(data);
            res.send(result)
        });

        app.get('/category', async(req, res)=>{
            const query={}
            const result=await categoryCollection.find(query).toArray();
            res.send(result);
        });
    
        app.get('/categories', async(req, res)=>{
            const category=req.query.category;
            const query={category:category}
            const result=await productCollection.find(query).toArray();
            res.send(result);
        })

        // booking collection 

        app.post('/booking', async(req, res)=>{
            const query=req.body;
            const result=await bookingCollection.insertOne(query);
            res.send(result);
        })
    
    }
    finally {

    }
}
run().catch(err => console.error(err))
app.listen(port, () => {
    console.log(`fezey server is running on port ${port}`)
})