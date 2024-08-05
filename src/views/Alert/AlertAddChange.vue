<script>
import PlainTextField from '../../components/PlainTextField.vue';
  export default {
    components: { PlainTextField },
    data() {
      return {
        change_type:'',
        professor_name:'教授A',
        student_name:'學生A',
        show: true,
        value: [
        {name: '甄試正取生', code: 'js'}
      ],
      options: [
        {name: '考試備取生', code: 'vu'},
        {name: '甄試正取生', code: 'js'},
        {name: '甄試備取生', code: 'os'}
      ],
      quota:0,
      };
    },
    computed: {
      
    },
    methods: {
      addTag (newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      this.options.push(tag)
      this.value.push(tag)
    } ,
    closeAlert() {
        this.$router.replace('/admin-changemanage');
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
            <PlainTextField length="w-short"  :class="'my-3'" v-model="professor_name" />
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
                <input type="radio" value="minus" v-model="change_type">
                <label for="minus" class="ml-2">減收</label>
            </div>
          </div>
          <div class="flex flex-row items-end justify-end">
            <button class="mt-10 text-lg border border-black w-20 h-10 rounded-lg mb-4 mx-3 py-2" @click="closeAlert">
              取消
            </button>
            <button class="mt-10 text-lg  bg-[#41414E] text-white w-20 h-10 rounded-lg mb-4 py-2" @click="closeAlert">
              新增
            </button>
          </div>
        </div>
    </div>
</template>
<style src="../../../node_modules/vue-multiselect/dist/vue-multiselect.css"></style>