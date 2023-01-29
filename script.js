let t = [];
let dublet = 0;
let gracz1 = true;
let zuzytaszansa = [];
let zuzytaskrzynka = [];

let pionek1 = {
    name: "Kasia",
    pole: 0,
    model: "<img src='./jpg/bskoczek.png'>",
    cash: 1500
};

let pionek2 = {
    name: "Dawid",
    pole: 0,
    model: "<img src='./jpg/bpion.png'>",
    cash: 1500
}

//generowanie planszy
function generujplansze() {
    document.getElementById("start").disabled = true;
    document.getElementById("losuj").disabled = false;
    let tabela = document.createElement("TABLE");
    for (let y = 0; y < 11; y++) {
        t[y] = [];
        let rzad = document.createElement("TR");
        tabela.appendChild(rzad);
        for (let x = 0; x < 11; x++) {
            t[y][x] = null;
            let pole = document.createElement("TD");
            pole.innerHTML = t[y][x];
            pole.setAttribute("id", x + "." + y);
            if (y === 0 || y === 10) pole.style.height = "140px";
            else pole.style.height = "70px";
            if (x === 0 || x === 10) pole.style.width = "140px";
            else pole.style.width = "70px";
            if (y > 0 && x > 0 && y < 10 && x < 10) pole.style.visibility = "hidden";
            let kolor = document.createElement("DIV");
            kolor.setAttribute("id", "kolor" + x + "." + y);
            kolor.style.position = "absolute";
            let poledlapionka1 = document.createElement("DIV");
            poledlapionka1.setAttribute("id", "poledlapionka1" + x + "." + y);
            poledlapionka1.position = "absolute";
            let poledlapionka2 = document.createElement("DIV");
            poledlapionka2.setAttribute("id", "poledlapionka2" + x + "." + y);
            poledlapionka2.position = "absolute";
            //start || wiezienie || parking
            if ((x === 10 && y === 10) || (x === 0 && y === 10) || (x === 0 && y === 0)) {
                poledlapionka1.style.left = "0px";
                poledlapionka1.style.width = "50%";
                poledlapionka1.style.height = "10%";
                poledlapionka1.style.cssFloat = "left";
                poledlapionka2.style.right = "0px";
                poledlapionka2.style.width = "50%";
                poledlapionka2.style.height = "10%";
                poledlapionka2.style.cssFloat = "left";
            }
            //dół
            if (x > 0 && x < 10 && y === 10) {
                kolor.style.top = "0px";
                kolor.style.left = "0px";
                kolor.style.width = "100%";
                kolor.style.height = "20%";
                poledlapionka1.style.marginTop = "20%";
                poledlapionka1.style.left = "0px";
                poledlapionka1.style.width = "50%";
                poledlapionka1.style.height = "10%";
                poledlapionka1.style.cssFloat = "left";
                poledlapionka2.style.marginTop = "20%";
                poledlapionka2.style.right = "0px";
                poledlapionka2.style.width = "50%";
                poledlapionka2.style.height = "10%";
                poledlapionka2.style.cssFloat = "left";
            }
            //lewo
            if (y > 0 && y < 10 && x === 0) {
                kolor.style.top = "0px";
                kolor.style.right = "0px";
                kolor.style.width = "20%";
                kolor.style.height = "100%";
                poledlapionka1.style.top = "0px";
                poledlapionka1.style.marginLeft = "40%";
                poledlapionka1.style.width = "10%";
                poledlapionka1.style.height = "50%";
                poledlapionka1.style.writingMode = "vertical-rl";
                poledlapionka1.style.cssFloat = "top";
                poledlapionka2.style.bottom = "0px";
                poledlapionka2.style.marginLeft = "40%";
                poledlapionka2.style.width = "10%";
                poledlapionka2.style.height = "50%";
                poledlapionka2.style.writingMode = "vertical-rl";
                poledlapionka2.style.cssFloat = "top";                
            }
            //góra
            if (x > 0 && x < 10 && y === 0) {
                kolor.style.bottom = "0px";
                kolor.style.left = "0px";
                kolor.style.width = "100%";
                kolor.style.height = "20%";
                poledlapionka1.style.marginBottom = "40%";
                poledlapionka1.style.left = "0px";
                poledlapionka1.style.width = "50%";
                poledlapionka1.style.height = "10%";
                poledlapionka1.style.cssFloat = "left";
                poledlapionka2.style.marginBottom = "40%";
                poledlapionka2.style.right = "0px";
                poledlapionka2.style.width = "50%";
                poledlapionka2.style.height = "10%";
                poledlapionka2.style.cssFloat = "left";
            }
            //prawo
            if (y > 0 && y < 10 && x === 10) {
                kolor.style.top = "0px";
                kolor.style.left = "0px";
                kolor.style.width = "20%";
                kolor.style.height = "100%";
                poledlapionka1.style.top = "0px";
                poledlapionka1.style.marginLeft = "60%";
                poledlapionka1.style.width = "10%";
                poledlapionka1.style.height = "50%";
                poledlapionka1.style.writingMode = "vertical-lr";
                poledlapionka1.style.cssFloat = "top";
                poledlapionka2.style.bottom = "0px";
                poledlapionka2.style.marginLeft = "60%";
                poledlapionka2.style.width = "10%";
                poledlapionka2.style.height = "50%";
                poledlapionka2.style.writingMode = "vertical-lr";
                poledlapionka2.style.cssFloat = "top";
            }
            pole.appendChild(kolor);
            pole.appendChild(poledlapionka1);
            pole.appendChild(poledlapionka2);
            rzad.appendChild(pole);
        }
    }
    document.getElementById("plansza").appendChild(tabela);
    nadajid();
    nadajpola();
    nadajinnepola();
    generujpionki();
    generujkarte();
}

function generujkarte() {
    let kolorinazwa = document.createElement("DIV");
    kolorinazwa.setAttribute("id", "kolorinazwa");
    kolorinazwa.style.width = "100%";
    kolorinazwa.style.height = "20%";
    kolorinazwa.style.textAlign = "center";
    // kolorinazwa.style.verticalAlign = "-50px";
    kolorinazwa.style.fontWeight = "bold";
    kolorinazwa.style.border = "solid 2px black";
    kolorinazwa.style.marginBottom = "10px";
    kolorinazwa.style.clear = "both";
    let czynsze = document.createElement("DIV");
    czynsze.setAttribute("id", "czynsze");
    czynsze.style.width = "100%";
    czynsze.style.height = "60%";
    czynsze.style.clear = "both";
    czynsze.style.marginBottom = "10px";
    czynsze.style.borderBottom = "solid 2px black";
    let budynki = document.createElement("DIV");
    budynki.setAttribute("id", "budynki");
    budynki.style.width = "100%";
    budynki.style.height = "20%";
    document.getElementById("karta").appendChild(kolorinazwa);
    document.getElementById("karta").appendChild(czynsze);
    document.getElementById("karta").appendChild(budynki);
}

function nadajid() {
    let x = 10;
    let y = 10;
    for (let p = 0; p < 40; p++) {
        document.getElementById(x + "." + y).addEventListener("mouseenter",showcard);
        document.getElementById(x + "." + y).addEventListener("mouseleave",hidecard);
        document.getElementById(x + "." + y).id = "p" + p;
        document.getElementById("poledlapionka1" + x + "." + y).id = "poledlapionka1p" + p;
        document.getElementById("poledlapionka2" + x + "." + y).id = "poledlapionka2p" + p;
        document.getElementById("kolor" + x + "." + y).id = "kolorp" + p;
        if (p < 10) x--;
        if (p >= 10 && p < 20) y--;
        if (p >= 20 && p < 30) x++;
        if (p >= 30) y++;
    }
}

