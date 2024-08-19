<script>
import Multiselect from 'vue-multiselect'
import PlainTextField from '../../components/PlainTextField.vue';
import axios from '../../utils/axios';
  export default {
    components: { PlainTextField,Multiselect },
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
        action:'',
        team:'',
        show: true,
        value: [],
        studentGroups:[],
        quota:0,
        };
    },
    created(){
        this.action = this.$route.params.type
        this.team = this.$route.params.team
    },
    mounted(){
      this.getGroups();
    },
    methods: {
      closeAlert() {
        this.$router.replace('/admin-systemparameter');
      },
      async getGroups(){
        const response = await axios.get('/student-group/')
        this.studentGroups = response.data.filter(group=>group.teamType===this.team)
        console.log(this.studentGroups)
      },
      async postGroupQuota(){
        let postIds = []
        this.value.map((group)=>{
          postIds.push(group.id);
        })
        const response = await axios.post('/group-quota-limit/',{
          quota: parseInt(this.quota,10),
          studentGroupIds: postIds,
        })
        if(response.status===201){
          alert('群組規則儲存成功');
        }
      }
    }
  }
</script>

<template>
    <div class="bg-slate-500 flex justify-center items-center mb-">
        <div class=" flex flex-col bg-white text-black w-128 h-68 z-50 p-4 rounded-lg shadow-md transition-all">
          <div class="flex flex-row justify-between">
            <h1>{{ action }}名額限制規則</h1>
            <button class="text-lg" @click="closeAlert">&times;</button>
          </div>
          <div class="flex flex-row items-center">
            <h1 class="w-36">學生群組: </h1>
            <multiselect v-model="value" placeholder="Search or add a tag" label="groupName"
                 track-by="id" :options="studentGroups" :multiple="true"></multiselect>
          </div>
          <div class="flex flex-row items-center">
            <h1 class="w-28">限制名額: </h1>
            <PlainTextField length="w-short"  :class="'my-3'" v-model="quota" />
          </div>
          <div class="flex flex-row items-center">
            <h1 class="w-28">規則說明:</h1>
            <h1 class="">每個{{ this.team==='A'?'甲組':(this.team==='B'?'乙組':'丙組') }}教授只能在選定的學生群組中招收{{quota}}名學生</h1>
          </div>
          <div class="flex items-end justify-end">
            <button class="mt-10 text-lg border border-black w-20 h-10 rounded-xl mb-4" @click="postGroupQuota">確認</button>
          </div>
        </div>
    </div>
</template>
<style src="../../../node_modules/vue-multiselect/dist/vue-multiselect.css"></style>