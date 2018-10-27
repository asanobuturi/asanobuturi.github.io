//(c) 2018 Akihiko Yoshida

var ClientSizeX, ClientSizeY;
var scale;
var WorldSizeX = 10, WorldSizeY = 10;

var isTouch = false;
var MouseX = -1, MouseY = -1;
var TouchStartTime = 0;
var PrevTapTime = 0;
var TapTime = 0;
var TapPos = { x: -1, y: -1 };
var TapStartPos = { x: -1, y: -1 };

const DMax = 0.45;
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var audioConte = new AudioContext();
var seBuffer = null;
var seBombBuffer = null;

//var stats = new Stats();
//stats.domElement.style.position = 'absolute';
//stats.domElement.style.left = '0px';
//stats.domElement.style.top = '0px';
//
//document.body.appendChild(stats.domElement);

var svg;
var ns = 'http://www.w3.org/2000/svg'

var mainCont;
var counter;
var counterHint;
var counterPos;
var counterg = new Object();
var countergPos = new Object();
var countergColor = new Object();
var counterVal = new Object();
var marginX, marginY;
var BodyNum;
var Setting = { effect: '0', number: '0', sound: '0' };

var numbers = [
    [-1, 25],
    [2, 120],
    [3, 120],
    [4, 120],
    [5, 120],
    [6, 120],
    [7, 120],
    [8, 120],
    [9, 120],
    [10, 120],
    [11, 120],
    [12, 120],
    [13, 120],
    [14, 120],
    [15, 120],
    [16, 120],
    [17, 80],
    [18, 100],
    [19, 70],
    [20, 70],
    [21, 70],
    [22, 50],
    [23, 30],
    [24, 80],
    [25, 80],
    [26, 50],
    [27, 70],
    [28, 70],
    [29, 30],
    [30, 70],
    [31, 30],
    [32, 30],
    [33, 30],
    [34, 20],
    [35, 30],
    [36, 30],
    [37, 20],
    [38, 20],
    [39, 20],
    [40, 30],
    [41, 20],
    [42, 20],
    [43, 20],
    [44, 20],
    [45, 20],
    [46, 20],
    [48, 10],
    [49, 10],
    [50, 20],
    [51, 5],
    [52, 6],
    [55, 5],
    [56, 4],
    [58, 5],
    [60, 4],
    [62, 3],
    [63, 3],
    [64, 4],
    [65, 4],
    [66, 4],
    [68, 4],
    [69, 4],
    [70, 4],
    [72, 4],
    [74, 4],
    [75, 4],
    [76, 3],
    [77, 3],
    [78, 3],
    [80, 3],
    [81, 3],
    [82, 3],
    [84, 3],
    [85, 3],
    [86, 3],
    [88, 3],
    [90, 5],
    [92, 3],
    [93, 3],
    [95, 3],
    [96, 3],
    [98, 3],
    [99, 5],
    [100, 5],
    [111, 3],
    [221, 3],
    [289, 3],
    [323, 3],
    [361, 3],
    [527, 3],
    [529, 3],
    [533, 3],
    [551, 3],
    [559, 3],
    [697, 3],
    [703, 3],
    [713, 3],
    [731, 3],
    [775, 3],
    [779, 3],
    [817, 3],
    [841, 3],
    [851, 3],
    [899, 3],
    [943, 3],
    [961, 3],
    [1000, 3],
    [1073, 3],
    [1147, 3],
    [1189, 3],
    [1271, 3],
    [1331, 3],
    [1369, 3],
    [1517, 3],
    [1591, 3],
    [1681, 3],
    [1763, 3],
    [1849, 3],
    [4921, 3],
    [6851, 3],
    [7429, 3],
    [9367, 3],
    [9503, 3],
    [14641, 3],
    [15625, 3],
    [28561, 3],
    [46139, 3],
    [59049, 3],
    [65231, 3],
    [65536, 3],
    [79507, 3],
    [111111, 4],
    [130321, 2],
    [161051, 2],
    [371293, 2],
    [707281, 2],
    [1000000, 2],
    [282475249, 3],
    [6541380665835015, 3]
    //max[9007199254740991, 3]
];
var facts = new Object();

var zeroPadding = function (number) {
    var digit = 4;
    var numberLength = String(number).length;
    if (digit > numberLength)
        return (new Array((digit - numberLength) + 1).join(0)) + number;
    else
        return number;
};

for (var i = 0; i < numbers.length; i++) {
    for (var s = numbers[i][0], p = 2; s > 1;) {
        if (s % p == 0) {
            s /= p;
            facts[p] = 0;
        }
        else p++;
    }
}
(function () {
    var result = [];
    var cookies = document.cookie;

    if (cookies != '') {
        var cookieArray = cookies.split(';');
        for (var i = 0; i < cookieArray.length; i++) {
            var cookie = cookieArray[i].split('=');
            result[cookie[0].trim()] = cookie[1];
        }
    }

    for (var key in facts) {
        if (result['' + key]) {
            facts[key] = Number(result[key]);
        }
    }
    if (result['effect'])
        Setting.effect = result['effect'];

    if (result['number'])
        Setting.number = result['number'];

    //if (result['sound'])
    //    Setting.sound = result['sound'];
})();

var NumberImageD = [
    ['c', 36, 0, 42, 47, 41, 75, 0, 28, -5, 75, -41, 75, 's', -41, -46, -41, -75, 's', 5, -75, 41, -75, 'zm', 0, 21, 'c', -12, 0, -17, 18, -17, 54, 0, 35, 5, 53, 17, 53, 's', 18, -17, 18, -53, -6, -54, -18, -54, 'z'],
    ['v', 150, 'h', -24, 'v', -127, 'h', -13, 'l', 1, -23, 'z'],
    ['h', 55, 'v', 23, 'h', -84, 'v', -23, 'l', 52, -70, 'c', 13, -17, 3, -37, -9, -38, -12, 0, -18, 8, -25, 19, 'l', -16, -11, 'c', 8, -16, 23, -27, 40, -27, 16, 0, 23, 3, 31, 14, 9, 12, 12, 34, 1, 50, 'z'],
    ['c', 18, 7, 24, 19, 24, 36, -2, 29, -17, 43, -43, 43, -20, 0, -29, -8, -40, -25, 'l', 15, -13, 's', 13, 18, 25, 18, 'c', 14, -1, 19, -12, 19, -24, -2, -24, -17, -23, -38, -24, 'v', -19, 'c', 21, -1, 38, -3, 38, -25, 0, -10, -8, -19, -17, -19, -14, 1, -18, 7, -24, 17, 'l', -16, -12, 'c', 5, -15, 22, -25, 38, -25, 26, 1, 39, 16, 40, 39, -1, 18, -7, 26, -21, 33, 'z'],
    ['h', -50, 'v', -17, 'l', 32, -100, 19, 6, -28, 90, 'h', 27, 'v', -58, 'h', 21, 'v', 58, 'h', 21, 'v', 21, 'h', -21, 'l', 1, 30, 'h', -22, 'z'],
    ['h', 69, 'l', -1, 22, 'h', -46, 'v', 33, 'c', 4, -3, 12, -5, 20, -5, 'c', 27, 0, 37, 22, 37, 48, 'c', 0, 25, -15, 50, -44, 50, 'c', -14, 0, -31, -11, -37, -17, 'l', 12, -13, 's', 13, 10, 25, 10, 'c', 13, -1, 21, -18, 21, -31, 's', -4, -27, -17, -27, 'c', -12, -1, -19, 3, -25, 17, 'l', -14, -10, 'v', -77, 'z'],
    ['c', 28, 0, 35, 24, 35, 47, 0, 26, -13, 49, -39, 49, -34, 0, -43, -35, -43, -61, 2, -42, 24, -82, 61, -92, 'l', 6, 17, 'c', -38, 17, -53, 74, -40, 105, 15, 25, 33, 2, 34, -19, 0, -26, -20, -33, -31, -11, 'l', -12, -13, 'c', 7, -10, 16, -22, 29, -22, 'z'],
    ['h', 71, 'l', 11, 12, -30, 134, 'h', -23, 'l', 29, -124, 'h', -37, 'v', 28, 'h', -19, 'z'],
    ['c', -35, -22, -17, -70, 17, -71, 30, 0, 37, 18, 49, 37, 'l', -13, 13, -2, -2, -21, 21, 'c', 20, 12, 30, 27, 30, 44, -2, 27, -18, 40, -43, 41, -26, -2, -41, -16, -41, -40, 0, -15, 8, -30, 24, -43, 'zm', 37, -38, 'c', -4, -8, -11, -13, -19, -13, -10, 0, -17, 8, -17, 16, 0, 7, 4, 14, 13, 21, 8, -8, 16, -15, 23, -24, 'zm', -21, 51, 'c', -12, 10, -18, 20, -18, 29, 0, 13, 6, 20, 19, 20, 14, -1, 21, -9, 21, -21, -3, -15, -12, -22, -22, -28, 'z'],
    ['c', -4, 6, -11, 10, -19, 10, -25, -4, -32, -26, -32, -46, 1, -29, 17, -54, 45, -55, 10, 0, 17, 3, 23, 10, 'l', 1, -6, 20, 5, -28, 143, 'h', -21, 'zm', 12, -59, 'c', -3, -4, -6, -11, -19, -11, -12, 0, -23, 13, -23, 34, 0, 10, 4, 24, 14, 24, 8, 0, 17, -4, 21, -14, 'z'],
];
var NumberImage = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
var NumberImageMX = [50, 62, 37, 67, 54, 12, 56, 9, 32, 58];
var NumberImageMY = [25, 25, 152, 96, 145, 27, 79, 27, 94, 114];

