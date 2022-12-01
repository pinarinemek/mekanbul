var express = require('express');
var router = express.Router();
const axios=require('axios');
var apiSecenekleri = {
    sunucu : "http://localhost:3000" ,
    apiYolu : '/api/mekanlar/'
};

var mesafeyiFormatla=function(mesafe){
    var yeniMesafe , birim ;
    if(mesafe>1){
        yeniMesafe = parseFloat(mesafe).toFixed(1);
        birim = ' km';
    }else{
        yeniMesafe = parseInt(mesafe*1000,10);
        birim = ' m';
    }
    return yeniMesafe + birim;
};

var anaSayfaOlustur = function(res,mekanListesi){
    var mesaj;
    if(!(mekanListesi instanceof Array)){
        mesaj = "API HATASI: Birşeyler ters gitti";
        mekanListesi = [];
    }else{
        if(!mekanListesi.length){
            mesaj = "Civarda herhangi bir mekan bulunamadı!";
    }}
    res.render("anasayfa",{
        "baslik" : "Anasayfa",
        "sayfaBaslik" : {
            "siteAd" : "MekanBul",
            "slogan" : "Mekanları keşfedin!"
        },
        "mekanlar":mekanListesi,
        "mesaj":mesaj
    });
};
const anaSayfa = function (req , res , next) {
   axios.get(apiSecenekleri.sunucu+apiSecenekleri.apiYolu,{
    params:{
        enlem : req.query.enlem,
        boylam : req.query.boylam
    }
   }).then(function(response){
        var i , mekanlar ;
        mekanlar = response.data;
        for(i=0 ; i<mekanlar.length ; i++){
            mekanlar[i].mesafe = mesafeyiFormatla(mekanlar[i].mesafe);
        }
        anaSayfaOlustur(res,mekanlar);
   }).catch(function(hata){
    anaSayfaOlustur(res,hata);
   });
}


const mekanBilgisi = function (req , res , next) {
    res.render('mekanbilgisi', 
    { "baslik": 'Mekan Bilgisi',
    "mekanBaslik" : "Starbucks",
    "mekanDetay" : {
        "ad": "Starbucks",
        "puan": "3",
        "adress": "Centrum Garden AVM",
        "saatler": [
            {
                "gunler": "Pazartesi - Cuma",
                "acilis": "09:00",
                "kapanis": "23:00",
                "kapali" : false
            },
            {
                "gunler": "Cumartesi - Pazar",
                "acilis": "10:00",
                "kapanis":"22:00",
                "kapali" : false
            }
        ],
        "imkanlar" : ["Kahve", "Çay", "Pasta"],
        "koordinatlar" : {
            "enlem" : "37.7",
            "boylam" : "30.5"
        },
        "yorumlar" : [
            {
                "yorumYapan":"Pınar inemek",
                "yorumMetni":"Berbaaattt",
                "tarih" : "20 Ekim 2022",
                "puan" : "1"
            },
            {
                "yorumYapan":"Anonim",
                "yorumMetni":"Güzeeeelll",
                "tarih" : "20 Ekim 2022",
                "puan" : "5"
            }
        ]

    }


})
}

const yorumEkle = function (req , res , next) {
    res.render('yorumekle', { title: 'Yorum Ekle' });
}


module.exports={
    anaSayfa,
    mekanBilgisi,
    yorumEkle
}
