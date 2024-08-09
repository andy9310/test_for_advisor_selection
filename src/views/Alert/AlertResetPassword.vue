<script>
import axios from '../../utils/axios';
  export default {
    props: {
    },
    data() {
      return {
        email:'',
        password:'andy9330',
        name:'',
      };
    },
    created(){
      this.email = this.$route.params.email
    },
    mounted(){
      this.getAccount();
      this.patchAccount();
    },
    computed: {
    },
    methods: {
      closeAlert() {
        this.$router.replace('/admin-accountmanage');
      },
      async getAccount(){
        const response = await axios.get('/account/'+ this.email)
        this.email = response.data.email
        this.name = response.data.advisor===undefined?response.data.student.name:response.data.advisor.name
      },
      async patchAccount(){
        const response = await axios.patch('/account/'+ this.email, {
            email:this.email,
            password:this.password
        })
        console.log(response);
      },
      copy(){
        navigator.clipboard.writeText(this.password).then(
          ()=>{alert("複製密碼至剪貼簿成功");}
        )
      }
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
            <img src="@/assets/check-circle.png" class="h-20 w-20">
            <div class="flex flex-col ml-3">
              <h1 class="text-2xl font-bold">密碼已重設</h1>
              <div class="flex flex-row items-center">
                <h1>{{name}}的密碼已重設為</h1>
                <h1 class="underline mx-1" ref="input">{{ password }}</h1>
                <img src="@/assets/copy.png" class="w-4 h-4 cursor-pointer" @click="copy">
              </div>
            </div>
          </div>
          <div class="flex items-end justify-end">
            <button class="mt-10 text-lg border border-black w-20 h-10 rounded-xl mb-4 text-center" @click="closeAlert">完成</button>
          </div>
        </div>
    </div>
</template>