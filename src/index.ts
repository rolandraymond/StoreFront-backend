import express from "express";

// config server 

const port = 3000;

const app = express()
app.get('/', (req, res) => {
    res.json({ massaage: 'hallo world' });
});


app.listen(port, () => {
    console.log(`listen port ${port}`)
})


export default app 