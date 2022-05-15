const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const content = canvas.parentNode;

var width,height;

var man_set = [];

function init(){
    canvas.width = content.clientWidth-32;
    canvas.height = canvas.width;
    width = canvas.width;
    height = canvas.height;
    mandelbrot(0,0,1,30);
    draw(man_set);
    console.log(math.complex(0,1));
}

function draw(set){
    ctx.clearRect(0,0,800,800);
    ctx.strokeStyle = ("black");
    ctx.lineWidth = 5;
    ctx.strokeRect(0,0,canvas.width,canvas.height);
    draw_set(set);
    //draw_axis();
}

function draw_set(set){
    ctx.fillStyle = "black";
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            if (set[i][j]){
                ctx.fillRect(i,j,1,1);
            }
        }
    }
}

function mandelbrot(centerre,centerim,magnification,threshold){
    var center = math.complex(centerre,centerim);
    if (width>height){//Height == Set's Height
        var cpp = 4/height/magnification;// Coordinate per pixel
        var initre = centerre - cpp*(width/2);
        var initim = centerim + cpp*(height/2);
    }else{//Width = Set's Width
        var cpp = 4/width/magnification;// Coordinate per pixel
        var initre = centerre - cpp*(width/2);
        var initim = centerim + cpp*(height/2);
    }

    var pos;

    for (let i = 0; i < width; i++) {
        man_set.push([]);
        for (let j = 0; j < height; j++) {
            pos = math.complex(
                initre+cpp*i,
                initim-cpp*j
                );
            man_set[i].push(calculate(pos,threshold));
        }
    }

    console.log(`cpp = ${cpp}, initre = ${initre}, initim = ${initim}`);
}

function calculate(complex,threshold){
    let z = 0;
    for (let i = 0; i < threshold; i++) {
        z = math.add(math.pow(z,2),complex);
        if (math.abs(z)>2) {
            return false; //diverge(Hassan)
            break;
        }
    }
    return true; //converge(Shu-soku)
}

function draw_axis(){

    ctx.lineWidth = 1;
    ctx.strokeStyle = ("blue");
    ctx.moveTo(0,200);
    ctx.lineTo(800,200);
    ctx.moveTo(0,600);
    ctx.lineTo(800,600);
    ctx.moveTo(200,0);
    ctx.lineTo(200,800);
    ctx.moveTo(600,0);
    ctx.lineTo(600,800);
    ctx.moveTo(0,400);
    ctx.lineTo(800,400);
    ctx.moveTo(400,0);
    ctx.lineTo(400,800);
    ctx.stroke();
}

window.addEventListener("load",init);
content.addEventListener("resize",console.log(content.clientWidth));