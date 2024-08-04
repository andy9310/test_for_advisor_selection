<script >
import BlackButton from '@/components/BlackButton.vue';
import PlainTextField from '../components/PlainTextField.vue';
import SelectStatus from '@/components/SelectStatus.vue';
export default{
  components: {
    PlainTextField,
    BlackButton,
    SelectStatus,
  },
  data() {
    return {
        loginUser:{
        name:'管理員',
        },
        time:{
        start:'2024/11/01 09:00起',
        end:'2024/11/14 17:00迄',
        },
        parameter:{
        semester_year:'114'
        },
        tabs: ['甲組','乙組','丙組'],
        currenttab: '甲組',
        advisors:['王以安','楊凱駿','楊鈞安'],
        groups:['甄試正取生','甄試備取生'],
        students:[
            {
                name:'甄試正取生',
                student:'學生A'
            },
            {
                name:'甄試備取生',
                student:'學生B'
            },
        ],
        professors:['教授A','教授B','教授C'],
        status:'等待同意'

    };
  },
  methods: {
  },
}
</script>


<template>
    <div class="flex h-screen flex-col overflow-hidden bg-[url('../assets/gradient2.png')] bg-cover relative">
        <img src="@/assets/G.png" class=" absolute top-8 left-84rem w-28 h-28 z-40">
        <img src="@/assets/I.png" class=" absolute top-96 w-12 h-28 z-40">
        <img src="@/assets/C.png" class=" absolute bottom-52 right-1 w-28 h-28 z-40">
        <img src="@/assets/E.png" class=" absolute bottom-1 left-25rem w-28 h-28 z-40">
        
        <div class=" flex flex-row justify-between pt-8 ml-16">
            <h1 class="text-2xl font-bold pl-10">臺大電信所指導教授填選系統</h1>
            <div class="flex flex-row items-center pr-16">
                <h1 class="mx-1">{{loginUser.name}}您好</h1>
                <h1 class="text-xl font-bold mx-1 pb-1">|</h1>
                <router-link to="/login"><img src="@/assets/logout.png" class="w-6 h-6 mx-1"></router-link>
            </div>
        </div>

        <div class="flex flex-row justify-around h-full">
            <div class="flex flex-col ml-16 mt-10">
                <div class="flex flex-row items-center mt-2">
                    <img src="@/assets/graycircle.png" class="w-3 h-3 mr-3">
                    <h1>準備階段</h1>
                </div>
                <div class="flex flex-row items-center mt-2">
                    <img src="@/assets/graycircle.png" class="w-3 h-3 mr-3">
                    <h1>學生填選指導教授</h1>
                </div>
                <div class="flex flex-row mt-2">
                    <img src="@/assets/aLine.png" class="w-1 h-24 mr-3 ml-1">
                    <div class="flex flex-col ml-1">
                        <h1>{{time.start}}</h1>
                        <h1>{{time.end}}</h1>
                    </div>
                </div>
                <div class="flex flex-row items-center">
                    <img src="@/assets/graycircle.png" class="w-3 h-3 mr-3">
                    <h1>確認志願序</h1>
                </div>
                <div class="flex flex-row items-center mt-2">
                    <img src="@/assets/graycircle.png" class="w-3 h-3 mr-3">
                    <h1>分發後導生異動管理</h1>
                </div>

            </div>
            <div class="flex flex-col w-full overflow-y-scroll ml-20 mt-20 bg-white rounded-tl-lg z-50">
                <h1 class="my-6 mx-6">管理員 / 志願序管理</h1>
                
                <div class="mx-6 flex flex-col mb-10">
                    <div class="flex flex-row justify-between">
                        <h1 class="text-xl font-extrabold">志願序管理</h1>
                    </div>
                    <div class="flex flex-row mt-4">
                        <button v-for="tab in tabs" :key="tab"  
                            :class="{'font-extrabold border-b border-black w-16 py-2 px-2':currenttab === tab,
                                'border-b w-16 py-2 px-2':currenttab !== tab
                            }" 
                            @click="currenttab = tab"
                            >{{ tab }}
                        </button>
                        <div class="border-b w-full"></div>
                    </div>
                    
                    <div class="flex flex-col border-b border-slate-300">
                        <div class="flex flex-row my-5 justify-between items-center">
                            <h1 class="font-bold text-xl ">管理{{currenttab}}</h1>
                            <div class="flex flex-row ">
                                <p class="underline">匯出組務會議Excell檔</p>
                                <div class="mx-3">|</div>
                                <p class="underline">寄分發導生確認信</p>
                            </div>
                        </div>
                        
                        <div  v-for="group in groups" :key="group" class="flex flex-col my-5">
                            <div class="flex flex-row my-5 justify-between">
                                <h1 class="font-bold text-xl mb-5">{{ group }}</h1>
                                <PlainTextField/>
                            </div>
                            <div class="flex flex-col border border-slate-300 rounded-xl">
                                <div class="flex flex-row my-5 border-b border-slate-300">
                                    <h1 class="w-96 mx-5">學生姓名</h1>
                                    <h1 class="w-60">教師姓名</h1>
                                    <h1 class="w-96">教師同意狀態</h1>
                                    <h1 class="w-96">分發結果</h1>
                                </div>
                                <div v-for="student_group in students" :key="student_group" class="flex flex-col">
                                    <div v-if="group===student_group.name" class="flex flex-col">
                                        <div v-for="professor in professors" :key="professor" class="flex flex-row my-5 items-center">
                                            <h1 class="w-96 mx-5" v-if="professor===professors[0]">{{student_group.student}}</h1>
                                            <h1 class="w-96 mx-5" v-if="professor!==professors[0]"></h1>
                                            <h1 class="w-60">{{ professor }}</h1>
                                            <div class="w-96 flex flex-row items-center">
                                                <SelectStatus :multistatus="['等待同意','已同意','被拒絕']" v-model="status"></SelectStatus>
                                                <p v-if="professor===professors[0]" class=" text-[#513AA6] ml-20 underline">解除鎖定</p>
                                            </div>
                                            <SelectStatus v-if="professor===professors[0]" :multistatus="['等待同意','已同意','被拒絕']" v-model="status"></SelectStatus>

                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    
                    </div>
                    <div class="flex justify-end">
                        <BlackButton buttonType="儲存" length="w-button-short"></BlackButton>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>