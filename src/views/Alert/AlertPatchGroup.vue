<script>
import Multiselect from 'vue-multiselect'
import PlainTextField from '../../components/PlainTextField.vue';
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
        this.$router.replace('/admin-systemparameter');
      }
    }
  }
</script>

<template>
    <div class="bg-slate-500 flex justify-center items-center mb-">
        <div class=" flex flex-col bg-white text-black w-128 h-68 z-50 p-4 rounded-lg shadow-md transition-all">
          <div class="flex flex-row justify-between">
            <h1>編輯名額限制規則</h1>
            <button class="text-lg" @click="closeAlert">&times;</button>
          </div>
          <div class="flex flex-row items-center">
            <h1 class="w-32">學生群組: </h1>
            <multiselect v-model="value" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="name"
                 track-by="code" :options="options" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
          </div>
          <div class="flex flex-row items-center">
            <h1 class="w-28">限制名額: </h1>
            <PlainTextField length="w-short"  :class="'my-3'" v-model="quota" />
          </div>
          <div class="flex flex-row items-center">
            <h1 class="w-full">規則說明: 每個教授只能在選定的學生群組中招收{{quota}}名學生</h1>
          </div>
          <div class="flex items-end justify-end">
            <button class="mt-10 text-lg border-2 border-black w-20 h-10 rounded-xl mb-4" @click="closeAlert">
              <h1 class="">確認</h1>
            </button>
          </div>
        </div>
    </div>
</template>
<style src="../../../node_modules/vue-multiselect/dist/vue-multiselect.css"></style>