function nadajpola() {
    function generator(idpole,nazwa,kolor,koszt,owner,oplata,podatek1,podatek2,podatek3,podatek4,podatekhotel,budynekkoszt,upgradelevel) {
        return {
            idpole,
            nazwa,
            kolor,
            koszt,
            owner,
            oplata,
            podatek1,
            podatek2,
            podatek3,
            podatek4,
            podatekhotel,
            budynekkoszt,
            upgradelevel
        }
    }

    const pole1 = generator("p1","polebrown1","rgb(149,84,54)",60,"",2,10,30,90,160,250,50,0);
    const pole2 = generator("p3","polebrown2","rgb(149,84,54)",60,"",4,20,60,180,320,450,50,0);
    const pole3 = generator("p6","polelightblue1","rgb(170,224,250)",100,"",6,30,90,270,400,550,50,0);
    const pole4 = generator("p8","polelightblue2","rgb(170,224,250)",100,"",6,30,90,270,400,550,50,0);
    const pole5 = generator("p9","polelightblue3","rgb(170,224,250)",120,"",8,40,100,300,450,600,50,0);
    const pole6 = generator("p11","polepink1","rgb(217,58,150)",140,"",10,50,150,450,625,750,100,0);
    const pole7 = generator("p13","polepink2","rgb(217,58,150)",140,"",10,50,150,450,625,750,100,0);
    const pole8 = generator("p14","polepink3","rgb(217,58,150)",160,"",12,60,180,500,700,900,100,0);
    const pole9 = generator("p16","poleorange1","rgb(247,148,29)",180,"",14,70,200,550,750,950,100,0);
    const pole10 = generator("p18","poleorange2","rgb(247,148,29)",180,"",14,70,200,550,750,950,100,0);
    const pole11 = generator("p19","poleorange3","rgb(247,148,29)",200,"",16,80,220,600,800,1000,100,0);
    const pole12 = generator("p21","polered1","rgb(237,27,36)",220,"",18,90,250,700,875,1050,150,0);
    const pole13 = generator("p23","polered2","rgb(237,27,36)",220,"",18,90,250,700,875,1050,150,0);
    const pole14 = generator("p24","polered3","rgb(237,27,36)",240,"",20,100,300,750,925,1100,150,0);
    const pole15 = generator("p26","poleyellow1","rgb(254,242,0)",260,"",22,110,330,800,975,1150,150,0);
    const pole16 = generator("p27","poleyellow2","rgb(254,242,0)",260,"",22,110,330,800,975,1150,150,0);
    const pole17 = generator("p29","poleyellow3","rgb(254,242,0)",280,"",24,120,360,850,1025,1200,150,0);
    const pole18 = generator("p31","polegreen1","rgb(31,178,90)",300,"",26,130,390,900,1100,1275,200,0);
    const pole19 = generator("p32","polegreen2","rgb(31,178,90)",300,"",26,130,390,900,1100,1275,200,0);
    const pole20 = generator("p34","polegreen3","rgb(31,178,90)",320,"",28,150,450,1000,1200,1400,200,0);
    const pole21 = generator("p37","poledarkblue1","rgb(0,114,187)",350,"",35,175,500,1100,1300,1500,200,0);
    const pole22 = generator("p39","poledarkblue2","rgb(0,114,187)",400,"",50,200,600,1400,1700,2000,200,0);
    const dworzec1 = generator("p5","poledworzec1",null,200,"",25,50,100,200,null,null,null,null);
    const dworzec2 = generator("p15","poledworzec2",null,200,"",25,50,100,200,null,null,null,null);
    const dworzec3 = generator("p25","poledworzec3",null,200,"",25,50,100,200,null,null,null,null);
    const dworzec4 = generator("p35","poledworzec4",null,200,"",25,50,100,200,null,null,null,null);
    const duet1 = generator("p12","poleelektrownia",null,150,"",4,10,null,null,null,null,null,null);
    const duet2 = generator("p28","polewodociągi",null,150,"",4,10,null,null,null,null,null,null);

    document.getElementById(pole1.idpole).nazwa = pole1.nazwa;
    document.getElementById(pole2.idpole).nazwa = pole2.nazwa;
    document.getElementById(pole3.idpole).nazwa = pole3.nazwa;
    document.getElementById(pole4.idpole).nazwa = pole4.nazwa;
    document.getElementById(pole5.idpole).nazwa = pole5.nazwa;
    document.getElementById(pole6.idpole).nazwa = pole6.nazwa;
    document.getElementById(pole7.idpole).nazwa = pole7.nazwa;
    document.getElementById(pole8.idpole).nazwa = pole8.nazwa;
    document.getElementById(pole9.idpole).nazwa = pole9.nazwa;
    document.getElementById(pole10.idpole).nazwa = pole10.nazwa;
    document.getElementById(pole11.idpole).nazwa = pole11.nazwa;
    document.getElementById(pole12.idpole).nazwa = pole12.nazwa;
    document.getElementById(pole13.idpole).nazwa = pole13.nazwa;
    document.getElementById(pole14.idpole).nazwa = pole14.nazwa;
    document.getElementById(pole15.idpole).nazwa = pole15.nazwa;
    document.getElementById(pole16.idpole).nazwa = pole16.nazwa;
    document.getElementById(pole17.idpole).nazwa = pole17.nazwa;
    document.getElementById(pole18.idpole).nazwa = pole18.nazwa;
    document.getElementById(pole19.idpole).nazwa = pole19.nazwa;
    document.getElementById(pole20.idpole).nazwa = pole20.nazwa;
    document.getElementById(pole21.idpole).nazwa = pole21.nazwa;
    document.getElementById(pole22.idpole).nazwa = pole22.nazwa;
    document.getElementById(dworzec1.idpole).nazwa = dworzec1.nazwa;
    document.getElementById(dworzec2.idpole).nazwa = dworzec2.nazwa;
    document.getElementById(dworzec3.idpole).nazwa = dworzec3.nazwa;
    document.getElementById(dworzec4.idpole).nazwa = dworzec4.nazwa;
    document.getElementById(duet1.idpole).nazwa = duet1.nazwa;
    document.getElementById(duet2.idpole).nazwa = duet2.nazwa;

    document.getElementById("kolor" + pole1.idpole).style.backgroundColor = pole1.kolor;
    document.getElementById("kolor" + pole2.idpole).style.backgroundColor = pole2.kolor;
    document.getElementById("kolor" + pole3.idpole).style.backgroundColor = pole3.kolor;
    document.getElementById("kolor" + pole4.idpole).style.backgroundColor = pole4.kolor;
    document.getElementById("kolor" + pole5.idpole).style.backgroundColor = pole5.kolor;
    document.getElementById("kolor" + pole6.idpole).style.backgroundColor = pole6.kolor;
    document.getElementById("kolor" + pole7.idpole).style.backgroundColor = pole7.kolor;
    document.getElementById("kolor" + pole8.idpole).style.backgroundColor = pole8.kolor;
    document.getElementById("kolor" + pole9.idpole).style.backgroundColor = pole9.kolor;
    document.getElementById("kolor" + pole10.idpole).style.backgroundColor = pole10.kolor;
    document.getElementById("kolor" + pole11.idpole).style.backgroundColor = pole11.kolor;
    document.getElementById("kolor" + pole12.idpole).style.backgroundColor = pole12.kolor;
    document.getElementById("kolor" + pole13.idpole).style.backgroundColor = pole13.kolor;
    document.getElementById("kolor" + pole14.idpole).style.backgroundColor = pole14.kolor;
    document.getElementById("kolor" + pole15.idpole).style.backgroundColor = pole15.kolor;
    document.getElementById("kolor" + pole16.idpole).style.backgroundColor = pole16.kolor;
    document.getElementById("kolor" + pole17.idpole).style.backgroundColor = pole17.kolor;
    document.getElementById("kolor" + pole18.idpole).style.backgroundColor = pole18.kolor;
    document.getElementById("kolor" + pole19.idpole).style.backgroundColor = pole19.kolor;
    document.getElementById("kolor" + pole20.idpole).style.backgroundColor = pole20.kolor;
    document.getElementById("kolor" + pole21.idpole).style.backgroundColor = pole21.kolor;
    document.getElementById("kolor" + pole22.idpole).style.backgroundColor = pole22.kolor;

    document.getElementById(pole1.idpole).koszt = pole1.koszt;
    document.getElementById(pole2.idpole).koszt = pole2.koszt;
    document.getElementById(pole3.idpole).koszt = pole3.koszt;
    document.getElementById(pole4.idpole).koszt = pole4.koszt;
    document.getElementById(pole5.idpole).koszt = pole5.koszt;
    document.getElementById(pole6.idpole).koszt = pole6.koszt;
    document.getElementById(pole7.idpole).koszt = pole7.koszt;
    document.getElementById(pole8.idpole).koszt = pole8.koszt;
    document.getElementById(pole9.idpole).koszt = pole9.koszt;
    document.getElementById(pole10.idpole).koszt = pole10.koszt;
    document.getElementById(pole11.idpole).koszt = pole11.koszt;
    document.getElementById(pole12.idpole).koszt = pole12.koszt;
    document.getElementById(pole13.idpole).koszt = pole13.koszt;
    document.getElementById(pole14.idpole).koszt = pole14.koszt;
    document.getElementById(pole15.idpole).koszt = pole15.koszt;
    document.getElementById(pole16.idpole).koszt = pole16.koszt;
    document.getElementById(pole17.idpole).koszt = pole17.koszt;
    document.getElementById(pole18.idpole).koszt = pole18.koszt;
    document.getElementById(pole19.idpole).koszt = pole19.koszt;
    document.getElementById(pole20.idpole).koszt = pole20.koszt;
    document.getElementById(pole21.idpole).koszt = pole21.koszt;
    document.getElementById(pole22.idpole).koszt = pole22.koszt;
    document.getElementById(dworzec1.idpole).koszt = dworzec1.koszt;
    document.getElementById(dworzec2.idpole).koszt = dworzec2.koszt;
    document.getElementById(dworzec3.idpole).koszt = dworzec3.koszt;
    document.getElementById(dworzec4.idpole).koszt = dworzec4.koszt;
    document.getElementById(duet1.idpole).koszt = duet1.koszt;
    document.getElementById(duet2.idpole).koszt = duet2.koszt;

    document.getElementById(pole1.idpole).wlasciciel = pole1.owner;
    document.getElementById(pole2.idpole).wlasciciel = pole2.owner;
    document.getElementById(pole3.idpole).wlasciciel = pole3.owner;
    document.getElementById(pole4.idpole).wlasciciel = pole4.owner;
    document.getElementById(pole5.idpole).wlasciciel = pole5.owner;
    document.getElementById(pole6.idpole).wlasciciel = pole6.owner;
    document.getElementById(pole7.idpole).wlasciciel = pole7.owner;
    document.getElementById(pole8.idpole).wlasciciel = pole8.owner;
    document.getElementById(pole9.idpole).wlasciciel = pole9.owner;
    document.getElementById(pole10.idpole).wlasciciel = pole10.owner;
    document.getElementById(pole11.idpole).wlasciciel = pole11.owner;
    document.getElementById(pole12.idpole).wlasciciel = pole12.owner;
    document.getElementById(pole13.idpole).wlasciciel = pole13.owner;
    document.getElementById(pole14.idpole).wlasciciel = pole14.owner;
    document.getElementById(pole15.idpole).wlasciciel = pole15.owner;
    document.getElementById(pole16.idpole).wlasciciel = pole16.owner;
    document.getElementById(pole17.idpole).wlasciciel = pole17.owner;
    document.getElementById(pole18.idpole).wlasciciel = pole18.owner;
    document.getElementById(pole19.idpole).wlasciciel = pole19.owner;
    document.getElementById(pole20.idpole).wlasciciel = pole20.owner;
    document.getElementById(pole21.idpole).wlasciciel = pole21.owner;
    document.getElementById(pole22.idpole).wlasciciel = pole22.owner;
    document.getElementById(dworzec1.idpole).wlasciciel = dworzec1.owner;
    document.getElementById(dworzec2.idpole).wlasciciel = dworzec2.owner;
    document.getElementById(dworzec3.idpole).wlasciciel = dworzec3.owner;
    document.getElementById(dworzec4.idpole).wlasciciel = dworzec4.owner;
    document.getElementById(duet1.idpole).wlasciciel = duet1.owner;
    document.getElementById(duet2.idpole).wlasciciel = duet2.owner;

    document.getElementById(pole1.idpole).oplata = pole1.oplata;
    document.getElementById(pole2.idpole).oplata = pole2.oplata;
    document.getElementById(pole3.idpole).oplata = pole3.oplata;
    document.getElementById(pole4.idpole).oplata = pole4.oplata;
    document.getElementById(pole5.idpole).oplata = pole5.oplata;
    document.getElementById(pole6.idpole).oplata = pole6.oplata;
    document.getElementById(pole7.idpole).oplata = pole7.oplata;
    document.getElementById(pole8.idpole).oplata = pole8.oplata;
    document.getElementById(pole9.idpole).oplata = pole9.oplata;
    document.getElementById(pole10.idpole).oplata = pole10.oplata;
    document.getElementById(pole11.idpole).oplata = pole11.oplata;
    document.getElementById(pole12.idpole).oplata = pole12.oplata;
    document.getElementById(pole13.idpole).oplata = pole13.oplata;
    document.getElementById(pole14.idpole).oplata = pole14.oplata;
    document.getElementById(pole15.idpole).oplata = pole15.oplata;
    document.getElementById(pole16.idpole).oplata = pole16.oplata;
    document.getElementById(pole17.idpole).oplata = pole17.oplata;
    document.getElementById(pole18.idpole).oplata = pole18.oplata;
    document.getElementById(pole19.idpole).oplata = pole19.oplata;
    document.getElementById(pole20.idpole).oplata = pole20.oplata;
    document.getElementById(pole21.idpole).oplata = pole21.oplata;
    document.getElementById(pole22.idpole).oplata = pole22.oplata;
    document.getElementById(dworzec1.idpole).oplata = dworzec1.oplata;
    document.getElementById(dworzec2.idpole).oplata = dworzec2.oplata;
    document.getElementById(dworzec3.idpole).oplata = dworzec3.oplata;
    document.getElementById(dworzec4.idpole).oplata = dworzec4.oplata;
    document.getElementById(duet1.idpole).oplata = duet1.oplata;
    document.getElementById(duet2.idpole).oplata = duet2.oplata;

    document.getElementById(pole1.idpole).podatek1 = pole1.podatek1;
    document.getElementById(pole2.idpole).podatek1 = pole2.podatek1;
    document.getElementById(pole3.idpole).podatek1 = pole3.podatek1;
    document.getElementById(pole4.idpole).podatek1 = pole4.podatek1;
    document.getElementById(pole5.idpole).podatek1 = pole5.podatek1;
    document.getElementById(pole6.idpole).podatek1 = pole6.podatek1;
    document.getElementById(pole7.idpole).podatek1 = pole7.podatek1;
    document.getElementById(pole8.idpole).podatek1 = pole8.podatek1;
    document.getElementById(pole9.idpole).podatek1 = pole9.podatek1;
    document.getElementById(pole10.idpole).podatek1 = pole10.podatek1;
    document.getElementById(pole11.idpole).podatek1 = pole11.podatek1;
    document.getElementById(pole12.idpole).podatek1 = pole12.podatek1;
    document.getElementById(pole13.idpole).podatek1 = pole13.podatek1;
    document.getElementById(pole14.idpole).podatek1 = pole14.podatek1;
    document.getElementById(pole15.idpole).podatek1 = pole15.podatek1;
    document.getElementById(pole16.idpole).podatek1 = pole16.podatek1;
    document.getElementById(pole17.idpole).podatek1 = pole17.podatek1;
    document.getElementById(pole18.idpole).podatek1 = pole18.podatek1;
    document.getElementById(pole19.idpole).podatek1 = pole19.podatek1;
    document.getElementById(pole20.idpole).podatek1 = pole20.podatek1;
    document.getElementById(pole21.idpole).podatek1 = pole21.podatek1;
    document.getElementById(pole22.idpole).podatek1 = pole22.podatek1;
    document.getElementById(dworzec1.idpole).podatek1 = dworzec1.podatek1;
    document.getElementById(dworzec2.idpole).podatek1 = dworzec2.podatek1;
    document.getElementById(dworzec3.idpole).podatek1 = dworzec3.podatek1;
    document.getElementById(dworzec4.idpole).podatek1 = dworzec4.podatek1;
    document.getElementById(duet1.idpole).podatek1 = duet1.podatek1;
    document.getElementById(duet2.idpole).podatek1 = duet2.podatek1;

    document.getElementById(pole1.idpole).podatek2 = pole1.podatek2;
    document.getElementById(pole2.idpole).podatek2 = pole2.podatek2;
    document.getElementById(pole3.idpole).podatek2 = pole3.podatek2;
    document.getElementById(pole4.idpole).podatek2 = pole4.podatek2;
    document.getElementById(pole5.idpole).podatek2 = pole5.podatek2;
    document.getElementById(pole6.idpole).podatek2 = pole6.podatek2;
    document.getElementById(pole7.idpole).podatek2 = pole7.podatek2;
    document.getElementById(pole8.idpole).podatek2 = pole8.podatek2;
    document.getElementById(pole9.idpole).podatek2 = pole9.podatek2;
    document.getElementById(pole10.idpole).podatek2 = pole10.podatek2;
    document.getElementById(pole11.idpole).podatek2 = pole11.podatek2;
    document.getElementById(pole12.idpole).podatek2 = pole12.podatek2;
    document.getElementById(pole13.idpole).podatek2 = pole13.podatek2;
    document.getElementById(pole14.idpole).podatek2 = pole14.podatek2;
    document.getElementById(pole15.idpole).podatek2 = pole15.podatek2;
    document.getElementById(pole16.idpole).podatek2 = pole16.podatek2;
    document.getElementById(pole17.idpole).podatek2 = pole17.podatek2;
    document.getElementById(pole18.idpole).podatek2 = pole18.podatek2;
    document.getElementById(pole19.idpole).podatek2 = pole19.podatek2;
    document.getElementById(pole20.idpole).podatek2 = pole20.podatek2;
    document.getElementById(pole21.idpole).podatek2 = pole21.podatek2;
    document.getElementById(pole22.idpole).podatek2 = pole22.podatek2;
    document.getElementById(dworzec1.idpole).podatek2 = dworzec1.podatek2;
    document.getElementById(dworzec2.idpole).podatek2 = dworzec2.podatek2;
    document.getElementById(dworzec3.idpole).podatek2 = dworzec3.podatek2;
    document.getElementById(dworzec4.idpole).podatek2 = dworzec4.podatek2;

    document.getElementById(pole1.idpole).podatek3 = pole1.podatek3;
    document.getElementById(pole2.idpole).podatek3 = pole2.podatek3;
    document.getElementById(pole3.idpole).podatek3 = pole3.podatek3;
    document.getElementById(pole4.idpole).podatek3 = pole4.podatek3;
    document.getElementById(pole5.idpole).podatek3 = pole5.podatek3;
    document.getElementById(pole6.idpole).podatek3 = pole6.podatek3;
    document.getElementById(pole7.idpole).podatek3 = pole7.podatek3;
    document.getElementById(pole8.idpole).podatek3 = pole8.podatek3;
    document.getElementById(pole9.idpole).podatek3 = pole9.podatek3;
    document.getElementById(pole10.idpole).podatek3 = pole10.podatek3;
    document.getElementById(pole11.idpole).podatek3 = pole11.podatek3;
    document.getElementById(pole12.idpole).podatek3 = pole12.podatek3;
    document.getElementById(pole13.idpole).podatek3 = pole13.podatek3;
    document.getElementById(pole14.idpole).podatek3 = pole14.podatek3;
    document.getElementById(pole15.idpole).podatek3 = pole15.podatek3;
    document.getElementById(pole16.idpole).podatek3 = pole16.podatek3;
    document.getElementById(pole17.idpole).podatek3 = pole17.podatek3;
    document.getElementById(pole18.idpole).podatek3 = pole18.podatek3;
    document.getElementById(pole19.idpole).podatek3 = pole19.podatek3;
    document.getElementById(pole20.idpole).podatek3 = pole20.podatek3;
    document.getElementById(pole21.idpole).podatek3 = pole21.podatek3;
    document.getElementById(pole22.idpole).podatek3 = pole22.podatek3;
    document.getElementById(dworzec1.idpole).podatek3 = dworzec1.podatek3;
    document.getElementById(dworzec2.idpole).podatek3 = dworzec2.podatek3;
    document.getElementById(dworzec3.idpole).podatek3 = dworzec3.podatek3;
    document.getElementById(dworzec4.idpole).podatek3 = dworzec4.podatek3;

    document.getElementById(pole1.idpole).podatek4 = pole1.podatek4;
    document.getElementById(pole2.idpole).podatek4 = pole2.podatek4;
    document.getElementById(pole3.idpole).podatek4 = pole3.podatek4;
    document.getElementById(pole4.idpole).podatek4 = pole4.podatek4;
    document.getElementById(pole5.idpole).podatek4 = pole5.podatek4;
    document.getElementById(pole6.idpole).podatek4 = pole6.podatek4;
    document.getElementById(pole7.idpole).podatek4 = pole7.podatek4;
    document.getElementById(pole8.idpole).podatek4 = pole8.podatek4;
    document.getElementById(pole9.idpole).podatek4 = pole9.podatek4;
    document.getElementById(pole10.idpole).podatek4 = pole10.podatek4;
    document.getElementById(pole11.idpole).podatek4 = pole11.podatek4;
    document.getElementById(pole12.idpole).podatek4 = pole12.podatek4;
    document.getElementById(pole13.idpole).podatek4 = pole13.podatek4;
    document.getElementById(pole14.idpole).podatek4 = pole14.podatek4;
    document.getElementById(pole15.idpole).podatek4 = pole15.podatek4;
    document.getElementById(pole16.idpole).podatek4 = pole16.podatek4;
    document.getElementById(pole17.idpole).podatek4 = pole17.podatek4;
    document.getElementById(pole18.idpole).podatek4 = pole18.podatek4;
    document.getElementById(pole19.idpole).podatek4 = pole19.podatek4;
    document.getElementById(pole20.idpole).podatek4 = pole20.podatek4;
    document.getElementById(pole21.idpole).podatek4 = pole21.podatek4;
    document.getElementById(pole22.idpole).podatek4 = pole22.podatek4;
    document.getElementById(dworzec1.idpole).podatek4 = dworzec1.podatek4;
    document.getElementById(dworzec2.idpole).podatek4 = dworzec2.podatek4;
    document.getElementById(dworzec3.idpole).podatek4 = dworzec3.podatek4;
    document.getElementById(dworzec4.idpole).podatek4 = dworzec4.podatek4;

    document.getElementById(pole1.idpole).podatekhotel = pole1.podatekhotel;
    document.getElementById(pole2.idpole).podatekhotel = pole2.podatekhotel;
    document.getElementById(pole3.idpole).podatekhotel = pole3.podatekhotel;
    document.getElementById(pole4.idpole).podatekhotel = pole4.podatekhotel;
    document.getElementById(pole5.idpole).podatekhotel = pole5.podatekhotel;
    document.getElementById(pole6.idpole).podatekhotel = pole6.podatekhotel;
    document.getElementById(pole7.idpole).podatekhotel = pole7.podatekhotel;
    document.getElementById(pole8.idpole).podatekhotel = pole8.podatekhotel;
    document.getElementById(pole9.idpole).podatekhotel = pole9.podatekhotel;
    document.getElementById(pole10.idpole).podatekhotel = pole10.podatekhotel;
    document.getElementById(pole11.idpole).podatekhotel = pole11.podatekhotel;
    document.getElementById(pole12.idpole).podatekhotel = pole12.podatekhotel;
    document.getElementById(pole13.idpole).podatekhotel = pole13.podatekhotel;
    document.getElementById(pole14.idpole).podatekhotel = pole14.podatekhotel;
    document.getElementById(pole15.idpole).podatekhotel = pole15.podatekhotel;
    document.getElementById(pole16.idpole).podatekhotel = pole16.podatekhotel;
    document.getElementById(pole17.idpole).podatekhotel = pole17.podatekhotel;
    document.getElementById(pole18.idpole).podatekhotel = pole18.podatekhotel;
    document.getElementById(pole19.idpole).podatekhotel = pole19.podatekhotel;
    document.getElementById(pole20.idpole).podatekhotel = pole20.podatekhotel;
    document.getElementById(pole21.idpole).podatekhotel = pole21.podatekhotel;
    document.getElementById(pole22.idpole).podatekhotel = pole22.podatekhotel;

    document.getElementById(pole1.idpole).budynekkoszt = pole1.budynekkoszt;
    document.getElementById(pole2.idpole).budynekkoszt = pole2.budynekkoszt;
    document.getElementById(pole3.idpole).budynekkoszt = pole3.budynekkoszt;
    document.getElementById(pole4.idpole).budynekkoszt = pole4.budynekkoszt;
    document.getElementById(pole5.idpole).budynekkoszt = pole5.budynekkoszt;
    document.getElementById(pole6.idpole).budynekkoszt = pole6.budynekkoszt;
    document.getElementById(pole7.idpole).budynekkoszt = pole7.budynekkoszt;
    document.getElementById(pole8.idpole).budynekkoszt = pole8.budynekkoszt;
    document.getElementById(pole9.idpole).budynekkoszt = pole9.budynekkoszt;
    document.getElementById(pole10.idpole).budynekkoszt = pole10.budynekkoszt;
    document.getElementById(pole11.idpole).budynekkoszt = pole11.budynekkoszt;
    document.getElementById(pole12.idpole).budynekkoszt = pole12.budynekkoszt;
    document.getElementById(pole13.idpole).budynekkoszt = pole13.budynekkoszt;
    document.getElementById(pole14.idpole).budynekkoszt = pole14.budynekkoszt;
    document.getElementById(pole15.idpole).budynekkoszt = pole15.budynekkoszt;
    document.getElementById(pole16.idpole).budynekkoszt = pole16.budynekkoszt;
    document.getElementById(pole17.idpole).budynekkoszt = pole17.budynekkoszt;
    document.getElementById(pole18.idpole).budynekkoszt = pole18.budynekkoszt;
    document.getElementById(pole19.idpole).budynekkoszt = pole19.budynekkoszt;
    document.getElementById(pole20.idpole).budynekkoszt = pole20.budynekkoszt;
    document.getElementById(pole21.idpole).budynekkoszt = pole21.budynekkoszt;
    document.getElementById(pole22.idpole).budynekkoszt = pole22.budynekkoszt;

    document.getElementById(dworzec1.idpole).style.backgroundImage = "url(./jpg/dworzec.png)";
    document.getElementById(dworzec2.idpole).style.backgroundImage = "url(./jpg/dworzec.png)";
    document.getElementById(dworzec3.idpole).style.backgroundImage = "url(./jpg/dworzec.png)";
    document.getElementById(dworzec4.idpole).style.backgroundImage = "url(./jpg/dworzec.png)";
    document.getElementById(duet1.idpole).style.backgroundImage = "url(./jpg/elektrownia.png)";
    document.getElementById(duet1.idpole).style.backgroundRepeat = "round";
    document.getElementById(duet2.idpole).style.backgroundImage = "url(./jpg/wodociag.png)";
    document.getElementById(duet2.idpole).style.backgroundRepeat = "round";
}

