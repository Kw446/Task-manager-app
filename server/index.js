const express=require('express');
const bodyParser=require('body-parser');
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const {config}=require('./dbConfig/database');
const mainRouter=require('./routes/mainRouter');
const cors=require('cors');
dotenv.config();

const app=express();
app.use(bodyParser.json());

app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use('/api',mainRouter);

mongoose.connect(config.DBconnection).then(()=>{
    console.log('Database connected successfully');
}).catch((err)=>{
    console.log('Database connection failed',err);
});
const Port= process.env.PORT || 5000;

app.listen(Port,()=>{
    console.log(`Server is running on port ${Port}`);
})
