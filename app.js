const express = require('express');
const morgan = require('morgan');
const app = express();
const nftsRouter =require("./Api/Routers/nftRouter");
const userRouter =require("./Api/Routers/userRouter"); 

app.use(express.json());
// if(process.env.NODE_ENV === 'development'){
// }
app.use(morgan("dev"));

app.use(express.static(`${__dirname}/img`))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();  
    console.log('iam middle');
});
app.use((req, res, next) => {
    req.requestTime =new Date().toISOString();
    next();
    
}); 
app.use("/api/v1/users",userRouter);

app.use("/api/v1/nfts",nftsRouter);

module.exports =app;