<script >
import BlackButton from '@/components/BlackButton.vue';
import Terms from '../components/LoginTerms.vue'
import TextField from '../components/TextField.vue'
export default{
  components: {
    TextField,
    Terms,
    BlackButton,
  },
  data() {
    return {
      loginUser:{
        email:'',
        password:'',
      }
    };
  },
  methods: {
  },
}
</script>


<template>
    <div class="flex h-screen flex-col overflow-hidden bg-[url('../assets/gradient.png')] bg-cover relative">
      <img src="@/assets/G.png" class=" absolute top-16 right-20 w-28 h-28 z-40">
      <img src="@/assets/I.png" class=" absolute top-80 right-i w-12 h-28 z-40">
      <img src="@/assets/C.png" class=" absolute bottom-80 right-32 w-28 h-28 z-40">
      <img src="@/assets/E.png" class=" absolute bottom-16 right-e w-28 h-28 z-40">
      <div class="container mx-auto grid flex-grow grid-cols-2 items-start py-2">

        <div class="relative h-full ">
            
            <div class="absolute h-full overflow-y-auto pr-8 mr-10">
                <h1 class="text-3xl pb-12 pt-12 font-bold">臺大電信所 <br/>指導教授填選系統</h1>
                <Terms />
            </div>
        </div>

        <div class="flex flex-col h-full mt-10 ">
            <div class="rounded-3xl bg-gray-100 bg-opacity-30 backdrop-blur-sm  flex flex-col text-center items-center  w-11/12 h-1/2 pt-10 z-50">
                <h1 class="text-xl font-bold">學生、非電信所現職教師</h1>
                <div class=" w-button-longer">
                  <TextField textType="帳號" class="mt-4 " v-model="loginUser.email" />
                  <TextField textType="密碼" class="mt-4" v-model="loginUser.password" />
                  <BlackButton buttonType="登入" length="w-button-longer"/>
                </div>
                <div class="flex flex-row">
                  <router-link to="/register" class="text-violet-600 ">註冊帳號</router-link>
                  <h1 class="px-3">|</h1>
                  <router-link to="/password" class="text-violet-600 ">忘記密碼</router-link>
                </div>
            </div>
            <div class="rounded-3xl bg-gray-100 bg-opacity-30 backdrop-blur-sm flex flex-col text-center justify-center items-center  w-11/12 h-2/6 mt-10 z-50">
              <h1 class="text-xl font-bold">電信所現職教師</h1>
              <div class=" w-9/12">
                <BlackButton buttonType="臺大計中帳號登入" length="w-button-longer"/>
              </div>
            </div>
        </div>

      </div>
    </div>
</template>
