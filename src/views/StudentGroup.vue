<script >
import BlackButton from '@/components/BlackButton.vue';
import PlainTextField from '../components/PlainTextField.vue';
import { ref, onMounted } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import draggable from 'vuedraggable'
export default{
  components: {
    BlackButton,PlainTextField,VueDatePicker,draggable
  },
  setup(){
    const students = ref(
    [{
    groupName:'甄試正取生',
    groupInfo:
        [
            {
                admission:'甄試',
                rank:1,
                name:'王以安',
                testNumber:'1917003',
                check:true,
                click:false,
            },
            {
                admission:'甄試',
                rank:2,
                name:'王凱駿',
                testNumber:'1917013',
                check:false,
                click:false,
            },
        ]
    },{
    groupName:'甄試備取生',
    groupInfo:
        [
            {
                admission:'甄試',
                rank:1,
                name:'王陽明',
                testNumber:'1917003',
                check:true,
                click:false,
            },
            {
                admission:'甄試',
                rank:2,
                name:'徐凱駿',
                testNumber:'1917013',
                check:false,
                click:false,
            },
        ]
    }] 
    );
    const date = ref();
    onMounted(() => {
        const startDate = new Date();
        const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
        date.value = [startDate, endDate];
    })
    return {
      date,students
    }
  },
  mounted(){
    this.created();
  },
  data() {
    return {
        statusOn:true,
        openList:false,
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
        currentteam: '甲組',
    };
  },
  methods: {
    toggleOn(){
        this.statusOn = !this.statusOn
    },
    toggleOpen(){
        this.openList = !this.openList
    },
    created(){
        this.currentteam = this.$route.params.team
    },
    OpenMenu(info){
        this.students.forEach(element => {
            element.groupInfo.forEach( info=>{
                info.click = false;
            });
        });
        info.click = true;
    }
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
                <h1 class="my-6 mx-6">管理員 / 系統參數設定</h1>
                <div class="mx-6 flex flex-col">
                    <div class="flex flex-row justify-between pb-8 border-b border-slate-300">
                        <h1 class="text-xl font-extrabold">編輯{{currentteam}}學生群組</h1>
                        <p class="underline">新增群組</p>
                    </div>
                    <div class="flex flex-col pl-10 pt-8 justify-center" v-for="student in students" :key="student.groupName" >
                        <div class="flex flex-row items-center">
                            <h1 class="text-xl font-bold">{{student.groupName}}</h1>
                            <img src="@/assets/edit.png" class="w-5 h-5 ml-3">
                        </div>
                        <div class="flex flex-row items-center my-3" >
                            <h1 class="w-40 flex flex-row text-end justify-end items-center">志願序數量<img src="@/assets/info.png" class="w-4 h-4">:</h1> 
                            <PlainTextField length="w-short"  :class="'mx-3'" />
                        </div>
                        <div class="flex flex-row items-center my-3">
                            <h1 class="w-40 flex flex-row text-end justify-end items-center">志願序需要教授同意:</h1>
                            <img src="@/assets/off.png" v-if="statusOn==false" class="w-10 h-5 ml-3 cursor-pointer" @click="toggleOn">
                            <img src="@/assets/on.png" v-if="statusOn==true" class="w-10 h-5 ml-3 cursor-pointer" @click="toggleOn">
                        </div>
                        <div class="flex flex-row items-center my-3">
                            <h1 class="w-40 flex flex-row text-end justify-end items-center">啟用教授名額檢查<img src="@/assets/info.png" class="w-4 h-4">:</h1> 
                            <img src="@/assets/off.png" v-if="statusOn==false" class="w-10 h-5 ml-3 cursor-pointer" @click="toggleOn">
                            <img src="@/assets/on.png" v-if="statusOn==true" class="w-10 h-5 ml-3 cursor-pointer" @click="toggleOn">
                        </div>
                        <div class="flex flex-row items-center my-3">
                            <h1 class="w-40 flex flex-row text-end justify-end items-center">啟用此群組限制名額:</h1>
                            <img src="@/assets/off.png" v-if="statusOn==false" class="w-10 h-5 ml-3 cursor-pointer" @click="toggleOn">
                            <img src="@/assets/on.png" v-if="statusOn==true" class="w-10 h-5 ml-3 cursor-pointer" @click="toggleOn">
                        </div>
                        <div class="flex flex-row items-center my-3">
                            <h1 class="w-40 flex flex-row text-end justify-end items-center">開放起迄時間:</h1>
                            <VueDatePicker v-model="date" range multi-calendars :class="'pl-3'"/>
                        </div>
                        <div class="flex flex-row justify-between border-b border-slate-300">
                            <h1 class="font-bold text-lg">考生名單</h1>
                            <div class="underline flex flex-row items-center">
                                <router-link :to="`/alert-fillexaminee/${currentteam}/${group}`">
                                    <button class="underline">匯入考生名單</button>
                                </router-link>
                                <img src="@/assets/chevron-down.png" v-if="openList==false" class=" w-4 h-4 cursor-pointer" @click="toggleOpen">
                                <img src="@/assets/chevron-up.png" v-if="openList==true" class=" w-4 h-4 cursor-pointer" @click="toggleOpen">
                            </div>
                        </div>
                        <div v-if="openList==true" class="flex flex-col rounded-lg  border border-slate-300 mt-5">
                            <div class="flex flex-row border-b border-slate-300 w-full">
                                <h1 class="w-56 my-5 mx-7  text-center">入學方式</h1>
                                <h1 class="w-56 my-5 mx-7 text-center">名次</h1>
                                <h1 class="w-56 my-5 mx-7 text-center">考生姓名</h1>
                                <h1 class="w-56 my-5 mx-7 text-center">准考證號</h1>
                            </div>
                            <draggable v-model="student.groupInfo" 
                                    tag="ol"  
                                    animation="200"
                                    ghost-class="ghost"
                                    :forceFallback="true"
                                    :fallbackOnBody="true"
                                    fallbackClass="fallback" >
                                <template #item="{element: info}" >
                                    
                                    <div class="flex flex-row w-full relative border-b border-slate-300" @contextmenu.prevent="OpenMenu(info)" @click="info.click=false">
                                        <div v-if="info.click==true" class="z-50 rounded-lg h-48 w-48 border bg-white absolute top-10 right-40 flex flex-col">
                                            <div class="flex flex-row justify-start mt-4 mb-2">
                                                <div class="w-12 justify-end flex flex-row">
                                                    <img src="@/assets/edit.png" class="h-5 w-5 cursor-pointer">
                                                </div>
                                                <h1 class="ml-2">編輯考生</h1>
                                            </div>
                                            <div class="flex flex-row justify-start mt-4 mb-2">
                                                <div class="w-12 justify-end flex flex-row">
                                                    <img src="@/assets/arrow-up.png" class="h-5 w-5 cursor-pointer">
                                                </div>
                                                <h1 class="ml-2">在上方新增考生</h1>
                                            </div>
                                            <div class="flex flex-row justify-start mt-4 mb-2">
                                                <div class="w-12 justify-end flex flex-row">
                                                    <img src="@/assets/arrow-down.png" class="h-5 w-5 cursor-pointer">
                                                </div>
                                                <h1 class="ml-2">在下方新增考生</h1>
                                            </div>
                                            <div class="flex flex-row justify-start mt-4 mb-2">
                                                <div class="w-12 justify-end flex flex-row">
                                                    <img src="@/assets/red_trash.png" class="h-5 w-5 cursor-pointer">
                                                </div>
                                                <h1 class="ml-2">刪除</h1>
                                            </div>
                                        </div>
                                        <div class="w-56 my-5 mx-7  items-center justify-center flex flex-row">
                                            <img src="@/assets/drag.png" class=" cursor-pointer">
                                            <h1>{{info.admission}}</h1>
                                        </div>
                                        <h1 class="w-56 my-5 mx-7 text-center">{{ info.rank }}</h1>
                                        <h1 class="w-56 my-5 mx-7 text-center">{{info.name  }}</h1>
                                        <h1 class="w-56 my-5 mx-7 text-center">{{ info.testNumber }}</h1>
                                        <div class="w-56 my-5 mx-7 items-center">
                                            <img v-if="info.check==true" src="@/assets/check.png" class=" cursor-pointer">
                                        </div>
                                    </div>
                                </template>
                            </draggable>
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
<style>
.ghost {
  opacity: 0;
}
.fallback {
  opacity: 1 !important;
  background: #fff;
  border: 1px solid red;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
}
</style>