<script>
export default{
  components: {
  },
  data() {
    return {
        loginUser:{
            name:'教授A'
        },
        waitList:[{
            team:'乙組',
            group:'甄試報到生',
            studentNumber:'L1234567',
            name:'學生A'
        }],
        agreeList:[
            {
                team:'乙組',
                group:'甄試報到生',
                studentNumber:'L1245242',
                name:'學生B'
            },
            {
                team:'甲組',
                group:'甄試正取生',
                studentNumber:'L7636348',
                name:'學生D'
            },
            {
                team:'乙組',
                group:'甄試正取生',
                studentNumber:'L1638687',
                name:'學生C'
            }
        ],
        alertList:[false,false,false],
        limitList:[2,4,1],
        alert:false,
        
    };
  },
  methods: {
  },
}
</script>

<template>
    <div class="flex flex-col bg-[url('../assets/gradient.png')] bg-cover relative">
        <img src="@/assets/G.png" class=" absolute top-8 left-84rem w-28 h-28 z-10">
        <img src="@/assets/I.png" class=" absolute top-96 w-12 h-28 z-10">
        <img src="@/assets/C.png" class=" absolute bottom-52 right-1 w-28 h-28 z-10">
        <img src="@/assets/E.png" class=" absolute bottom-1 left-25rem w-28 h-28 z-10">
        <div class="flex flex-col z-50">
            <div class="flex flex-row justify-between items-center mt-10 ml-10">
                <h1 class="text-2xl font-bold">臺大電信所指導教授填選系統</h1>
                <div class="flex flex-row items-center pr-16">
                    <h1 class="mx-1">{{loginUser.name}}您好</h1>
                    <h1 class="text-xl font-bold mx-1 pb-1">|</h1>
                    <router-link to="/login"><img src="@/assets/logout.png" class="w-6 h-6 mx-1"></router-link>
                </div>
            </div>
            <div class="flex flex-col ml-10 mt-10">
                <h1 class="text-xl font-bold my-4">等待意見名單</h1>
                <div v-if="alert===true" class="flex flex-row items-center">
                    <img src="@/assets/alert-filled.png" class="h-4 w-4">
                    <h1>您同意指導學生名額已滿</h1>
                </div>
                <div class="flex flex-row">
                    <div v-for="student in waitList" :key="student" class="flex flex-col mr-10 w-80 h-64 px-5 py-5 bg-white rounded-3xl border">
                        <h1 class="text-lg my-5 font-bold">{{ student.team }} {{ student.group }}</h1>
                        <h1>准考證號  {{ student.studentNumber }}</h1>
                        <h1 >學生姓名  {{ student.name }}</h1>
                        <div class="my-10 flex flex-row justify-around">
                            <button class="border bg-white text-black rounded-xl px-4 py-2">婉拒指導</button>
                            <button v-if="(student.team==='甲組'&&alertList[0]===false)||(student.team==='乙組'&&alertList[1]===false)||(student.team==='丙組'&&alertList[2]===false)" class="border bg-black text-white rounded-xl px-4 py-2">同意指導</button>
                        </div>
                    </div>
                </div>
                <h1 class="text-xl font-bold my-4">已同意指導學生名單</h1>
                <div class="flex flex-row items-center my-2">
                    <h1>甲組</h1>
                    <img src="@/assets/info.png" class="h-4 w-4 mx-1">
                    <button v-if="agreeList.filter(student=>student.team==='甲組').length === limitList[0]" class="mx-1 px-2 py-1 bg-black text-white rounded-xl">整學年總共可以收{{limitList[0]}}位</button>
                </div>
                <h1 class="my-2">所辦要求甲組學生先取得教授同意才能登記在本系統，如學生未取得您同意請聯絡所辦。</h1>
                <div class="flex flex-row">
                    <div v-for="student in agreeList.filter(student=>student.team==='甲組')" :key="student" class="flex flex-col mr-10 w-80 h-40 px-5 py-5 bg-white rounded-3xl border">
                        <h1 class="text-lg my-5 text-[#513AA6] font-bold">{{ student.team }}{{ student.group }}</h1>
                        <h1>准考證號  {{ student.studentNumber }}</h1>
                        <h1 >學生姓名  {{ student.name }}</h1>
                    </div>
                </div>
                <div class="flex flex-row items-center my-2">
                    <h1>乙組</h1>
                    <img src="@/assets/info.png" class="h-4 w-4 mx-1 ">
                    <button v-if="agreeList.filter(student=>student.team==='乙組').length === limitList[1]" class="mx-1 px-2 py-1 bg-black text-white rounded-xl">整學年總共可以收{{limitList[1]}}位</button>
                </div>
                <div class="flex flex-row">
                    <div v-for="student in agreeList.filter(student=>student.team==='乙組')" :key="student" class="flex flex-col mr-10 w-80 h-56 px-5 py-5 bg-white rounded-3xl border">
                        <h1 class="text-lg my-5 text-[#2652B3] font-bold">{{ student.team }} {{ student.group }}</h1>
                        <h1>准考證號  {{ student.studentNumber }}</h1>
                        <h1 >學生姓名  {{ student.name }}</h1>
                        <button class="border bg-white text-black rounded-lg px-4 py-2 w-full mt-5">取消導生關係</button>
                    </div>
                </div>
                <div class="flex flex-row items-center my-2">
                    <h1>丙組</h1>
                    <img src="@/assets/info.png" class="h-4 w-4">
                    <button v-if="agreeList.filter(student=>student.team==='丙組').length === limitList[2]" class="mx-1 px-2 py-1 bg-black text-white rounded-xl">整學年總共可以收{{limitList[2]}}位</button>
                </div>
                <div class="flex flex-row">
                    <div v-for="student in agreeList.filter(student=>student.team==='丙組')" :key="student" class="flex flex-col mr-10 w-80 h-56 px-5 py-5 bg-white rounded-3xl border">
                        <h1 class="text-lg my-5">{{ student.team }} {{ student.group }}</h1>
                        <h1>准考證號  {{ student.studentNumber }}</h1>
                        <h1 >學生姓名  {{ student.name }}</h1>
                        <button class="border bg-white text-black rounded-xl px-4 py-2 w-full mt-5">取消導生關係</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
