<script >
import BlackButton from '@/components/BlackButton.vue';
import PlainTextField from '../components/PlainTextField.vue';
export default{
  components: {
    BlackButton,PlainTextField
  },
  data() {
    return {
        statusOn:true,
        loginUser:{
        name:'管理員',
        },
        time:{
        start:'2024/11/01 09:00起',
        end:'2024/11/14 17:00迄',
        },
        parameter:{
        semester_year:'114'
        },
        tabs: ['甲組','乙組','丙組'],
        currentteam: '甲組',
        groups:['甄試正取生','甄試備取生']
    };
  },
  methods: {
    toggleOn(){
        this.statusOn = !this.statusOn
    },
    created(){
        this.currentteam = this.$route.params.team
    },
  },
}
</script>


<template>
    <div class="flex h-screen flex-col overflow-hidden bg-[url('../assets/gradient2.png')] bg-cover relative">
        <img src="@/assets/G.png" class=" absolute top-8 left-84rem w-28 h-28 z-40">
        <img src="@/assets/I.png" class=" absolute top-96 w-12 h-28 z-40">
        <img src="@/assets/C.png" class=" absolute bottom-52 right-1 w-28 h-28 z-40">
        <img src="@/assets/E.png" class=" absolute bottom-1 left-25rem w-28 h-28 z-40">
        
        <div class=" flex flex-row justify-between pt-8 ml-16">
            <h1 class="text-2xl font-bold pl-10">臺大電信所指導教授填選系統</h1>
            <div class="flex flex-row items-center pr-16">
                <h1 class="mx-1">{{loginUser.name}}您好</h1>
                <h1 class="text-xl font-bold mx-1 pb-1">|</h1>
                <router-link to="/login"><img src="@/assets/logout.png" class="w-6 h-6 mx-1"></router-link>
            </div>
        </div>

        <div class="flex flex-row justify-around h-full">
            <div class="flex flex-col ml-16 mt-10">
                <div class="flex flex-row items-center mt-2">
                    <img src="@/assets/graycircle.png" class="w-3 h-3 mr-3">
                    <h1>準備階段</h1>
                </div>
                <div class="flex flex-row items-center mt-2">
                    <img src="@/assets/graycircle.png" class="w-3 h-3 mr-3">
                    <h1>學生填選指導教授</h1>
                </div>
                <div class="flex flex-row mt-2">
                    <img src="@/assets/aLine.png" class="w-1 h-24 mr-3 ml-1">
                    <div class="flex flex-col ml-1">
                        <h1>{{time.start}}</h1>
                        <h1>{{time.end}}</h1>
                    </div>
                </div>
                <div class="flex flex-row items-center">
                    <img src="@/assets/graycircle.png" class="w-3 h-3 mr-3">
                    <h1>確認志願序</h1>
                </div>
                <div class="flex flex-row items-center mt-2">
                    <img src="@/assets/graycircle.png" class="w-3 h-3 mr-3">
                    <h1>分發後導生異動管理</h1>
                </div>

            </div>
            <div class="flex flex-col w-full overflow-y-scroll ml-20 mt-20 bg-white rounded-tl-lg z-50">
                <h1 class="my-6 mx-6">管理員 / 系統參數設定</h1>
                <div class="mx-6 flex flex-col">
                    <div class="flex flex-row justify-between pb-8 border-b border-slate-300">
                        <h1 class="text-xl font-extrabold">編輯{{currentteam}}學生群組</h1>
                        <p class="underline">新增群組</p>
                    </div>
                    <div class="flex flex-col pl-32 pb-10 border-b border-slate-300 justify-center" v-for="group in groups" :key="group" >
                        <div class="flex flex-row">
                            <h1>{{group}}</h1>
                            <img src="@/assets/edit.png" class="w-5 h-5 mr-3">
                        </div>
                        <div class="flex flex-row">
                            <h1>志願序數量</h1>
                            <PlainTextField length="w-short"  :class="'my-3'" />
                        </div>
                        <div class="flex flex-row">
                            <h1>志願序需要教授同意</h1>
                            <img src="@/assets/off.png" v-if="statusOn==false" class="w-10 h-5 mr-3 cursor-pointer" @click="toggleOn">
                            <img src="@/assets/on.png" v-if="statusOn==true" class="w-10 h-5 mr-3 cursor-pointer" @click="toggleOn">
                        </div>
                        <div class="flex flex-row">
                            <h1>啟用教授名額檢查</h1>
                            <img src="@/assets/info.png" class="w-10 h-5 mr-3">
                            <img src="@/assets/off.png" v-if="statusOn==false" class="w-10 h-5 mr-3 cursor-pointer" @click="toggleOn">
                            <img src="@/assets/on.png" v-if="statusOn==true" class="w-10 h-5 mr-3 cursor-pointer" @click="toggleOn">
                        </div>
                        <div class="flex flex-row">
                            <h1>啟用此群組限制名額</h1>
                            <img src="@/assets/off.png" v-if="statusOn==false" class="w-10 h-5 mr-3 cursor-pointer" @click="toggleOn">
                            <img src="@/assets/on.png" v-if="statusOn==true" class="w-10 h-5 mr-3 cursor-pointer" @click="toggleOn">
                        </div>
                        <div class="flex flex-row">
                            <h1>開放時間起</h1>
                            <select>
                            </select>
                            <select>
                            </select>
                            <input type="time" id="appt" name="appt" min="09:00" max="18:00" required />
                        </div>
                        <div class="flex flex-row">
                            <h1>開放時間仡</h1>
                            <select value={ASystemsMonth} onChange={(e)=>{handleAsMonthChange(e)}}>
                            {months.map((mn) => (
                                <option key={mn} value={mn}>
                                {mn}
                                </option>
                            ))}
                            </select>
                            <select value={ASystemsDay} onChange={(e)=>{handleAsDayChange(e)}}>
                                {days.map((dy) => (
                                    <option key={dy} value={dy}>
                                    {dy}
                                    </option>
                                ))}
                            </select>

                            <input type="time" id="appt" name="appt" min="09:00" max="18:00" required />
                        </div>

                    
                    </div>
                    <div class="flex justify-end">
                        <BlackButton buttonType="儲存" length="w-button-short"></BlackButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>