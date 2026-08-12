// =======================================
// 元气固本决 TrainingEngine 稳定版
// 节奏控制版
// =======================================


class TrainingEngine {


constructor(){

    this.stage=null;

    this.actions=[];

    this.actionIndex=0;

    this.currentAction=null;

    this.currentCount=0;

    this.phase="";

    this.seconds=0;

    this.timer=null;

}





load(stage){

    this.stage=stage;

    this.actions=stage.actions || [];

}





start(){


    this.actionIndex=0;

    this.currentCount=0;


    this.currentAction=this.actions[0];


    if(!this.currentAction){

        console.error("没有动作");

        return;

    }


    this.phase="准备开始";

    this.seconds=3;

    this.render();



    setTimeout(()=>{


        voiceManager.playStart();


        voiceManager.playStart(()=>{


    this.startAction();


});



    },500);



}









startAction(){



    if(this.actionIndex>=this.actions.length){

        this.finish();

        return;

    }



    this.currentAction =
        this.actions[this.actionIndex];



    this.currentCount=0;



    this.phase="准备";

    this.render();



voiceManager.playAction(

    this.currentAction.name,

    ()=>{

        setTimeout(()=>{

            this.startCount();

        },300);

    }

);



}









startCount(){


    if(
        this.currentCount >=
        this.currentAction.count
    ){


        this.afterAction();

        return;

    }



    this.currentCount++;


    this.runCycle();


}

runThreeStep(){

console.log("进入三步收紧流程");

    // 第一阶段：收紧

    this.phase="收紧";

this.render();

voiceManager.playThreeTight();


this.countDown(

        3,

        ()=>{


            // 第二阶段：继续


            this.phase="继续";

            this.render();

            voiceManager.playContinue();



            this.countDown(

                3,

                ()=>{


                    // 第三阶段：坚持一下


                    this.phase="坚持一下";

                    this.render();

                    voiceManager.playHold();



                    this.countDown(

                        3,

                        ()=>{


                            // 第四阶段：再坚持一下


                            this.phase="再坚持一下";

                            this.render();

                            voiceManager.playKeep();



                            this.countDown(

                                3,

                                ()=>{


                                    // 第一阶段放松


                                    this.phase="放松";

                                    this.render();

                                    voiceManager.playThreeRelax();



                                    this.countDown(

                                        3,

                                        ()=>{


                                            // 第二阶段放松


                                            this.phase="继续放松";

                                            this.render();



                                            this.countDown(

                                                3,

                                                ()=>{


                                                    // 第三阶段完全放松


                                                    this.phase="完全放松";

                                                    this.render();



                                                    this.countDown(

                                                        3,

                                                        ()=>{


                                                            this.nextCount();


                                                        }

                                                    );


                                                }

                                            );


                                        }

                                    );


                                }

                            );


                        }

                    );


                }

            );


        }

    );


}







runCycle(){


if(
    this.currentAction.type==="threeStep"
){


    this.runThreeStep();

    return;

}



let timing =
    this.currentAction.timing;



if(!timing){

    this.nextCount();

    return;

}



    // ===== 紧 =====


    this.phase="紧";

    this.seconds=timing.tight;

    this.render();



    voiceManager.playTight();



    this.countDown(

        timing.tight,

        ()=>{


            // ===== 松 =====


            this.phase="松";

            this.seconds=timing.relax;

            this.render();



            voiceManager.playRelax();



            this.countDown(

                timing.relax,

                ()=>{


                    this.nextCount();


                }

            );



        }

    );



}

runThreeStep(){

console.log("进入三步收紧流程");

    // 第一步：收紧

    this.phase="收紧";

    this.render();

    voiceManager.playThreeTight();

    this.countDown(

        3,

        ()=>{


            // 第二步：继续

            this.phase="继续";

            this.render();

            voiceManager.playContinue();

            this.countDown(

                3,

                ()=>{


                    // 第三步：坚持一下

                    this.phase="坚持一下";

                    this.render();

                    voiceManager.playHold();

                    this.countDown(

                        3,

                        ()=>{


                            // 第四步：再坚持一下

                            this.phase="再坚持一下";

                            this.render();

                            voiceManager.playKeep();

                            this.countDown(

                                3,

                                ()=>{


                                    // 放松

                                    this.phase="放松";

                                    this.render();

                                    voiceManager.playThreeRelax();

                                    this.countDown(

                                        3,

                                        ()=>{


                                            // 继续放松

                                            this.phase="继续放松";

                                            this.render();


                                            this.countDown(

                                                3,

                                                ()=>{


                                                    // 准备继续

                                                    this.phase="准备继续";

                                                    this.render();


                                                    this.countDown(

                                                        3,

                                                        ()=>{


                                                            this.nextCount();


                                                        }

                                                    );


                                                }

                                            );


                                        }

                                    );


                                }

                            );


                        }

                    );


                }

            );


        }

    );


}







countDown(time,callback){



    this.seconds=time;

    this.render();



    clearInterval(this.timer);



    this.timer=setInterval(()=>{


        this.seconds--;


        this.render();



        if(this.seconds<=0){


            clearInterval(this.timer);


            callback();


        }



    },1000);



}









nextCount(){

    this.startCount();

}









afterAction(){



    let rest =
        this.currentAction.restAfter;



    if(rest){


        this.phase="休息";

        this.seconds=rest;

        this.render();


      voiceManager.playRest();



        this.countDown(

            rest,

            ()=>{


                this.nextAction();


            }

        );



    }

    else{


        this.nextAction();


    }



}









nextAction(){


    this.actionIndex++;


    this.startAction();


}









render(){


    let box =
        document.getElementById(
            "content"
        );


    if(!box)return;



    let name =
    this.currentAction ?
    this.currentAction.name :
    "";



    box.innerHTML=`

    <h1>${name}</h1>

    <h2>${this.phase}</h2>

    <h1>${this.seconds}</h1>

    <p>
    第 ${this.currentCount}/${this.currentAction ? this.currentAction.count : 0} 次
    </p>

    `;


}









finish(){


    clearInterval(this.timer);



voiceManager.playFinish();


    document.getElementById(
        "content"
    ).innerHTML=`

    <h1>
    修炼完成
    </h1>

    `;



    if(typeof completeTraining==="function"){

        completeTraining();

    }



}



}



const trainingEngine =
new TrainingEngine();