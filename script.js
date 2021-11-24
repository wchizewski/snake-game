// snake game by Will 

let cnv = document.getElementById("canvas");
let ctx = cnv.getContext("2d");
cnv.width = 900;
cnv.height = 900;

let squarex = 0;
let squarey = 0;



ctx.fillStyle = "green"
for (let x = 0; x <= 855; x += 90) {
    ctx.fillRect(x, 0, 45, 45)
}

ctx.fillStyle = "lightgreen"
for (let x = 45; x <= 900; x += 90) {
    ctx.fillRect(x, 0, 45, 45)
}


ctx.fillStyle = "blue"
ctx.fillRect(squarex, squarey, 45, 45)