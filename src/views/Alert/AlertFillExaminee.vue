<script>
import BlackButton from '@/components/BlackButton.vue';
  export default {
    components: {
        BlackButton,
    },
    name: 'AlertFillExaminee',
    data(){
        return{
            group:'',
            team:''
        }
    },
    created(){
        this.group = this.$route.params.group
        this.team = this.$route.params.team
    },
    computed: {
    },
    methods: {
      closeAlert() {
        this.$router.replace(`/admin-studentgroup/${this.team}`);
      }
    }
  }
</script>

<template>
    <div class="bg-slate-500 flex justify-center items-center">
        <div class=" flex flex-col bg-white text-black w-144 h-96 z-50 p-4 rounded-lg shadow-md transition-all">
          <div class="flex flex-row justify-between">
            <h1 class="font-bold text-lg">匯入考生名單</h1>
            <button class="text-lg" @click="closeAlert">&times;</button>
          </div>
          <div class="my-5 flex flex-col mx-8 border border-slate-300 h-40 rounded-lg">
          </div>
          <div class="flex flex-row justify-end">
            <button class=" w-button-short my-10 bg-white rounded-xl border border-current mx-4">
                <h1 class="text-black py-2">取消</h1>
            </button>
            <BlackButton buttonType="匯入" length="w-button-short"></BlackButton>
          </div>
          
        </div>
    </div>
</template>