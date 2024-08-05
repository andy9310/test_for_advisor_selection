<script>
import PlainTextField from '../../components/PlainTextField.vue';
  export default {
    components: {
    PlainTextField,
    },
    props: {
    },
    data() {
      return {
        name: '',
        email:'',
        phone:'',

      };
    },
    created(){
        this.name = this.$route.params.name
    },
    computed: {
    },
    methods: {
      closeAlert() {
        this.$router.replace('/admin-accountmanage');
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
            <PlainTextField length="w-short"  :class="'my-3'" v-model="name" />
          </div>
          <div class="flex flex-row items-center">
            <h1 class="w-28">信箱: </h1>
            <PlainTextField length="w-middle"  :class="'my-3'" v-model="email" />
          </div>
          <div class="flex flex-row items-center">
            <h1 class="w-28">行動電話: </h1>
            <PlainTextField length="w-middle"  :class="'my-3'" v-model="phone" />
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