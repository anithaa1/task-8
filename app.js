const express=require("express")
const app=express()
const model=require('./model/project')
const connectDB = require("../task 8 mon/config/db_config");
const route = require('./router/main_router');
app.use(express.json())
route.init(app);
app.post('/',async (req,res)=>{
const data=await model(req.body)
res.send(data)
})
connectDB();
const port = process.env.port || 3000;
app.listen(port, (res) => {
    console.log(`Listening on port ${port}`);
});