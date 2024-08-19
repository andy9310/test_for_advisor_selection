<script>
import NavBar from '../components/NavBar.vue';
import axios from '../utils/axios';
export default{
  components: {
    NavBar
  },
  data() {
    return {
        userEmail: this.$store.state.email,
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
        accountInfo:{},
        enrollmentQuota:[],
        preferenceRanking:[],
        studentId_group:{},
    };
  },
  mounted(){
    this.getAccountInfo();
    this.getPreferenceRanking();
  },
  methods: {
    async getAccountInfo(){
        const response = await axios.get('/account/'+this.userEmail)
        this.accountInfo = response.data
        const res = await axios.get('/enrollment-quota/advisor/'+this.accountInfo.advisor.id)
        this.enrollmentQuota = res.data
    },
    async getPreferenceRanking(){
        const response = await axios.get('/preference-ranking/me')
        this.preferenceRanking = response.data
        console.log(response.data)
        const res = await axios.get('/student-group/')
        for(let i = 0;i<response.data.length;i++){
            let groups = res.data.filter(group=>group.teamType===response.data[i].student.teamType) 
            for(let j = 0;j<groups.length;j++){
                if(groups[j].examinees.filter(examinee=>examinee.examineeNumber === response.data[i].student.examineeNumber).length!==0){
                    this.studentId_group[response.data[i].student.id] = groups[j].groupName
                    break
                }
            }
        }
        console.log(this.studentId_group)
    },
    async putRanking(ranking,string){
        let array = []
        array.push({
            rankingId : ranking.rankings[0].id,
            status: string
        })
        const response = await axios.put('/preference-ranking/'+ranking.id+'/review-preference',array)
        console.log(response)
        location.reload();
    },
  },
}
</script>