function nadajinnepola() {
    function generator(idpole,nazwa,podatek) {
        return {
            idpole,
            nazwa,
            podatek
        }
    }

    const szansa1 = generator("p7","szansa",null);
    const szansa2 = generator("p22","szansa",null);
    const szansa3 = generator("p36","szansa",null);
    const skrzynia1 = generator("p2","skrzynia",null);
    const skrzynia2 = generator("p17","skrzynia",null);
    const skrzynia3 = generator("p33","skrzynia",null);
    const podatek1 = generator("p4","podatek1",200);
    const podatek2 = generator("p38","podatek2",75);
    const start = generator("p0","start");
    const jail = generator("p10","więzienie");
    const parking = generator("p20","parking");
    const policjant = generator("p30","gotojail");

    document.getElementById(szansa1.idpole).nazwa = szansa1.nazwa;
    document.getElementById(szansa2.idpole).nazwa = szansa2.nazwa;
    document.getElementById(szansa3.idpole).nazwa = szansa3.nazwa;
    document.getElementById(skrzynia1.idpole).nazwa = skrzynia1.nazwa;
    document.getElementById(skrzynia2.idpole).nazwa = skrzynia2.nazwa;
    document.getElementById(skrzynia3.idpole).nazwa = skrzynia3.nazwa;
    document.getElementById(podatek1.idpole).nazwa = podatek1.nazwa;
    document.getElementById(podatek1.idpole).podatek = podatek1.podatek;
    document.getElementById(podatek2.idpole).nazwa = podatek2.nazwa;
    document.getElementById(podatek2.idpole).podatek = podatek2.podatek;
    document.getElementById(start.idpole).nazwa = start.nazwa;
    document.getElementById(jail.idpole).nazwa = jail.nazwa;
    document.getElementById(parking.idpole).nazwa = parking.nazwa;
    document.getElementById(policjant.idpole).nazwa = policjant.nazwa;

    document.getElementById(szansa1.idpole).style.backgroundImage = "url(./jpg/szansa1.png)";
    document.getElementById(szansa2.idpole).style.backgroundImage = "url(./jpg/szansa2.png)";
    document.getElementById(szansa3.idpole).style.backgroundImage = "url(./jpg/szansa3.png)";
    document.getElementById(jail.idpole).style.backgroundImage = "url(./jpg/wiezienie.png)";
    document.getElementById(policjant.idpole).style.backgroundImage = "url(./jpg/policjant.png)";
    document.getElementById(start.idpole).style.backgroundImage = "url(./jpg/start.png)";
    document.getElementById(skrzynia1.idpole).style.backgroundImage = "url(./jpg/skrzynia1.png)";
    document.getElementById(skrzynia1.idpole).style.backgroundRepeat = "round";
    document.getElementById(skrzynia2.idpole).style.backgroundImage = "url(./jpg/skrzynia2.png)";
    document.getElementById(skrzynia2.idpole).style.backgroundRepeat = "round";
    document.getElementById(skrzynia3.idpole).style.backgroundImage = "url(./jpg/skrzynia3.png)";
    document.getElementById(skrzynia3.idpole).style.backgroundRepeat = "round";
    document.getElementById(parking.idpole).style.backgroundImage = "url(./jpg/parking.png)";
    document.getElementById(podatek1.idpole).style.backgroundImage = "url(./jpg/podatek1.png)";
    document.getElementById(podatek1.idpole).style.backgroundRepeat = "no-repeat";
    document.getElementById(podatek2.idpole).style.backgroundImage = "url(./jpg/podatek2.png)";
    document.getElementById(podatek2.idpole).style.backgroundRepeat = "no-repeat";
}

