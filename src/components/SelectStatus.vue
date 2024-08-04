<script>
export default {
    props: ['multistatus','modelValue'],
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
    <select class="w-30 rounded-xl bg-white px-3 py-3 border border-slate-300" :value="modelValue">
        <option class="px-3 py-3" v-for="status in multistatus" v-bind:key="status" >{{ status }}</option>
    </select>
</template>