import express from 'express';
import { fileURLToPath } from 'url';
import * as path from "path";
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors())

app.get('/currencies', (req, res) => {
    res.sendFile(path.join(__dirname, '/jsons', 'currencies.json'));
});

app.get('/currency-names', (req, res) => {
    res.sendFile(path.join(__dirname, '/jsons', 'names.json'));
});

app.listen(8087, () => {
        console.log('Apis are available under port 8087');
        console.log('Currency Api: http://localhost:8087/currencies')
        console.log('Names Api: http://localhost:8087/currency-names')
}
);


