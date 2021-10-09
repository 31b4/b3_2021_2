
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

function EmberMozgas(y,x){
    var ey=emberPos[0];
    var ex=emberPos[1];
    // console.log(x+","+y)
    if(y==ey-1&&x==ex || y==ey-1&&x==ex+1 || y==ey&&x==ex+1 || y == ey+1&&x==ex+1 || y==ey+1 && x==ex || y==ey+1&&x==ex-1||y==ey&&x==ex-1||y==ey-1&&x==ex-1){
        // console.log("valid");
        var voltPos = document.getElementById(ey+","+ex);
        voltPos.innerHTML="";
        if(map1[y][x]==1){
            alert("Beriasztott az épület, FUTÁS!");
            Restart();
            return;
        }
        else if(map1[y][x]==4){
            alert("Gratulálok, feltünés nélkül bejutottál a szerver szobába!");
            Restart();
            return;
        }
        emberPos=[y,x]
        var ujPos = document.getElementById(y+","+x);
        ujPos.innerHTML=":)"
    }
}
function Restart(){
    emberPos=[11,0];
    document.getElementById("table").innerHTML="";
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
}