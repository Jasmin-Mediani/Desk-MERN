const express = require('express');  //1)
const cors = require('cors');
const app = express();  //2) inizializzo il server express, e lo chiamo app. 
const mongoose = require('mongoose'); /* 5) importo mongoose: */
RomanzoModel = require('./models/Romanzo'); /* 10) */

//4) prendo le info dal front-end in formato json
app.use(express.json());
app.use(cors());

/* 6) il primo argomento è la stringa data da mongodb per accedere al db. Al posto di <password> metto la password.  */
mongoose.connect('mongodb+srv://Jasmin:SHk84cOiJTD9r3d0@cluster-romanzi.5gep4.mongodb.net/db-app-romanzi', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//7) ora creo la cartella models, che conterrà il model del singolo romanzo...((vai in models/romanzo.js))


/******************* AGGIUNGI ROMANZO **************/

//11) quando vado a questo indirizzo voglio inserire qualcosa nel database
app.post('/api/aggiungi-romanzo', async (req, res) => {
    const titolo = req.body.titolo;
    const romanzo = new RomanzoModel({ titolo, autore: "Jasmin Mediani" });


    try {
        await romanzo.save();
        res.send(JSON.stringify(romanzo));
    } catch (err) {
        console.log(err);
    }
});

/****************** CALL A TUTTI I ROMANZI NEL DB ***************/

app.get('/api/romanzi', async (req, res) => {
    const romanzi = await RomanzoModel.find().sort({ titolo: 1 });  //con find() prendo tutti i risultati, e con sort({titolo: 1}) li ordino per titolo dalla a alla z
    try {
        res.send(JSON.stringify(romanzi));
    } catch (err) {
        console.log(err);
    }
});

/************* CANCELLA ROMANZO ************* */

app.delete('/api/delete/:titolo', async (req, res) => {
    const titolo = req.params.titolo;

    await RomanzoModel.deleteOne({ titolo });
    res.send('deleted');
})


/************* AGGIUNGI CATEGORIA  ***************/


app.post('/api/aggiungi-categoria', async (req, res) => {
    const romanzo = await RomanzoModel.findOne({ titolo: req.body.titolo });
    const categoria = req.body.categoria;
    let categorieAttuali = romanzo.toObject().categorie;
    if (!categorieAttuali.hasOwnProperty(categoria)) {
        categorieAttuali[categoria] = [];
        try {
            romanzo.categorie = categorieAttuali;
            romanzo.save();
            res.send(categorieAttuali);
        } catch (err) {
            console.log(err);
        }
    }
});


/************* ELIMINA CATEGORIA  *******************/

app.delete('/api/delete/:romanzo/:categoria', async (req, res) => {
    let romanzo = await RomanzoModel.findOne({ titolo: req.params.romanzo });
    const categoria = req.params.categoria;
    let categorieAttuali = romanzo.toObject().categorie;

    if (categorieAttuali.hasOwnProperty(categoria)) {
        delete categorieAttuali[categoria];
        try {
            romanzo.categorie = categorieAttuali;
            romanzo.save();
            res.send(categorieAttuali);
        } catch (err) {
            console.log(err);
        }
    }
})



/********************************************************* */

//3) il server dovrà essere in ascolto sulla porta 3002
app.listen(3002, () => {
    console.log('Server running on port 3002...');
});


