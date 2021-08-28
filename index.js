const express = require('express');
const app = express(); 
app.listen(process.env.PORT||3000, ()=> console.log(`Server is running at ${process.env.PORT}`));
app.use(express.static('public'));
app.use(express.json());

app.get("/", (req, res) =>{
    res.render("index.html")
})