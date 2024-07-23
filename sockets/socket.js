const {io} = require('../index');


//Gestion de Mensajes
io.on('connection', client => {
    console.log('Cliente conectado');

    //Escucha evento disconnect
    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    //Estar escuchando un mensaje
    client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);
        io.emit('mensaje', { admin: 'Nuevo mensaje'});
    })

});