function generujpionki() {
    document.getElementById("poledlapionka1p0").innerHTML = pionek1.model;
    document.getElementById("poledlapionka2p0").innerHTML = pionek2.model;
}

function showcard(event) {
    if (event.target.nazwa.slice(0,4) === "pole") {
        document.getElementById("karta").style.visibility = "visible";
        document.getElementById("kolorinazwa").innerHTML = event.target.nazwa.slice(4,15) + "<br>Koszt: " + event.target.koszt + "<br>Właściciel: " + event.target.wlasciciel;
        if (event.target.nazwa.slice(4,11) != "dworzec" && event.target.nazwa.slice(4,15) != "elektrownia" && event.target.nazwa.slice(4,13) != "wodociągi") {
            document.getElementById("kolorinazwa").style.backgroundColor = document.getElementById("kolor" + event.target.id).style.backgroundColor;
            document.getElementById("czynsze").innerHTML = "Opłata: " + event.target.oplata;
            document.getElementById("czynsze").innerHTML += "<br>Opłata przy pełnym kolorze: " + parseInt(event.target.oplata*2);
            document.getElementById("czynsze").innerHTML += "<br>Czynsz poziom 1: " + event.target.podatek1;
            document.getElementById("czynsze").innerHTML += "<br>Czynsz poziom 2: " + event.target.podatek2;
            document.getElementById("czynsze").innerHTML += "<br>Czynsz poziom 3: " + event.target.podatek3;
            document.getElementById("czynsze").innerHTML += "<br>Czynsz poziom 4: " + event.target.podatek4;
            document.getElementById("czynsze").innerHTML += "<br>Czynsz poziom 5 (hotel): " + event.target.podatekhotel;
            document.getElementById("budynki").innerHTML = "Koszt budynku: " + event.target.budynekkoszt;
        }
        if (event.target.nazwa.slice(4,11) === "dworzec") {
            document.getElementById("kolorinazwa").style.backgroundColor = "gray";
            document.getElementById("czynsze").innerHTML = "Czynsz poziom 1: " + event.target.oplata;
            document.getElementById("czynsze").innerHTML += "<br>Czynsz poziom 2: " + event.target.podatek1;
            document.getElementById("czynsze").innerHTML += "<br>Czynsz poziom 3: " + event.target.podatek2;
            document.getElementById("czynsze").innerHTML += "<br>Czynsz poziom 4: " + event.target.podatek3;
            document.getElementById("budynki").innerHTML = "Poziom płaconego czynszu jest zależny od ilości posiadanych dworców przez właściciela.";
        }
        if (event.target.nazwa.slice(4,15) === "elektrownia" || event.target.nazwa.slice(4,13) === "wodociągi") {
            document.getElementById("kolorinazwa").style.backgroundColor = "gray";
            document.getElementById("czynsze").innerHTML = "Czynsz poziom 1: " + event.target.oplata;
            document.getElementById("czynsze").innerHTML += "<br>Czynsz poziom 2: " + event.target.podatek1;
            document.getElementById("budynki").innerHTML = "Poziom płaconego czynszu jest zależny od tego, czy właściciel posiada oba budynki.<br>Podana kwota czynszu jest mnożona przez ilość wyrzuconych oczek.";
        }
    }
}

