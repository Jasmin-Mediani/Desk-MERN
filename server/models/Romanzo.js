//8)

const mongoose = require('mongoose');

const RomanzoSchema = new mongoose.Schema({
    id: {
        type: String,
        required: false
    },
    titolo: {
        type: String,
        required: true,
        upsert: true,
    },
    autore: {
        type: String,
        required: true
    },
    genere: {
        type: Array,
        required: false
    },
    lunghezza: {
        type: String,
        required: false
    },
    anno: {
        type: Number,
        required: false
    },
    libro: {
        type: String,
        required: false

    },
    coloreAssociato: {
        type: String,
        required: false
    },
    categorie: {
        type: Object,
        required: false
    }
});

const Romanzo = mongoose.model('romanzo', RomanzoSchema, "romanzi");
module.exports = Romanzo;

//9) ora torno in index.js