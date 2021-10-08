window.addEventListener("load", init);
function init() {
    //Make stage
    const stage = new createjs.Stage("Canvas");
    //Support touch device
    if (createjs.Touch.isSupported() == true) {
        createjs.Touch.enable(stage);
    }
    /*//Window resizing process
    window.addEventListener("resize", handleResize);
    handleResize();
    */
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", update);

    function handleResize() {
        const w = window.innerWidth;
        const h = window.innerWidth;
        stage.canvas.width = w;
        stage.canvas.height = h;
        stage.update();
    }
    let frameCount = 0;
    let life = 100;
    let bulletList = [];
    let enemyList = [];
    let killedEnemy = 0;
    let background = new createjs.Shape();
    background.graphics.beginFill("#000000");
    background.graphics.drawRect(0, 0, stage.canvas.width, stage.canvas.height);
    stage.addChild(background);
    let player = new createjs.Bitmap("uchusen.png");
    stage.mouseX = 165;
    stage.mouseY = 600;
    player.x = 165;
    player.y = 600;
    stage.addChild(player);
    stage.update();
    function update() {
        if (life <= 0) {
            alert("ライフが0になりました\n敵を"+killedEnemy.toString()+"倒しました");
            createjs.Ticker.removeAllEventListeners();
            stage.removeAllEventListeners();
        }
        function movePlayer() {
            player.x += (stage.mouseX - player.x) * 0.1;
            player.y += (stage.mouseY - player.y) * 0.1;
            if (player.x >= stage.canvas.width - 20) {

                player.x = stage.canvas.width - 20;
            }
            if (player.y >= stage.canvas.height - 20) {

                player.y = stage.canvas.height - 20;
            }
        }
        function shootBullet() {
            let bullet = new createjs.Shape();
            bullet.graphics.beginFill("white").drawCircle(0, 0, 3);
            bullet.x = player.x + 16;
            bullet.y = player.y;
            stage.addChild(bullet);
            bulletList.push(bullet);
        }
        function makeEnemy(life) {
            let enemyListInLine = [];
            for (let i = 0; i < 6; i++) {
                let enemy = new createjs.Bitmap("emoji_u1f47e.png");
                enemy.scaleX = 0.2;
                enemy.scaleY = 0.2;
                enemy.x = Math.floor(Math.random() * 330) + 10;
                enemy.y = 0;
                stage.addChild(enemy);
                let enemyInfo = {
                    "enemy": enemy,
                    "life": life,
                    "bullet": {
                        "vx": [],
                        "vy": [],
                        "bullet": []
                    }
                }
                enemyListInLine.push(enemyInfo);
            }
            return enemyListInLine;
        }
        function moveEnemy() {
            for (let i = 0; i < enemyList.length; i++) {
                enemyList[i].forEach(enemy => {
                    enemy["enemy"].y += 5;
                });
            }
        }
        frameCount++;
        movePlayer();

        if (frameCount % 10 === 0) {
            shootBullet();
        }

        if (frameCount % 120 === 0) {
            enemyList.push(makeEnemy(30));
        }
        moveEnemy();
        //玉が画面外に行ったときに消去
        for (let i = 0; i < bulletList.length; i++) {
            bulletList[i].y -= 10;
            if (bulletList[i].y < 0) {
                stage.removeChild(bulletList[i]);
                bulletList.splice(i, 1);
                i--;
            }
        }
        //敵が画面外に行ったとき消去
        for (let k = 0; k < enemyList.length; k++) {
            for (let i = 0; i < enemyList[k].length; i++) {
                if (enemyList[k][i]["enemy"].y >= 650) {
                    stage.removeChild(enemyList[k][i]);
                    enemyList[k].splice(i, 1);
                    i--;
                }
            }
        }
        //玉と敵の当たり判定
        for (let k = 0; k < enemyList.length; k++) {
            for (let i = 0; i < enemyList[k].length; i++) {

                for (let j = 0; j < bulletList.length; j++) {
                    let point = bulletList[j].localToLocal(0, 0, enemyList[k][i]["enemy"]);

                    if (point.x > 0 && point.x < 100 && point.y > 0 && point.y < 100) {
                        stage.removeChild(bulletList[j]);
                        bulletList.splice(j, 1);
                        j--;
                        enemyList[k][i]["life"] -= 7;
                        if (enemyList[k][i]["life"] <= 0) {
                            killedEnemy += 1;
                            stage.removeChild(enemyList[k][i]["enemy"]);
                            enemyList[k].splice(i, 1);
                            i--;
                        }
                    }

                }
            }
            //敵と時分の当たり判定
            for (let k = 0; k < enemyList.length; k++) {
                for (let i = 0; i < enemyList[k].length; i++) {
                    let point = player.localToLocal(0, 0, enemyList[k][i]["enemy"]);
                    if (point.x > 0 && point.x < 100 && point.y > 0 && point.y < 100) {
                        life -= 1;
                    }
                }
            }
        }

        stage.update();
    }
}
