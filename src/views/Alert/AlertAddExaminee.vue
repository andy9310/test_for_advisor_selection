<script>
import PlainTextField from '../../components/PlainTextField.vue';
import axios from '../../utils/axios';
  export default {
    components: {
        PlainTextField,
    },
    props: {
    },
    data() {
      return {
        index: '',
        team:'',
        groupId:'',
        examinee:{
          admission:'',
          rank:{
            A:true, // A=正取
            B:false, // B=備取
          },
          name:'',
          examineeNumber:'',
        }
      };
    },
    created(){
        this.index = this.$route.params.index;
        this.team = this.$route.params.team;
        this.groupId = this.$route.params.groupid;
    },
    computed: {
    },
    methods: {
      closeAlert() {
        this.$router.replace(`/admin-studentgroup/${this.team}`);
      },
      rankSelect(){
        if(this.examinee.rank.A){
          this.examinee.rank.A = false
          this.examinee.rank.B = true
        }
        else{
          this.examinee.rank.A = true
          this.examinee.rank.B = false
        }
      },
      async postExaminee(){
        const response = await axios.post('/examinee/',{
          admission: this.examinee.admission,
          ranking: this.examinee.rank.A===true?'正取':'備取',
          name: this.examinee.name,
          examineeNumber: this.examinee.examineeNumber,
        })
        if(response.status === 201){
          alert('建立新考生成功');
          const res = await axios.get('/examinee/')
          let new_examinee_id = res.data.filter(examinee=>examinee.examineeNumber===this.examinee.examineeNumber)[0].id
          this.patchexaminee(new_examinee_id);
        }
      },
      async patchexaminee(id){
        let id_array = []
        const response = await axios.get('/student-group/'+this.groupId)
        response.data.examinees.map((examinee)=>{
          id_array.push(examinee.id)
        })
        console.log(this.index);
        console.log(id_array)
        id_array.splice(this.index,0,id);
        console.log(id_array);
        const res = await axios.patch('/student-group/'+this.groupId,{
          groupName: response.data.groupName,
          teamType: response.data.teamType,
          preferenceQuantity: response.data.preferenceQuantity,
          requiredAdvisorApproval: response.data.requiredAdvisorApproval,
          enabledAdvisorQuotaCheck: response.data.enabledAdvisorQuotaCheck,
          openAt: response.data.openAt,
          closeAt: response.data.closeAt,
          examinees: id_array
        })
        if(res.status===200){
          alert('ok')
        }
      },
    }
  }
</script>

<template>
    <div class="bg-slate-500 flex justify-center items-center mb-">
        <div class=" flex flex-col bg-white text-black w-128 h-68 z-50 p-4 rounded-lg shadow-md transition-all">
          <div class="flex flex-row justify-between">
            <h1>新增考生</h1>
            <button class="text-lg" @click="closeAlert">&times;</button>
          </div>
          <div class="flex flex-row items-center">
            <h1 class="w-28">入學方式: </h1>
            <PlainTextField length="w-short"  :class="'my-3'" v-model="examinee.admission" />
          </div>
          <div class="flex flex-row items-center">
            <h1 class="w-28">名次: </h1>
            <div class="flex flex-row mr-4 items-center">
                <img v-if="examinee.rank.A===false" src="@/assets/unselect_square.png" class="w-4 h-4 cursor-pointer" @click="rankSelect">
                <img v-if="examinee.rank.A===true" src="@/assets/select_square.png" class="w-4 h-4 cursor-pointer" @click="rankSelect">
                <label for="1" class="ml-2">正取</label>
            </div>
            <div class="flex flex-row mr-4 items-center">
                <img v-if="examinee.rank.B===false" src="@/assets/unselect_square.png" class="w-4 h-4 cursor-pointer" @click="rankSelect">
                <img v-if="examinee.rank.B===true" src="@/assets/select_square.png" class="w-4 h-4 cursor-pointer" @click="rankSelect">
                <label for="1" class="ml-2">備取</label>
            </div>
          </div>
          <div class="flex flex-row items-center">
            <h1 class="w-28">考生姓名: </h1>
            <PlainTextField length="w-middle"  :class="'my-3'" v-model="examinee.name" />
          </div>
          <div class="flex flex-row items-center">
            <h1 class="w-28">准考證號: </h1>
            <PlainTextField length="w-middle"  :class="'my-3'" v-model="examinee.examineeNumber" />
          </div>
          <div class="flex items-end justify-end">
            <button class="mt-10 text-lg border border-black w-20 h-10 rounded-lg mb-4 mx-3 py-2" @click="closeAlert">
              取消
            </button>
            <button class="mt-10 text-lg  bg-[#41414E] text-white w-20 h-10 rounded-lg mb-4 py-2" @click="postExaminee">
              儲存
            </button>
          </div>
        </div>
    </div>
</template>
<style src="../../../node_modules/vue-multiselect/dist/vue-multiselect.css"></style>