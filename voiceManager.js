// =================================
// 元气固本决 语音系统 3.1
// 固定音频 + 旧接口兼容
// =================================


const voiceManager = {


    sounds:{},

    actions:{},

    ready:false,


    speaking:false,





    // =========================
    // 初始化
    // =========================

    init(){
// =========================
// 用户手势解锁固定音频
// =========================


        
        this.sounds.tight =
        new Audio("audio/tight.mp3");


        this.sounds.relax =
        new Audio("audio/relax.mp3");


        this.sounds.start =
        new Audio("audio/start.mp3");

        this.sounds.rest =
        new Audio("audio/rest.mp3");

        this.sounds.threeTight =
        new Audio("audio/three_tight.mp3");


        this.sounds.continue =
        new Audio("audio/continue.mp3");


        this.sounds.hold =
        new Audio("audio/hold.mp3");


        this.sounds.keep =
        new Audio("audio/keep.mp3");


        this.sounds.threeRelax =
        new Audio("audio/three_relax.mp3");

        this.sounds.finish =
        new Audio("audio/finish.mp3");

this.actions={


    "爆发训练":
    new Audio("audio/burst.mp3"),


    "初级耐力":
    new Audio("audio/basic_endurance.mp3"),


    "三步收紧":
    new Audio("audio/three_step.mp3"),


    "超强耐力":
    new Audio("audio/super_endurance.mp3"),


    "中级耐力":
    new Audio("audio/medium_endurance.mp3")


};

        this.sounds.tight.load();

        this.sounds.relax.load();

        this.sounds.start.load();

        this.sounds.rest.load();

        this.sounds.threeTight.load();

        this.sounds.continue.load();

        this.sounds.hold.load();

        this.sounds.keep.load();

        this.sounds.threeRelax.load();

        this.sounds.finish.load();

        this.ready=true;


    },

unlock(){

    if(!this.ready){
        return;
    }

    Object.values(this.sounds).forEach(audio=>{

        audio.muted=true;

        let promise=audio.play();

        if(promise){

            promise.then(()=>{

                audio.pause();

                audio.currentTime=0;

                audio.muted=false;

            }).catch(error=>{

                console.log(
                    "音频解锁失败：",
                    error
                );

                audio.muted=false;

            });

        }

    });

},




    // =========================
    // 固定音频：紧
    // =========================

   playTight(){


    console.log("执行 playTight");


    let audio=this.sounds.tight;


    console.log("tight音频:", audio);


    audio.currentTime=0;


    audio.play()
    .then(()=>{

        console.log("紧音频播放成功");

    })
    .catch(error=>{

        console.error(
            "紧音频播放失败:",
            error
        );

    });


},




    // =========================
    // 固定音频：松
    // =========================

    playRelax(){


    console.log("执行 playRelax");


    let audio=this.sounds.relax;


    console.log("relax音频:", audio);


    audio.currentTime=0;


    audio.play()
    .then(()=>{

        console.log("松音频播放成功");

    })
    .catch(error=>{

        console.error(
            "松音频播放失败:",
            error
        );

    });


},

// =========================
// 休息
// =========================

playRest(){

    console.log("执行 playRest");


    let audio=this.sounds.rest;


    console.log("rest音频:", audio);


    audio.currentTime=0;


    audio.play()
    .then(()=>{

        console.log("休息音频播放成功");

    })
    .catch(error=>{

        console.error(
            "休息音频播放失败:",
            error
        );

    });

},

// =========================
// 三步收紧：收紧
// =========================

playThreeTight(){

    console.log("执行三步收紧语音");

    let audio=this.sounds.threeTight;

    console.log("threeTight音频:",audio);

    audio.currentTime=0;

    audio.play()
    .then(()=>{

        console.log("三步收紧播放成功");

    })
    .catch(error=>{

        console.error(
            "三步收紧播放失败:",
            error
        );

    });

},


// =========================
// 三步收紧：继续
// =========================

playContinue(){

    let audio=this.sounds.continue;

    audio.currentTime=0;

    audio.play();

},


// =========================
// 三步收紧：坚持一下
// =========================

playHold(){

    let audio=this.sounds.hold;

    audio.currentTime=0;

    audio.play();

},


// =========================
// 三步收紧：再坚持一下
// =========================

playKeep(){

    let audio=this.sounds.keep;

    audio.currentTime=0;

    audio.play();

},


// =========================
// 三步收紧：放松
// =========================

playThreeRelax(){

    let audio=this.sounds.threeRelax;

    audio.currentTime=0;

    audio.play();

},

playFinish(){

    let audio=this.sounds.finish;

    audio.currentTime=0;

    audio.play();

},

    // =========================
    // 固定音频：开始
    // =========================

playStart(callback){

    if(!this.ready){

        if(callback){
            callback();
        }

        return;
    }

    let audio=this.sounds.start;

    audio.currentTime=0;

    this.speaking=true;

    let finished=false;

    const done=()=>{

        if(finished){
            return;
        }

        finished=true;

        this.speaking=false;

        if(callback){
            callback();
        }

    };

    audio.onended=done;

    const promise=audio.play();

    if(promise){

        promise.catch(error=>{

            console.log(
                "开始语音播放失败，继续训练:",
                error
            );

            done();

        });

    }

},

// =========================
// 动作名称语音
// =========================

pplayAction(name,callback){

    let audio=this.actions[name];

    if(!audio){

        this.say(name,callback);

        return;
    }

    audio.currentTime=0;

    let finished=false;

    const done=()=>{

        if(finished){
            return;
        }

        finished=true;

        if(callback){
            callback();
        }

    };

    audio.onended=done;

    const promise=audio.play();

    if(promise){

        promise.catch(error=>{

            console.log(
                "动作语音播放失败，继续训练:",
                error
            );

            done();

        });

    }

},




    // =========================
    // 兼容旧 say()
    // =========================

    say(text, callback){


        this.speaking=true;


        let msg =
        new SpeechSynthesisUtterance(text);


        msg.lang="zh-CN";



        msg.onend=()=>{


            this.speaking=false;


            if(callback){

                callback();

            }


        };



        msg.onerror=()=>{


            this.speaking=false;


            if(callback){

                callback();

            }


        };



        speechSynthesis.speak(msg);



    },







    // =========================
    // 等待语音结束
    // =========================

    wait(callback){


        let timer=setInterval(()=>{


            if(!this.speaking){


                clearInterval(timer);


                callback();


            }


        },100);


    },






    // =========================
    // 停止
    // =========================

    stop(){


        speechSynthesis.cancel();


        Object.values(this.sounds)
        .forEach(audio=>{


            audio.pause();

            audio.currentTime=0;


        });



        this.speaking=false;


    }



};




// 自动初始化

voiceManager.init();