const userData = {



    // 当前等级

    level:"G3",



    // 总训练次数

    totalTrain:0,



    // 连续训练天数

    streak:0,



    // 最近训练日期

    lastTrainDate:null,



    // 今日训练记录

    today:{


        date:null,


        morning:false,


        noon:false,


        night:false


    }






};








// ========================
// 等级规则
// ========================


const levelRules = {



    G1:{


        need:15,

        next:"G2"


    },



    G2:{


        need:21,

        next:"G3"


    },



    G3:{


        need:35,

        next:"G4"


    },



    G4:{


        need:60,

        next:"G5"


    },



    G5:{


        need:null,

        next:null


    }




};









// ========================
// 保存数据
// ========================

function saveUserData(){



    localStorage.setItem(

        "yuanqi_user",

        JSON.stringify(userData)

    );


}








// ========================
// 读取数据
// ========================

function loadUserData(){



    let data =
    localStorage.getItem(
        "yuanqi_user"
    );



    if(data){


        Object.assign(
            userData,
            JSON.parse(data)
        );


    }



}





// ========================
// 完成一次训练
// ========================


function completeTraining(stage){



    let today =
    new Date()
    .toISOString()
    .split("T")[0];



    // 第一次今天训练

    if(
        userData.lastTrainDate
        !== today
    ){


        userData.streak++;


        userData.lastTrainDate =
        today;


    }



    userData.totalTrain++;





    if(stage==="morning"){


        userData.today.morning=true;


    }



    if(stage==="noon"){


        userData.today.noon=true;


    }



    if(stage==="night"){


        userData.today.night=true;


    }


    checkLevelUp();

    saveUserData();



}







// ========================
// 获取升级进度
// ========================

function getLevelProgress(){



    let rule =
    levelRules[
        userData.level
    ];



    if(!rule.need){


        return 100;


    }



    return Math.floor(

        userData.totalTrain
        /
        rule.need
        *
        100

    );



}// ========================
// 检查升级
// ========================

function checkLevelUp(){


    let rule =
    levelRules[userData.level];



    if(!rule.next){

        return;

    }



    if(
        userData.totalTrain >= rule.need
    ){



        let oldLevel =
        userData.level;



        userData.level =
        rule.next;



        saveUserData();



        alert(

        "恭喜突破！\n\n"
        +
        oldLevel
        +
        " → "
        +
        userData.level

        );



    }



}