var Color = [
    "#f14114",
    "#345abc",
    "#fedc0a",
    "#72be28",
    "#57aaee",
    "#fa9400",
];

var getAudioBuffer = function (url, fn) {
    var request = new XMLHttpRequest();
    request.responseType = 'arraybuffer';

    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 0 || request.status === 200) {
                audioConte.decodeAudioData(request.response, function (buffer) {
                    fn(buffer);
                });
            }
        }
    };

    request.open('GET', url, true);
    request.send('');
};
var lastTime = 0;
var playSound = function (buffer) {
    if (Setting.sound == '0') return;
    //if (lastTime.getTime() + 100 > nowTime.getTime()) return;
    var source = audioConte.createBufferSource();
    source.buffer = buffer;
    source.connect(audioConte.destination);
    lastTime = Math.max(lastTime + 0.03, audioConte.currentTime);
    source.start(lastTime);
};
var playSound2 = function (buffer) {
    if (Setting.sound == '0') return;
    var source = audioConte.createBufferSource();
    source.buffer = buffer;
    source.connect(audioConte.destination);
    source.start(0);
};

var Effect = new Array();
const CounterSize = 2.9;
function resetCount() {
    for (var key in facts) {
        facts[key] = 0;
    }
    SaveCookie();
}
function init() {
    document.getElementsByTagName('body')[0].setAttributeNS(null, 'style', "margin:0;padding:0;position:absolute;width:100%;height:100%;");
    document.getElementById('container').setAttributeNS(null, 'style', "margin:0;padding:0;position:absolute;width:100%;height:100%;");

    window.requestAnimationFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            setTimeout(callback, DEFAULT_FRAME_INTERVAL);
        };

    document.getElementById('container').addEventListener('touchstart', function (e) {
        e.preventDefault();
        MouseX = e.changedTouches[0].pageX - marginX;
        MouseY = e.changedTouches[0].pageY - marginY;
        TouchStartTime = new Date();
        TapStartPos = { x: MouseX, y: MouseY };
        return false;
    }, { passive: false });

    document.getElementById('container').addEventListener('mousedown', function (e) {
        e.preventDefault();
        MouseX = e.clientX - marginX;
        MouseY = e.clientY - marginY;
        TouchStartTime = new Date();
        TapStartPos = { x: MouseX, y: MouseY };
        return false;
    }, { passive: false });

    document.getElementById('container').addEventListener('touchmove', function (e) {
        e.preventDefault();
        //if (MouseX != -1) {
        MouseX = e.changedTouches[0].pageX - marginX;
        MouseY = e.changedTouches[0].pageY - marginY;
        //}
        return false;
    }, { passive: false });

    document.getElementById('container').addEventListener('mousemove', function (e) {
        e.preventDefault();
        if (MouseX != -1) {
            MouseX = e.clientX - marginX;
            MouseY = e.clientY - marginY;
        }
        return false;
    }, { passive: false });

    document.getElementById('container').addEventListener('touchend', function (e) {
        e.preventDefault();
        var now = new Date();
        if (now.getTime() - TouchStartTime.getTime() < 200 && -10 <= (TapStartPos.x - MouseX) && (TapStartPos.x - MouseX) <= 10 && -10 <= (TapStartPos.y - MouseY) && (TapStartPos.y - MouseY) <= 10) {
            PrevTapTime = TapTime;
            TapTime = now;
            TapPos = { x: MouseX, y: MouseY };
        }
        MouseX = -1;
        MouseY = -1;
    }, { passive: false });

    document.getElementById('container').addEventListener('mouseup', function (e) {
        e.preventDefault();
        var now = new Date();
        if (now.getTime() - TouchStartTime.getTime() < 200 && -10 <= (TapStartPos.x - MouseX) && (TapStartPos.x - MouseX) <= 10 && -10 <= (TapStartPos.y - MouseY) && (TapStartPos.y - MouseY) <= 10) {
            PrevTapTime = TapTime;
            TapTime = now;
            TapPos = { x: MouseX, y: MouseY };
        }
        MouseX = -1;
        MouseY = -1;
    }, { passive: false });

    ClientSizeX = document.getElementById('container').getBoundingClientRect().width;
    ClientSizeY = document.getElementById('container').getBoundingClientRect().height;

    var div = document.getElementById('container');

    svg = document.createElementNS(ns, 'svg');
    svg.setAttributeNS(null, 'width', '100%');
    svg.setAttributeNS(null, 'height', '100%');
    div.appendChild(svg)


    var countergHeight;
    var CounterType = 0;
    if (ClientSizeX >= ClientSizeY) {
        countergHeight = ClientSizeY * 1.0 / Object.keys(facts).length;
        marginX = 0;
        marginY = 0;
        ClientSizeX -= countergHeight * CounterSize;
        CounterType = 1;
        counterPos = { x: ClientSizeX, y: 0, width: countergHeight * CounterSize, height: ClientSizeY };
    }
    else {
        var Len = Object.keys(facts).length;
        countergHeight = (ClientSizeX / Math.floor((Len + 1) / 2)) / CounterSize;
        marginX = 0;
        marginY = 0;
        ClientSizeY -= countergHeight * 2.0;
        CounterType = 2;
        counterPos = { x: 0, y: ClientSizeY, width: ClientSizeX, height: countergHeight * 2 };
    }

    var WorldMul;
    if (screen.width > 1000 || screen.height > 1000) WorldMul = 100;
    else WorldMul = Math.floor(Math.pow(screen.width, 0.5) * 2);
    switch (Setting.number) {
        case '3': WorldMul *= 15; break;
        case '2': WorldMul *= 4; break;
        case '1': WorldMul *= 2; break;
        case '-1': WorldMul *= 0.6; break;
        case '-2': WorldMul *= 0.4; break;
        case '-3': WorldMul = 20; break;
    }
    WorldSizeX = Math.sqrt(WorldMul * ClientSizeX / ClientSizeY);
    WorldSizeY = WorldMul / WorldSizeX;
    scale = ClientSizeX / WorldSizeX;

    switch (Setting.number) {
        case '3': BodyNum = Math.floor(WorldMul * 1.1); break;
        case '2': BodyNum = Math.floor(WorldMul * 1.0); break;
        case '-2': BodyNum = Math.floor(WorldMul * 0.6); break;
        case '-3': BodyNum = 4; break;
        default: BodyNum = Math.floor(WorldMul * 0.85);
    }
    numbers[0][1]=Math.floor(200/Math.sqrt(BodyNum));
    mainCont = document.createElementNS(ns, 'g')
    svg.appendChild(mainCont);

    var defs = document.createElementNS(ns, 'defs');
    svg.appendChild(defs);
    var marker = document.createElementNS(ns, 'marker');
    marker.setAttributeNS(null, 'id', 'Marke');
    marker.setAttributeNS(null, 'refX', '1');
    marker.setAttributeNS(null, 'refY', '1');
    marker.setAttributeNS(null, 'markerWidth', '2');
    marker.setAttributeNS(null, 'markerHeight', '2');
    defs.appendChild(marker);

    var mark = document.createElementNS(ns, 'circle');
    mark.setAttributeNS(null, 'cx', '1');
    mark.setAttributeNS(null, 'cy', '1');
    mark.setAttributeNS(null, 'r', '1');
    mark.setAttributeNS(null, 'fill', '#b2ff2d');
    marker.appendChild(mark);

    if (CounterType == 1) {
        var NumberImage2 = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < NumberImageD[i].length; j++) {
                if ((typeof NumberImageD[i][j]) == 'number') NumberImage2[i] += ' ' + (NumberImageD[i][j] / 200.0 * countergHeight * 0.8);
                else NumberImage2[i] += NumberImageD[i][j];
            }
        }
        var posy = 0;
        for (var key in facts) {
            if (!facts.hasOwnProperty(key)) continue;
            counterg[key] = document.createElementNS(ns, 'g');
            counterg[key].setAttributeNS(null, 'width', '100%');
            counterg[key].setAttributeNS(null, 'height', '' + (100.0 / Object.keys(facts).length) + '%');
            counterg[key].setAttributeNS(null, 'transform', 'translate(' + ClientSizeX + ',' + posy + ')');
            svg.appendChild(counterg[key]);
            countergPos[key] = { x: ClientSizeX, y: posy, width: countergHeight * CounterSize, height: countergHeight };
            posy += countergHeight;
        }
    }
    else {
        var NumberImage2 = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < NumberImageD[i].length; j++) {
                if ((typeof NumberImageD[i][j]) == 'number') NumberImage2[i] += ' ' + (NumberImageD[i][j] / 200.0 * countergHeight * 0.8);
                else NumberImage2[i] += NumberImageD[i][j];
            }
        }
        var posx = 0;
        var posy = ClientSizeY;
        for (var key in facts) {
            if (!facts.hasOwnProperty(key)) continue;
            counterg[key] = document.createElementNS(ns, 'g');
            counterg[key].setAttributeNS(null, 'width', '' + countergHeight * CounterSize);
            counterg[key].setAttributeNS(null, 'height', '' + (100.0 / Object.keys(facts).length) + '%');
            counterg[key].setAttributeNS(null, 'transform', 'translate(' + posx + ',' + posy + ')');
            svg.appendChild(counterg[key]);
            countergPos[key] = { x: posx, y: posy, width: countergHeight * CounterSize, height: countergHeight };
            posx += countergHeight * CounterSize;
            if (posx + countergHeight * CounterSize - countergHeight * 2.1 > ClientSizeX) {
                posx = 0;
                posy += countergHeight;
            }
        }
    }

    for (var key in facts) {
        if (!facts.hasOwnProperty(key)) continue;

        countergColor[key] = Color[Math.floor(Math.random() * Color.length)]
        counterg[key].setAttributeNS(null, 'fill', countergColor[key]);

        var imgbox = document.createElementNS(ns, 'rect')
        imgbox.setAttributeNS(null, 'width', countergHeight * CounterSize * 0.9)
        imgbox.setAttributeNS(null, 'height', countergHeight * 0.1)
        imgbox.setAttributeNS(null, 'x', countergHeight * CounterSize * 0.05)
        imgbox.setAttributeNS(null, 'y', countergHeight * 0.8)
        counterg[key].appendChild(imgbox)

        for (var i = 0; i < String(key).length; i++) {
            var num = Math.floor(key / Math.pow(10, String(key).length - i - 1)) % 10;
            var img = document.createElementNS(ns, 'path');
            img.setAttributeNS(null, 'd', 'M' + (NumberImageMX[num] * countergHeight * 0.8 / 200.0 + countergHeight * 0.8 / 2 * i + countergHeight * 0.1) + ' ' + (NumberImageMY[num] * countergHeight * 0.8 / 200.0 + countergHeight * 0.1) + NumberImage2[num]);
            counterg[key].appendChild(img);
        }

        var text = document.createElementNS(ns, 'text')
        text.setAttributeNS(null, 'height', countergHeight)
        text.setAttributeNS(null, 'x', countergHeight)
        text.setAttributeNS(null, 'y', countergHeight * 0.63)
        text.setAttributeNS(null, 'font-size', '' + countergHeight * 0.7)
        text.setAttributeNS(null, 'font-family', "'Concert One',Helvetica Neue, Helvetica, ヒラギノ角ゴ Pro W3, Yu Gothic, sans-serif")
        text.setAttributeNS(null, 'dominant-baseline', 'middle')
        text.setAttributeNS(null, 'font-weight', '400')
        text.setAttributeNS(null, 'fill', '#000')
        counterg[key].appendChild(text);

        counterVal[key] = document.createTextNode('' + zeroPadding(0));
        text.appendChild(counterVal[key]);
        counterVal[key].nodeValue = '' + zeroPadding(facts[key], 3);
    }

    counterHint = document.createElementNS(ns, 'g')
    svg.appendChild(counterHint);
}
function main() {
    var Bomb = new Array();

    function gcd(m, n) { return (n == 0) ? Math.abs(m) : gcd(n, m % n); }

    var b2Vec2 = Box2D.Common.Math.b2Vec2
        , b2AABB = Box2D.Collision.b2AABB
        , b2BodyDef = Box2D.Dynamics.b2BodyDef
        , b2Body = Box2D.Dynamics.b2Body
        , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
        , b2Fixture = Box2D.Dynamics.b2Fixture
        , b2World = Box2D.Dynamics.b2World
        , b2MassData = Box2D.Collision.Shapes.b2MassData
        , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
        , b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
        , b2DebugDraw = Box2D.Dynamics.b2DebugDraw
        , b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef
        ;

    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < NumberImageD[i].length; j++) {
            if ((typeof NumberImageD[i][j]) == 'number') NumberImage[i] += ' ' + (NumberImageD[i][j] * scale / 200.0);
            else NumberImage[i] += NumberImageD[i][j];
        }
    }

    var world = new b2World(new b2Vec2(0, 10), false);

    var fixtureDef = new b2FixtureDef;
    fixtureDef.density = 1.0;
    fixtureDef.friction = 0.6;
    fixtureDef.restitution = 0.4;
    var bodyDef = new b2BodyDef;
    var Bodies = new Array();

    for (var i = 0; i < BodyNum; i++)
        Bodies.push({ b2body: 0, grap: 0, width: 0, height: 0, value: 0, color: 0, rect: 0 });

    var Touch = { v: [], gcd: 0 };

    bodyDef.type = b2Body.b2_staticBody;
    fixtureDef.shape = new b2PolygonShape;

    fixtureDef.shape.SetAsBox(WorldSizeX / 2, 0.5);
    bodyDef.position.Set(WorldSizeX / 2, WorldSizeY + 0.5);
    world.CreateBody(bodyDef).CreateFixture(fixtureDef);
    bodyDef.position.Set(WorldSizeX / 2, -100.0 - 0.5);
    world.CreateBody(bodyDef).CreateFixture(fixtureDef);

    fixtureDef.shape.SetAsBox(0.5, (100 + WorldSizeY + 10 * 2) / 2);
    bodyDef.position.Set(-0.5, -100.0 + (WorldSizeY + 100.0) / 2.0);
    world.CreateBody(bodyDef).CreateFixture(fixtureDef);
    bodyDef.position.Set(WorldSizeX + 0.5, -100.0 + (WorldSizeY + 100.0) / 2.0);
    world.CreateBody(bodyDef).CreateFixture(fixtureDef);

    bodyDef.type = b2Body.b2_dynamicBody;

    for (var i = 0; i < BodyNum; i++)
        MakeFirstBody(i);


    window.setInterval(update, 1000 / 60);


    function GetRandNumber() {
        var sum = 0;

        if (Math.random() * 50 < 1.0) {
            var m = 1;
            var n = Math.floor(Math.random() * 3) + 2;
            for (var i = 0; i < n; i++) {
                var l = Number(Object.keys(facts)[Math.floor(Math.random() * Object.keys(facts).length)]);
                if (l > 1) m *= l;
            }
            return m;
        }

        for (var i = 0; i < numbers.length; i++)
            sum += numbers[i][1];

        var r = Math.floor(Math.random() * sum);

        sum = 0;
        for (var i = 0; i < numbers.length; i++) {
            sum += numbers[i][1];
            if (sum > r)
                return numbers[i][0];
        }
        return 1;
    }

    function SetupBody(bodyindex, value, color) {
        Bodies[bodyindex].width = 0.5 * String(value).length;
        Bodies[bodyindex].height = 1;

        if (value == -1) {
            color = '#000000';
            Bodies[bodyindex].width = 1;
            Bodies[bodyindex].height = 1;
        }

        Bodies[bodyindex].color = color;
        Bodies[bodyindex].value = value;


        var shape = Bodies[bodyindex].b2body.GetFixtureList().GetShape();
        shape.m_vertices[0].Set(-Bodies[bodyindex].width / 2, -Bodies[bodyindex].height / 2);
        shape.m_vertices[1].Set(+Bodies[bodyindex].width / 2, -Bodies[bodyindex].height / 2);
        shape.m_vertices[2].Set(+Bodies[bodyindex].width / 2, +Bodies[bodyindex].height / 2);
        shape.m_vertices[3].Set(-Bodies[bodyindex].width / 2, +Bodies[bodyindex].height / 2);

        if (value == -1) {
            Bodies[bodyindex].rect = document.createElementNS(ns, 'rect')
            Bodies[bodyindex].rect.setAttributeNS(null, 'width', Bodies[bodyindex].width * scale)
            Bodies[bodyindex].rect.setAttributeNS(null, 'height', Bodies[bodyindex].height * scale)
            Bodies[bodyindex].rect.setAttributeNS(null, 'fill', color)
            Bodies[bodyindex].rect.setAttributeNS(null, 'x', -Bodies[bodyindex].width * scale / 2)
            Bodies[bodyindex].rect.setAttributeNS(null, 'y', -Bodies[bodyindex].height * scale / 2)
            Bodies[bodyindex].rect.setAttributeNS(null, 'rx', 0.2 * scale);
            Bodies[bodyindex].rect.setAttributeNS(null, 'ry', 0.2 * scale);

            Bodies[bodyindex].grap.appendChild(Bodies[bodyindex].rect)

            var gr = document.createElementNS(ns, 'g');
            gr.setAttributeNS(null, 'transform', 'scale(' + scale + ',' + scale + ')translate(-0.5,-0.5)');
            Bodies[bodyindex].grap.appendChild(gr);

            //gr.innerHTML = '<path d="M 0.45,0.33 C 0.5,0.27 0.56,0.2 0.63,0.17 L 0.66,0.2 C 0.6,0.25 0.55,0.28 0.52,0.33 z" fill="#c3845f"/><circle cx="0.5" cy="0.6" r="0.3" fill="#4b4b4b"/><path d="M0.62,0.27L0.63,0.19L0.55,0.18L0.62,0.14L0.58,0.08L0.65,0.10L0.68,0.03L0.71,0.10L0.78,0.08L0.74,0.14L0.80,0.19L0.73,0.20L0.73,0.27L0.68,0.22Z" fill="#ff0000" />';
            var element = document.createElementNS(ns, 'path');
            element.setAttributeNS(null, 'd', "M 0.45,0.33 C 0.5,0.27 0.56,0.2 0.63,0.17 L 0.66,0.2 C 0.6,0.25 0.55,0.28 0.52,0.33 z");
            element.setAttributeNS(null, 'fill', "#c3845f");
            gr.appendChild(element);

            element = document.createElementNS(ns, 'circle');
            element.setAttributeNS(null, 'cx', "0.5");
            element.setAttributeNS(null, 'cy', "0.6");
            element.setAttributeNS(null, 'r', "0.3");
            element.setAttributeNS(null, 'fill', "#4b4b4b");
            gr.appendChild(element);

            element = document.createElementNS(ns, 'path');
            element.setAttributeNS(null, 'd', "M0.62,0.27L0.63,0.19L0.55,0.18L0.62,0.14L0.58,0.08L0.65,0.10L0.68,0.03L0.71,0.10L0.78,0.08L0.74,0.14L0.80,0.19L0.73,0.20L0.73,0.27L0.68,0.22Z");
            element.setAttributeNS(null, 'fill', "#ff0000");
            gr.appendChild(element);
            return;
        }

        Bodies[bodyindex].rect = document.createElementNS(ns, 'rect')
        Bodies[bodyindex].rect.setAttributeNS(null, 'width', Bodies[bodyindex].width * scale)
        Bodies[bodyindex].rect.setAttributeNS(null, 'height', Bodies[bodyindex].height * scale)
        Bodies[bodyindex].rect.setAttributeNS(null, 'fill', color)
        Bodies[bodyindex].rect.setAttributeNS(null, 'x', -Bodies[bodyindex].width * scale / 2)
        Bodies[bodyindex].rect.setAttributeNS(null, 'y', -Bodies[bodyindex].height * scale / 2)
        Bodies[bodyindex].grap.appendChild(Bodies[bodyindex].rect)

        for (var i = 0; i < String(value).length; i++) {
            var num = Math.floor(value / Math.pow(10, String(value).length - i - 1)) % 10;
            var img = document.createElementNS(ns, 'path');
            img.setAttributeNS(null, 'd', 'M' + (NumberImageMX[num] * scale / 200.0 + scale / 2 * i - Bodies[bodyindex].width * scale / 2) + ' ' + (NumberImageMY[num] * scale / 200.0 - 0.5 * scale) + NumberImage[num]);
            img.setAttributeNS(null, 'height', 1.0 * scale);
            img.setAttributeNS(null, 'width', 0.5 * scale);
            Bodies[bodyindex].grap.appendChild(img);
        }
    }

    function MakeFirstBody(bodyindex) {
        bodyDef.position.Set(Math.random() * WorldSizeX, -Math.random() * 50);
        bodyDef.angle = Math.random() * Math.PI * 2;
        Bodies[bodyindex].b2body = world.CreateBody(bodyDef);
        Bodies[bodyindex].grap = document.createElementNS(ns, 'g');
        mainCont.appendChild(Bodies[bodyindex].grap);

        var value = GetRandNumber();

        var boxShape = new b2PolygonShape;
        Bodies[bodyindex].width = 0.5 * String(value).length;
        Bodies[bodyindex].height = 1;
        fixtureDef.shape.SetAsBox(Bodies[bodyindex].width / 2, Bodies[bodyindex].height / 2);
        Bodies[bodyindex].b2body.CreateFixture(fixtureDef);
        SetupBody(bodyindex, value, Color[Math.floor(Math.random() * Color.length)]);
    }

    function MakeBody(bodyindex) {
        Bodies[bodyindex].b2body.SetPosition(new b2Vec2(Math.random() * WorldSizeX, -(Math.random() + 1) * WorldSizeY * 0.5));
        SetupBody(bodyindex, GetRandNumber(), Color[Math.floor(Math.random() * Color.length)]);
    }

    function GetTopPos(i, topS) {
        var pos = Bodies[i].b2body.GetPosition();
        var rot = Bodies[i].b2body.GetAngle();

        var top = [
            [-Bodies[i].width / 2, -Bodies[i].height / 2],
            [+Bodies[i].width / 2, -Bodies[i].height / 2],
            [+Bodies[i].width / 2, +Bodies[i].height / 2],
            [-Bodies[i].width / 2, +Bodies[i].height / 2]];

        top[0] = [top[0][0] * Math.cos(rot) - top[0][1] * Math.sin(rot), top[0][1] * Math.cos(rot) + top[0][0] * Math.sin(rot)];
        top[1] = [top[1][0] * Math.cos(rot) - top[1][1] * Math.sin(rot), top[1][1] * Math.cos(rot) + top[1][0] * Math.sin(rot)];
        top[2] = [top[2][0] * Math.cos(rot) - top[2][1] * Math.sin(rot), top[2][1] * Math.cos(rot) + top[2][0] * Math.sin(rot)];
        top[3] = [top[3][0] * Math.cos(rot) - top[3][1] * Math.sin(rot), top[3][1] * Math.cos(rot) + top[3][0] * Math.sin(rot)];

        topS[0] = [(top[0][0] + pos.x) * scale, (top[0][1] + pos.y) * scale];
        topS[1] = [(top[1][0] + pos.x) * scale, (top[1][1] + pos.y) * scale];
        topS[2] = [(top[2][0] + pos.x) * scale, (top[2][1] + pos.y) * scale];
        topS[3] = [(top[3][0] + pos.x) * scale, (top[3][1] + pos.y) * scale];
    }

    function TriangleAndPoint_(a, b, P) {
        return (a[1] - b[1]) * P[0] - (a[0] - b[0]) * P[1] + a[0] * b[1] - b[0] * a[1];
    }

    function TriangleAndPoint(a, b, c, p) {
        var k1, k2, k3;
        k1 = TriangleAndPoint_(a, b, p);
        k2 = TriangleAndPoint_(b, c, p);
        k3 = TriangleAndPoint_(c, a, p);

        return (k1 == 0 && k2 == 0 && k3 == 0) || (k1 > 0 && k2 > 0 && k3 > 0) || (k1 < 0 && k2 < 0 && k3 < 0);
    }

    function BoxAndPoint(a, b, c, d, p) {
        return TriangleAndPoint(a, b, c, p) || TriangleAndPoint(a, c, d, p);
    }

    function GetBodyNum(TouchPos) {
        for (var i = 0; i < Bodies.length; i++) {
            var topS = [];
            GetTopPos(i, topS);

            if (BoxAndPoint(topS[0], topS[1], topS[2], topS[3], TouchPos))
                return i;
        }
        return -1;
    }

    function min_d2(x0, y0, x1, y1, x2, y2) {
        var a = x2 - x1;
        var b = y2 - y1;
        var a2 = a * a;
        var b2 = b * b;
        var r2 = a2 + b2;
        var tt = -(a * (x1 - x0) + b * (y1 - y0));
        if (tt < 0)
            return (x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0);

        if (tt > r2)
            return (x2 - x0) * (x2 - x0) + (y2 - y0) * (y2 - y0);

        var f1 = a * (y1 - y0) - b * (x1 - x0);
        return (f1 * f1) / r2;
    }

    function distance(a, b, p) {
        return Math.sqrt(min_d2(p[0], p[1], a[0], a[1], b[0], b[1]));
    }

    function Distance2(x1, y1, x2, y2) {
        return (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
    }

    function CheckNerar(a, b) {
        var ta = [], tb = [];
        GetTopPos(a, ta);
        GetTopPos(b, tb);

        for (var i = 0; i < 4; i++) for (var j = 0; j < 4; j++) {
            if (distance(ta[i], ta[(i + 1) % 4], tb[j]) <= DMax * scale) return true;
            if (distance(tb[i], tb[(i + 1) % 4], ta[j]) <= DMax * scale) return true;
        }
        return false;
    }

    function NewBody(b) {
        while (Bodies[b].grap.firstChild)
            Bodies[b].grap.removeChild(Bodies[b].grap.firstChild);

        MakeBody(b);
    }

    function UpdateBodyValue(b, v) {
        var shapes = new Array(BodyNum);
        for (var i = 0; i < BodyNum; i++)shapes[i] = Bodies[i].b2body.GetFixtureList().GetShape();

        while (Bodies[b].grap.firstChild)
            Bodies[b].grap.removeChild(Bodies[b].grap.firstChild);

        SetupBody(b, v, Bodies[b].color);
    }

    function SetEffect(x, y, gcd) {
        var eff = document.createElementNS(ns, 'text');
        eff.setAttributeNS(null, 'x', x)
        eff.setAttributeNS(null, 'y', y)
        eff.setAttributeNS(null, 'font-size', '' + 0.8 * scale)
        eff.setAttributeNS(null, 'font-family', "'Concert One',Helvetica Neue, Helvetica, ヒラギノ角ゴ Pro W3, Yu Gothic, sans-serif")
        eff.setAttributeNS(null, 'dominant-baseline', 'middle')
        eff.setAttributeNS(null, 'opacity', 1)
        eff.setAttributeNS(null, 'font-weight', '400')
        eff.setAttributeNS(null, 'stroke', '#fff')
        eff.setAttributeNS(null, 'stroke-width', 0.04 * scale)
        svg.appendChild(eff);

        var str = '';
        for (var s = gcd, p = 2; s > 1;) {
            if (s % p == 0) {
                s /= p;
                str += " ÷" + p;
            }
            else
                p++;
        }

        var txt = document.createTextNode(str);
        eff.appendChild(txt);

        Effect.push(eff);
    }
    function MoveEffect() {
        for (var i = 0; i < Effect.length; i++) {
            var eff = Effect[i];
            var opa = Number(eff.getAttribute('opacity')) - 0.02;
            eff.setAttributeNS(null, 'opacity', opa);
            eff.setAttributeNS(null, 'y', Number(eff.getAttribute('y')) - 0.02 * scale);
        }
        while (Effect.length > 0 && Number(Effect[0].getAttribute('opacity')) < 0) {
            Effect[0].parentNode.removeChild(Effect[0]);
            Effect.shift();
        }
    }

    function SetBomb(bodyindex) {
        for (var i = 0; i < Bomb.length; i++)
            if (Bomb[i].bodyIndex == bodyindex)
                return;

        Bomb.push({ bodyIndex: bodyindex, time: 0 });
    }
    function EraseBody(bodyindex, div, showEffect, sound) {
        if (Bodies[bodyindex].value == -1) {
            SetBomb(bodyindex);
            return;
        }

        if (Bodies[bodyindex].value % div != 0)
            return;

        var newVal = Bodies[bodyindex].value / div;

        if (showEffect) SetEffect(Bodies[bodyindex].b2body.GetPosition().x * scale, Bodies[bodyindex].b2body.GetPosition().y * scale, div);
        for (var s = div, p = 2; s > 1;) {
            if (s % p == 0) {
                s /= p;
                facts[p]++;
                counterVal[p].nodeValue = '' + zeroPadding(facts[p]);
                SaveCookie();
            }
            else
                p++;
        }

        if (newVal == 1)
            NewBody(bodyindex);
        else
            UpdateBodyValue(bodyindex, newVal);

        if (sound == 1)
            playSound(seBuffer);
    }

    function BombProg() {
        for (var i = 0; i < Bomb.length; i++) {
            Bomb[i].time++;
            var mag = Math.pow(1.005, Bomb[i].time);
            Bodies[Bomb[i].bodyIndex].rect.setAttributeNS(null, 'width', Bodies[Bomb[i].bodyIndex].width * scale * mag)
            Bodies[Bomb[i].bodyIndex].rect.setAttributeNS(null, 'height', Bodies[Bomb[i].bodyIndex].height * scale * mag)
            Bodies[Bomb[i].bodyIndex].rect.setAttributeNS(null, 'x', -Bodies[Bomb[i].bodyIndex].width * scale / 2 * mag)
            Bodies[Bomb[i].bodyIndex].rect.setAttributeNS(null, 'y', -Bodies[Bomb[i].bodyIndex].height * scale / 2 * mag)
            Bodies[Bomb[i].bodyIndex].rect.setAttributeNS(null, 'fill', Math.floor(Bomb[i].time / 25) % 2 == 0 ? '#ddd' : '#000');
            Bodies[Bomb[i].bodyIndex].grap.getElementsByTagName("g")[0].setAttributeNS(null, 'transform', 'scale(' + scale * mag + ',' + scale * mag + ')translate(-0.5,-0.5)');
            if (Bomb[i].time == 80) {
                var Bpos = Bodies[Bomb[i].bodyIndex].b2body.GetPosition();
                for (var j = 0; j < BodyNum; j++) {
                    if (j == Bomb[i].bodyIndex) continue;
                    var pos = Bodies[j].b2body.GetPosition();
                    var dis = Math.sqrt(Distance2(Bpos.x, Bpos.y, pos.x, pos.y));
                    if (dis < 4.2) {
                        EraseBody(j, Bodies[j].value, Setting.effect == '0', 2);
                        continue;
                    }
                    if (dis < 10.0 && Bodies[j].value == -1)
                        SetBomb(j, false);

                    var impulse = new b2Vec2;
                    impulse.x = pos.x - Bpos.x;
                    impulse.y = pos.y - Bpos.y;
                    impulse.x = impulse.x / Math.pow(dis, 3) * 300.0;
                    impulse.y = impulse.y / Math.pow(dis, 3) * 300.0;
                    Bodies[j].b2body.ApplyImpulse(impulse, pos);
                }
                NewBody(Bomb[i].bodyIndex);
                playSound2(seBombBuffer);
            }
        }
        while (Bomb.length > 0 && Bomb[0].time >= 80)
            Bomb.shift();
    }

    function EraseTouch() {
        if (Touch.v.length >= 2)
            for (var i = 0; i < Touch.v.length; i++)
                EraseBody(Touch.v[i], Touch.gcd, Setting.effect != '-2', 1);

        Touch.v = [];
        Touch.gcd = 0;
    }

    function TapProg() {
        if (TapTime != 0 && PrevTapTime != 0) {
            if (TapTime.getTime() - PrevTapTime.getTime() < 400) {
                var Bpos = { x: TapPos.x / scale, y: TapPos.y / scale };
                for (var j = 0; j < BodyNum; j++) {
                    var pos = Bodies[j].b2body.GetPosition();
                    var dis = Math.sqrt(Distance2(Bpos.x, Bpos.y, pos.x, pos.y));

                    var impulse = new b2Vec2;
                    impulse.x = pos.x - Bpos.x;
                    impulse.y = pos.y - Bpos.y;
                    impulse.x = impulse.x / Math.pow(dis + 1, 4.5) * 300.0;
                    impulse.y = impulse.y / Math.pow(dis + 1, 4.5) * 300.0;
                    Bodies[j].b2body.ApplyImpulse(impulse, pos);
                }
            }
            PrevTapTime = 0;
        }
    }

    function InputOpe() {
        if (MouseX != -1) {
            isTouch = true;

            var b = GetBodyNum([MouseX, MouseY]);

            if (b == -1) return;

            if (Touch.v.length == 0) {
                Touch.v.push(b);
                Touch.gcd = Bodies[b].value;
            }
            else if (Touch.v[Touch.v.length - 1] != b) {
                if (!CheckNerar(Touch.v[Touch.v.length - 1], b))
                    return;

                if (Touch.v.length >= 2 && Touch.v[Touch.v.length - 2] == b) {
                    Touch.v.pop();
                    Touch.gcd = Bodies[Touch.v[0]].value;
                    for (var i = 1; i < Touch.v.length; i++)
                        if (Bodies[Touch.v[i]].value != -1)
                            Touch.gcd = gcd(Touch.gcd, Bodies[Touch.v[i]].value);
                    return;
                }

                if (Touch.v.indexOf(b) >= 0)
                    return;

                if (Bodies[b].value == -1) {
                    Touch.v.push(b);
                    return;
                }

                if (Touch.gcd != -1 && gcd(Touch.gcd, Bodies[b].value) == 1)
                    return;

                Touch.gcd = (Touch.gcd == -1) ? Bodies[b].value : gcd(Touch.gcd, Bodies[b].value);

                Touch.v.push(b);
            }
        }
        else {
            if (isTouch)
                EraseTouch();
            isTouch = false;
        }
    }

    var pathGraph1 = document.createElementNS(ns, 'path');
    var pathGraph2 = document.createElementNS(ns, 'path');
    svg.appendChild(pathGraph1);
    svg.appendChild(pathGraph2);

    var TouchTime = -1;
    function darken(hexstr, scalefactor) {
        if (scalefactor < 0) scalefactor = 0;
        if (scalefactor > 1) scalefactor = 1;
        var r = scalefactor;
        var a, i;
        if (typeof (hexstr) != 'string') {
            return hexstr;
        }
        hexstr = hexstr.replace(/[^0-9a-f]+/ig, '');
        if (hexstr.length == 3) {
            a = hexstr.split('');
        } else if (hexstr.length == 6) {
            a = hexstr.match(/(\w{2})/g);
        } else {
            return hexstr;
        }
        for (i = 0; i < a.length; i++) {
            if (a[i].length == 2)
                a[i] = parseInt(a[i], 16);
            else {
                a[i] = parseInt(a[i], 16);
                a[i] = a[i] * 16 + a[i];
            }
        }

        var maxColor = parseInt('ff', 16);

        function _darken(a) {
            return a * r;
        }

        for (i = 0; i < a.length; i++) {
            a[i] = _darken(a[i]);
            a[i] = Math.floor(a[i]).toString(16);
            if (a[i].length == 1) {
                a[i] = '0' + a[i];
            }
        }
        return a.join('');
    }

    var HintSetTime = -1;
    var HintSetKey = -1;
    function SetHint() {
        HintSetKey = -1;
        if (MouseX != -1 &&
            counterPos.x <= MouseX && MouseX <= counterPos.x + counterPos.width &&
            counterPos.y <= MouseY && MouseY <= counterPos.y + counterPos.height) {
            if (HintSetTime == -1)
                HintSetTime = new Date();
        }
        else
            HintSetTime = -1;

        if (HintSetTime == -1) {
            while (counterHint.firstChild)
                counterHint.removeChild(counterHint.firstChild);

            return;
        }

        for (var key in facts) {
            if (MouseX < countergPos[key].x || countergPos[key].x + countergPos[key].width < MouseX ||
                MouseY < countergPos[key].y || countergPos[key].y + countergPos[key].height < MouseY)
                continue;

            HintSetKey = key;
            for (var i = 0; i < BodyNum; i++) {
                if (Bodies[i].value % key != 0) {
                    var hintBox = document.getElementById('hint' + i);
                    if (hintBox != null)
                        hintBox.parentElement.removeChild(hintBox);

                    continue;
                }

                var rot = Bodies[i].b2body.GetAngle();
                var hintBox = document.getElementById('hint' + i)
                if (hintBox == null) {
                    hintBox = document.createElementNS(ns, 'rect');
                    hintBox.setAttributeNS(null, 'id', 'hint' + i);
                    hintBox.setAttributeNS(null, 'width', Bodies[i].width * scale);
                    hintBox.setAttributeNS(null, 'height', Bodies[i].height * scale);
                    hintBox.setAttributeNS(null, 'x', -Bodies[i].width * scale / 2);
                    hintBox.setAttributeNS(null, 'y', -Bodies[i].height * scale / 2);
                    hintBox.setAttributeNS(null, 'fill', '#fff');
                    hintBox.setAttributeNS(null, 'stroke', '#000');
                    hintBox.setAttributeNS(null, 'stroke-width', 0.1 * scale);
                    counterHint.appendChild(hintBox);
                }
                var nowtime = new Date();
                var PassTime = nowtime.getTime() - HintSetTime.getTime() - 300;
                hintBox.setAttributeNS(null, 'fill-opacity', Math.min(PassTime / 500 * 0.4, 0.4));
                hintBox.setAttributeNS(null, 'stroke-opacity', Math.min(PassTime / 500, 1.0));
                hintBox.setAttributeNS(null, 'transform', "matrix(" + Math.cos(rot) + " " + Math.sin(rot) + " " + -Math.sin(rot) + " " + Math.cos(rot) + " " + (Bodies[i].b2body.GetPosition().x * scale + marginX) + " " + (Bodies[i].b2body.GetPosition().y * scale + marginY) + ")");
            }
        }
    }

    function update() {
        InputOpe();
        TapProg();
        BombProg();
        world.Step(1 / 60, 5, 5);
        //world.ClearForces();
        for (var i = 0; i < BodyNum; i++) {
            if (Bodies[i].b2body.GetPosition().y > WorldSizeY * 2)
                NewBody(i);

            var rot = Bodies[i].b2body.GetAngle();
            Bodies[i].grap.setAttributeNS(null, 'transform', "matrix(" + Math.cos(rot) + " " + Math.sin(rot) + " " + -Math.sin(rot) + " " + Math.cos(rot) + " " + (Bodies[i].b2body.GetPosition().x * scale + marginX) + " " + (Bodies[i].b2body.GetPosition().y * scale + marginY) + ")");
        }
        SetHint();

        if (MouseX != -1) {
            if (TouchTime == -1)
                TouchTime = new Date();
        }
        else TouchTime = -1;

        var nowTime = new Date();
        var PassTime = TouchTime == -1 ? 0 : nowTime.getTime() - TouchTime.getTime();
        if (PassTime > 300) {
            for (var key in facts) {
                if ((Touch.gcd != 0 && Touch.gcd % key == 0) || HintSetKey == key) {
                    counterg[key].setAttributeNS(null, 'fill', countergColor[key]);
                    counterVal[key].parentNode.setAttributeNS(null, 'fill', '#' + darken(countergColor[key].slice(1), (PassTime - 300) * 0.004));
                }
                else {
                    counterg[key].setAttributeNS(null, 'fill', '#' + darken(countergColor[key].slice(1), 1 - (PassTime - 300) * 0.004));
                    counterVal[key].parentNode.setAttributeNS(null, 'fill', '#000');
                }
            }
        }
        else {
            for (var key in facts) {
                counterg[key].setAttributeNS(null, 'fill', countergColor[key]);
                counterVal[key].parentNode.setAttributeNS(null, 'fill', '#000');
            }
        }

        var path = '';
        for (var i = 0; i < Touch.v.length; i++) {
            if (i == 0)
                path = 'M' + (Bodies[Touch.v[i]].b2body.GetPosition().x * scale + marginX) + ' ' + (Bodies[Touch.v[i]].b2body.GetPosition().y * scale + marginY);
            else
                path += 'L' + (Bodies[Touch.v[i]].b2body.GetPosition().x * scale + marginX) + ' ' + (Bodies[Touch.v[i]].b2body.GetPosition().y * scale + marginY);
        }
        svg.removeChild(pathGraph1);
        pathGraph1 = document.createElementNS(ns, 'path');
        pathGraph1.setAttributeNS(null, 'd', path);
        pathGraph1.setAttributeNS(null, 'fill', 'none');
        pathGraph1.setAttributeNS(null, 'stroke', '#fff');
        pathGraph1.setAttributeNS(null, 'stroke-width', 0.1 * scale);
        pathGraph1.setAttributeNS(null, 'stroke-linecap', 'round');
        pathGraph1.setAttributeNS(null, 'stroke-linejoin', 'round');
        svg.appendChild(pathGraph1);

        svg.removeChild(pathGraph2);
        pathGraph2 = document.createElementNS(ns, 'path');
        pathGraph2.setAttributeNS(null, 'd', path);
        pathGraph2.setAttributeNS(null, 'fill', 'none');
        pathGraph2.setAttributeNS(null, 'stroke', '#ff5a78');
        pathGraph2.setAttributeNS(null, 'stroke-width', 0.1 * scale);
        pathGraph2.setAttributeNS(null, 'stroke-linecap', 'round');
        pathGraph2.setAttributeNS(null, 'stroke-linejoin', 'round');
        pathGraph2.setAttributeNS(null, 'stroke-dasharray', '0 ' + 0.15 * scale);
        pathGraph2.setAttributeNS(null, 'stroke-dashoffset', 0.05 * scale);
        pathGraph1.setAttributeNS(null, 'marker-start', 'url(#Marke)');
        pathGraph1.setAttributeNS(null, 'marker-mid', 'url(#Marke)');
        pathGraph1.setAttributeNS(null, 'marker-end', 'url(#Marke)');
        svg.appendChild(pathGraph2);
        MoveEffect();
        //stats.update();
    };
};

