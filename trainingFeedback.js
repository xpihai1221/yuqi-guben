// =================================
// 元气固本决 训练反馈系统 2.0
// =================================


const trainingFeedback = {



actionStart(name){


    this.speak(name);


    this.vibrate(
        [200]
    );


},






tighten(){


    this.speak("紧");


    this.vibrate(
        [200,50,100]
    );


},






relax(){


    this.speak("松");


    this.vibrate(
        [80]
    );


},






rest(seconds){


    this.speak(
        "休息"
    );


    this.vibrate(
        [300]
    );


},






speak(text){



    if(
    "speechSynthesis"
    in window
    ){


        let msg =
        new SpeechSynthesisUtterance(
            text
        );


        msg.lang="zh-CN";


        msg.rate=1.2;


        msg.pitch=1;



        speechSynthesis.speak(
            msg
        );


    }



},






vibrate(pattern){



    if(
    navigator.vibrate
    ){


        navigator.vibrate(
            pattern
        );


    }



}



};