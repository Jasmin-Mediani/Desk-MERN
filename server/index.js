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

app.get('/api/romanzi', async (req, res) => {
    const romanzi = await RomanzoModel.find();
    try {
        res.send(JSON.stringify(romanzi));
    } catch (err) {
        console.log(err);
    }
});

app.delete('/api/delete/:titolo', async (req, res) => {
    const titolo = req.params.titolo;

    await RomanzoModel.deleteOne({ titolo });
    res.send('deleted');
})



//3) il server dovrà essere in ascolto sulla porta 3002
app.listen(3002, () => {
    console.log('Server running on port 3002...');
});




/* nota: nel tutorial lui ha un cluster di nome food con dentro la collection nome foodData. Io ho db-app-romanzi con dentro la collection romanzi

tutorial: food ---> foodData
io: db-app-romanzi ---> romanzi

*/
