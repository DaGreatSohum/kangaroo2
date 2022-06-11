class Player {
    constructor() {
        this.index = null;
        this.distance = 0;
        this.name = null;
        this.score =0;
        
        this.rank = null ;
    }

    getCount() {
        var playerCountRef = database.ref('playerCount');
        playerCountRef.on("value", (data) => {
            playerCount = data.val();
        })
    }

    updateCount(count) {
        database.ref('/').update({
            playerCount: count
        });
    }

    update() {
        var playerIndex = "players/player" + this.index;
        database.ref(playerIndex).set({
            name: this.name,
            distance: this.distance,
            score:this.score
        });
    }

    static getPlayerInfo() {
        var playerInfoRef = database.ref('players');
        playerInfoRef.on("value", (data) => {
            allPlayers = data.val();
        })
    }

    getPlayerAtEnd(){
        database.ref('playerAtEnd').on("value",(data)=>{
            this.rank = data.val();
        })
    }

    static updatePlayerAtEnd(rank){
        database.ref("/").update({
            playerAtEnd : rank
        })
    }

    play(){
        
        form.hide();

        Player.getPlayerInfo();
        player.getPlayerAtEnd();
         image(back_img, 0, 0, 1000, 800);
         var x =100;
         var y=200;
         var index =0;
         drawSprites();
         for(var plr in allPlayers){
            
            textSize(40)
            text("display name",100,100)


             index = index+1;
             x = 500-allPlayers[plr].distance;
             y=500;
             
             players[index -1].x = x;
             players[index - 1].y = y;
               
             if(index === player.index){
                 
                 fill("red");
                 textSize(20);
                 text(playerInfo+"Has Won!!")
                 
             }
            
                 textSize(25);
                 fill("white");
                 text("Player 1 :" +allPlayers.player1.score,50,50);
                text("Player 2 :" + allPlayers.player2.score, 50, 100);
         
         }
        
        if(player.score>=5){
            gameState = 2; 
            player.rank += 1;
            Player.updatePlayerAtEnd(player.rank);
            player.update();
            this.showRank();
            
        }
         

        if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
            player.distance -= 10
            player.update();
        }
        if (keyIsDown(LEFT_ARROW) && player.index !== null) {
            player.distance += 10
            player.update();
        }

        if (frameCount % 20 === 0) {
            fruits = createSprite(random(100, 1000), 0, 100, 100);
            fruits.velocityY = 6;
            var rand = Math.round(random(1,5));
            switch(rand){
                case 1: fruits.addImage("fruit1",fruit1_img);
                break;
                case 2: fruits.addImage("fruit1", fruit2_img);
                break;
                case 3: fruits.addImage("fruit1", fruit3_img);
                break;
                case 4: fruits.addImage("fruit1", fruit4_img);
                break;
                case 5: fruits.addImage("fruit1", fruit5_img);
                break;
            }
            fruitGroup.add(fruits);
        }
  }
}