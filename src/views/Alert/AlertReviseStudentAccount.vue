<script>
import PlainTextField from '../../components/PlainTextField.vue';
  export default {
    components: { PlainTextField },
    props: {
    },
    data() {
      return {
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
            <h1 class="w-32">學生姓名: </h1>
            <PlainTextField length="w-short"  :class="'my-3'" v-model="quota" />
          </div>
          <div class="flex flex-row items-center">
            <h1 class="w-28">信箱: </h1>
            <PlainTextField length="w-middle"  :class="'my-3'" v-model="quota" />
          </div>
          <div class="flex flex-row items-center">
            <h1 class="w-28">行動電話: </h1>
            <PlainTextField length="w-middle"  :class="'my-3'" v-model="quota" />
          </div>
          <div class="flex items-end justify-end">
            <button class="mt-10 text-lg border-2 border-black w-20 h-10 rounded-xl mb-4" @click="closeAlert">
              <h1 class="">確認</h1>
            </button>
          </div>
        </div>
    </div>
</template>