<script >
import PlainTextField from '../components/PlainTextField.vue';
import TeamChip from '../components/TeamChip.vue';
import NavBar from '../components/NavBar.vue';
import SearchInput from '../components/SearchInput.vue';
import axios from '../utils/axios';
export default{
  components: {
    PlainTextField,
    TeamChip,
    NavBar,
    SearchInput,
  },
  data() {
    return {
        advisors:[],
        students:[],
        time:{
            start:'2024/11/01 09:00起',
            end:'2024/11/14 17:00迄',
        },
    };
  },
  mounted(){
    this.getAllAccount();
  },
  methods: {
    async getAllAccount(){
        const response_advisor = await axios.get('/account/',{params:{type:'advisor'}})
        this.advisors = response_advisor.data.filter(account=>account.advisor!==undefined)
        const response_student = await axios.get('/account/',{params:{type:'student'}})
        this.students = response_student.data.filter(account=>account.student!==undefined)
    },
    async getAdvisorAccount(){
        const response = await axios.post('/account/fetch-advisor')
        if(response.status===200){
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
                <h1 class="my-6 mx-6">管理員 / 帳號管理</h1>
                <div class="mx-6 flex flex-col">
                    <div class="flex flex-row justify-between">
                        <h1 class="text-2xl font-extrabold">教授帳號</h1>
                        <div class="flex flex-row items-center">
                            <p class="underline mx-3 text-[#513AA6] cursor-pointer " @click="getAdvisorAccount()">從大量寄信系統下載教授帳號</p>
                            <router-link :to="`/alert-admin-addadvisor`">
                                <p class="underline mx-3 text-[#513AA6]">新增帳號</p>
                            </router-link>
                            <SearchInput length="w-middle" />
                        </div>
                    </div>
                    <div class="border rounded-lg flex flex-col mb-20 my-5">
                        <div class="flex flex-row border-b">
                            <h1 class="my-3 pl-10 w-72 text-start">教授姓名</h1>
                            <h1 class="my-3 pl-10 w-96 text-start">信箱</h1>
                            <h1 class="my-3 pl-10 w-72 text-start">組別</h1>
                            <h1 class="my-3 pl-10 w-72 text-start">帳號類型</h1>
                        </div>
                        <div v-for="advisor in advisors" :key="advisor" class="flex flex-row my-3">
                            <h1 class="my-3 pl-10 w-72 text-start">{{ advisor.advisor.name }}</h1>
                            <h1 class="my-3 pl-10 w-96 text-start">{{ advisor.email }}</h1>
                            <div  class="my-3 pl-10 w-72 flex flex-row items-start">
                                <TeamChip v-if="advisor.advisor.A===true" :buttonType="'甲組'"/>
                                <TeamChip v-if="advisor.advisor.B===true" :buttonType="'乙組'"/>
                                <TeamChip v-if="advisor.advisor.C===true" :buttonType="'丙組'"/>
                            </div>
                            <h1 v-if="advisor.advisor.accountType!=='ccAccount'" class="my-3 pl-10 pt-3 w-40 items-center">本地帳號</h1>
                            <h1 v-if="advisor.advisor.accountType ==='ccAccount'" class="my-3 pl-10 pt-3 w-40 text-start">計中帳號</h1>
                            <div class="flex flex-row justify-between items-center">
                                <router-link :to="`/alert-admin-reviseadvisor/${advisor.email}`">
                                    <img src="@/assets/edit.png" class="w-5 h-5 mr-3">
                                </router-link>
                                <router-link :to="`/alert-admin-resetpassword/${advisor.email}`">
                                    <img src="@/assets/password.png" class="w-5 h-5 mr-3">
                                </router-link>
                                <router-link :to="`/alert-admin-deleteaccount/${advisor.email}`"> 
                                    <img src="@/assets/trash.png" class="w-5 h-5 mr-3">
                                </router-link>
                            </div>
                        </div>

                    </div>
                    <div class="flex flex-row justify-between">
                        <h1 class="text-2xl font-extrabold">學生帳號</h1>
                        <div class="flex flex-row items-center">
                            <PlainTextField length="w-short" />
                        </div>
                    </div>
                    <div class="border rounded-lg flex flex-col mb-20 my-5">
                        <div class="flex flex-row border-b">
                            <h1 class="my-3 pl-10 w-40 text-start">學生姓名</h1>
                            <h1 class="my-3 pl-10 w-52 text-start">信箱</h1>
                            <h1 class="my-3 pl-10 w-48 text-start">組別</h1>
                            <h1 class="my-3 pl-10 w-48 text-start">組別群組名</h1>
                            <h1 class="my-3 pl-10 w-48 text-start">准考證號</h1>
                            <h1 class="my-3 pl-10 w-48 text-start">行動電話</h1>
                        </div>

                        <div v-for="student in students" :key="student" class="flex flex-row my-3">
                            <h1 class="my-3 pl-10 w-40 text-start">{{ student.student.name }}</h1>
                            <h1 class="my-3 pl-10 w-52 text-start">{{ student.email }}</h1>
                            <div  class="my-3 pl-10 w-48 flex flex-row items-start">
                                <TeamChip :buttonType="student.student.teamType==='A'?'甲組':student.student.teamType==='B'?'乙組':'丙組' "/>
                            </div>
                            <h1 class="my-3 pl-10 w-48 text-start"></h1>
                            <h1 class="my-3 pl-10 w-48 text-start">{{ student.student.examineeNumber }}</h1>
                            <h1 class="my-3 pl-10 w-48 text-start">{{ student.student.phoneNumber }}</h1>
                            <div class="flex flex-row justify-between items-start mt-3">
                                <router-link :to="`/alert-admin-revisestudentaccount/${student.student.id}`"> 
                                    <img src="@/assets/edit.png" class="w-5 h-5 mr-3">
                                </router-link>
                                <router-link :to="`/alert-admin-resetpassword/${student.email}`"> 
                                    <img src="@/assets/password.png" class="w-5 h-5 mr-3">
                                </router-link>
                                <router-link :to="`/alert-admin-deleteaccount/${student.email}`"> 
                                    <img src="@/assets/trash.png" class="w-5 h-5 mr-3">
                                </router-link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
                
        </div>
    </div>
    
</template>