function hidecard() {
    document.getElementById("karta").style.visibility = "hidden";
}

function losulosu() {
    let rzut1 = Math.floor(Math.random() * 6 + 1);
    let rzut2 = Math.floor(Math.random() * 6 + 1);
    document.getElementById("kostka1").innerHTML = rzut1;
    document.getElementById("kostka2").innerHTML = rzut2;
    let rzut = parseInt(rzut1 + rzut2);
    if (rzut1 === rzut2) {
        dublet++;
        if (dublet === 3) {
            alert("Trzeci dublet... Wiesz co to oznacza :))))");
            alert("Idziesz do więzienia.\nIdziesz prosto do więzienia\nNieprzechodzisz przez start.\nNie otrzymujesz 200.");
            dublet = 0;
            if (gracz1 === true) {
                document.getElementById("poledlapionka1p" + pionek1.pole).innerHTML = "";
                document.getElementById("poledlapionka1p10").innerHTML = pionek1.model;
                pionek1.pole = 10;
                gracz1 = false;
            } else {
                document.getElementById("poledlapionka2p" + pionek2.pole).innerHTML = "";
                document.getElementById("poledlapionka2p10").innerHTML = pionek2.model;
                pionek2.pole = 10;
                gracz1 = true;
            }
        } else {
            alert("Dublet! Rzucasz jeszcze raz.");
            if (gracz1 === true) {
                let oldid = pionek1.pole;
                let newid = parseInt(pionek1.pole + rzut);
                if (newid > 39) {
                    newid -= 40;
                    pionek1.cash += 200;
                    alert("Otrzymujesz 200 za przejście przez start.\nTwój bilans: " + pionek1.cash);
                }
                pionek1.pole = newid;
                document.getElementById("poledlapionka1p" + oldid).innerHTML = "";
                document.getElementById("poledlapionka1p" + newid).innerHTML = pionek1.model;
            } else {
                let oldid = pionek2.pole;
                let newid = parseInt(pionek2.pole + rzut);
                if (newid > 39) {
                    newid -= 40;
                    pionek2.cash += 200;
                    alert("Otrzymujesz 200 za przejście przez start.\nTwój bilans: " + pionek2.cash);
                }
                pionek2.pole = newid;
                document.getElementById("poledlapionka2p" + oldid).innerHTML = "";
                document.getElementById("poledlapionka2p" + newid).innerHTML = pionek2.model;
            }
            losulosu();
        }
    } else {
        dublet = 0;
        ruch(rzut);
    }
}

