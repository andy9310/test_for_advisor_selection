<script>
export default {
    props: ['textType','modelValue'],
    methods: {
        onInput(event) {
            const newValue = event.target.value;
            this.$emit('update:modelValue', newValue); 
        },
        togglePasswordVisibility() {
            this.passwordVisible = !this.passwordVisible;
        }
    },
    data(){
        return{
            passwordVisible: false,
        };
    }
};
</script>

<template>
    <div class="w-full rounded-xl bg-white px-1 py-1 flex flex-col">
        <h2 class="ml-3 mt-2 text-left text-lg text-slate-300">{{textType}}</h2>
        <div class="flex flex-row">
            <input
                type="text"
                v-if="textType != '密碼' && textType != '確認密碼' && textType != '新密碼' && textType != '確認新密碼'"
                class="ml-3 w-full border-b-0 bg-transparent focus:outline-none text-2xl"
                :value="modelValue"
                @input="onInput"
            />
            <input
                :type="passwordVisible ? 'text' : 'password'"
                v-if="textType == '密碼' || textType == '確認密碼' || textType == '新密碼' || textType == '確認新密碼'"
                class="ml-3 w-full border-b-0 bg-transparent focus:outline-none text-2xl "
                :value="modelValue"
                @input="onInput"
            />
            <span v-if="textType == '密碼' || textType == '確認密碼' || textType == '新密碼' || textType == '確認新密碼'" @click="togglePasswordVisibility">
                <img src="@/assets/eye.png" class="w-5 h-5 mr-3 cursor-pointer">
            </span> 
        </div>
    </div>
</template>
