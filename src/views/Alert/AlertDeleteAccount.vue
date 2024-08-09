<script>
import axios from '../../utils/axios';
  export default {
    name: 'AlertDeleteAccount',
    data(){
        return{
            email:'',
            name:'',
        }
    },
    created(){
        this.email = this.$route.params.email
    },
    mounted(){
      this.getAccount();
    },
    computed: {
    },
    methods: {
      closeAlert() {
        this.$router.replace('/admin-accountmanage');
      },
      async getAccount(){
        const response = await axios.get('/account/'+ this.email)
        this.name = response.data.advisor===undefined?response.data.student.name:response.data.advisor.name
      },
      async deleteAccount(){
        const response = await axios.delete('/account/'+ this.email)
        console.log(response);
        if(response.status===200){
          alert("刪除帳號成功");
          this.$router.replace('/admin-accountmanage');
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
              <h1 class="text-2xl">刪除帳號</h1>
              <div class="flex flex-row">
                <h1>此操作無法回覆，確定要刪除</h1>
                <h1 class="font-black mx-2">{{name}}</h1>
                <h1>的帳號嗎?</h1>
              </div>
            </div>
          </div>
          <div class="flex flex-row items-end justify-end">
            <button class="mt-10 text-lg border border-black w-20 h-10 rounded-xl mb-4 mx-2" @click="closeAlert">
              <h1 class="">取消</h1>
            </button>
            <button class="mt-10 text-lg border border-black w-20 h-10 rounded-xl mb-4 mx-2 bg-[#CA2121] text-white" @click="deleteAccount">
              <h1 class="">刪除</h1>
            </button>
          </div>
        </div>
    </div>
</template>