function ruch(ile) {
    let nowplaying, poledlapionka;
    if (gracz1 === true) {
        nowplaying = pionek1;
        poledlapionka = "poledlapionka1p";
    } else {
        nowplaying = pionek2;
        poledlapionka = "poledlapionka2p";
    }
    let oldid = nowplaying.pole;
    let newid = parseInt(nowplaying.pole + ile);
    if (newid > 39) {
        newid -= 40;
        nowplaying.cash += 200;
        alert("Otrzymujesz 200 za przejście przez start.\nTwój bilans: " + nowplaying.cash);
    }
    nowplaying.pole = newid;
    document.getElementById(poledlapionka + oldid).innerHTML = "";
    document.getElementById(poledlapionka + newid).innerHTML = nowplaying.model;
    let cel = document.getElementById("p" + newid);
    if (cel.wlasciciel === "") {
        if (nowplaying.cash-cel.koszt > 0) itsfreerealestate(cel, nowplaying);
        else alert("Pole nie należy do nikogo.\nNie stać Cię na kupno.");
    } else if (cel.wlasciciel != null) {
        if (cel.wlasciciel === nowplaying.name) checkforupgrades(cel, nowplaying, newid);
        else payTaxes(cel,nowplaying);
    }
    if (cel.nazwa.slice(0,4) != "pole") {
        if (cel.nazwa === "szansa") wylosuj(zuzytaszansa);
        if (cel.nazwa === "skrzynia") wylosuj(zuzytaskrzynka);
        if (cel.nazwa === "podatek1") {
            let podatek;
            if (nowplaying.cash < 2000) podatek = nowplaying.cash/10;
            else podatek = cel.podatek;
            nowplaying.cash -= podatek;
            alert("Niezapłacone rachunki. Płacisz " + podatek + "\nPozostało " + nowplaying.cash);
        }
        if (cel.nazwa === "podatek2") {
            nowplaying.cash -= cel.podatek;
            alert("Dobrowolna danina. Płacisz " + cel.podatek + "\nPozostało " + nowplaying.cash);
        }
        if (cel.nazwa === "więzienie" || cel.nazwa === "parking") alert(cel.nazwa);
        if (cel.nazwa === "gotojail") {
            alert("Idziesz do więzienia.\nIdziesz prosto do więzienia.\nNie przechodzisz przez start.\nNie otrzymujesz 200.");
            document.getElementById(poledlapionka + "30").innerHTML = "";
            document.getElementById(poledlapionka + "10").innerHTML = nowplaying.model;
            nowplaying.pole = 10;
        }
    }
    if (gracz1 === true) gracz1 = false;
    else gracz1 = true;
}

