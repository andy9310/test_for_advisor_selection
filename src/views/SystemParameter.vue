<script >
import BlackButton from '@/components/BlackButton.vue';
import PlainTextField from '../components/PlainTextField.vue';
import NavBar from '../components/NavBar.vue';
import axios from '../utils/axios';
export default{
  components: {
    PlainTextField,
    BlackButton,
    NavBar,
  },
  data() {
    return {
        siteInfo:{
            semesterYear: "113",
            officialAccount: "",
            primaryUndertaker: "",
            primaryUndertakerJobTitle: "",
            primaryUndertakerEmail: "",
            secondaryUndertaker: "",
            secondaryUndertakerJobTitle: "",
            secondaryUndertakerEmail: ""
        },
        time:{
            start:'2024/11/01 09:00起',
            end:'2024/11/14 17:00迄',
        },
        tabs: ['A','B','C'],
        currenttab: 'A',
        allquota:[],
        postquota:[],
        advisors:[],
        groupQuotas:[],
    };
  },
  mounted(){
    this.getSiteInfo();
    this.getEnrollmentQuota();
    this.getAllAdvisor();
    this.getGroupQuota();
  },
  methods: {
    async getSiteInfo(){
        const response = await axios.get('/siteInfo/'+ this.siteInfo.semesterYear)
        this.siteInfo = response.data
    },
    async patchSiteInfo(){
        const response = await axios.patch('/siteInfo/'+ this.siteInfo.semesterYear, {
            ...this.siteInfo
        })
        console.log(response);
        if(response?.status == 200){
          alert('儲存成功');
        }
    },
    async getEnrollmentQuota(){
        const response = await axios.get('/enrollment-quota/')
        this.allquota = response.data
        console.log(response.data);
    },
    async getAllAdvisor(){
        const response = await axios.get('/account/',{params:{type:'advisor'}})
        this.advisors = response.data.filter(account=>account.advisor!==undefined)
        for(let i = 0;i < this.advisors.length; i++){
            const res = await axios.get('/account/'+this.advisors[i].email)
            this.advisors[i].id = res.data.advisor.id
            let check = this.allquota.filter(quota=>quota.advisor.id===this.advisors[i].id).length===0
            let check_Atype = this.allquota.filter(quota=>quota.advisor.id===this.advisors[i].id && quota.teamType==='A').length===0
            let check_Btype = this.allquota.filter(quota=>quota.advisor.id===this.advisors[i].id && quota.teamType==='B').length===0
            let check_Ctype = this.allquota.filter(quota=>quota.advisor.id===this.advisors[i].id && quota.teamType==='C').length===0
            if(check){
                if(this.advisors[i].advisor.A===true){
                    this.postquota.push({
                        teamType : 'A',
                        quota: 0,
                        advisorId: res.data.advisor.id,
                        name: this.advisors[i].advisor.name
                    })
                }
                if(this.advisors[i].advisor.B===true){
                    this.postquota.push({
                        teamType : 'B',
                        quota: 0,
                        advisorId: res.data.advisor.id,
                        name: this.advisors[i].advisor.name
                    })
                }
                if(this.advisors[i].advisor.C===true){
                    this.postquota.push({
                        teamType : 'C',
                        quota: 0,
                        advisorId: res.data.advisor.id,
                        name: this.advisors[i].advisor.name
                    })
                } 
            }
            else{
                if(check_Atype && this.advisors[i].advisor.A===true){
                    this.postquota.push({
                        teamType : 'A',
                        quota: 0,
                        advisorId: res.data.advisor.id,
                        name: this.advisors[i].advisor.name
                    })
                }
                if(check_Btype && this.advisors[i].advisor.B===true){
                    this.postquota.push({
                        teamType : 'B',
                        quota: 0,
                        advisorId: res.data.advisor.id,
                        name: this.advisors[i].advisor.name
                    })
                }
                if(check_Ctype && this.advisors[i].advisor.C===true){
                    this.postquota.push({
                        teamType : 'C',
                        quota: 0,
                        advisorId: res.data.advisor.id,
                        name: this.advisors[i].advisor.name
                    })
                } 

            }        
        }
        console.log();
    },
    async postEnrollmentQuota(quota){
        const response = await axios.post('/enrollment-quota/',{
            teamType:quota.teamType,
            quota:parseInt(quota.quota,10),
            advisorId:quota.advisorId
        })
        console.log(response);
        if(response.status===201){
            // alert('儲存新quota')
        }
    },
    async patchEnrollmentQuota(quota){
        const response = await axios.patch('/enrollment-quota/'+quota.id,{
            quota:parseInt(quota.quota,10),
        })
        if(response.status===200){
            // alert('儲存舊quota');
        }
    },
    async getGroupQuota(){
        const response = await axios.get('/group-quota-limit/')
        this.groupQuotas = response.data;
        console.log(this.groupQuotas);

    },
    saveQuota(){
        this.postquota.map((quota)=>{
            this.postEnrollmentQuota(quota)
        })
        this.allquota.map((quota)=>{
            this.patchEnrollmentQuota(quota)
        })
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
                <h1 class="my-6 mx-6">管理員 / 系統參數設定</h1>
                <div class="mx-6 flex flex-col">
                    <div class="flex flex-row justify-between">
                        <h1 class="text-xl font-extrabold">網站設定</h1>
                        <p class="underline">清空去年資料</p>
                    </div>
                    <div class="flex flex-col pl-32 pb-10 border-b border-slate-300">
                        <div class="flex flex-row items-center my-3 pl-4">
                            <h2 class="mr-7">學年度:</h2>
                            <PlainTextField length="w-short" v-model="siteInfo.semesterYear" />
                        </div>
                        <div class="flex flex-row items-center my-3">
                            <h2 class="mr-7">公務帳號:</h2>
                            <PlainTextField length="w-long" v-model="siteInfo.officialAccount" />
                        </div>
                        <div class="flex flex-row items-center my-3 pl-4">
                            <h2 class="mr-7">主承辦:</h2>
                            <div class="flex flex-row items-center">
                                <h2 class="mr-3">姓名</h2>
                                <PlainTextField length="w-short" v-model="siteInfo.primaryUndertaker" />
                            </div>
                            <div class=" flex flex-row ml-7 items-center">
                                <h2 class="mr-3">職稱</h2>
                                <PlainTextField length="w-short" v-model="siteInfo.primaryUndertakerJobTitle" />
                            </div>
                            <div class=" flex flex-row ml-7 items-center">
                                <h2 class="mr-3">Email</h2>
                                <PlainTextField length="w-long" v-model="siteInfo.primaryUndertakerEmail" />
                            </div>
                        </div>
                        <div class="flex flex-row items-center my-3 pl-4">
                            <h2 class="mr-7">次承辦:</h2>
                            <div class="flex flex-row items-center">
                                <h2 class="mr-3">姓名</h2>
                                <PlainTextField length="w-short" v-model="siteInfo.secondaryUndertaker" />
                            </div>
                            <div class=" flex flex-row ml-7 items-center">
                                <h2 class="mr-3">職稱</h2>
                                <PlainTextField length="w-short" v-model="siteInfo.secondaryUndertakerJobTitle" />
                            </div>
                            <div class=" flex flex-row ml-7 items-center">
                                <h2 class="mr-3">Email</h2>
                                <PlainTextField length="w-long" v-model="siteInfo.secondaryUndertakerEmail" />
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <BlackButton buttonType="儲存" length="w-button-short" @toggle="patchSiteInfo"></BlackButton>
                    </div>
                </div>
                <div class="mx-6 flex flex-col mb-10">
                    <div class="flex flex-row justify-between">
                        <h1 class="text-xl font-extrabold">組別設定</h1>
                    </div>
                    <div class="flex flex-row mt-4">
                        <button v-for="tab in tabs" :key="tab"  
                            :class="{'font-extrabold border-b border-black w-16 py-2 px-2':currenttab === tab,
                                'border-b w-16 py-2 px-2':currenttab !== tab
                            }" 
                            @click="currenttab = tab"
                            >{{ tab==='A'?'甲組':(tab==='B'?'乙組':'丙組') }}
                        </button>
                        <div class="border-b w-full"></div>
                    </div>
                    
                    <div class="flex flex-col border-b border-slate-300">
                        <div class="flex flex-col my-5">
                            <h1 class="font-bold text-xl mb-5">學生</h1>
                            <router-link :to="`/admin-studentgroup/${currenttab==='A'?'甲組':(currenttab==='B'?'乙組':'丙組')}`">
                                <button class="ml-20 border border-black rounded-md px-3 py-2 w-32">編輯學生群組</button>
                            </router-link>
                        </div>
                        <div class="flex flex-col my-5">
                            <h1 class="font-bold text-xl mb-5">教授</h1>
                            <div class="flex flex-row ml-20 mb-12">
                                <p>面談時間表:</p>
                                <a class="mx-5 text-[#513AA6] underline">選擇檔案</a>
                            </div>
                            <div class="border rounded-lg flex flex-col mb-20">
                                <div class="flex flex-row border-b">
                                    <h1 class="my-3 mx-14">教授姓名</h1>
                                    <h1 class="my-3 mx-14">114可指導新生人數</h1>
                                    <h1 class="my-3 mx-14">甄試正取生已同意</h1>
                                    <h1 class="my-3 mx-14">甄試備取生已同意</h1>
                                    <h1 class="my-3 mx-14">考試報到生已同意</h1>
                                    <h1 class="my-3 mx-14">手動調整</h1>
                                    <h1 class="my-3 mx-14">總共已同意學生數</h1>
                                </div>
                                <div v-for="(quota, index) in allquota.filter(quota=>quota.teamType===currenttab)" :key="index" class="flex flex-row my-3">
                                    <h1 class="my-3 mx-14 w-24">{{ quota.advisor.name }}</h1>
                                    <PlainTextField length="w-short"  :class="'my-3 mx-14'" v-model="quota.quota" />
                                    <h1 class="my-3 mx-14 w-32 text-center"></h1>
                                    <h1 class="my-3 mx-14 w-32 text-center"></h1>
                                    <h1 class="my-3 mx-14 w-32 text-center"></h1>
                                    <h1 class="my-3 mx-14 w-32 text-center"></h1>
                                    <h1 class="my-3 mx-14 w-32 text-center"></h1>
                                </div>
                                <div v-for="(quota, index) in postquota.filter(quota=>quota.teamType===currenttab)" :key="index" class="flex flex-row my-3">
                                    <h1 class="my-3 mx-14 w-24">{{ quota.name }}</h1>
                                    <PlainTextField length="w-short"  :class="'my-3 mx-14'" v-model="quota.quota" />
                                    <h1 class="my-3 mx-14 w-32 text-center"></h1>
                                    <h1 class="my-3 mx-14 w-32 text-center"></h1>
                                    <h1 class="my-3 mx-14 w-32 text-center"></h1>
                                    <h1 class="my-3 mx-14 w-32 text-center"></h1>
                                    <h1 class="my-3 mx-14 w-32 text-center"></h1>
                                </div>

                            </div>
                            <div class="flex flex-row justify-between">
                                <h1 class="text-xl font-extrabold">其他名額限制規則</h1>
                                <router-link :to="`/alert-patchgroup/${currenttab}/新增`">
                                    <p class="underline">新增規則</p>
                                </router-link>
                            </div>
                            <div class="border rounded-lg flex flex-col mb-20">
                                <div class="flex flex-row border-b">
                                    <h1 class="my-3 mx-14">學生群組</h1>
                                    <h1 class="my-3 mx-14">限制名額</h1>
                                </div>
                                <div v-for="(quota,index) in groupQuotas" :key="index">
                                    <div v-for="(group,group_index) in quota.studentGroups.filter(group=>group.teamType===currenttab)" :key="group_index" class="flex flex-row my-3">
                                        <h1 class="my-3 mx-14">{{ group.groupName }}</h1>
                                        <h1 class="my-3 mx-10 w-20 text-center">{{ quota.quota }}</h1>
                                        <div class="my-3 mx-10 w-20 text-center flex flex-row">
                                            <router-link :to="`/alert-patchgroup/${group}`"><img src="@/assets/edit.png" class="w-4 h-4 mx-2" ></router-link>
                                            <router-link :to="`/alert-deletegroup/${group}`"><img src="@/assets/trash.png" class="w-4 h-4 mx-2 "  ></router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                    </div>
                    <div class="flex justify-end">
                        <BlackButton buttonType="儲存" length="w-button-short" @toggle="saveQuota"></BlackButton>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>