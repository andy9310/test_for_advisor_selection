<script>
import draggable from 'vuedraggable'
import SelectStatus from '@/components/SelectStatus.vue';
import BlackButton from '@/components/BlackButton.vue';
import NavBar from '../components/NavBar.vue';
import axios from '../utils/axios';
export default{
  components: {
    draggable,
    SelectStatus,
    BlackButton,
    NavBar,
  },
  data() {
    return {
      userEmail: this.$store.state.email,
      studentId:0,
      teamType:'',
      num_limit:6,
      group:'',
      selected_professors:[],
      advisors_name:[''],
      now_selected:'',
      send:false,
    };
  },
  mounted(){
    this.getAllAdvisor();
    for(let i = 0;i < this.num_limit;i++){
      this.selected_professors.push('')
    }
    
  },
  methods: {
    async getRanking(){
      const response = await axios.get('/preference-ranking/me')
      if(response.data.length===0){
        this.startRanking();
      }
    },
    async startRanking(){
      console.log(this.studentId);
      const response = await axios.post('/preference-ranking/',{
        studentId: parseInt(this.studentId,10)
      })
      if(response.status === 201){
        alert('post success')
        console.log(response);
      }
      else{
        alert(response.status)
      }

    },
    async getSelf(){
      const response = await axios.get('/account/'+this.userEmail)
      this.teamType = response.data.student.teamType
      this.studentId = response.data.student.id
    },
    async getAllAdvisor(){
      this.getSelf();
      const response = await axios.get('/account/',{params:{type:'advisor'}})
      let tmp_advisors = response.data.filter(account=>account.advisor!==undefined)
      for(let i = 0; i < tmp_advisors.length; i++){
        if(tmp_advisors[i].advisor.A===true && this.teamType==='A'){
          this.advisors_name.push(tmp_advisors[i].advisor.name);
        }
        else if(tmp_advisors[i].advisor.B===true && this.teamType==='B'){
          this.advisors_name.push(tmp_advisors[i].advisor.name);
        }
        else if(tmp_advisors[i].advisor.C===true && this.teamType==='C'){
          this.advisors_name.push(tmp_advisors[i].advisor.name);
        }
      }
      this.getRanking();
    },
    updateSelected(index,value){
      let check = -1
      for(let i = 0;i < this.selected_professors.length;i++){
        if(this.selected_professors[i]===value){
          check = i
        }
      }
      if(check !== -1){
        this.selected_professors[check] = '';
      }
      this.selected_professors[index] = value;
      console.log(this.selected_professors)
    }
  },
}
</script>

<template>
    <div class="flex h-screen flex-col overflow-hidden bg-[url('../assets/gradient.png')] bg-cover relative">
        <img src="@/assets/G.png" class=" absolute top-8 left-84rem w-28 h-28 z-10">
        <img src="@/assets/I.png" class=" absolute top-96 w-12 h-28 z-10">
        <img src="@/assets/C.png" class=" absolute bottom-52 right-1 w-28 h-28 z-10">
        <img src="@/assets/E.png" class=" absolute bottom-1 left-25rem w-28 h-28 z-10">
        <NavBar/>
        <div class="container mx-auto grid flex-grow grid-cols-2 items-start py-2">
            <div class="relative h-full">
                <div class="absolute top-1/3 h-full overflow-y-auto pl-8 pr-8 mr-10">
                    <h1 class="text-5xl pb-12 pt-12 font-bold">臺大電信所 <br/>指導教授填選系統</h1>
                    <div class="flex flex-row">
                      <img src="@/assets/info.png" class="w-5 h-5 mx-2">
                      <h1>開放時間至 2024/05/31 下午 05:00:00 止，系統關閉後無法再登入修改填選志願序</h1>
                    </div>
                </div>
            </div>
            <div class="flex flex-col h-full mt-10 ">
                <div class="rounded-3xl bg-white bg-opacity-80  flex flex-col w-11/12 h-5/6 z-50 py-10 px-10 relative">
                    <h1 class="text-xl font-bold">填選指導教授</h1>
                    <h1>{{teamType==='A'?'甲組':(teamType==='B'?'乙組':'丙組')}}{{ group }}志願序最多填選{{num_limit}}位教授。請確認已與教授洽談過，送出志願序後<br>即無法自行修改，如需修改請聯絡所辦。</h1>
                    <div class="flex flex-row mt-10">
                      <h1 class="w-40">志願序</h1>
                      <h1>教授姓名</h1>
                    </div>
                    <draggable v-model="selected_professors" 
                            tag="ol"  
                            animation="200"
                            ghost-class="ghost"
                            :forceFallback="true"
                            :fallbackOnBody="true"
                            fallbackClass="fallback" >
                      <template #item="{ index }">
                        <div class="flex flex-row w-full relative my-5 items-center">
                            <div class="w-40  items-center flex flex-row">
                                <img src="@/assets/drag.png" class=" cursor-pointer">
                                <h1>{{ index+1 }}</h1>
                            </div>
                            <SelectStatus :multistatus="advisors_name" @toggle="updateSelected(index,$event)" v-model="selected_professors[index]"></SelectStatus>
                            <img v-if="selected_professors[index]!=''" src="@/assets/eraser.png" class="w-4 h-4 mx-3 cursor-pointer" @click="selected_professors[index]=''"> 
                        </div>
                      </template>
                        
                    </draggable>
                    <div v-if="send===false" class="absolute bottom-5 right-20" v-on:click="send=true">
                      <BlackButton  buttonType="送出志願序" length='w-32' />
                    </div>
                    <div v-if="send===true" class="absolute bottom-5 right-20">
                      <button  class="w-32 bg-[#E9E9EE] rounded-xl py-2 text-[#B6B6BD] my-10">送出志願序</button>
                    </div>
                    <div v-if="send===true" class="flex flex-row absolute bottom-5 left-20 my-10 items-center">
                      <img src="@/assets/check-circle.png" class="w-5 h-5">
                      <h1>已成功送出志願序</h1>
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

<!--  -->