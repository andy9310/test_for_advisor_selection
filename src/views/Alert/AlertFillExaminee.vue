<script>
import BlackButton from '@/components/BlackButton.vue';
import axios from '../../utils/axios';
  export default {
    components: {
        BlackButton,
    },
    name: 'AlertFillExaminee',
    data(){
        return{
            group:'',
            team:'',
            excel_examinee:'',
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
      },
      async fillExaminee(){
        //console.log( this.excel_examinee.split(/[\t ]+/))
        let tmp_examinees = this.excel_examinee.split(/[\t ]+/);
        let examinees = [];
        for (let i = 0; i < tmp_examinees.length; i += 4) {
          let array = tmp_examinees.slice(i, i + 4);
          let examinee_object = {
            'admission':array[0],
            'ranking':array[1],
            'name':array[3],
            'examineeNumber':array[2],
          }
          examinees.push(examinee_object);
        }
        const response = await axios.post('/examinee/bulk', examinees)
        console.log(response);
        if(response?.status == 201){
          alert('匯入成功');
          this.excel_examinee = '';
        }
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
          <input type="text" class="my-5 mx-8 border border-slate-300 h-40 rounded-lg" v-model="excel_examinee"/>
          <div class="flex flex-row justify-end">
            <button class=" w-button-short my-10 bg-white rounded-xl border border-current mx-4" @click="closeAlert">取消</button>
            <BlackButton buttonType="匯入" length="w-button-short" @toggle="fillExaminee"></BlackButton>
          </div>
          
        </div>
    </div>
</template>