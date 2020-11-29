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
    try {
        const titolo = req.body.titolo;
        const romanzo = new RomanzoModel({ titolo, autore: "Jasmin Mediani" });

        if (titolo.trim() == "")
            return res.send();


        await romanzo.save();
        res.send(JSON.stringify(romanzo));
    } catch (err) {
        console.log(err);
        res.status(400).send();
    }
});

/****************** CALL A TUTTI I ROMANZI NEL DB ***************/

app.get('/api/romanzi', async (req, res) => {
    try {
        const romanzi = await RomanzoModel.find().sort({ titolo: 1 });  //con find() prendo tutti i risultati, e con sort({titolo: 1}) li ordino per titolo dalla a alla z
        res.send(JSON.stringify(romanzi));
    } catch (err) {
        console.log(err);
        res.status(400).send();
    }
});

/************* CANCELLA ROMANZO ************* */

app.delete('/api/delete-romanzo/:titolo', async (req, res) => {
    try {
        const titolo = req.params.titolo;

        await RomanzoModel.deleteOne({ titolo });
        res.send('deleted');
    } catch (err) {
        console.log(err);
        res.status(400).send();
    }
})


/************* AGGIUNGI CATEGORIA  ***************/


app.post('/api/aggiungi-categoria', async (req, res) => {
    try {
        const romanzo = await RomanzoModel.findOne({ titolo: req.body.titolo });
        const categoria = req.body.categoria.toLowerCase();
        let categorieAttuali = romanzo.toObject().categorie;
        if (categorieAttuali == undefined)
            categorieAttuali = {};
        if (!categorieAttuali.hasOwnProperty(categoria)) {
            categorieAttuali[categoria] = [];

            romanzo.categorie = categorieAttuali;
            romanzo.save();
            res.send(categorieAttuali);
        }
    } catch (err) {
        console.log(err);
        res.status(400).send();
    }
});


/************* ELIMINA CATEGORIA  *******************/

app.delete('/api/delete-categoria/:romanzo/:categoria', async (req, res) => {
    try {
        const categoria = req.params.categoria.toLowerCase();
        if (categoria.trim() == "")
            return res.send();

        let romanzo = await RomanzoModel.findOne({ titolo: req.params.romanzo });
        let categorieAttuali = romanzo.toObject().categorie;


        if (categorieAttuali.hasOwnProperty(categoria)) {
            delete categorieAttuali[categoria];

            romanzo.categorie = categorieAttuali;
            romanzo.save();
            res.send(categorieAttuali);
        }
    } catch (err) {
        console.log(err);
        res.status(400).send();

    }
})


/****************** AGGIUNGI ARTICOLO *********************/
app.post('/api/aggiungi-articolo', async (req, res) => {
    let romanzo = await RomanzoModel.findOne({ titolo: req.body.titolo });
    const categoria = req.body.categoria;
    const bodyArticolo = req.body.bodyArticolo;
    const titoloArticolo = req.body.titoloArticolo;

    let categorieAttuali = romanzo.toObject().categorie;

    let articoliDiCategoriaDiRomanzo = categorieAttuali[categoria];

    // check su titolo che deve avere almeno un carattere, che non sia vuoto o spazio
    if (titoloArticolo.trim() != "") {
        try {
            //ciclo su array articoliDicategoriaDiRomanzo e guardo ogni esimo articoletto... se il titolo dell'articolo che sto per inserire (titoloArticolo) è uguale a quello dell'articoletto (in db, cioé articoletto.titolo) non inserisco il nuovo, titoloArticolo. In db rimane articoletto col suo titolo.  
            for (const articoletto of articoliDiCategoriaDiRomanzo) {
                if (titoloArticolo === articoletto.titolo) {
                    console.log("titolo già esistente, nessuna articolo aggiunto");
                    return res.send(articoliDiCategoriaDiRomanzo);
                }
            }

            articoliDiCategoriaDiRomanzo.push({
                titolo: titoloArticolo,
                corpoDelTesto: bodyArticolo,
                immagine: "",
            });
            categorieAttuali[categoria] = articoliDiCategoriaDiRomanzo;


            romanzo.categorie = categorieAttuali;
            romanzo.save();
            res.send(articoliDiCategoriaDiRomanzo);
        } catch (err) {
            console.log(err);
            res.status(400).send();

        }
    }

});


/******************** MODIFICA ARTICOLO ********************/

app.post('/api/modifica-articolo', async (req, res) => {
    try {
        let romanzo = await RomanzoModel.findOne({ titolo: req.body.titolo });
        const categoria = req.body.categoria;
        const vecchioTitolo = req.body.vecchioTitoloArticolo;
        const nuovoTitolo = req.body.nuovoTitoloArticolo;
        const nuovoCorpoTesto = req.body.bodyArticolo;

        let categorieAttuali = romanzo.toObject().categorie;
        let articoliAttuali = categorieAttuali[categoria];
        for (var i = 0; i <= articoliAttuali.length; i++) {
            const articolo = articoliAttuali[i];
            if (articolo.titolo === vecchioTitolo) {
                articolo.titolo = nuovoTitolo;
                articolo.corpoDelTesto = nuovoCorpoTesto;
                break;
            }
        }
        console.log(articoliAttuali);
        categorieAttuali[categoria] = articoliAttuali;


        romanzo.categorie = categorieAttuali;
        romanzo.save();
        res.send(articoliAttuali);
    } catch (err) {
        console.log(err);
        res.status(400).send();
    }


})

/********************* ELIMINA ARTICOLO  ***************************/

app.delete('/api/delete-article/:romanzo/:categoria/:articolo', async (req, res) => {
    try {
        let romanzo = await RomanzoModel.findOne({ titolo: req.params.romanzo });
        const categoria = req.params.categoria;
        const titoloArticolo = req.params.articolo;

        let categorieAttuali = romanzo.toObject().categorie;
        let articoliAttuali = categorieAttuali[categoria];

        for (let i = 0; i < articoliAttuali.length; i++) {
            let articolo = articoliAttuali[i];
            if (articolo.titolo === titoloArticolo) {
                articoliAttuali.splice(i, 1);
                break;
            }
        }
        categorieAttuali[categoria] = articoliAttuali;


        romanzo.categorie = categorieAttuali;
        romanzo.save();
        res.send(articoliAttuali);
    } catch (err) {
        console.log(err);
        res.status(400).send();

    }
})



/********************************************************* */

//3) il server dovrà essere in ascolto sulla porta 3002
app.listen(3002, () => {
    console.log('Server running on port 3002...');
});


