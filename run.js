var map1 = [// 0=null, 1=erzekelo zona, 2=erzekelo, 3=strat, 4=cel
    [0,0,0,0,0,0,1,1,1,0,0,4],
    [1,1,1,1,1,1,1,2,1,0,0,0],
    [1,2,1,1,2,1,1,1,1,0,0,0],
    [1,1,1,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,1,1],
    [0,1,1,1,0,0,0,0,0,0,1,2],
    [0,1,2,1,0,0,0,0,0,0,1,1],
    [0,1,1,1,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,0,0],
    [0,0,0,0,0,0,0,1,2,1,1,1],
    [0,0,0,0,0,0,0,1,1,1,2,1],
    [3,0,0,0,0,0,0,0,0,1,1,1]
];
var map2 = [
    [1,1,0,0,0,0,1,1,1,0,0,4],
    [2,1,0,1,1,1,1,2,1,0,0,0],
    [1,1,0,1,2,1,1,1,1,0,0,0],
    [0,0,0,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,1,1],
    [0,1,1,1,0,0,1,1,1,0,1,2],
    [0,1,2,1,0,0,1,2,1,0,1,1],
    [0,1,1,1,0,0,1,1,1,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,0,0],
    [0,0,1,1,1,0,0,1,2,1,0,0],
    [0,0,1,2,1,0,0,1,1,1,0,0],
    [3,0,1,1,1,0,0,0,0,0,0,0]
];
var map3 = [
    [1,1,0,0,0,0,1,1,1,0,0,4],
    [2,1,0,1,1,1,1,2,1,0,0,0],
    [1,1,0,1,2,1,2,1,1,0,0,0],
    [0,0,0,1,1,1,1,1,0,1,1,1],
    [0,0,0,0,0,0,0,0,0,1,2,1],
    [0,1,1,1,0,1,1,1,0,1,1,1],
    [0,1,2,1,0,1,2,1,0,0,0,0],
    [0,1,1,1,0,1,1,1,0,0,0,0],
    [0,0,0,0,0,1,1,1,0,1,1,1],
    [0,1,1,1,1,1,2,1,0,1,2,1],
    [0,1,2,2,1,1,1,1,0,1,1,1],
    [3,1,1,1,1,0,0,0,0,0,0,0]
];
var map4 = [
    [1,1,0,0,0,0,1,1,2,1,0,4],
    [2,1,0,1,1,1,1,2,1,1,0,0],
    [1,1,0,1,2,1,2,1,1,0,1,1],
    [0,0,0,1,1,2,1,1,0,1,1,2],
    [0,0,1,1,2,1,1,0,1,1,2,1],
    [0,1,1,2,1,1,0,1,1,2,1,2],
    [1,1,2,1,1,0,1,1,2,1,1,1],
    [1,2,1,1,0,1,1,2,1,1,0,0],
    [1,1,1,0,1,1,2,1,1,1,0,0],
    [0,0,0,1,1,2,1,1,2,1,0,0],
    [0,0,0,1,2,1,1,1,1,1,0,0],
    [3,0,0,1,1,1,0,0,0,0,0,0]
];
var emberPos=[11,0];
var lepesek=0;
MapGenerate(map1,"idmap1");
function ExtraHelp(map){
    var szensorPos = LegkozelebbiSzenzor(map)
    document.getElementById(szensorPos[0]+","+szensorPos[1]).style.backgroundColor="#107dac";
    document.getElementById(szensorPos[0]+","+szensorPos[1]).innerHTML="X";
    document.getElementById("xtrBTN").remove();
}
function LkSzenzorTavolsag(vizsgalPos){// kiszamolja myilen mennsze van a legkozelebbi szenzor
    var tav;
    var yKul=Math.abs(emberPos[0]-vizsgalPos[0]);
    var xKul=Math.abs(emberPos[1]-vizsgalPos[1]);
    if (vizsgalPos[0]==emberPos[0]) {
        tav = xKul;
    }
    else if(vizsgalPos[1]==emberPos[1]){
        tav = yKul;
    }
    else if (xKul <= yKul) {
        tav = yKul;
    }
    else if (yKul <= xKul) {
        tav = xKul;
    }
    console.log("tav: "+ tav)
    if (tav>1) {
        document.getElementById("LKME").innerHTML="Legközelebbi mozgás érzékelő: "+ tav;
    }
    return tav;
}
function HatarSensVizsg(y,x,map){
    if(x>=0&&x<12&&y>=0&&y<12){
        if (map[y][x]==2) {
            return true;
        }
    }
    return false;
}
function JobbLeBalFel(y,x,i,map) {
    //ures
}
function LegkozelebbiSzenzor(map){// megkeresi a legkozelebbi szenzor kordinatajat pl:[3,8]
    var szensorPos;
    var y = emberPos[0]-1;
    var x = emberPos[1]-1;
    for (let i = 2; i < 11; i++) {
        y -= 1;
        x -= 1;
        if(HatarSensVizsg(y,x,map)){
            szensorPos=[y,x];
            return szensorPos;
        }
        // ---------------- ATIRASRA VAR ---------------
        for (let j = 0; j < i*2; j++) {
            x++;
            if (HatarSensVizsg(y,x,map)) {
                szensorPos=[y,x];
                return szensorPos;
            }
        }
        for (let j = 0; j < i*2; j++) {
            y++;
            if (HatarSensVizsg(y,x,map)) {
                szensorPos=[y,x];
                return szensorPos;
            }   
        }
        for (let j = 0; j < i*2; j++) {
            x--;
            if (HatarSensVizsg(y,x,map)) {
                szensorPos=[y,x];
                return szensorPos;
            }
        }
        for (let j = 0; j < i*2; j++) {
            y--;
            if (HatarSensVizsg(y,x,map)) {
                szensorPos=[y,x];
                return szensorPos;
            }
        }
    }
}
function EmberMozgas(y,x,map){
    var ey=emberPos[0];
    var ex=emberPos[1];
    var vizsgalpos=[y,x];
    if(LkSzenzorTavolsag(vizsgalpos)==1){
        lepesek++;
        var voltPos = document.getElementById(ey+","+ex);
        voltPos.innerHTML="";
        if(map[y][x]==1){
            alert("Beriasztott az épület, mindössze "+lepesek+" lépést sikerült megtenni :(");
            Restart();
            return;
        }
        else if(map[y][x]==4){
            alert("Gratulálok, feltünés nélkül bejutottál a szerver szobába, mindössze "+lepesek+" lépésből!");
            Restart();
            return;
        }
        emberPos=[y,x]
        var ujPos = document.getElementById(y+","+x);
        ujPos.innerHTML=":)"
        LkSzenzorTavolsag(LegkozelebbiSzenzor(map));
    }
}
function Restart(){
    lepesek=0;
    emberPos=[11,0];
    document.getElementById("table").innerHTML="";
    if (document.getElementById("LKME")!=null) {
        document.getElementById("LKME").remove();
    }
    if (document.getElementById("xtrBTN")!=null) {
        document.getElementById("xtrBTN").remove();
    }
    for (let i = 1; i <= 4; i++) {
        document.getElementById("idmap"+i).style.backgroundColor="#EFEFEF";
        document.getElementById("idmap"+i).style.color="black";
    }
}

