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
    <div :class="length" class="flex rounded-lg bg-white items-center">
        <input
            type="text"
            class="w-full border rounded-lg bg-transparent text-xl py-2 pl-2"
            :value="modelValue"
            @input="onInput"
        />
    </div>
</template>
