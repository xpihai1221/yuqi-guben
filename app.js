// ===============================
// 元气固本决 APP 主程序 8.0
// ===============================



let currentLevel = null;

let currentStage = null;

let engine = null;





// ===============================
// 初始化
// ===============================

window.onload=function(){



    loadUserData();



    showHome();



};








// ===============================
// 显示主页
// ===============================


function showHome(){



    let level =
    userData.level;



    currentLevel =
    trainingData.levels[level];



    let rule =
    levelRules[level];



    let progress =
    getLevelProgress();



document.getElementById("content")
.innerHTML = `



<h1>
元气固本决
</h1>



<h2>
当前境界：
${currentLevel.name}
</h2>




<p>
累计修炼：
${userData.totalTrain} 次
</p>



<p>
连续修炼：
${userData.streak} 天
</p>





<h3>
今日修炼
</h3>


<p>
☀ 早唤醒：
${userData.today.morning?"✅":"○"}
</p>


<p>
☀ 午加强：
${userData.today.noon?"✅":"○"}
</p>


<p>
☾ 晚巩固：
${userData.today.night?"✅":"○"}
</p>






<h3>
晋升进度
</h3>


<p>
${userData.totalTrain}
/
${rule.need || "MAX"}

</p>



<div>

<button onclick="showStages()">

开始修炼

</button>


</div>



`;



}









// ===============================
// 显示训练阶段
// ===============================


function showStages(){



let stages =
currentLevel.stages;



document.getElementById("content")
.innerHTML = `



<h1>
${userData.level}
${currentLevel.name}
</h1>



<h3>
选择今日修炼
</h3>



<button onclick="startStage('morning')">

早唤醒

</button>


<br><br>



<button onclick="startStage('noon')">

午加强

</button>



<br><br>



<button onclick="startStage('night')">

晚巩固

</button>



<br><br>



<button onclick="showHome()">

返回

</button>



`;



}









// ===============================
// 开始训练
// ===============================


function startStage(type){

 // 用户点击按钮的同步瞬间，先解锁音频
    voiceManager.unlock();


currentStage =
currentLevel.stages[type];



engine =
new TrainingEngine();



engine.load(
    currentStage
);



engine.start();



}

function showStages(){


let stages =
currentLevel.stages;



let html = `



<h1>
${currentLevel.name}
</h1>



<h3>
选择今日修炼
</h3>

`;





for(let key in stages){


    let stage =
    stages[key];



    html += `



<div class="stage-card">



<h2>
${stage.name}
</h2>



<p>
目标时间：
${stage.targetTime}
</p>



<h3>
训练内容
</h3>



`;





stage.actions.forEach(action=>{


    html += `

<p>
${action.name}
：
${action.count}次
</p>

`;



});





html += `



<button onclick="startStage('${key}')">

开始

</button>



</div>



<hr>



`;



}





html += `



<button onclick="showHome()">

返回

</button>



`;





document.getElementById("content")
.innerHTML = html;



}







// ===============================
// 返回主页
// ===============================


function backHome(){



showHome();



}

if("serviceWorker" in navigator){

    navigator.serviceWorker.register(
        "service-worker.js"
    )
    .then(()=>{

        console.log(
            "离线缓存启动成功"
        );

    });

}