function GombSzinezes(idmap) {
    for (let i = 1; i <= 4; i++) {
        document.getElementById("idmap"+i).style.backgroundColor="#EFEFEF";
        document.getElementById("idmap"+i).style.color="black";
    }
    document.getElementById(idmap).style.backgroundColor="#001630";
    document.getElementById(idmap).style.color="whitesmoke";
} 

function MapGenerate(map,idmap){
    var matrix = document.getElementById("matrix");
    var table = document.getElementById("table");
    var lkmeDiv = document.getElementById("LKMEdiv");
    Restart();
    GombSzinezes(idmap);
    for (let i = 0; i < 12; i++) {
        var tr = document.createElement("tr");
        for (let j = 0; j < 12; j++) {
            var td = document.createElement("td");
            td.style.color="white";
            td.style.textAlign="center";
            td.style.width="20px";
            td.style.height="20px";
            // td.style.setProperty("border","1","important");;
            td.id=i+","+j; // pl: 0,0
            td.onclick = function(){EmberMozgas(i,j,map)};
            if(map[i][j]==1 ||map[i][j]==2){
                td.style.backgroundColor="gray";
                if(map[i][j]==2){
                  // td.innerHTML="X";
                }
            }
            else if(map[i][j]==3 || map[i][j]==4){
                td.style.backgroundColor="green";
            }
            else{
                td.style.background="gray"
            }
            if(i==emberPos[0]&&j==emberPos[1]){
                td.innerHTML=":)"
            }
            tr.appendChild(td);
        }
      table.appendChild(tr);  
    }
    var btn = document.createElement("button");
    btn.id="xtrBTN";
    btn.onclick = function(){ExtraHelp(map)};
    btn.innerHTML="Extra help";
    btn.style.marginTop="20px";
    matrix.appendChild(btn);
    var lkme = document.createElement("p");//lkme = legkozelebbi mozgas erzekelo
    lkme.innerHTML="Legközelebbi mozgás érzékelő: ";
    lkme.id="LKME";
    lkmeDiv.appendChild(lkme);
    LkSzenzorTavolsag(LegkozelebbiSzenzor(map));
}

function Valami(){
    if (document.getElementById("p").textContent == "") {
        document.getElementById("p").innerHTML="A mozgáshoz kattints rá egy szomszédos mezőre, akár átlósan is. Ha beleérsz egy érzékelő sugarába a játék leáll. Az érzékelő minden irányba egy mező távolságra képes érzékelni, így ha mozgás érzékelő érzékelő 2 es távolságot jelez, olyankor már érdemes átgondolni hogy merre indulsz. Az Extra segítségével megtudhatod hogy hol van a legközelebbi érzékelő, vigyázz csak egyszer használhatod, jó játékot!";
        document.getElementById("mainbox").style.height="900px";
    }else {
        document.getElementById("p").innerHTML="";
        document.getElementById("mainbox").style.height="700px";
    }
}