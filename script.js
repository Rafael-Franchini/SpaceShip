var canvas = document.getElementById('canvas').getContext("2d");
canvas.imageSmoothingEnabled = false;
//classe obj que vai ser usada para criar os objetos do jogo

//checa click
document.addEventListener('click', function(event) {
    currentScene.click();
});
//mover nave com o mouse
document.addEventListener('mousemove', function(event) {
    if(currentScene.moveShip){
        currentScene.moveShip(event);
    }
});

//variaveis globais
var vidas=3;
var score = 0;
var bestScore = 0;


//tela atual
var currentScene={};

//grupo de meteoros
var groupMeteors = [];

//meteoros
var meteors={
    time:0,
    timer:3,
    spawMeteor(){
      times=60;
      if(score >= 100){
        times=20;
      }  
      this.time++;
      if(this.time >= times){  
        this.time = 0;
        groupMeteors.push(new Meteors(Math.floor(Math.random() * 500),-100,50,50,"assets/meteoro.png"));
      }
    },
    draw(){
        groupMeteors.forEach(function(meteor){
            meteor.draw();
        });
    },
    update(){
        groupMeteors.forEach(function(meteor){
            meteor.move();
            if(meteor.y >= 950){
                groupMeteors.splice(meteor[groupMeteors.indexOf(meteor)],1);
            }
            if(meteor.collide(game.ship)){
                groupMeteors.splice(meteor[groupMeteors.indexOf(meteor)],1);
                vidas--;
                if(vidas <= 0){
                    changeScene(gameover);
                }
            }
            groupShoots.forEach(function(shoot){
                if(meteor.collide(shoot)){
                    groupMeteors.splice(meteor[groupMeteors.indexOf(meteor)],1);
                    groupShoots.splice(shoot[groupShoots.indexOf(shoot)],1);
                    score+=5;
                }
            });
        });

    },
}

//grupo de tiros
var groupShoots = [];

//tiros
var shots={
    draw(){
        groupShoots.forEach(function(shoot){
            shoot.draw();
        });
    },
    update(){
        groupShoots.forEach(function(shoot){
            shoot.move();
            if(shoot.y <= -100){
                groupShoots.splice(shoot[0],1);
            }
        });
    },
};

//background
var infintyBG={
    bg: new Obj(0,0,500,900,"assets/fundo.png"),
    bg2: new Obj(0,-900,500,900,"assets/fundo.png"),
    moveBrackground(){
        this.bg.y++;
        this.bg2.y++;
        if(this.bg.y >= 900){
            this.bg.y = 0;
            this.bg2.y = -900;
        }
    },
    draw(){
        this.bg.draw();
        this.bg2.draw();
    }
};

//tela de menu
var menu={
    title:new Text(),
    label:new Text(),
    ship: new Obj(230,800,60,50,"assets/nave.png"),
    textoS:new Text(),
    click(){
        changeScene(game);
    },
    draw(){
        infintyBG.draw();
        this.title.draw("SpaceShip", 130, 450, "white", "50px Arial");
        this.label.draw("Click to start", 180, 550, "white", "25px Arial");
        this.label.draw("Best Score: "+bestScore, 185, 50, "white", "25px Arial");
        this.ship.draw();
    },
    update(){
        infintyBG.moveBrackground();
    },
};

//tela game over
var gameover={
    score:new Text(),
    nosei:new Text(),
    troca:new Text(),
    click(){
        changeScene(menu);
        if(score > bestScore){
            bestScore = score;
        }
        score=0;
    },
    draw(){
        infintyBG.draw();
        this.score.draw("Score:"+score, 10, 50, "white", "30px Arial");
        this.nosei.draw("Game Over", 120, 450, "white", "50px Arial");
        this.troca.draw("Clique para ir menu", 120, 700, "white", "30px Arial");
    },
    update(){
        infintyBG.moveBrackground();
    },
}

//tela game
var game={
    score:new Text(),
    lifes:new Text(),
    ship: new Obj(230,800,60,50,"assets/nave.png"),
    click(){
        groupShoots.push(new Shoot(this.ship.x+this.ship.width/2-5,this.ship.y,2,10,"assets/tiro.png"));
    },
    moveShip(event){
        this.ship.x = event.offsetX-this.ship.width/2 ;
        this.ship.y = event.offsetY - this.ship.height/2;
    },
    draw(){
        infintyBG.draw();
        this.score.draw("Score:"+score, 10, 50, "white", "30px Arial");
        this.lifes.draw("Vidas:"+vidas, 10, 90, "white", "30px Arial");
        this.ship.draw();
        shots.draw();
        meteors.draw();
    },
    update(){
        infintyBG.moveBrackground();
        shots.update();
        meteors.update();
        meteors.spawMeteor();
    },
};

//funcao para trocar de tela
function changeScene(scene){
    currentScene = scene;
}

//tela inicial
currentScene=menu;

//principal
function main(){
    canvas.clearRect(0, 0, 500, 900);
    currentScene.draw();
    currentScene.update();
    requestAnimationFrame(main);
}
//inicia game
main();