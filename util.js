class Obj{
    frame=1;
    timer=0;
    //construtor da classe obj
    constructor( x , y , width , height , color ){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    //desenha o objeto
    draw(){
        var img = new Image();
        img.src = this.color;
        canvas.drawImage(img, this.x, this.y, this.width, this.height);
    }
    //animacao do objeto
    animation(vel,limit,nome){
        this.timer++;
        if(this.timer >=vel){
            this.timer = 0;
            this.frame++;
        }
        if(this.frame > limit){
            this.frame = 1;
        }
        this.color = "images/"+nome+this.frame+".png";
    }
    collide(obj){
        if(this.x < obj.x + obj.width &&
           this.x + this.width > obj.x &&
           this.y < obj.y + obj.height &&
           this.y + this.height > obj.y){
            return true;
        }else{
            return false;
        }
    }
};

class Text{
    draw(text,x,y,color,tam){
        canvas.font = tam ;
        canvas.fillStyle = color;
        canvas.fillText(text, x, y);
    }
}
class Shoot extends Obj{
    move(){
        this.y -= 10;
    }
}
class Meteors extends Obj{
    speed=Math.random() * (10-2)+2;
    move(){
        this.y+= this.speed;
    }
}
