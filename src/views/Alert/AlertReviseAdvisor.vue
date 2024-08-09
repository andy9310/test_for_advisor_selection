<script>
import PlainTextField from '../../components/PlainTextField.vue';
import axios from '../../utils/axios';
  export default {
    components: { PlainTextField },
    data() {
      return {
        accountInfo:{
          email:'',
          advisor:{
            name:'',
            A:false,
            B:false,
            C:false,
          }
        },
      };
    },
    created(){
        this.accountInfo.email = this.$route.params.email
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
        const response = await axios.get('/account/'+ this.accountInfo.email)
        this.accountInfo.email = response.data.email
        this.accountInfo.advisor = response.data.advisor
      },
      async patchAccount(){
        const response = await axios.patch('/account/'+ this.accountInfo.email, {
            ...this.accountInfo
        })
        console.log(response);
        if(response?.status == 200){
          this.$router.replace('/admin-accountmanage');
        }
      }
    },
    
  }
</script>

<template>
    <div class="bg-slate-500 flex justify-center items-center mb-">
        <div class=" flex flex-col bg-white text-black w-128 h-68 z-50 p-4 rounded-lg shadow-md transition-all">
          <div class="flex flex-row justify-between">
            <h1 class="font-bold ">新增教授帳號</h1>
            <button class="text-lg" @click="closeAlert">&times;</button>
          </div>
          <div class="flex flex-row items-center">
            <h1 class="w-28">教授姓名:</h1>
            <PlainTextField length="w-short"  :class="'my-3'" placeholder="輸入姓名" v-model="accountInfo.advisor.name" />
          </div>
          <div class="flex flex-row items-center">
            <h1 class="w-28">信箱: </h1>
            <PlainTextField length="w-middle"  :class="'my-3'" placeholder="輸入信箱" v-model="accountInfo.email" />
          </div>
          <div class="flex flex-row items-center my-3">
            <h1 class="w-28">組別: </h1>
            <div class="flex flex-row mr-4 items-center">
                <img v-if="accountInfo.advisor.A===false" src="@/assets/unselect_square.png" class="w-4 h-4 cursor-pointer" @click="accountInfo.advisor.A=true">
                <img v-if="accountInfo.advisor.A===true" src="@/assets/select_square.png" class="w-4 h-4 cursor-pointer" @click="accountInfo.advisor.A=false">
                <label for="1" class="ml-2">甲組</label>
            </div>
            <div class="flex flex-row mr-4 items-center">
                <img v-if="accountInfo.advisor.B===false" src="@/assets/unselect_square.png" class="w-4 h-4 cursor-pointer" @click="accountInfo.advisor.B=true">
                <img v-if="accountInfo.advisor.B===true" src="@/assets/select_square.png" class="w-4 h-4 cursor-pointer" @click="accountInfo.advisor.B=false">
                <label for="1" class="ml-2">乙組</label>
            </div>
            <div class="flex flex-row mr-4 items-center">
                <img v-if="accountInfo.advisor.C===false" src="@/assets/unselect_square.png" class="w-4 h-4 cursor-pointer" @click="accountInfo.advisor.C=true">
                <img v-if="accountInfo.advisor.C===true" src="@/assets/select_square.png" class="w-4 h-4 cursor-pointer" @click="accountInfo.advisor.C=false">
                <label for="1" class="ml-2">丙組</label>
            </div>
          </div>
          <div class="flex flex-row items-end justify-end">
            <button class="mt-10 text-lg border border-black w-20 h-10 rounded-lg mb-4 mx-3 py-2" @click="closeAlert">
              取消
            </button>
            <button class="mt-10 text-lg  bg-[#41414E] text-white w-20 h-10 rounded-lg mb-4 py-2" @click="patchAccount">
              儲存
            </button>
          </div>
        </div>
    </div>
</template>
<style src="../../../node_modules/vue-multiselect/dist/vue-multiselect.css"></style>