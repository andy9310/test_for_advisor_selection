<script>
import axios from '../../utils/axios';
  export default {
    name: 'AlertDeleteExaminee',
    data(){
        return{
            examineeId:'',
            name:'',
            team:'',
        }
    },
    created(){
        this.examineeId = this.$route.params.id;
        this.team = this.$route.params.team
    },
    mounted(){
      this.getExaminee();
    },
    computed: {
    },
    methods: {
      closeAlert() {
        this.$router.replace(`/admin-studentgroup/${this.team}`);
      },
      async getExaminee(){
        const response = await axios.get('/examinee/'+ this.examineeId)
        this.name = response.data.name
      },
      async deleteExaminee(){
        const response = await axios.delete('/examinee/'+ + this.examineeId)
        console.log(response);
        if(response.status===200){
          alert("刪除考生成功");
          this.$router.replace(`/admin-studentgroup/${this.team}`);
        }
      },

    }
  }
</script>

<template>
    <div class="bg-slate-500 flex justify-center items-center mb-">
        <div class=" flex flex-col bg-white text-black w-128 h-56 z-50 p-4 rounded-lg shadow-md transition-all">
          <div class="flex flex-row justify-end">
            <button class="text-lg" @click="closeAlert">&times;</button>
          </div>
          <div class="flex flex-row items-center">
            <img src="@/assets/alert-filled.png" class="h-20 w-20">
            <div class="flex flex-col">
              <h1 class="text-2xl">刪除考生</h1>
              <div class="flex flex-row">
                <h1>此操作無法回覆，確定要刪除</h1>
                <h1 class="font-black mx-2">{{name}}</h1>
                <h1>嗎?</h1>
              </div>
            </div>
          </div>
          <div class="flex flex-row items-end justify-end">
            <button class="mt-10 text-lg border border-black w-20 h-10 rounded-xl mb-4 mx-2" @click="closeAlert">
              <h1 class="">取消</h1>
            </button>
            <button class="mt-10 text-lg border border-black w-20 h-10 rounded-xl mb-4 mx-2 bg-[#CA2121] text-white" @click="deleteExaminee">
              <h1 class="">刪除</h1>
            </button>
          </div>
        </div>
    </div>
</template>