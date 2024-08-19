<script >
import BlackButton from '@/components/BlackButton.vue';
import PlainTextField from '../components/PlainTextField.vue';
import SelectStatus from '@/components/SelectStatus.vue';
import NavBar from '../components/NavBar.vue';
import axios from '../utils/axios';
export default{
    components: {
        PlainTextField,
        BlackButton,
        SelectStatus,
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
            groups:[],
            rankings:[],
            studentId_assignment:{},
            studentId_assignmentId:{},
            studentId_advisors:{},
        };
    },
    mounted(){
        this.getGroups();
        this.getPreferenceRanking();
    },
    methods: {
        async getGroups(){
            const response = await axios.get('/student-group/')
            this.groups = response.data
            console.log(response.data);
        },
        async getPreferenceRanking(){
            const response = await axios.get('/preference-ranking/')
            this.rankings = response.data.filter(ranking=>ranking.locked===true)
            response.data.filter(ranking=>ranking.locked===true).map(async(ranking)=>{
                let tmp_advisors_name = []
                ranking.rankings.map((rank)=>{
                    tmp_advisors_name.push(rank.advisor.name);
                })
                this.studentId_advisors[ranking.student.id] = tmp_advisors_name
                const res = await axios.get('/assignment/')
                this.studentId_assignment[ranking.student.id] = 
                    res.data.filter(assignment=>assignment.student.id === ranking.student.id).length===0?''
                    :res.data.filter(assignment=>assignment.student.id === ranking.student.id)[0].advisor.name
                this.studentId_assignmentId[ranking.student.id] = 
                    res.data.filter(assignment=>assignment.student.id === ranking.student.id).length===0?undefined
                    :res.data.filter(assignment=>assignment.student.id === ranking.student.id)[0].id
            })
            console.log(this.rankings);
        },
        async unlock(ranking){
            const response = await axios.patch('/preference-ranking/'+ranking.id,{
                locked:false
            })
            if(response.status===200){
                alert(`解鎖${ranking.student.name}成功`)
                location.reload();
            }
        },
        async putPreferenceRanking(ranking,value){
            let rank_array = []
            ranking.rankings.map((rank)=>{
                rank_array.push({
                    rankingId:rank.id,
                    status:value
                })
            })
            console.log(rank_array)
            const response = await axios.put('/preference-ranking/'+ranking.id+'/review-preference',rank_array)
            console.log(response)
        },
        async postAssignment(studentId, value){
            let ranking_array = this.rankings.filter(ranking=>ranking.student.id===studentId)[0].rankings
            let tmp_advisor_Id = ranking_array.filter(rank=>rank.advisor.name === value)[0].advisor.id
            if(this.studentId_assignmentId[studentId]!==undefined){
                const response = await axios.patch('/assignment/'+this.studentId_assignmentId[studentId],{
                    advisorId: tmp_advisor_Id,
                })
                console.log(response)
            }
            else{
                const response = await axios.post('/assignment/',{
                    advisorId: tmp_advisor_Id,
                    studentId: studentId
                })
                console.log(response)
            }
        },
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
                            >{{tab==='A'?'甲組':tab==='B'?'乙組':'丙組'}}
                        </button>
                        <div class="border-b w-full"></div>
                    </div>
                    
                    <div class="flex flex-col border-b border-slate-300">
                        <div class="flex flex-row my-5 justify-between items-center">
                            <h1 class="font-bold text-xl ">管理{{currenttab==='A'?'甲組':currenttab==='B'?'乙組':'丙組'}}</h1>
                            <div class="flex flex-row ">
                                <p class="underline">匯出組務會議Excell檔</p>
                                <div class="mx-3">|</div>
                                <p class="underline">寄分發導生確認信</p>
                            </div>
                        </div>
                        
                        <div  v-for="group in groups.filter(group=>group.teamType===currenttab)" :key="group" class="flex flex-col my-5">
                            <div class="flex flex-row my-5 justify-between">
                                <h1 class="font-bold text-xl mb-5">{{ group.groupName }}</h1>
                                <PlainTextField/>
                            </div>
                            <div class="flex flex-col border border-slate-300 rounded-xl">
                                <div class="flex flex-row my-5 ">
                                    <h1 class="w-96 mx-5">學生姓名</h1>
                                    <h1 class="w-60">教師姓名</h1>
                                    <h1 class="w-96">教師同意狀態</h1>
                                    <h1 class="w-96">分發結果</h1>
                                </div>
                                <div v-for="(ranking,index) in rankings.filter(ranking=>ranking.student.teamType===currenttab 
                                    && group.examinees.filter(examinee=>examinee.examineeNumber===ranking.student.examineeNumber).length!==0)" :key="index" class="flex flex-col border-t-2 border-slate-300">
                                    <div v-for="(one_rank,i) in ranking.rankings" :key="i" class="flex flex-row my-5 items-center">
                                        <h1 class="w-96 mx-5" v-if="i===0">{{ranking.student.name}}</h1>
                                        <h1 class="w-96 mx-5" v-if="i!==0"></h1>
                                        <h1 class="w-60">{{ one_rank.advisor.name }}</h1>
                                        <div class="w-96 flex flex-row items-center">
                                            <SelectStatus :multistatus="['wait','accept','reject']" v-model="one_rank.status" @toggle="putPreferenceRanking(ranking,$event)"></SelectStatus>
                                            <p v-if="i===0" class=" text-[#513AA6] ml-20 underline cursor-pointer" @click="unlock(ranking)">解除鎖定</p>
                                        </div>
                                        <SelectStatus v-if="i===0" :multistatus="studentId_advisors[ranking.student.id]" v-model="studentId_assignment[ranking.student.id]" @toggle="postAssignment(ranking.student.id,$event)"></SelectStatus>

                                    </div>
                                </div>
                                    
                                <!-- </div> -->
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