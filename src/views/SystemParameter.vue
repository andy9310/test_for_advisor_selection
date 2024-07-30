<script >
import BlackButton from '@/components/BlackButton.vue';
import PlainTextField from '../components/PlainTextField.vue';
export default{
  components: {
    PlainTextField,
    BlackButton,
  },
  data() {
    return {
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
      currenttab: '甲組',
      advisors:['王以安','楊凱駿','楊鈞安'],
      groups:['甄試正取生','甄試備取生'],
    };
  },
  methods: {
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
                    <div class="flex flex-row justify-between">
                        <h1 class="text-xl font-extrabold">網站設定</h1>
                        <p class="underline">清空去年資料</p>
                    </div>
                    <div class="flex flex-col pl-32 pb-10 border-b border-slate-300">
                        <div class="flex flex-row items-center my-3 pl-4">
                            <h2 class="mr-7">學年度:</h2>
                            <PlainTextField length="w-short" v-model="parameter.semester_year" />
                        </div>
                        <div class="flex flex-row items-center my-3">
                            <h2 class="mr-7">公務帳號:</h2>
                            <PlainTextField length="w-long" v-model="parameter.semester_year" />
                        </div>
                        <div class="flex flex-row items-center my-3 pl-4">
                            <h2 class="mr-7">主承辦:</h2>
                            <div class="flex flex-row items-center">
                                <h2 class="mr-3">姓名</h2>
                                <PlainTextField length="w-short" v-model="parameter.semester_year" />
                            </div>
                            <div class=" flex flex-row ml-7 items-center">
                                <h2 class="mr-3">職稱</h2>
                                <PlainTextField length="w-short" v-model="parameter.semester_year" />
                            </div>
                            <div class=" flex flex-row ml-7 items-center">
                                <h2 class="mr-3">Email</h2>
                                <PlainTextField length="w-long" v-model="parameter.semester_year" />
                            </div>
                        </div>
                        <div class="flex flex-row items-center my-3 pl-4">
                            <h2 class="mr-7">次承辦:</h2>
                            <div class="flex flex-row items-center">
                                <h2 class="mr-3">姓名</h2>
                                <PlainTextField length="w-short" v-model="parameter.semester_year" />
                            </div>
                            <div class=" flex flex-row ml-7 items-center">
                                <h2 class="mr-3">職稱</h2>
                                <PlainTextField length="w-short" v-model="parameter.semester_year" />
                            </div>
                            <div class=" flex flex-row ml-7 items-center">
                                <h2 class="mr-3">Email</h2>
                                <PlainTextField length="w-long" v-model="parameter.semester_year" />
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <BlackButton buttonType="儲存" length="w-button-short"></BlackButton>
                    </div>
                </div>
                <div class="mx-6 flex flex-col mb-10">
                    <div class="flex flex-row justify-between">
                        <h1 class="text-xl font-extrabold">組別設定</h1>
                    </div>
                    <div class="flex flex-row mt-4">
                        <button v-for="tab in tabs" :key="tab"  
                            :class="{'font-extrabold border-b border-black w-16 py-2 px-2':currenttab === tab,
                                'border-b w-16 py-2 px-2':currenttab !== tab
                            }" 
                            @click="currenttab = tab"
                            >{{ tab }}
                        </button>
                        <div class="border-b w-full"></div>
                    </div>
                    
                    <div class="flex flex-col border-b border-slate-300">
                        <div class="flex flex-col my-5">
                            <h1 class="font-bold text-xl mb-5">學生</h1>
                            <router-link :to="`/admin-studentgroup/${currenttab}`">
                                <button class="ml-20 border border-black rounded-md px-3 py-2 w-32">編輯學生群組</button>
                            </router-link>
                        </div>
                        <div class="flex flex-col my-5">
                            <h1 class="font-bold text-xl mb-5">教授</h1>
                            <div class="flex flex-row ml-20 mb-12">
                                <p>面談時間表:</p>
                                <a class="mx-5 text-[#513AA6] underline">選擇檔案</a>
                            </div>
                            <div class="border rounded-lg flex flex-col mb-20">
                                <div class="flex flex-row border-b">
                                    <h1 class="my-3 mx-14">教授姓名</h1>
                                    <h1 class="my-3 mx-14">114可指導新生人數</h1>
                                    <h1 class="my-3 mx-14">甄試正取生已同意</h1>
                                    <h1 class="my-3 mx-14">甄試備取生已同意</h1>
                                    <h1 class="my-3 mx-14">考試報到生已同意</h1>
                                    <h1 class="my-3 mx-14">手動調整</h1>
                                    <h1 class="my-3 mx-14">總共已同意學生數</h1>
                                </div>
                                <div v-for="advisor in advisors" :key="advisor" class="flex flex-row my-3">
                                    <h1 class="my-3 mx-14">{{ advisor }}</h1>
                                    <PlainTextField length="w-short"  :class="'my-3 mx-14'" v-model="parameter.semester_year" />
                                    <h1 class="my-3 mx-14 w-32 text-center">1</h1>
                                    <h1 class="my-3 mx-14 w-32 text-center">1</h1>
                                    <h1 class="my-3 mx-14 w-32 text-center">1</h1>
                                    <h1 class="my-3 mx-14 w-32 text-center">1</h1>
                                    <h1 class="my-3 mx-14 w-32 text-center">1</h1>
                                </div>

                            </div>
                            <div class="flex flex-row justify-between">
                                <h1 class="text-xl font-extrabold">其他名額限制規則</h1>
                                <p class="underline">新增規則</p>
                            </div>
                            <div class="border rounded-lg flex flex-col mb-20">
                                <div class="flex flex-row border-b">
                                    <h1 class="my-3 mx-14">學生群組</h1>
                                    <h1 class="my-3 mx-14">限制名額</h1>
                                </div>
                                <div v-for="group in groups" :key="group" class="flex flex-row my-3">
                                    <h1 class="my-3 mx-14">{{ group }}</h1>
                                    <h1 class="my-3 mx-10 w-20 text-center">1</h1>
                                    <div class="my-3 mx-10 w-20 text-center flex flex-row">
                                        <router-link :to="`/alert-patchgroup/${group}`"><img src="@/assets/edit.png" class="w-4 h-4 mx-2" ></router-link>
                                        <router-link :to="`/alert-deletegroup/${group}`"><img src="@/assets/trash.png" class="w-4 h-4 mx-2 "  ></router-link>
                                    </div>
                                </div>
                            </div>
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