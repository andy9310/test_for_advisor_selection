<script>
    export default {
        props: ['buttonType','addClass'],
    };
</script>

<template>
    <div v-if="buttonType=='甲組'"  :class="addClass" class="ml-2 px-2 bg-[#9747FF] rounded-3xl w-16 text-center">
        <h1 class="text-[#513AA6] py-2">
        {{buttonType}}
        </h1>
    </div>
    <div :class="addClass" >
        <div  v-if="buttonType!=='甲組'" class="ml-2 px-2 bg-[#E9EEF9] rounded-3xl w-16 text-center">
            <h1 class="text-[#2652B3] py-2">
            {{buttonType}}
            </h1>
        </div>
    </div>
</template>