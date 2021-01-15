

const express = require("express")
const axios = require ("axios");
const app = express();
const port = process.env.PORT || 3000;



const exchangeRate = async (base, currency) => {
   // console.log(await axios.get(url));
    const response={
        data:"",
        error:null,
        status:""
    }
    try {

        
        const url = `https://api.exchangeratesapi.io/latest?base=${base?base:""}&symbols=${currency?currency:""}`;
        const res =  await axios.get(url);
       
        response.data = res.data;
    } catch (error) {
        console.log("error is ", error.response.data)
        response.error =  error.response.data;
        response.status = 400;
    }
    console.log("this is the first resp", response)
    return response;
}

const getRates = async (base, currency) => {
    
    const response2 = await exchangeRate(base, currency);
    console.log(response2);
    return  response2;
    
};



app.get('/',(req,res)=>{
    res.send(`Welcome to currency converter Api try please add "/api/rates" to the current url`)
} )

app.get('/api/rates',async(req,res)=>{
   const resp = await getRates(req.query.base, req.query.currency);
   let myres
   console.log(resp);
    console.log(req.query);
    if(resp.data){
         myres = {
            results:{
                base:resp.data.base,
                date:resp.data.date,
                rates:resp.data.rates
            }
        }
    }else myres = {error:resp.error.error,status:resp.status };
    
    //res.json({results:data});
   return res.json(myres);
    
} )


app.listen(port,()=>{
    console.log(` App listening at http://localhost:${port}`)
})