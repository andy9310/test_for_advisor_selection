<script>
export default {
    props: ['length','modelValue'],
    methods: {
        onInput(event) {
            const newValue = event.target.value;
            this.$emit('update:modelValue', newValue); 
        },
    },
    data(){
        return{
            
        };
    }
};
</script>

<template>
    <div :class="length" class="flex flex-row rounded-lg bg-white items-start border">
        <img src="../assets/search.png" class="w-5 h-5 my-2 mx-2">
        <input
            type="text"
            class="w-full rounded-lg bg-transparent text-xl py-2 pl-2 border-none border focus:outline-none"
            placeholder="搜尋"
            :value="modelValue"
            @input="onInput"
        />
    </div>
</template>
