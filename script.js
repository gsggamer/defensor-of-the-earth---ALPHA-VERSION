window.alert('Jogo de nave: Defensor of the Earth');
window.alert('Como jogar: TECLAS DIRECIONAIS para mover; SPACE para atirar.');



var nave = document.querySelector('#naveContainer');
var srcMissil = new Image();
srcMissil.src = 'img/missil.gif';

var globe = document.querySelector('#globe');

var intervalo;
var tmpIntervalo;

var tiroCont;

var frame;
var workframe;

var velNave = 8.65;
var velTiro = 6;

var indiceMissil = 0;
var numMiss = 100;

var telaHeight = window.innerHeight;
var telaWidth = window.innerWidth;

var misseisTot;/*
var missilPosX = Math.random()*telaWidth;
var missilPosY = 50;
var missilDirX = 0;
var missilDirY = 0;*/
var velMissil;

var tiros;

var navePosX = telaWidth/2;
var navePosY = telaHeight/2;
var naveDirX = 0;
var naveDirY = 0;

var audioTiro = new Audio();
audioTiro.src = 'snd/raio.mp3'

var planetLife;
var planetLifeContainer = document.querySelector('#life');

// Funções

//Inicio de variáveis importantes

function inicio() {
    workframe = true;

    planetLife = 250;
    planetLifeContainer.style.width = '250px';

    tmpIntervalo = 2300;

    clearInterval(intervalo);
    velMissil = 4;
    intervalo = setInterval(criaMisseis, tmpIntervalo);

    setInterval(function(){
        tmpIntervalo-=200;
        console.log(tmpIntervalo);
    }, 1200)

    
    
}


//Controle do Player 1


function controleJogador() {
    navePosY+=naveDirY*velNave;
    navePosX+=naveDirX*velNave;
    nave.style.top = navePosY + 90 + "px";
    nave.style.left = navePosX - 40 + "px";
}

function keydownNaveHandler(e) {
    var tecla = e.code;

    switch (tecla) {
        case 'ArrowUp':
            naveDirY=-1;
            break;
        case 'ArrowDown':
            naveDirY=1;
            break;
        case 'ArrowLeft':
            naveDirX=-1;
            break;
        case 'ArrowRight':
            naveDirX=1;
            break;
        case 'Space':
            //Chamada da função de TIRO
            criarTiros(navePosX+8,navePosY+55);
            
            break;

        case 'F5':
            location.reload();
            break;
    
        default:
            console.log('ERRO: O QUE OCORREU? TECLA NÃO DEFINIDA!');
            break;
    }
}

function keyupNaveHandler(e) {
    var tecla = e.code;

    switch (tecla) {
        case 'ArrowUp':
            naveDirY=0;
            break;
        case 'ArrowDown':
            naveDirY=0;
            break;
        case 'ArrowLeft':
            naveDirX=0;
            break;
        case 'ArrowRight':
            naveDirX=0;
            break;

        default:
            
            break;
    }
}


//Controle e criação de tiros


function criarTiros(x,y) {
    var elementoTiro = document.createElement('div');
    var atbClass = document.createAttribute('class');
    var atbStyle = document.createAttribute('style');
    atbClass.value = "tiro";
    atbStyle.value = "top: "+y+"px; left: "+x+"px;"; 

    document.body.appendChild(elementoTiro);
    elementoTiro.setAttributeNode(atbClass);
    elementoTiro.setAttributeNode(atbStyle);

    setTimeout(tocarTiroEmAudio(), 1);
}

function controleTiros() {
    tiros = document.getElementsByClassName('tiro');
    var tamanho = tiros.length;

    for(var i=0;i<tamanho;i++) {
        if(tiros[i]) {
            var posTiro = tiros[i].offsetTop;
            posTiro-=velTiro;
            tiros[i].style.top = posTiro+"px";
            if(posTiro<=-40){
                tiros[i].remove();
            }
        }
    }
}

function tocarTiroEmAudio() {
    audioTiro.play();
}


//Controle e criação de mísseis inimigos


function criaMisseis() {
    var x = Math.random() * telaWidth - 90;
    var y = 0;
    var elementoMissil = document.createElement('div');
    var atbClass = document.createAttribute('class');
    var atbStyle = document.createAttribute('style');

    atbClass.value = 'misseis';
    atbStyle.value = 'top:' + y + 'px;left:' + x + 'px;';

    elementoMissil.setAttributeNode(atbClass);
    elementoMissil.setAttributeNode(atbStyle);

    document.body.appendChild(elementoMissil);

    numMiss--;
    //planetLife-=10;
}

function controleMisseis() {
    misseisTot = document.getElementsByClassName('misseis');
    var tamanho = misseisTot.length;
    
    for (var i=0; i<tamanho; i++) {
        if (misseisTot[i]) {
            var posMiss = misseisTot[i].offsetTop;
            posMiss+=velMissil;
            misseisTot[i].style.top = posMiss+"px";
            if(posMiss>=telaHeight-120){
                misseisTot[i].remove();
               planetLife-=10;
            }
        }
    }
}


//Controle de colisão entre o tiro e o míssil inimigo

function colisaoTiroMissil() {
    
}


//Controle do Jogo


function gerenciarLife() {
    planetLifeContainer.style.width = planetLife + "px";

    if (planetLife <= 250 && planetLife >= 175) {
        globe.style.color = 'lightgreen';
        planetLifeContainer.style.background = 'green';
    } else if (planetLife < 175 && planetLife >= 100) {
        globe.style.color = 'yellow';
        planetLifeContainer.style.background = 'yellow';
    } else if (planetLife < 100 && planetLife >= 0) {
        globe.style.color = 'red';
        planetLifeContainer.style.backgroundColor = 'rgb(151, 5, 5)';
    }

    if (planetLife <= 0) {
        workframe = false;
        document.write("<body style='margin:0;padding:0;background: #353535;display:flex;align-items:center;justify-content:center;min-height:100vh;'><img src='img/RESULT/derrota.jpg' style='width:50%;height:100%;'/></body>");
        alert('Você perdeu... o planeta foi destruído!');

    if(planetLife > 0 && numMiss <= 0) {
        document.write("<body style='margin:0;padding:0;background: #353535;display:flex;align-items:center;justify-content:center;min-height:100vh;'><img src='img/RESULT/vitoria.jpg' style='width:50%;height:100%;'/></body>");
        alert('Você venceu... o planeta foi salvo!');
    } 
    }
}

function gameLoop() {
    if(workframe == true) {
    controleJogador();
    gerenciarLife();
    controleTiros();
    controleMisseis();

    //colisaoTiroMissil();
    } else {
        controleJogador();
        controleTiros();
    }
    /*controleMisseis();*/

    //
    frame=requestAnimationFrame(gameLoop);
}

    document.addEventListener('keydown', keydownNaveHandler);
    document.addEventListener('keyup', keyupNaveHandler);

gameLoop();

window.addEventListener('load', inicio);
