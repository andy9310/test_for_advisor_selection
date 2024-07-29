<script>
    export default {
        props: ['buttonType','length'],
    };
</script>

<template>
   <button v-if="buttonType=='重設密碼'" class="my-10 bg-[#41414E] rounded-xl w-full">
    <router-link to="/alert-resetpassword"><h1 class="text-white py-2">
      {{buttonType}}
    </h1></router-link>
   </button>
   <button  v-if="buttonType!='重設密碼'" :class="length" class="my-10 bg-[#41414E] rounded-xl">
    <h1 class="text-white py-2">
      {{buttonType}}
    </h1>
   </button>
</template>
