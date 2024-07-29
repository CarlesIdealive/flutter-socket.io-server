const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();
bands.addBand( new Band('Queen') );
bands.addBand( new Band('Bon Jovi') );
bands.addBand( new Band('Metallica') );
bands.addBand( new Band('Travis') );
bands.addBand( new Band('The Cure') );



//Gestion de Mensajes
io.on('connection', client => {
    console.log('Cliente conectado');
    client.emit('active-bands', bands.getBands());

    //Escucha evento disconnect
    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    //Estar escuchando un mensaje
    client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);
        io.emit('mensaje', { admin: 'Mensaje'});
    })

    client.on('nuevo-mensaje', ( payload ) => {
        console.log('Nuevo Mensaje', payload);
        io.emit('nuevo-mensaje', 'Nuevo mensaje emitido');
    })

    client.on('emitir-mensaje', ( payload ) => {
        // io.emit('nuevo-mensaje', payload );                 //EMITE A TODOS
        client.broadcast.emit('nuevo-mensaje', payload );   //A TODOS MENOS AL QUE LO EMITE

    })  

    client.on('vote-band', ( payload ) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands() );                 //EMITE A TODOS
    })  

    client.on('add-band', ( payload ) => {
        const newBand = new Band( payload.name);
        bands.addBand( newBand );
        io.emit('active-bands', bands.getBands() );                 //EMITE A TODOS
    })

    client.on('delete-band', ( payload ) => {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands() );                 //EMITE A TODOS
    })


});

