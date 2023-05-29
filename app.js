const express = require("express");
const app = express();

const port = 3000;
const cors = require("cors");

// routes
const flightsRouter = require("./routes/flightsRouter");

app.use(express.json());
app.use('/api', [flightsRouter]);

app.get('/', async(req, res) => {
    return res.send("Here is 1st Class backend Server!");
})

app.listen(port, () => {
    console.log(`Server listen at ${port}`);
})