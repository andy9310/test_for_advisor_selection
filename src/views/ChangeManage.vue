<script >
import BlackButton from '@/components/BlackButton.vue';
import TeamChip from '@/components/TeamChip.vue';
import NavBar from '../components/NavBar.vue';
import axios from '../utils/axios';
export default{
  components: {
    BlackButton,
    TeamChip,
    NavBar,
  },
  data() {
    return {
        time:{
            start:'2024/11/01 09:00起',
            end:'2024/11/14 17:00迄',
        },
        tabs: ['A','B','C'],
        currenttab: 'A',
        assignments:[],
        advisors:[],
        advisorId_assignments:{},
        changeHistory:{
            A:[],
            B:[],
            C:[],
        }
    };
  },
  mounted(){
    this.getAssignment()
    this.getChangeHistory()
  },
  methods: {
    async getAssignment(){
        const response = await axios.get('/assignment/')
        this.assignments = response.data
        console.log(response.data)
        this.getAdvisors()
    },
    async getAdvisors(){
        const response = await axios.get('/account/',{params:{type:'advisor'}})
        response.data.map(async(advisor)=>{
            const res = await axios.get('/account/'+advisor.email)
            this.advisors.push(res.data)
            this.advisorId_assignments[res.data.advisor.id] = this.assignments.filter(assignment=>assignment.advisor.id === res.data.advisor.id)
        })
        console.log(this.advisorId_assignments)
    },
    async getChangeHistory(){
        const response = await axios.get('/advisor-change/',{params:{teamType:this.currenttab}})
        console.log(response)
        if(this.currenttab === 'A'){
            this.changeHistory.A = response.data
        }
        else if(this.currenttab === 'B'){
            this.changeHistory.B = response.data
        }
        else if(this.currenttab === 'C'){
            this.changeHistory.C = response.data
        }
    },
    async deleteChangeHistory(id){
        const response = await axios.delete('/advisor-change/'+id)
        if(response.status === 200){
            alert('刪除成功')
            location.reload();
        }
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
        <NavBar/>

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
                <h1 class="my-6 mx-6">管理員 / 分發後導生異動管理</h1>
                
                <div class="mx-6 flex flex-col mb-10">
                    <div class="flex flex-row justify-between">
                        <h1 class="text-xl font-extrabold">分發後導生異動管理</h1>
                        <p class="underline text-[#513AA6]">匯出配對Excell檔</p>
                    </div>
                    <div class="flex flex-row mt-4">
                        <button v-for="tab in tabs" :key="tab"  
                            :class="{'font-extrabold border-b border-black w-16 py-2 px-2':currenttab === tab,
                                'border-b w-16 py-2 px-2':currenttab !== tab
                            }" 
                            @click="currenttab = tab"
                            >{{ tab==='A'?'甲組':tab==='B'?'乙組':'丙組' }}
                        </button>
                        <div class="border-b w-full"></div>
                    </div>
                    
                    <div class="flex flex-row my-5 justify-between items-center">
                            <h1 class="font-bold text-xl ">當前狀態</h1>
                    </div>
                    <div class="flex flex-col border border-slate-300 rounded-xl">
                        <div class="flex flex-row   border-b border-slate-300">
                            <h1 class="w-96 mx-5 my-5">教授姓名</h1>
                            <h1 class="w-96 mx-5 my-5">學生姓名</h1>
                        </div>
                        <div v-if="currenttab==='A'">
                            <div v-for="(advisor,index) in advisors.filter(advisor=>advisor.advisor.A===true)" :key="index" class="flex flex-row">
                                <div v-if="advisorId_assignments[advisor.advisor.id].length!==0" class="flex flex-row">
                                    <h1 class="w-96 mx-5 my-5">{{ advisor.advisor.name }}</h1>
                                    <div class="flex flex-row w-96 mx-5 my-5">
                                        <h1 v-for="(assignment,index) in advisorId_assignments[advisor.advisor.id].filter(assignment=>assignment.student.teamType===currenttab)" :key="index" >{{ assignment.student.name }} 、 </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="currenttab==='B'">
                            <div v-for="(advisor,index) in advisors.filter(advisor=>advisor.advisor.B===true)" :key="index" class="flex flex-row">
                                <div v-if="advisorId_assignments[advisor.advisor.id].length!==0" class="flex flex-row">
                                    <h1 class="w-96 mx-5 my-5">{{ advisor.advisor.name }}</h1>
                                    <div class="flex flex-row w-96 mx-5 my-5">
                                        <h1 v-for="(assignment,index) in advisorId_assignments[advisor.advisor.id].filter(assignment=>assignment.student.teamType===currenttab)" :key="index" >{{ assignment.student.name }} 、 </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="currenttab==='C'">
                            <div v-for="(advisor,index) in advisors.filter(advisor=>advisor.advisor.C===true)" :key="index" class="flex flex-row">
                                <div v-if="advisorId_assignments[advisor.advisor.id].length!==0" class="flex flex-row">
                                    <h1 class="w-96 mx-5 my-5">{{ advisor.advisor.name }}</h1>
                                    <div class="flex flex-row w-96 mx-5 my-5">
                                        <h1 v-for="(assignment,index) in advisorId_assignments[advisor.advisor.id].filter(assignment=>assignment.student.teamType===currenttab)" :key="index" >{{ assignment.student.name }} 、 </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-row my-5 justify-between items-center">
                        <h1 class="font-bold text-xl ">異動紀錄</h1>
                        <router-link to="/alert-admin-addchange">
                            <p class="underline text-[#513AA6]">新增異動</p>
                        </router-link>
                    </div>
                    <div class="flex flex-col border border-slate-300 rounded-xl">
                        <div class="flex flex-row   border-b border-slate-300">
                            <h1 class="w-96 mx-5 my-5">教授姓名</h1>
                            <h1 class="w-96 mx-5 my-5">異動類型</h1>
                            <h1 class="w-96 mx-5 my-5">學生姓名</h1>
                        </div>
                        <div v-if="currenttab==='A'">
                            <div v-for="(history,index) in changeHistory.A" :key="index" class="flex flex-row items-center">
                                <h1 class="w-96 mx-5 my-5">{{ history.advisor.name }}</h1>
                                <TeamChip :buttonType="history.type==='add'?'加收':'減收'" addClass='w-96 mx-5 my-5'/>
                                <h1 class="flex flex-row w-96 mx-5 my-5">{{ history.student.name }}</h1>
                                <img src="@/assets/trash.png" class="w-5 h-5 mr-3 cursor-pointer" @click="deleteChangeHistory(history.id)">
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