function wylosuj(karta) {
    let los = Math.floor(Math.random()*10+1);
    if (karta.length === 0) {
        if (karta = "zuzytaskrzynka") alert("skrzynia ze skarbami nr " + los);
        else alert("szansa na sukces nr " + los);
        karta.push(los);
        return;
    } else if (karta.length === 10) alert("Wykorzystano wszystkie karty.");
    else {
        for (let x = 0; x < karta.length; x++) {
            if (los === karta[x]) {
                wylosuj(karta);
                return;
            } else continue;
        }
        if (karta = "zuzytaskrzynka") alert("skrzynia ze skarbami nr " + los);
        else alert("szansa na sukces nr " + los);
        karta.push(los);
        return;
    }
}

function itsfreerealestate(cel, nowplaying) {
    let question = prompt("Pole " + cel.nazwa.slice(4,15) + " nie należy do nikogo.\nKoszt: " + cel.koszt + "\nKupujesz?");
    if (question === "tak") {
        cel.wlasciciel = nowplaying.name;
        nowplaying.cash -= cel.koszt;
        alert("Pozostało: " + nowplaying.cash);
    }
}

function checkforupgrades(cel, nowplaying, newid) {
    alert("Pole należy do Ciebie.");
    //brown
    if (cel.nazwa.slice(4,9) === "brown") {
        literallycfu(cel.nazwa.slice(4,9),cel);
    }
    //lightblue
    if (cel.nazwa.slice(4,13) === "lightblue") {
        literallycfu(cel.nazwa.slice(4,13),cel);
    }
    //pink
    if (cel.nazwa.slice(4,8) === "pink") {
        literallycfu(cel.nazwa.slice(4,8),cel);
    }
    //orange
    if (cel.nazwa.slice(4,10) === "orange") {
        literallycfu(cel.nazwa.slice(4,10),cel);
    }
    //red
    if (cel.nazwa.slice(4,7) === "red") {
        literallycfu(cel.nazwa.slice(4,7),cel);
    }
    //yellow
    if (cel.nazwa.slice(4,10) === "yellow") {
        literallycfu(cel.nazwa.slice(4,10),cel);
    }
    //green
    if (cel.nazwa.slice(4,9) === "green") {
        literallycfu(cel.nazwa.slice(4,9),cel);
    }
    //darkblue
    if (cel.nazwa.slice(4,12) === "darkblue") {
        literallycfu(cel.nazwa.slice(4,12),cel);
    }

    function literallycfu(grupa) {
        let licznik = 0;
        //2 budynki
        if (grupa === "brown") {
            if (document.getElementById("p1").wlasciciel === nowplaying.name) licznik++;
            if (document.getElementById("p3").wlasciciel === nowplaying.name) licznik++;
            if (licznik === 2) offerUpdate();
        }
        if (grupa === "darkblue") {
            if (document.getElementById("p37").wlasciciel === nowplaying.name) licznik++;
            if (document.getElementById("p39").wlasciciel === nowplaying.name) licznik++;
            if (licznik === 2) offerUpdate();
        }
        //3 budynki
        if (grupa === "lightblue") {
            if (document.getElementById("p6").wlasciciel === nowplaying.name) licznik++;
            if (document.getElementById("p8").wlasciciel === nowplaying.name) licznik++;
            if (document.getElementById("p9").wlasciciel === nowplaying.name) licznik++;
            if (licznik === 3) offerUpdate();
        }
        if (grupa === "pink") {
            if (document.getElementById("p11").wlasciciel === nowplaying.name) licznik++;
            if (document.getElementById("p13").wlasciciel === nowplaying.name) licznik++;
            if (document.getElementById("p14").wlasciciel === nowplaying.name) licznik++;
            if (licznik === 3) offerUpdate();
        }
        if (grupa === "orange") {
            if (document.getElementById("p16").wlasciciel === nowplaying.name) licznik++;
            if (document.getElementById("p18").wlasciciel === nowplaying.name) licznik++;
            if (document.getElementById("p19").wlasciciel === nowplaying.name) licznik++;
            if (licznik === 3) offerUpdate();
        }
        if (grupa === "red") {
            if (document.getElementById("p21").wlasciciel === nowplaying.name) licznik++;
            if (document.getElementById("p23").wlasciciel === nowplaying.name) licznik++;
            if (document.getElementById("p24").wlasciciel === nowplaying.name) licznik++;
            if (licznik === 3) offerUpdate();
        }
        if (grupa === "yellow") {
            if (document.getElementById("p26").wlasciciel === nowplaying.name) licznik++;
            if (document.getElementById("p27").wlasciciel === nowplaying.name) licznik++;
            if (document.getElementById("p29").wlasciciel === nowplaying.name) licznik++;
            if (licznik === 3) offerUpdate();
        }
        if (grupa === "green") {
            if (document.getElementById("p31").wlasciciel === nowplaying.name) licznik++;
            if (document.getElementById("p32").wlasciciel === nowplaying.name) licznik++;
            if (document.getElementById("p34").wlasciciel === nowplaying.name) licznik++;
            if (licznik === 3) offerUpdate();
        }
    }

    function offerUpdate() {
        alert("Wszystkie pola z tego działu należą do Ciebie.");
        let polekolor = document.getElementById("kolorp" + newid).innerHTML;
        if (nowplaying.cash-cel.budynekkoszt >= 0 || polekolor < 5) {
            let question = prompt("Czy chcesz ulepszyć to pole? Koszt: " + cel.budynekkoszt);
            if (question === "tak") {
                polekolor++;
                cel.upgradelevel++;
                if (polekolor === 5) alert("Budynek został maksymalnie ulepszony.");
                if (polekolor < 5) alert("Budynek został ulepszony do poziomu " + polekolor);
                document.getElementById("kolorp" + newid).innerHTML = polekolor;
            }
        } else alert("Nie możesz ulepszyć tego budynku. Prawdopodobnie jesteś zbyt biedny/a lub zbyt bogaty/a.");
        if (gracz1 === true) gracz1 = false;
        else gracz1 = true;
    }
}

