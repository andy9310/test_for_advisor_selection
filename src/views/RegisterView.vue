<script>
import BlackButton from '@/components/BlackButton.vue';
import TextField from '../components/TextField.vue'
export default{
  components: {
    TextField,
    BlackButton,
  },
  data() {
    return {
      registerUser:{
        email:'',
        name:'',
        testNumber:'',
        phoneNumber:'',
        password:'',
        confirmPassword:'',
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
                <div class="absolute top-1/3 h-full overflow-y-auto pl-8 pr-8 mr-10">
                    <h1 class="text-5xl pb-12 pt-12 font-bold">臺大電信所 <br/>指導教授填選系統</h1>
                </div>
            </div>
            <div class="flex flex-col h-full mt-10 ">
                <div class="rounded-3xl bg-gray-100 bg-opacity-30 backdrop-blur-sm  flex flex-col text-center items-center  w-11/12 h-5/6 z-50">
                    <h1 class="text-xl font-bold">註冊帳號</h1>
                    <div class=" w-button-longer">
                        <TextField textType="Email帳號" class="mt-4 " v-model="registerUser.email" />
                        <TextField textType="學生姓名" class="mt-4" v-model="registerUser.name" />
                        <TextField textType="准考證號" class="mt-4 " v-model="registerUser.testNumber" />
                        <TextField textType="行動電話" class="mt-4 " v-model="registerUser.phoneNumber" />
                        <TextField textType="密碼" class="mt-4 " v-model="registerUser.password" />
                        <TextField textType="確認密碼" class="mt-4 " v-model="registerUser.confirmPassword" />
                        <BlackButton buttonType="註冊" length="w-button-longer"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>