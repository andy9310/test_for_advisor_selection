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
        id: '',
        accountInfo:{
          name:'',
          email:'',
          phoneNumber:'',
        }

      };
    },
    created(){
        this.id = this.$route.params.studentid
    },
    mounted(){
      this.getAllAccount();
    },
    computed: {
    },
    methods: {
      closeAlert() {
        this.$router.replace('/admin-accountmanage');
      },
      async getAllAccount(){
        const response = await axios.get('/account/',{params:{type:'student'}})
        let account = response.data.filter(account=>account.student.id===this.id)[0] 
        console.log(response.data);
        console.log(account);
      }
    }
  }
</script>

<template>
    <div class="bg-slate-500 flex justify-center items-center mb-">
        <div class=" flex flex-col bg-white text-black w-128 h-68 z-50 p-4 rounded-lg shadow-md transition-all">
          <div class="flex flex-row justify-between">
            <h1>編輯學生帳號</h1>
            <button class="text-lg" @click="closeAlert">&times;</button>
          </div>
          <div class="flex flex-row items-center">
            <h1 class="w-28">學生姓名: </h1>
            <PlainTextField length="w-short"  :class="'my-3'" v-model="accountInfo.name" />
          </div>
          <div class="flex flex-row items-center">
            <h1 class="w-28">信箱: </h1>
            <PlainTextField length="w-middle"  :class="'my-3'" v-model="accountInfo.email" />
          </div>
          <div class="flex flex-row items-center">
            <h1 class="w-28">行動電話: </h1>
            <PlainTextField length="w-middle"  :class="'my-3'" v-model="accountInfo.phoneNumber" />
          </div>
          <div class="flex items-end justify-end">
            <button class="mt-10 text-lg border border-black w-20 h-10 rounded-lg mb-4 mx-3 py-2" @click="closeAlert">
              取消
            </button>
            <button class="mt-10 text-lg  bg-[#41414E] text-white w-20 h-10 rounded-lg mb-4 py-2" @click="closeAlert">
              儲存
            </button>
          </div>
        </div>
    </div>
</template>