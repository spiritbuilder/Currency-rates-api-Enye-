

const express = require("express")
const axios = require ("axios");
const app = express();
const port = 3000;
let url = "https://api.exchangeratesapi.io/latest";


const exchangeRate = async (base, currency) => {
   // console.log(await axios.get(url));
    const response={
        data:"",
        error:null,
        status:""
    }
    try {
        
        if(base&&currency){
        url =  url+`?base=${base}&symbols=${currency}`;
        
        }else if(base&&!currency){
            url =  url+`?base=${base}`
        }else if (!base&&currency){
            url =  url+`?symbols=${currency}`
        }
        const res =  await axios.get(url);
       
        response.data = res.data;
    } catch (error) {
        console.log("error is ", error.response.data)
        response.error =  error.response.data;
        response.staus = 400;
    }
    
    return response;
}

const getRates = async (base, currency) => {
    
    const response2 = await exchangeRate(base, currency);
    
    return  response2
      
    ;
    console.log(response)
};



app.get('/',(req,res)=>{
    res.send(`Welcome to currency converter Api try please add "/api/rates" to the current url`)
} )

app.get('/api/rates',async(req,res)=>{
   const resp = await getRates(req.query.base, req.query.currency);
   let myres
   console.log(resp);
    console.log(req.query);
    if(!resp.error){
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