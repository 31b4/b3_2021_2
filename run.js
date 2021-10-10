
var map1 = [//0=null, 1=erzekelo tona, 2=erzekelo, 3=strat, 4=cel
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
var emberPos=[11,0];
var lepesek=0;
function LkSzenzorTavolsag(szensorPos){// kiszamolja myilen mennsze van a legkozelebbi szenzor
    var tav;
    var yKul=Math.abs(emberPos[0]-szensorPos[0]);
    var xKul=Math.abs(emberPos[1]-szensorPos[1]);
    if (szensorPos[0]==emberPos[0]) {
        tav = xKul;
    }
    else if(szensorPos[1]==emberPos[1]){
        tav = yKul;
    }
    else if (xKul <= yKul) {
        tav = (xKul+yKul)-xKul;
    }
    else if (yKul <= xKul) {
        tav = (xKul+yKul)-yKul;
    }
    console.log("tav: "+ tav)
    document.getElementById("LKME").innerHTML="Legközelebbi mozgás érzékelő: "+ tav;
}
function HatarSensVizsg(y,x){
    if(x>=0&&x<12&&y>=0&&y<12){
        if (map1[y][x]==2) {
            return true;
        }
    }
    return false;
}
function LegkozelebbiSzenzor(szensorPos){// megkeresi a legkozelebbi szenzor kordinatajat pl:[3,8]
    var y = emberPos[0]-1;
    var x = emberPos[1]-1;
    for (let i = 2; i < 11; i++) {
        y -= 1;
        x -= 1;
        if(HatarSensVizsg(y,x)){
                szensorPos=[y,x];
                return szensorPos;
        }
        // ---------------- ATIRASRA VAR ---------------
        for (let j = 0; j < i*2; j++) {
            x++;
            if (HatarSensVizsg(y,x)) {
                szensorPos=[y,x];
                return szensorPos;
            }
        }
        for (let j = 0; j < i*2; j++) {
            y++;
            if (HatarSensVizsg(y,x)) {
                szensorPos=[y,x];
                return szensorPos;
            }   
        }
        for (let j = 0; j < i*2; j++) {
            x--;
            if (HatarSensVizsg(y,x)) {
                szensorPos=[y,x];
                return szensorPos;
            }
        }
        for (let j = 0; j < i*2; j++) {
            y--;
            if (HatarSensVizsg(y,x)) {
                szensorPos=[y,x];
                return szensorPos;
            }
        }
    }
}
function EmberMozgas(y,x){
    var ey=emberPos[0];
    var ex=emberPos[1];
    // console.log(y+","+y)
    if(y==ey-1&&x==ex || y==ey-1&&x==ex+1 || y==ey&&x==ex+1 || y == ey+1&&x==ex+1 || y==ey+1 && x==ex || y==ey+1&&x==ex-1||y==ey&&x==ex-1||y==ey-1&&x==ex-1){
        lepesek++;
        // console.log("valid");
        var voltPos = document.getElementById(ey+","+ex);
        voltPos.innerHTML="";
        if(map1[y][x]==1){
            alert("Beriasztott az épület, mindössze "+lepesek+" lépést sikerült megtenni :(");
            Restart();
            return;
        }
        else if(map1[y][x]==4){
            alert("Gratulálok, feltünés nélkül bejutottál a szerver szobába, mindössze "+lepesek+" lépésből!");
            Restart();
            return;
        }
        emberPos=[y,x]
        var ujPos = document.getElementById(y+","+x);
        ujPos.innerHTML=":)"
        LkSzenzorTavolsag(LegkozelebbiSzenzor());
    }
}
function Restart(){
    lepesek=0;
    emberPos=[11,0];
    document.getElementById("table").innerHTML="";
    document.getElementById("LKME").innerHTML="Legközelebbi mozgás érzékelő: ";
}
function MapGenerate(map){
    var table = document.getElementById("table");
    Restart();
    for (let i = 0; i < 12; i++) {
        var tr = document.createElement("tr");
        for (let j = 0; j < 12; j++) {
            var td = document.createElement("td");
            td.style.color="white";
            td.style.textAlign="center";
            td.style.width="40px";
            td.style.height="40px";
            td.id=i+","+j; // pl: 0,0
            
            td.onclick = function(){EmberMozgas(i,j)};
            if(map[i][j]==1 ||map[i][j]==2){
                td.style.backgroundColor="red";
                if(map[i][j]==2){
                    td.innerHTML="X";
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
    LkSzenzorTavolsag(LegkozelebbiSzenzor());
}