// Create our application instance
let app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x2c3e50
});
document.body.appendChild(app.view);
const graphics = new PIXI.Graphics();
app.stage.addChild(graphics);
//ロード
 
// Load the bunny texture
app.loader.add('bunny', 'https://pixijs.io/examples/examples/assets/bunny.png')
    .load(startup);
 
class Entity extends PIXI.Sprite {
    xSpeed = 0;
    ySpeed = 0;
    onGround = false;
    constructor(x, y, xSpeed, ySpeed, onGround) {
        super(app.loader.resources.bunny.texture);
        this.anchor.set(0.5);
        this.scale.set(0.75);
        this.x = x;
        this.y = y;
    
    }
};
 
const STAGES = [
    {
        start: { x: -980, y: 50 },
        stage: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
            [1, 8, 0, 8, 0, 0, 0, 0, 8, 0, 8, 0, 8, 0, 0, 1,],
            [1, 8, 0, 0, 0, 0, 0, 0, 0, 8, 0, 8, 0, 8, 0, 4,],
            [1, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
            [1, 8, 0, 8, 1, 1, 8, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
            [1, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
            [1, 1, 1, 1, 1, 1, 1, 1, 8, 1, 1, 8, 1, 1, 0, 1,],
            [1, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 8,],
            [1, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 8,],
            [1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1,],
            [1, 0, 0, 8, 0, 0, 0, 8, 0, 0, 8, 0, 0, 0, 0, 1,],
            [1, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 0, 0, 1,],
            [1, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        ],
    },
     {
        start: { x: -300, y: 50 },
        stage: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 8, 8, 0, 0, 0, 8, 8, 1, 8, 0, 0, 0, 0, 0, 1],
            [1, 8, 8, 0, 0, 0, 8, 8, 1, 8, 0, 0, 0, 0, 0, 1],
            [1, 8, 8, 0, 0, 0, 8, 8, 1, 8, 0, 0, 0, 0, 0, 1],
            [1, 8, 8, 0, 0, 0, 8, 8, 1, 8, 0, 0, 0, 0, 0, 1],
            [1, 8, 8, 0, 0, 0, 8, 8, 1, 8, 0, 0, 0, 0, 0, 1],
            [1, 8, 8, 0, 0, 0, 8, 8, 1, 8, 0, 0, 0, 0, 0, 1],
            [1, 8, 8, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 8, 8, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
            [1, 8, 8, 0, 0, 0, 8, 0, 1, 8, 0, 0, 0, 0, 0, 1],
            [1, 9, 0, 0, 0, 0, 8, 0, 1, 8, 8, 0, 0, 0, 0, 1],
            [1, 9, 0, 0, 0, 0, 8, 0, 1, 8, 8, 8, 0, 0, 0, 1],
            [1, 9, 0, 0, 0, 0, 8, 0, 1, 8, 8, 8, 0, 0, 0, 1],
            [1, 0, 8, 0, 0, 0, 8, 0, 1, 8, 8, 8, 8, 4, 4, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ],
    },
    {
        start: { x: -980, y: 50 },
        stage: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 999, 1, 1, 1,],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1,],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 100, 1, 1, 1, 1, 1, 1,],
            [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
            [1, 0, 0, 0, 0, 0, , 100, 1, 1, 1, 1, 1, 1, 1, 1,],
            [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
            [1, 0, 0, 0, 100, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
            [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
            [1, 0, 0, 100, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ,1, 1, 1,],
            [1, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        ],
    },
];
 
function startup() {
    let player = new Entity(128, 128, 0, 0, false);
    app.stage.addChild(player);
    let stageNumber = -1;
    let stage;
    let stageClear = true;
 
    let player_speed = 4;
    
    let w_press = false;
    let s_press = false;
    let d_press = false;
    let a_press = false;
    let space_press = false;
    
 
    let jump_counter = 2;
 
    let playerAlerted = false;

    let playerAlertes = false;

    let playerAlertea = false;
 
    document.addEventListener("keypress", (e) => {
        if (e.key == "w") {
            if (w_press) return;
            w_press = true;
            if (jump_counter > 0) {
                player.ySpeed = -12.5 - (player.scale.y - 1) * 2;
                if (!player.onGround) jump_counter--;
            }
        }
        if (e.key == "a") {
            if (a_press) return;
            a_press = true;
        }
        if (e.key == "d") {
            if (d_press) return;
            d_press = true;
        }
        if (e.key == " ") {
            if (space_press) return;
            space_press = true;
            alert("球発射");
        }
 
        
    });
 
    document.addEventListener("keyup", (e) => {
        if (e.key == "w") {
            if (!w_press) return;
            w_press = false;
        }
        if (e.key == "a") {
            if (!a_press) return;
            a_press = false;
        }
        if (e.key == "d") {
            if (!d_press) return;
            d_press = false;
        }
        if (e.key == " ") {
            if (!space_press) return;
            space_press = false;
        }
 
        
    });
 
    // 当たり判定関数
    const Hit = {
        NOT: 0,
        TOP: 1,
        BOTTOM: 2,
        LEFT: 3,
        RIGHT: 4,
    };
    const checkHit = (entity, block_x, block_y) => {
        if (
            entity.x + entity.width / 2 > block_x &&
            entity.x - entity.width / 2 < block_x + 32 &&
            entity.y + entity.height / 2 > block_y &&
            entity.y - entity.height / 2 < block_y + 32
        ) {
            if (
                entity.x + entity.width / 2 > block_x + 8 &&
                entity.x - entity.width / 2 < block_x + 32 - 8
            ) {
                if (entity.ySpeed > 0) return Hit.TOP;
                else return Hit.BOTTOM;
            } else {
                if (entity.x < block_x + 16) return Hit.LEFT;
                else return Hit.RIGHT;
            }
        }
        return Hit.NOT;
    };
 
    let tick = 0;
    // Listen for animate update
    app.ticker.add(() => {
        // ステージ更新
        if (stageClear) {
            stageClear = false;
            const nextStage = STAGES[++stageNumber];
            if (nextStage) {
                stage = nextStage.stage;
                player.x = nextStage.start.x;
                player.x = nextStage.start.y;
            }
        }
        // サイズ変更
        //player.scale.set(1 + Math.sin(tick / 30) * 0.5);
        // 横移動
        if (Math.abs(player.xSpeed) <= player_speed) player.xSpeed = 0;
        if (a_press && !d_press && player.xSpeed > -player_speed) {
            player.xSpeed -= player_speed;
            if (player.xSpeed < -player_speed) player.xSpeed = -player_speed;
        }
        if (d_press && !a_press && player.xSpeed < player_speed) {
            player.xSpeed += player_speed;
            if (player.xSpeed > player_speed) player.xSpeed = player_speed;
        }
        // 重力
        player.ySpeed += 0.8;
        if (player.ySpeed < 0 && !w_press) player.ySpeed += 3;
        // 速度制限
        if (player.xSpeed > 8) player.xSpeed = 8;
        if (player.xSpeed < -8) player.xSpeed = -8;
        if (player.ySpeed > 24) player.ySpeed = 24;
        if (player.ySpeed < -24) player.ySpeed = -24;
        // 座標更新
        player.x += player.xSpeed;
        player.y += player.ySpeed;
        player.onGround = false;
        // ステージの当たり判定
        // 上下補正
        for (let i = 0; i < stage.length; i++) {
            for (let k = 0; k < stage[i].length; k++) {
                //ブロック
                if (
                    stage[i][k] === 1 ||
                    stage[i][k] === 2 ||
                    stage[i][k] === 3
                ) {
                    switch (checkHit(player, k * 32, i * 32)) {
                        case Hit.TOP:
                            player.ySpeed = 0;
                            player.y = i * 32 - player.height / 2;
                            player.onGround = true;
                            jump_counter = 2;
                            break;
                        case Hit.BOTTOM:
                            player.ySpeed *= -1;
                            player.y = i * 32 + 32 + player.height / 2;
                            break;
                    }
                }
            }
        }
        // 左右補正
        for (let i = 0; i < stage.length; i++) {
            for (let k = 0; k < stage[i].length; k++) {
                //ブロック
                if (
                    stage[i][k] === 1 ||
                    stage[i][k] === 2 ||
                    stage[i][k] === 3
                ) {
                    switch (checkHit(player, k * 32, i * 32)) {
                        case Hit.LEFT:
                            player.xSpeed = 0;
                            player.x = k * 32 - player.width / 2;
                            break;
                        case Hit.RIGHT:
                            player.xSpeed = 0;
                            player.x = k * 32 + 32 + player.width / 2;
                            break;
                    }
                }
            }
        }
        // その他処理
        let alertTouching = false;
        for (let i = 0; i < stage.length; i++) {
            for (let k = 0; k < stage[i].length; k++) {
                //ブロック
                if (stage[i][k] === 4) {
                    if (checkHit(player, k * 32, i * 32) !== Hit.NOT) {
                        stageClear = true;
                    }
                }
                //ブロック
                if (stage[i][k] === 7) {
                    if (checkHit(player, k * 32, i * 32) !== Hit.NOT) {
                        alertTouching = true;
                    }
                }
                if (stage[i][k] === 200) {
                    if (checkHit(player, k * 32, i * 32) !== Hit.NOT) {
                        alertTouchinh = true;
                    }
                }
                if (stage[i][k] === 300) {
                    if (checkHit(player, k * 32, i * 32) !== Hit.NOT) {
                        alertTouchinj = true;
                    }
                }
                 if (stage[i][k] === 999) {
                    if (checkHit(player, k * 32, i * 32) !== Hit.NOT) {
                        alert("クリア");
                    }
                }
                if (stage[i][k] === 10) {
                    if (checkHit(player, k * 32, i * 32) !== Hit.NOT) {
                        player_speed = 10
                    }
                }
                if (stage[i][k] === 9) {
                    if (checkHit(player, k * 32, i * 32) !== Hit.NOT) {
                        player_speed = 4;
                    }
                }
                if (stage[i][k] === 100) {
                    if (checkHit(player, k * 32, i * 32) !== Hit.NOT) {
                        player.x = 50;
                        player.y = 1000;
                    }
                }
                if (stage[i][k] === 8) {
                    if (checkHit(player, k * 32, i * 32) !== Hit.NOT) {
                        player.x = 50;
                        player.y = 1000;
                    }
                }
            }
        }
        if (alertTouching && !playerAlerted) alert("wでジャンプaで左移動dで右移動 止まったり勝手に動いたときはしばらく放置すると治ります バグ多めだけど許してください　　　２,4ステージ目のブロックは3種類あってすり抜けられるブロックと普通の白ブロックと触るとリスポーン地点に戻されるブロックがあります");
        playerAlerted = alertTouching

        // 地面
        if (player.y + player.height / 2 >= 512) {
            player.ySpeed = 0;
            player.y = 512 - player.height / 2;
            player.onGround = true;
            jump_counter = 2;
        }
        //// 描画
        app.renderer.resize(window.innerWidth, window.innerHeight);
        app.stage.scale.x = window.innerWidth / 512;
        app.stage.scale.y = window.innerHeight / 512;
        graphics.clear();
        // ステージ
        graphics.beginFill(0xffffff);
        for (let i = 0; i < stage.length; i++) {
            for (let k = 0; k < stage[i].length; k++) {
                if (stage[i][k] === 1) {
                    graphics.drawRect(
                        k * 32,
                        i * 32,
                        32,
                        32
                    );
                }
            }
        }
        graphics.beginFill(0xffffff);
        for (let i = 0; i < stage.length; i++) {
            for (let k = 0; k < stage[i].length; k++) {
                if (stage[i][k] === 88) {
                    graphics.drawRect(
                        k * 32,
                        i * 32,
                        32,
                        32
                    );
                }
            }
        }
         graphics.beginFill(0xffffff);
        for (let i = 0; i < stage.length; i++) {
            for (let k = 0; k < stage[i].length; k++) {
                if (stage[i][k] === 100) {
                    graphics.drawRect(
                        k * 32,
                        i * 32,
                        32,
                        32
                    );
                }
            }
        }
        graphics.beginFill(0xff);
        for (let i = 0; i < stage.length; i++) {
            for (let k = 0; k < stage[i].length; k++) {
                if (stage[i][k] === 2) {
                    graphics.drawRect(
                        k * 32,
                        i * 32,
                        32,
                        32
                    );
                }
            }
        }
        graphics.beginFill(0xffff);
        for (let i = 0; i < stage.length; i++) {
            for (let k = 0; k < stage[i].length; k++) {
                if (stage[i][k] === 3) {
                    graphics.drawRect(
                        k * 32,
                        i * 32,
                        32,
                        32
                    );
                }
            }
        }
         graphics.beginFill(0xf);
        for (let i = 0; i < stage.length; i++) {
            for (let k = 0; k < stage[i].length; k++) {
                if (stage[i][k] === 999) {
                    graphics.drawRect(
                        k * 32,
                        i * 32,
                        32,
                        32
                    );
                }
            }
        }
        graphics.beginFill(0xaaaaaa);
        for (let i = 0; i < stage.length; i++) {
            for (let k = 0; k < stage[i].length; k++) {
                if (stage[i][k] === 4) {
                    graphics.drawRect(
                        k * 32,
                        i * 32,
                        32,
                        32
                    );
                }
            }
        }
        graphics.beginFill(0xbaabbbabababababbababan);
        for (let i = 0; i < stage.length; i++) {
            for (let k = 0; k < stage[i].length; k++) {
                if (stage[i][k] === 5) {
                    graphics.drawRect(
                        k * 32,
                        i * 32,
                        32,
                        32
                    );
                }
            }
        }
        graphics.beginFill(0xaaaabbaaaaa);
        for (let i = 0; i < stage.length; i++) {
            for (let k = 0; k < stage[i].length; k++) {
                if (stage[i][k] === 10) {
                    graphics.drawRect(
                        k * 32,
                        i * 32,
                        32,
                        32
                    );
                }
            }
        }
        graphics.beginFill(0xaabb);
        for (let i = 0; i < stage.length; i++) {
            for (let k = 0; k < stage[i].length; k++) {
                if (stage[i][k] === 8) {
                    graphics.drawRect(
                        k * 32,
                        i * 32,
                        32,
                        32
                    );
                }
            }
        }
 
        graphics.endFill();
        // tick 更新
        tick++;
 
        if (tick == 360000000) {
            pleyer.x = 50;
            pleyer.y = 100;
        }
    });
}
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 

