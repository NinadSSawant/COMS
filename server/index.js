import express from "express";
import fs from "fs";
import cors from 'cors'



const app = express();
const port = 8000;

app.use(cors())
app.use(express.json())



const data = {
  order_id: 1,
  product_name: "name x",
  quantity: 2,
  unit_price: 10,
  total_price: 20,
};

const months = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December'
};


const getOrderId =  () => {
   
 const data= fs.readFileSync("./order_id.txt", "utf-8")
 let newData=Number(data)+1
 fs.writeFileSync('./order_id.txt',newData.toString());
 return newData

};



const addData = (data) => {
  const date = new Date();
  const currentDate = date.toLocaleDateString();
  const currentTime = date.toLocaleTimeString();
  const order_id=getOrderId()
  const day=date.getDate()
  const month=months[date.getMonth()+1]
  const year=date.getFullYear()

  const row = `\n${data.tableId},${order_id},${data.product_name},${data.quantity},${data.unit_price},${data.total_price},${currentDate},${currentTime},${day},${month},${year}`;
  fs.appendFile("./data.csv", row, (err) => {
    return "error while storing data";
  });

  return "data stored successfully..";
};




const getData = () => {
  const data = fs.readFileSync("./data.csv", "utf8");
  let rows = data.split("\n");
  return rows;
};


app.get('/ownerData',(req,res)=>{
  const data=getData()
  
  res.send(data)
})




app.post("/addOrder", (req, res) => {
  
  const data=req.body

  console.log(data)
  const status=addData(data)
  console.log(status)
  res.send('ok');

});

app.listen(port, () => console.log("server started at port 8000"));
