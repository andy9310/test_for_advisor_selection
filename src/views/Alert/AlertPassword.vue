<script>
  export default {
    props: {
      type: {
        type: String,
        default: 'info'
      },
      message: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        show: true
      };
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
            <img src="@/assets/check-circle.png" class="h-20 w-20">
            <div class="flex flex-col">
              <h1 class="text-2xl">密碼已重設</h1>
              <h1>密碼重設成功，請重新登入</h1>
            </div>
          </div>
          <div class="flex items-end justify-end">
            <button class="mt-10 text-lg border-2 border-black w-20 h-10 rounded-xl mb-4" @click="closeAlert">
              <h1 class="">確認</h1>
            </button>
          </div>
        </div>
    </div>
</template>