<template>
    <div class="flex flex-col bg-[url('../assets/gradient.png')] bg-cover relative">
        <img src="@/assets/G.png" class=" absolute top-8 left-84rem w-28 h-28 z-10">
        <img src="@/assets/I.png" class=" absolute top-96 w-12 h-28 z-10">
        <img src="@/assets/C.png" class=" absolute bottom-52 right-1 w-28 h-28 z-10">
        <img src="@/assets/E.png" class=" absolute bottom-1 left-25rem w-28 h-28 z-10">
        <NavBar/>
        <div class="container mx-auto grid flex-grow grid-cols-2 items-start py-2 z-50">
            <div class="flex flex-col ml-10 mt-10">
                <h1 class="text-xl font-bold my-4">等待意見名單</h1>
                
                <div class="flex flex-row">
                    <div v-for="(ranking,index) in preferenceRanking" :key="index"  class="flex flex-col">
                        <div v-if="ranking.rankings[0].status === 'wait'">
                            <div v-if="preferenceRanking.filter(ranking=>ranking.rankings[0].status==='accept' && ranking.student.teamType==='A').length >= enrollmentQuota.filter(quotaInfo=>quotaInfo.teamType==='A')[0].quota && ranking.student.teamType==='A'" class="flex flex-row items-center">
                                <img src="@/assets/alert-filled.png" class="h-4 w-4">
                                <h1>您同意指導學生名額已滿</h1>
                            </div>
                            <div v-if="preferenceRanking.filter(ranking=>ranking.rankings[0].status==='accept' && ranking.student.teamType==='B').length >= enrollmentQuota.filter(quotaInfo=>quotaInfo.teamType==='B')[0].quota && ranking.student.teamType==='B'" class="flex flex-row items-center">
                                <img src="@/assets/alert-filled.png" class="h-4 w-4">
                                <h1>您同意指導學生名額已滿</h1>
                            </div>
                            <div v-if="preferenceRanking.filter(ranking=>ranking.rankings[0].status==='accept' && ranking.student.teamType==='C').length >= enrollmentQuota.filter(quotaInfo=>quotaInfo.teamType==='C')[0].quota && ranking.student.teamType==='C'" class="flex flex-row items-center">
                                <img src="@/assets/alert-filled.png" class="h-4 w-4">
                                <h1>您同意指導學生名額已滿</h1>
                            </div>
                            <div  class="flex flex-col mr-10 w-80 h-64 px-5 py-5 bg-white rounded-3xl border">
                                <h1 class="text-lg my-5 font-bold">{{ ranking.student.teamType==='A'?'甲組':ranking.student.teamType==='B'?'乙組':'丙組'}} {{ studentId_group[ranking.student.id] }}</h1>
                                <h1>准考證號  {{ ranking.student.examineeNumber }}</h1>
                                <h1 >學生姓名  {{ ranking.student.name }}</h1>
                                <div class="my-10 flex flex-row justify-around">
                                    <button v-if="ranking.rankings[0].status === 'wait'" class="border bg-white text-black rounded-xl px-4 py-2" @click="putRanking(ranking,'reject')">婉拒指導</button>
                                    <button v-if="ranking.rankings[0].status === 'wait'" class="border bg-black text-white rounded-xl px-4 py-2" @click="putRanking(ranking,'accept')">同意指導</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <h1 class="text-xl font-bold my-4">已同意指導學生名單</h1>
                <div v-if="preferenceRanking.filter(ranking=>ranking.rankings[0].status==='accept' && ranking.student.teamType==='A').length>0">
                    <div class="flex flex-row items-center my-2">
                        <h1>甲組</h1>
                        <img src="@/assets/info.png" class="h-4 w-4 mx-1">
                        <button v-if="agreeList.filter(student=>student.team==='甲組').length === limitList[0]" class="mx-1 px-2 py-1 bg-black text-white rounded-xl">整學年總共可以收{{limitList[0]}}位</button>
                    </div>
                    <h1 class="my-2">所辦要求甲組學生先取得教授同意才能登記在本系統，如學生未取得您同意請聯絡所辦。</h1>
                    <div class="flex flex-row">
                        <div v-for="(ranking,index) in preferenceRanking.filter(ranking=>ranking.rankings[0].status==='accept' && ranking.student.teamType==='A')" :key="index" class="flex flex-col mr-10 w-80 h-40 px-5 py-5 bg-white rounded-3xl border">
                            <h1 class="text-lg my-5 text-[#513AA6] font-bold">{{ '甲組' }}{{ studentId_group[ranking.student.id] }}</h1>
                            <h1>准考證號  {{ ranking.student.examineeNumber }}</h1>
                            <h1 >學生姓名  {{ ranking.student.name }}</h1>
                        </div>
                    </div>
                </div>

                <div v-if="preferenceRanking.filter(ranking=>ranking.rankings[0].status==='accept' && ranking.student.teamType==='B').length>0">
                    <div class="flex flex-row items-center my-2">
                        <h1>乙組</h1>
                        <img src="@/assets/info.png" class="h-4 w-4 mx-1 ">
                        <button v-if="preferenceRanking.filter(ranking=>ranking.rankings[0].status==='accept' && ranking.student.teamType==='B').length === enrollmentQuota.filter(quotaInfo=>quotaInfo.teamType==='B')[0].quota" class="mx-1 px-2 py-1 bg-black text-white rounded-xl">整學年總共可以收{{enrollmentQuota.filter(quotaInfo=>quotaInfo.teamType==='B')[0].quota}}位</button>
                    </div>
                    <div class="flex flex-row">
                        <div v-for="(ranking,index) in preferenceRanking.filter(ranking=>ranking.rankings[0].status==='accept' && ranking.student.teamType==='B')" :key="index" class="flex flex-col mr-10 w-80 h-56 px-5 py-5 bg-white rounded-3xl border">
                            <h1 class="text-lg my-5 text-[#2652B3] font-bold">{{ '乙組' }} {{ studentId_group[ranking.student.id] }}</h1>
                            <h1>准考證號  {{ ranking.student.examineeNumber }}</h1>
                            <h1 >學生姓名  {{ ranking.student.name }}</h1>
                            <button class="border bg-white text-black rounded-lg px-4 py-2 w-full mt-5" @click="putRanking(ranking,'reject')">取消導生關係</button>
                        </div>
                    </div>
                </div>

                <div v-if="preferenceRanking.filter(ranking=>ranking.rankings[0].status==='accept' && ranking.student.teamType==='C').length>0">
                    <div class="flex flex-row items-center my-2">
                        <h1>丙組</h1>
                        <img src="@/assets/info.png" class="h-4 w-4 mx-1 ">
                        <button v-if="preferenceRanking.filter(ranking=>ranking.rankings[0].status==='accept' && ranking.student.teamType==='C').length === enrollmentQuota.filter(quotaInfo=>quotaInfo.teamType==='C')[0].quota" class="mx-1 px-2 py-1 bg-black text-white rounded-xl">整學年總共可以收{{enrollmentQuota.filter(quotaInfo=>quotaInfo.teamType==='C')[0].quota}}位</button>
                    </div>
                    <div class="flex flex-row">
                        <div v-for="(ranking,index) in preferenceRanking.filter(ranking=>ranking.rankings[0].status==='accept' && ranking.student.teamType==='C')" :key="index" class="flex flex-col mr-10 w-80 h-56 px-5 py-5 bg-white rounded-3xl border">
                            <h1 class="text-lg my-5 text-[#2652B3] font-bold">{{ '丙組' }} {{ studentId_group[ranking.student.id] }}</h1>
                            <h1>准考證號  {{ ranking.student.examineeNumber }}</h1>
                            <h1 >學生姓名  {{ ranking.student.name }}</h1>
                            <button class="border bg-white text-black rounded-lg px-4 py-2 w-full mt-5" @click="putRanking(ranking,'reject')">取消導生關係</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
