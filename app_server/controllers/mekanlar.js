var express = require('express');
var router = express.Router();
const anaSayfa = function (req , res , next) {
    res.render('anasayfa', 
    { "baslik": 'Anasayfa' ,
    "sayfaBaslik":{
    "siteAd": "MekanBul" ,
    "slogan" : "Civardaki Mekanları Keşfedin !"
    },
    "mekanlar" : [
        {
            "ad": "Starbucks",
            "puan": "3",
            "adress": "Centrum Garden AVM",
            "imkanlar": ["Kahve", "Çay", "Pasta"],
            "mesafe": "10km"
        },
        {
            "ad": "Barida Cafe",
            "puan": "3",
            "adress": "Sdü Batı Kampüsü",
            "imkanlar": ["Kahve", "Çay", "Pasta"],
            "mesafe": "1km"
        }
       
    ]
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
                "günler": "Pazartesi - Cuma",
                "acilis": "09:00-23:00",
                "kapali" : "false"
            },
            {
                "günler": "Cumartesi - Pazar",
                "acilis": "08:00-22:00",
                "kapali" : "false"
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
