import './index.less'
import App from'./App'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';
import Stats from 'three/examples/jsm/libs/stats.module';

let app = new App();
app.setup();

let gui;
let API = {
    color: 0xffffff,
    x: 0,
    y: 0,
    z: 0
};

initGui();
initStats();
window.addEventListener("info", e => {
    let pot = e.detail.position;
    let x = fixNumber(pot.x);
    let y = fixNumber(pot.y);
    let z = fixNumber(pot.z);
    $pot.val([x, y, z].join(","));
    API.x = x;
    API.y = y;
    API.z = z;
})

function fixNumber(n){
    var num = n.toFixed(4);
    return Number(num);
}

function updateGUIParam(){
    app.updateGUIParam(API);
}

function initGui() {
    gui = new GUI();
    gui.addColor( API, 'color' ).name( 'color' ).onChange( updateGUIParam );
    gui.add( API, 'x', -80, 80 ).name( 'x' ).onChange( updateGUIParam );
    gui.add( API, 'y', -80, 80 ).name( 'y' ).onChange( updateGUIParam );
    gui.add( API, 'z', -80, 80 ).name( 'z' ).onChange( updateGUIParam );
}

function initStats(){
    var stats = new Stats();
    stats.setMode(0); 
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
    
    app.setStats(stats);
}

let $camera = $(".camera");
$camera.click(function(e){
    $camera.toggleClass("open");
    app.toggerControl($camera.hasClass("open"));
});

let $pot = $(".pot");

$(".add").click(function(e){
    app.add(getPot());
});

$(".set").click(function(e){
    app.set(getPot());
});

$(".del").click(function(e){
    app.del(getPot());
});

$(".draw").click(function(e){
    app.draw();
});

$(window).keydown(function(event){
    if(event.keyCode == 32){
        $camera.click();
    }
})

function getPot(){
    var pot = $pot.val();
    var list = pot.split(",");
    return {
        x: list[0],
        y: list[1],
        z: list[2],
    }
}