// =================================
// 元气固本决 时间计算器 10.0
// =================================



function calculateActionTime(action){



    let total = 0;



    if(
        action.timing
    ){



        let once =

        action.timing.tight
        +
        action.timing.relax;



        total =

        action.count
        *
        once;



    }



    else{


        // 没有时间参数时
        // 防止旧数据报错

        total =
        action.count * 0;


    }



    if(action.restAfter){


        total +=
        action.restAfter;


    }



    return total;



}









function calculateStageTime(stage){



    let total = 0;



    stage.actions.forEach(action=>{


        total +=
        calculateActionTime(action);



    });



    return total;



}







function formatTime(seconds){



    let min =
    Math.floor(seconds/60);



    let sec =
    seconds%60;



    if(sec<10){

        sec="0"+sec;

    }



    return min+":"+sec;



}