<script>
  export default {
    name: 'AlertDeleteGroup',
    data(){
        return{
            group:''
        }
    },
    created(){
        this.group = this.$route.params.group
        console.log(this.$route.params.group)
    },
    computed: {
      alertClass() {
        switch (this.type) {
          case 'info':
            return 'bg-blue-500 text-white';
          case 'success':
            return 'bg-green-500 text-white';
          case 'warning':
            return 'bg-yellow-500 text-black';
          case 'error':
            return 'bg-red-500 text-white';
          default:
            return 'bg-gray-300 text-black';
        }
      }
    },
    methods: {
      closeAlert() {
        this.$router.replace('/login');
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
            <img src="@/assets/alert-filled.png" class="h-20 w-20">
            <div class="flex flex-col">
              <h1 class="text-2xl">刪除名額限制規則?</h1>
              <div class="flex flex-row">
                <h1>確定刪除</h1><h1 class="font-bold">{{group}}</h1><h1>的名額限制規則嗎?</h1>
              </div>
            </div>
          </div>
          <div class="flex flex-row items-end justify-end">
            <button class="mt-10 text-lg border-2 border-black w-20 h-10 rounded-xl mb-4 mx-2" @click="closeAlert">
              <h1 class="">取消</h1>
            </button>
            <button class="mt-10 text-lg border-2 border-black w-20 h-10 rounded-xl mb-4 mx-2" @click="closeAlert">
              <h1 class="">刪除</h1>
            </button>
          </div>
        </div>
    </div>
</template>