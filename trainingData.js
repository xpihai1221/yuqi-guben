const trainingData = {


levels:{



// =====================
// G2 初练进阶
// =====================

G2:{


name:"G2 初练进阶",



stages:{



morning:{


name:"早唤醒",

type:"morning",

targetTime:"04:25",


actions:[


{
name:"爆发训练",
count:37,

timing:{
tight:2,
relax:2
}

},


{
name:"初级耐力",
count:10,

timing:{
tight:8,
relax:8
}

}



]


},





noon:{


name:"午加强",

type:"noon",

targetTime:"05:39",


actions:[


{
name:"爆发训练",

count:25,

timing:{
tight:2,
relax:2
}

},


{
name:"三步收紧",

count:14

}


]

},





night:{


name:"晚巩固",

type:"night",

targetTime:"05:53",


actions:[


{
name:"爆发训练",

count:15,

timing:{
tight:2,
relax:2
},

restAfter:15

},



{
name:"超强耐力",

count:2,

timing:{
tight:30,
relax:10
},

restAfter:15

},



{
name:"中级耐力",

count:14,

timing:{
tight:10,
relax:5
}

}


]

}



}


},







// =====================
// G3 初练强化
// =====================

G3:{


name:"G3 初练强化",



stages:{



morning:{


name:"早唤醒",

type:"morning",

targetTime:"04:52",



actions:[


{
name:"爆发训练",

count:40,


timing:{
tight:1,
relax:1
},

restAfter:20


},


{
name:"初级耐力",

count:12,


timing:{
tight:8,
relax:8
}

}



]


},







noon:{


name:"午加强",

type:"noon",

targetTime:"07:28",



actions:[


{
name:"爆发训练",

count:25,


timing:{
tight:1,
relax:1
},


restAfter:20


},


{
name:"三步收紧",

type:"threeStep",

count:18
}
]


},







night:{


name:"晚巩固",

type:"night",

targetTime:"07:40",



actions:[


{
name:"爆发训练",

count:25,


timing:{
tight:1,
relax:1
},


restAfter:15


},



{
name:"超强耐力",

count:2,


timing:{
tight:30,
relax:10
},


restAfter:15


},



{
name:"中级耐力",

count:20,


timing:{
tight:10,
relax:5
}



}



]


}



}


}



}



};