function SaveCookie() {
    var expire = new Date();
    expire.setTime(expire.getTime() + 1000 * 3600 * 24 * 365 * 5);
    for (var key in facts)
        document.cookie = key + '=' + facts[key] + '; expires=' + expire.toUTCString();

    document.cookie = 'effect' + '=' + Setting.effect + '; expires=' + expire.toUTCString();
    document.cookie = 'number' + '=' + Setting.number + '; expires=' + expire.toUTCString();
    document.cookie = 'sound' + '=' + Setting.sound + '; expires=' + expire.toUTCString();
}

var SeNumber = { '-3': '少なすぎ', '-2': 'すごく少ない', '-1': '少ない', '0': 'ふつう', '1': '多い', '2': 'すごく多い', '3': '多すぎ' };
var SeEffect = { '-2': 'なし', '-1': '少ない', '0': '全て' };
function ClickSettings() {
    var div = document.getElementById('container');
    while (div.firstChild)
        div.removeChild(div.firstChild);

    div.innerHTML = "\
<style>\
#container{\
width:100%;\
}\
div div {\
text-align: center;\
max-width: 600px;\
width: 94%;\
margin: 3em auto;\
padding: 0.5em;\
background-color: #ddd;\
}\
input[type=button] {\
border-radius: 0;\
-webkit-box-sizing: content-box;\
-webkit-appearance: button;\
appearance: button;\
border: none;\
box-sizing: border-box;\
cursor: pointer;\
margin: 0 auto;\
padding: 0.6em;\
display: inline-block;\
text-align: center;\
text-decoration: none;\
position: relative;\
background-color: #4d95d1;\
border-radius: 4px;\
color: #fff;\
box-shadow: 0 3px 0 #3070a5;\
text-shadow: 0 1px 1px rgba(0, 0, 0, .3);\
vertical-align: middle;\
border-style: none;\
font-size: 1.6em;\
font-weight: 600;\
width: 6em;\
line-height: 1.4em;\
}\
input[type=\"button\"]::-webkit-search-decoration {\
display: none;\
}\
input[type=button]:hover {\
background-color: #57aaee;\
box-shadow: 0 3px 0 #3070a5;\
}\
input[type=button]:active {\
top: 3px;\
box-shadow: none;\
}\
h2 {\
font-size: 2em;\
}\
p {\
margin: 1em;\
font-size: 20px;\
}\
input[type=range] {\
margin: 0 auto;\
-webkit-appearance: none;\
width: 100%;\
height: 5em;\
background: #ddd;\
}\
input[type=range]:focus {\
outline: none;\
}\
input[type=range]::-webkit-slider-runnable-track {\
width: 100%;\
height: 0.1em;\
cursor: pointer;\
background: #25619e;\
}\
input[type=range]::-webkit-slider-thumb {\
border: 2.4px solid #e43a29;\
height: 3em;\
width: 6em;\
border-radius: 1em;\
background: #ffffff;\
cursor: pointer;\
-webkit-appearance: none;\
margin-top: -1.5em;\
}\
input[type=range]:focus::-webkit-slider-runnable-track {\
background: #2664a2;\
}\
input[type=range]::-moz-range-track {\
width: 100%;\
height: 0.1em;\
cursor: pointer;\
background: #25619e;\
}\
input[type=range]::-moz-range-thumb {\
box-shadow: 1px 1px 1px #630000, 0px 0px 1px #7d0000;\
border: 2.4px solid #e43a29;\
height: 3em;\
width: 6em;\
border-radius: 1em;\
background: #ffffff;\
cursor: pointer;\
}\
input[type=range]::-ms-track {\
width: 100%;\
height: 2px;\
cursor: pointer;\
background: transparent;\
border-color: transparent;\
color: transparent;\
}\
input[type=range]::-ms-fill-lower {\
background: #245e9a;\
}\
input[type=range]::-ms-fill-upper {\
background: #25619e;\
}\
input[type=range]::-ms-thumb {\
box-shadow: 1px 1px 1px #630000, 0px 0px 1px #7d0000;\
border: 2.4px solid #e43a29;\
border-radius: 1em;\
background: #ffffff;\
cursor: pointer;\
width: 6em;\
height: 3em;\
}\
input[type=range]:focus::-ms-fill-lower {\
background: #25619e;\
}\
input[type=range]:focus::-ms-fill-upper {\
background: #2664a2;\
}\
input[type=checkbox] {\
width: 2em;\
height: 2em;\
}\
output {\
margin: 0;\
font-size: 1.4em;\
font-weight: 600;\
}\
@media (max-device-height: 500px){\
div div {\
margin: 1em auto;\
padding: 0.5em;\
width: 90%;\
max-width: initial;\
}\
input[type=button] {\
padding: 0.3em;\
font-size: 3em;\
}\
input[type=button]:active {\
top: 3px;\
box-shadow: none;\
}\
h2 {\
font-size: 3em;\
}\
p {\
margin: 0.5em;\
font-size: 1.6em;\
}\
input[type=range]::-webkit-slider-thumb {\
height: 5em;\
width: 8em;\
margin-top: -2.5em;\
}\
input[type=range]::-moz-range-thumb {\
height: 5em;\
width: 8em;\
}\
input[type=range]::-ms-thumb {\
width: 8em;\
height: 5em;\
}\
input[type=checkbox] {\
width: 4em;\
height: 4em;\
}\
output {\
margin: 0;\
font-size: 3em;\
}\
}\
@media (max-device-width: 600px){\
div div {\
margin: 1em auto;\
padding: 0.5em;\
width: 96%;\
max-width: initial;\
}\
input[type=button] {\
padding: 0.3em;\
font-size: 4em;\
}\
input[type=button]:active {\
top: 3px;\
box-shadow: none;\
}\
h2 {\
font-size: 4em;\
}\
p {\
margin: 0.5em;\
font-size: 2em;\
}\
input[type=range]::-webkit-slider-thumb {\
height: 6em;\
width: 10em;\
margin-top: -3em;\
}\
input[type=range]::-moz-range-thumb {\
height: 6em;\
width: 10em;\
}\
input[type=range]::-ms-thumb {\
width: 10em;\
height: 4em;\
}\
input[type=checkbox] {\
width: 6em;\
height: 6em;\
}\
output {\
margin: 0;\
font-size: 4em;\
}\
}\
</style>\
<div>\
<input type='button' value='リセット' class='button' onclick='if (window.confirm(\"カウントをリセットします\")) { resetCount();window.alert(\"リセットしました\"); }'/>\
<p>このボタンを押すと、素因数カウントが０にリセットされます。</p>\
</div>\
<div>\
<h2>一度に落ちてくる数の多さ</h2>\
<input type='range' value='"+ Setting.number + "' min='-3' max='3' step='1' class='range'\
   oninput='Setting.number=this.value;var str = \"ふつう\"; document.getElementById(\"output1\").value = SeNumber[this.value];'>\
<output id='output1'>"+ SeNumber[Setting.number] + "</output>\
<p>動作が重い場合は、これで調節してください。</p>\
</div>\
<div>\
<h2>エフェクト</h2>\
<input type='range' value='"+ Setting.effect + "' min='-2' max='0' step='1' class='range'\
   oninput='Setting.effect=this.value;var str = \"\"; document.getElementById(\"output2\").value = SeEffect[this.value]'>\
<output id='output2'>"+ SeEffect[Setting.effect] + "</output>\
<p>分解したときに表示されるエフェクトの表示を設定します。<br />動作が重い場合は、これで調節してください。</p>\
</div>\
<div>\
<h2>効果音</h2>\
<input type='checkbox' id='check3'"+ (Setting.sound == '1' ? ' checked' : '') + ">\
<output id='output3'>" + (Setting.sound == '1' ? '有効' : '無効') + "</output>\
<p>チェックを入れると音が鳴ります。<br />この設定は保存されません。</p>\
</div>\
<div style='background-color: #fff;'><input type='button' value='戻る' class='button' onclick='BackSettings()' /></div>\
</div>\
";

    document.getElementById('check3').addEventListener('click', function () {
        if (this.checked) {
            document.getElementById('output3').innerHTML = '有効';
            Setting.sound = '1';
            playSound(seBuffer);
        } else {
            document.getElementById('output3').innerHTML = '無効';
            Setting.sound = '0';
        }
    }, false);
}
function BackSettings() {
    var div = document.getElementById('container');
    while (div.firstChild)
        div.removeChild(div.firstChild);

    div.innerHTML = '\
    <style>\
#container{\
width:100%;\
}\
div div {\
text-align: center;\
max-width: 600;\
width: 94%;\
margin: 3em auto;\
padding: 0.5em;\
background-color: #fff;\
}\
input[type=button] {\
border-radius: 0;\
-webkit-box-sizing: content-box;\
-webkit-appearance: button;\
appearance: button;\
border: none;\
box-sizing: border-box;\
cursor: pointer;\
margin: 0 auto;\
padding: 0.6em;\
display: inline-block;\
text-align: center;\
text-decoration: none;\
position: relative;\
background-color: #4d95d1;\
border-radius: 4px;\
color: #fff;\
box-shadow: 0 3px 0 #3070a5;\
text-shadow: 0 1px 1px rgba(0, 0, 0, .3);\
vertical-align: middle;\
border-style: none;\
font-size: 4em;\
font-weight: 600;\
width: 6em;\
line-height: 1.4em;\
}\
input[type="button"]::-webkit-search-decoration {\
display: none;\
}\
input[type=button]:hover {\
background-color: #57aaee;\
box-shadow: 0 3px 0 #3070a5;\
}\
input[type=button]:active {\
top: 3px;\
box-shadow: none;\
}\
@media (max-device-width: 600px){\
input[type=button] {\
font-size: 100px;\
}\
input[type=button]:active {\
top: 2px;\
box-shadow: none;\
}\
div div {margin: 40px auto;}\
}\
@media (max-device-height: 400px){\
input[type=button] {\
font-size: 50px;\
}\
input[type=button]:active {\
top: 2px;\
box-shadow: none;\
}\
div div {margin: 5px auto;}\
}\
</style>\
<div style="text-align:center;"><input id="startButton" type="button" value="すたーと" style="" onclick="var div = document.getElementById(\'container\');while(div.firstChild)div.removeChild(div.firstChild);init();main();" /></div>\
<div style="text-align:center;"><input type="button" value="設定" style=""onclick="ClickSettings()" /></div>\
<div style="text-align:center;"><input type="button" value="遊び方" style=""onclick="location.href=\'./help/\'" /></div>\
';
}
BackSettings();

window.onload = function () {
    getAudioBuffer('jump12.wav', function (buffer1) {
        seBuffer = buffer1;
    });
    getAudioBuffer('bomb.wav', function (buffer2) {
        seBombBuffer = buffer2;
    });
};