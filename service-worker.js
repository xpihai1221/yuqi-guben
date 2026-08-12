const CACHE_NAME = "yuqi-guben-v1";


const FILES_TO_CACHE = [

    "index.html",

    "style.css",

    "app.js",

    "voiceManager.js",

    "trainingEngine.js",

    "trainingData.js",

    "trainingFeedback.js",

    "userData.js",

    "actionLibrary.js",

    "timeCalculator.js",

    "manifest.json",


    // 音频
    "audio/tight.mp3",
    "audio/relax.mp3",
    "audio/start.mp3",
    "audio/rest.mp3",
    "audio/finish.mp3",

    "audio/burst.mp3",
    "audio/basic_endurance.mp3",
    "audio/three_step.mp3",
    "audio/super_endurance.mp3",
    "audio/medium_endurance.mp3",

    "audio/three_tight.mp3",
    "audio/continue.mp3",
    "audio/hold.mp3",
    "audio/keep.mp3",
    "audio/three_relax.mp3"

];



// 安装

self.addEventListener(
"install",
event=>{


    event.waitUntil(

        caches.open(CACHE_NAME)

        .then(cache=>{

            return cache.addAll(
                FILES_TO_CACHE
            );

        })

    );


});



// 请求缓存

self.addEventListener(
"fetch",
event=>{


    event.respondWith(

        caches.match(
            event.request
        )

        .then(response=>{


            return response ||

            fetch(event.request);


        })

    );


});