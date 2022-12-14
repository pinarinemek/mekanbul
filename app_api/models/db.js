var mongoose = require('mongoose');
require("./mekansema");
var dbURI = "mongodb+srv://pinarinemek:1234@mekanbul.1g3ldgj.mongodb.net/mekanbul?retryWrites=true&w=majority";
//var dbURI = 'mongodb://localhost/mekanbul';
mongoose.connect(dbURI);

function kapat( msg , callback ){
    mongoose.connection.close(function(){
        console.log(msg);
        callback();
    });
}

process.on("SIGINT" , function(){
    kapat("uygulama kapatıldı" , function(){
        process.exit(0);
    });
});

mongoose.connection.on('connected', function(){
    console.log(dbURI + " adresindeki veritabanına bağlanıldı\n");
});

mongoose.connection.on('disconnected', function() {
    console.log(dbURI + " adresindeki veritabanına bağlantısı koptu\n");
});

mongoose.connection.on('error', function() {
    console.log("bağlantı hatası\n");
});