function payTaxes(cel,nowplaying) {
    alert("Pole należy do " + cel.wlasciciel);
    let oplata, wlasciciel;
    let licznik = 0;
    if (cel.wlasciciel === "Kasia") wlasciciel = pionek1;
    else wlasciciel = pionek2;
    if (cel.upgradelevel != 0 && cel.upgradelevel != null) {
        if (cel.upgradelevel === 1) oplata = parseInt(cel.podatek1);
        if (cel.upgradelevel === 2) oplata = parseInt(cel.podatek2);
        if (cel.upgradelevel === 3) oplata = parseInt(cel.podatek3);
        if (cel.upgradelevel === 4) oplata = parseInt(cel.podatek4);
        if (cel.upgradelevel === 5) oplata = parseInt(cel.podatekhotel);
    } else {
        //2 budynki
        if (cel.nazwa.slice(4,9) === "brown") {
            if (document.getElementById("p1").wlasciciel === wlasciciel.name) licznik++;
            if (document.getElementById("p3").wlasciciel === wlasciciel.name) licznik++;
            if (licznik === 2) oplata = parseInt(cel.oplata*2);
            else oplata = parseInt(cel.oplata);
        }
        if (cel.nazwa.slice(4,12) === "darkblue") {
            if (document.getElementById("p37").wlasciciel === wlasciciel.name) licznik++;
            if (document.getElementById("p39").wlasciciel === wlasciciel.name) licznik++;
            if (licznik === 2) oplata = parseInt(cel.oplata*2);
            else oplata = parseInt(cel.oplata);
        }
        //3 budynki
        if (cel.nazwa.slice(4,13) === "lightblue") {
            if (document.getElementById("p6").wlasciciel === wlasciciel.name) licznik++;
            if (document.getElementById("p8").wlasciciel === wlasciciel.name) licznik++;
            if (document.getElementById("p9").wlasciciel === wlasciciel.name) licznik++;
            if (licznik === 3) oplata = parseInt(cel.oplata*2);
            else oplata = parseInt(cel.oplata);
        }
        if (cel.nazwa.slice(4,8) === "pink") {
            if (document.getElementById("p11").wlasciciel === wlasciciel.name) licznik++;
            if (document.getElementById("p13").wlasciciel === wlasciciel.name) licznik++;
            if (document.getElementById("p14").wlasciciel === wlasciciel.name) licznik++;
            if (licznik === 3) oplata = parseInt(cel.oplata*2);
            else oplata = parseInt(cel.oplata);
        }
        if (cel.nazwa.slice(4,10) === "orange") {
            if (document.getElementById("p16").wlasciciel === wlasciciel.name) licznik++;
            if (document.getElementById("p18").wlasciciel === wlasciciel.name) licznik++;
            if (document.getElementById("p19").wlasciciel === wlasciciel.name) licznik++;
            if (licznik === 3) oplata = parseInt(cel.oplata*2);
            else oplata = parseInt(cel.oplata);
        }
        if (cel.nazwa.slice(4,7) === "red") {
            if (document.getElementById("p21").wlasciciel === wlasciciel.name) licznik++;
            if (document.getElementById("p23").wlasciciel === wlasciciel.name) licznik++;
            if (document.getElementById("p24").wlasciciel === wlasciciel.name) licznik++;
            if (licznik === 3) oplata = parseInt(cel.oplata*2);
            else oplata = parseInt(cel.oplata);
        }
        if (cel.nazwa.slice(4,10) === "yellow") {
            if (document.getElementById("p26").wlasciciel === wlasciciel.name) licznik++;
            if (document.getElementById("p27").wlasciciel === wlasciciel.name) licznik++;
            if (document.getElementById("p29").wlasciciel === wlasciciel.name) licznik++;
            if (licznik === 3) oplata = parseInt(cel.oplata*2);
            else oplata = parseInt(cel.oplata);
        }
        if (cel.nazwa.slice(4,9) === "green") {
            if (document.getElementById("p31").wlasciciel === wlasciciel.name) licznik++;
            if (document.getElementById("p32").wlasciciel === wlasciciel.name) licznik++;
            if (document.getElementById("p34").wlasciciel === wlasciciel.name) licznik++;
            if (licznik === 3) oplata = parseInt(cel.oplata*2);
            else oplata = parseInt(cel.oplata);
        }
        //dworzec
        if (cel.nazwa.slice(4,11) === "dworzec") {
            if (document.getElementById("p5").wlasciciel === wlasciciel.name) licznik++;
            if (document.getElementById("p15").wlasciciel === wlasciciel.name) licznik++;
            if (document.getElementById("p25").wlasciciel === wlasciciel.name) licznik++;
            if (document.getElementById("p35").wlasciciel === wlasciciel.name) licznik++;
            if (licznik === 1) oplata = parseInt(cel.oplata);
            if (licznik === 2) oplata = parseInt(cel.podatek1);
            if (licznik === 3) oplata = parseInt(cel.podatek2);
            if (licznik === 4) oplata = parseInt(cel.podatek3);
        }
        //duet
        if (cel.nazwa.slice(4,15) === "elektrownia" || cel.nazwa.slice(4,12) === "wodociąg") {
            if (document.getElementById("p12").wlasciciel === wlasciciel.name) licznik++;
            if (document.getElementById("p28").wlasciciel === wlasciciel.name) licznik++;
            if (licznik === 1) oplata = parseInt(cel.oplata);
            if (licznik === 2) oplata = parseInt(cel.podatek1);
        }
    }
    wlasciciel.cash = parseInt(wlasciciel.cash + oplata);
    nowplaying.cash = parseInt(nowplaying.cash - oplata);
    if (nowplaying.cash >= 0) alert("Haracz został zebrany.\nStan konta " + wlasciciel.name + ": " + wlasciciel.cash + "(+" + oplata + ")\nStan konta " + nowplaying.name + ": " + nowplaying.cash + "(-" + oplata + ")");
    else {
        alert("Gracz " + nowplaying.name + " zbankrutował...");
        document.getElementById("losuj").disabled = true;
    }
}