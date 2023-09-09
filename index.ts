import express from 'express';
import dataSource from "./db/dataSource.js";


var app = express();
const PORT = 3000;

app.use(express.json());


app.get('/', (req, res) => {
    res.send('Server Up!')
});

app.use((req, res) => {
  res.status(404).send("Page does not exist :(");
});

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
  dataSource.initialize()
});
  
  export default app;