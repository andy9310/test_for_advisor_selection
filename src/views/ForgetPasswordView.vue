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
            <div class="relative h-full">
                <div class="absolute top-1/3 h-full overflow-y-auto pl-8 pr-8 mr-10">
                    <h1 class="text-5xl pb-12 pt-12 font-bold">臺大電信所 <br/>指導教授填選系統</h1>
                </div>
            </div>
            <div class="flex flex-col h-full mt-10 ">
                <div class="rounded-3xl bg-gray-100 bg-opacity-30  flex flex-col text-center items-center  w-11/12 h-5/6 z-50">
                    <h1 class="text-xl font-bold mt-20 mb-3">忘記密碼</h1>
                    <h1>變更密碼請輸入電子郵件帳號以收取驗證碼</h1>
                    <h1>如您忘記或不清楚電子郵件帳號，請與電信所所辦聯繫</h1>
                    <div class=" w-9/12">
                        <TextField textType="Email帳號" class="mt-4 " v-model="registerUser.email" />
                        <div class="flex flex-col items-center mt-4">
                            <a class="mb-3">獲取驗證碼</a>
                            <img src="@/assets/Line.png" class="w-full">
                        </div>
                        <TextField textType="驗證碼" class="mt-4" v-model="registerUser.name" />
                        <TextField textType="新密碼" class="mt-4 " v-model="registerUser.testNumber" />
                        <TextField textType="確認新密碼" class="mt-4 " v-model="registerUser.phoneNumber" />
                        <BlackButton buttonType="重設密碼"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>