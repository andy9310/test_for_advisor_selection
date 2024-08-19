<script>
import axios from '../../utils/axios';
import PlainTextField from '../../components/PlainTextField.vue';
  export default {
    components: { PlainTextField },
    data() {
      return {
        change_type:'',
        advisor_name:'',
        student_name:'',
      };
    },
    computed: {
    },
    methods: {
      closeAlert() {
        this.$router.replace('/admin-changemanage');
      },
      async postChange(){
        const res_advisors = await axios.get('/account/',{params:{type:'advisor'}})
        let tmp_advisor_mail = res_advisors.data.filter(account=>account.advisor.name === this.advisor_name)[0].email
        const res_advisor = await axios.get('/account/'+tmp_advisor_mail)
        let tmp_advisorId = res_advisor.data.advisor.id

        const res_students = await axios.get('/account/',{params:{type:'student'}})
        let tmp_student_mail = res_students.data.filter(account=>account.student.name === this.student_name)[0].email
        const res_student = await axios.get('/account/'+tmp_student_mail)
        let tmp_studentId = res_student.data.student.id
  
        const response = await axios.post('/advisor-change/',{
          type: this.change_type,
          advisorId: tmp_advisorId, // 只能用name來找
          studentId: tmp_studentId,// 只能用name來找
        })
        if(response.status === 201){
          alert('新增異動成功')
        }
        if(this.change_type === 'add'){
          const res_assignment = await axios.post('/assignment/',{
            advisorId: tmp_advisorId,
            studentId: tmp_studentId,
          })
          console.log(res_assignment)
        }
        else{
          const res_allassignment = await axios.get('/assignment/')
          let id = res_allassignment.data.filter(assignment=>assignment.advisor.id === tmp_advisorId && assignment.student.id === tmp_studentId )[0].id
          const res_delete_assignment = await axios.delete('/assignment/'+id)
          console.log(res_delete_assignment)
        }
        console.log(response)
      }
    }
  }
</script>

<template>
    <div class="bg-slate-500 flex justify-center items-center mb-">
        <div class=" flex flex-col bg-white text-black w-128 h-68 z-50 p-4 rounded-lg shadow-md transition-all">
          <div class="flex flex-row justify-between">
            <h1 class="font-bold ">新增異動</h1>
            <button class="text-lg" @click="closeAlert">&times;</button>
          </div>
          <div class="flex flex-row items-center">
            <h1 class="w-28">教授姓名</h1>
            <PlainTextField length="w-short"  :class="'my-3'" v-model="advisor_name" />
          </div>
          <div class="flex flex-row items-center">
            <h1 class="w-28">學生姓名: </h1>
            <PlainTextField length="w-short"  :class="'my-3'" v-model="student_name" />
          </div>
          <div class="flex flex-row items-center">
            <h1 class="w-28">類型: </h1>
            <div class="flex flex-row mr-4">
                <input type="radio" value="add" v-model="change_type">
                <label for="add" class="ml-2">加收</label>
            </div>
            <div class="flex flex-row mr-4">
                <input type="radio" value="reduce" v-model="change_type">
                <label for="minus" class="ml-2">減收</label>
            </div>
          </div>
          <div class="flex flex-row items-end justify-end">
            <button class="mt-10 text-lg border border-black w-20 h-10 rounded-lg mb-4 mx-3 py-2" @click="closeAlert">
              取消
            </button>
            <button class="mt-10 text-lg  bg-[#41414E] text-white w-20 h-10 rounded-lg mb-4 py-2" @click="postChange">
              新增
            </button>
          </div>
        </div>
    </div>
</template>
<style src="../../../node_modules/vue-multiselect/dist/vue-multiselect.css"></style>