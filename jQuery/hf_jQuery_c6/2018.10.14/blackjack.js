!function (){
    var view = {
        cardArea: $("#cardArea"),
        info:  $("#info"),
        start: $("#start"),
        rematch: $("#rematch"),
        result: $("#result"),
    };

    var model = {
        initialSetting: {
            deckfault: {
                Clubs:["Ace","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Jack","Queen","King"],
                Diamonds:["Ace","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Jack","Queen","King"],
                Hearts:["Ace","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Jack","Queen","King"],
                Spades:["Ace","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Jack","Queen","King"],
            },
            deck: function (){return JSON.parse(JSON.stringify(this.deckfault))},
            kindArray: ["Clubs","Diamonds","Hearts","Spades"],
            totalscore: 0,
            totalTime: 0,
            firstTime: true,
        },
    };

    var controller = {
        view: null,
        practical: null,
        gamestart: function(){
            this.view = view;
            this.practical = JSON.parse(JSON.stringify(model.initialSetting));
            this.practical.deck = model.initialSetting.deck();
            this.bindEvent();
            // console.log(this.practical)
        },
        bindEvent: function(){
            // console.log($(this.view.start))
            $(this.view.start).on("click",this.startClick);
            $(this.view.rematch).on("click",this.initial);
        },
        startClick: function(){
            // console.log(deck.Clubs.length);
            // console.log(controller)
            if(controller.practical.firstTime){
                controller.showCard();
                controller.showCard();
                controller.practical.totalTime = 2;
                controller.winorlose();
                controller.practical.firstTime = false;
            }else if(controller.practical.totalTime < 5){
                controller.showCard();
                controller.practical.totalTime += 1;
                controller.winorlose();
            }
        },
        showCard: function(){
            var kind=this.practical.kindArray[Math.floor(Math.random()*4)];
            // console.log(kind);
            var selected=Math.floor(Math.random()*(this.practical.deck[kind].length));
            var card=this.practical.deck[kind][selected];
            // console.log(card)
            var number = $.inArray(card,this.practical.deckfault[kind]) + 1;
            if(number > 10){number = 10;}
            // console.log(number);
            // console.log(deckfault)
            // console.log(deck)
            this.practical.totalscore += number;
            // alert(card)
            $("<img>").appendTo(this.view.cardArea)
                      .attr("src","./imgs/cards/"+kind+"/"+card+".jpg");
            $("#info").html("Total Scores: "+this.practical.totalscore);
            delete this.practical.deck[kind].splice(number,1);
        },
        initial: function(){
            controller.practical = JSON.parse(JSON.stringify(model.initialSetting));
            controller.practical.deck = model.initialSetting.deck();
            controller.view.start.bind("click",controller.startClick);
            controller.view.result.css("display","none");
            controller.view.info.html("New Game is On!Good Luck!");
            controller.view.cardArea.children().not("#result").remove();
            // console.log($("#cardArea").children().not("#result"))
        },
        winorlose: function(){
            // console.log(totalscore)
            // console.log(this)
            // console.log(this.practical.totalTime)
            if(this.practical.totalscore > 21){
                this.view.start.unbind("click");
                this.view.result.css("display","block");
                this.view.result.attr("src","./imgs/x2.png")
                this.view.info.html("Oops!"+this.practical.totalscore+"!Bust!You lost!");
            }else if(this.practical.totalscore === 21){
                this.view.start.unbind("click");
                this.view.result.css("display","block");
                this.view.result.attr("src","./imgs/check.png")
                // console.log(this.practical.result").attr("src"));
                this.view.info.html(this.practical.totalscore+"!You win!");
            }else if((this.practical.totalscore < 21) && (this.practical.totalTime === 5)){
                this.view.result.css("display","block");
                this.view.result.attr("src","./imgs/check.png")
                this.view.info.html(this.practical.totalscore+"!You win!");
                // console.log(this.practical.result").attr("src"));
            }
        }
    };

    controller.gamestart();
}.call();