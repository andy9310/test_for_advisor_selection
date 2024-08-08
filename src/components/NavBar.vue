<script>
    import {Logout} from '../utils/account'
    export default{
        data(){
            return{
                name:this.$store.state.name
            }
        },
        methods:{
            LogOut(){
                Logout();
            }
        }
    }
</script>
<template>
    <div class=" flex flex-row justify-between pt-8 ml-16">
        <h1 class="text-2xl font-bold pl-10">臺大電信所指導教授填選系統</h1>
        <div class="flex flex-row items-center pr-16">
            <h1 class="mx-1">{{name}}您好</h1>
            <h1 class="text-xl font-bold mx-1 pb-1">|</h1>
            <router-link to="/login"><img src="@/assets/logout.png" class="w-6 h-6 mx-1" @click="LogOut"></router-link>
        </div>
    </div>
</template>