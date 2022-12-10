const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const width = canvas.clientWidth;
const height = canvas.clientHeight;

const logo = new Image();
logo.src = "/image/Logo.png";//Tips:このファイルを外部ドメインに設定すると、ダウンロード時にCORSなんとかのエラーが出る。よくわからん

let text_1 = new Array("ここにテキストを入力");
let text_2 = "";

function draw(e){
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,width,height);

    if(document.getElementById("color").value=="orange"){
        ctx.fillStyle = "rgb(231,76,60)";}
    else if(document.getElementById("color").value=="yellow"){
        ctx.fillStyle = "rgb(231,182,60)";
    }
    ctx.fillRect(30,30,30,120);
    ctx.fillRect(30,30,120,30);

    ctx.fillRect(width - 30,30,-30,120);
    ctx.fillRect(width - 30,30,-120,30);

    ctx.fillRect(30,height - 30,30,-120);
    ctx.fillRect(30,height - 30,120,-30);

    ctx.fillRect(width -30,height - 30,-30,-120);
    ctx.fillRect(width -30,height - 30,-120,-30);

    ctx.imageSmoothingEnabled = true;//アンチエイリアス
    ctx.drawImage(logo,334,64,118,73);

    ctx.fillStyle = "black";
    ctx.textAlign = "left"
    ctx.textBaseline = "middle";
    ctx.font = ("56px 'M PLUS 2'");
    ctx.fillText("浅野学園物理部",476,100);
    ctx.textAlign = "center";
    ctx.font = ("96px 'M PLUS 2'");
    if (text_1.length == 2){
        if (text_2 != ""){
            ctx.fillText(text_1[0],width/2,height/2-96*0.8);
            ctx.fillText(text_1[1],width/2,height/2+96*0.3);
            ctx.font = ("72px 'M PLUS 2'");
            ctx.fillText(text_2,width/2,430);
        }else{
            ctx.fillText(text_1[0],width/2,height/2-96*0.5);
            ctx.fillText(text_1[1],width/2,height/2+96*0.5);
        }
    }else{
        if(text_2 != ""){
            ctx.fillText(text_1[0],width/2,height/2-50);
            ctx.font = ("72px 'M PLUS 2'");
            ctx.fillText(text_2,width/2,height/2+50);

        }else{
            ctx.fillText(text_1[0],width/2,height/2);
        }
    }
}

function change(e){
    if (e.currentTarget.id == "text_1"){
        text_1 = e.currentTarget.value.split("\n");
        if(text_1.length > 2){//入力が3行以上にわたる場合、3行目以降を削除
            text_1 = new Array(text_1[0],text_1[1]);
            e.currentTarget.value = text_1.join("\n")//テキストボックスに代入して改行できないようにする
        }
    }else if(e.currentTarget.id == "text_2"){
        text_2 = e.currentTarget.value;
    }
    draw();
}

function download(){
    let data = canvas.toDataURL("image/jpeg",0.85);
    var link = document.createElement("a");
    link.href = data;
    link.download = "thumbnail.jpg";
    link.click();
}

window.addEventListener("load",draw);
document.getElementById("text_1").addEventListener("input",change);
document.getElementById("text_2").addEventListener("input",change);
document.getElementById("color").addEventListener("input",draw);
document.getElementById("dl_button").addEventListener("click",download);
