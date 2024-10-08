import 'dotenv/config'
import express from 'express';

const app = express();

const port = process.env.PORT || 3000;

let teadata = [];
let nextId = 1;

app.use(express.json());

// Add a new tea
app.post('/teas', (req, res) => {
    console.log("Req Body: ", req.body);    
    const { name, price } = req.body;
    const newTea = {
        id: nextId++,
        name,
        price
    };
    teadata.push(newTea);
    res.status(201).send(newTea);
});

// Get all teas
app.get('/teas', (req, res) => {
    res.status(200).send(teadata);
});

// Get specific tea by ID
app.get('/teas/:id', (req, res) => {
    const tea = teadata.find(t => t.id === parseInt(req.params.id));
    if (!tea) {
        return res.status(404).send("Tea Not Found");
    }
    return res.status(200).send(tea);
});

// update tea
app.put('/teas/:id', (req, res) => {
    const tea = teadata.find(t => t.id === parseInt(req.params.id))
    if (!tea) {
        return res.status(404).send("Tea Not Found");
    }
    const { name, price } = req.body;

    tea.name = name;
    tea.price = price;

    res.status(201).send(tea);
});

//delete tea
app.delete('/teas/:id', (req, res) => {
    const index = teadata.findIndex(t => t.id == parseInt(req.params.id));
    if (index == -1) {
        return res.status(404).send("Tea Not Found");
    }
    teadata.splice(index, 1);
    return res.status(204).send("Deleted!")
})

app.get('/', (req, res) => {
    res.send("Hello it is an express server running ...");
});

app.get('/antara', (req, res) => {
    res.send("Ritochit Ghosh...");
});

app.get('/twitter', (req, res) => {
    res.send("ritochit18...");
});

app.listen(port, () => {
    console.log(`Server is running at port http://localhost:${port}`);
});
