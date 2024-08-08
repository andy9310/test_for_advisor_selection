<script >
import NavBar from '../components/NavBar.vue';
export default{
  components: {
    NavBar,
  },
  data() {
    return {
      loginUser:{
        name:'管理員',
      },
      time:{
        start:'2024/11/01 09:00起',
        end:'2024/11/14 17:00迄',
      }
    };
  },
  methods: {
  },
}
</script>


<template>
    <div class="flex h-screen flex-col overflow-hidden bg-[url('../assets/gradient.png')] bg-cover relative">
        <img src="@/assets/G.png" class=" absolute top-8 left-84rem w-28 h-28 z-10">
        <img src="@/assets/I.png" class=" absolute top-96 w-12 h-28 z-10">
        <img src="@/assets/C.png" class=" absolute bottom-52 right-1 w-28 h-28 z-10">
        <img src="@/assets/E.png" class=" absolute bottom-1 left-25rem w-28 h-28 z-10">
        <NavBar/>
        <div class="flex flex-row justify-around z-40">
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
            <div class="flex flex-col h-full w-9/12 pl-10 pt-8">
                <div class="flex flex-row justify-around ">
                    <router-link to="/admin-systemparameter">
                        <div class="rounded-3xl bg-white bg-opacity-90 text-black flex flex-row text-center items-center justify-between w-128 h-44 z-50 px-12 hover:bg-slate-300 hover:-translate-y-1 hover:scale-110">
                            <h1 class="text-4xl">系統參數設定</h1>
                            <img src="@/assets/arrow.png" class="w-16 h-16">
                        </div>
                    </router-link>
                    <router-link to="/admin-accountmanage">
                        <div class="rounded-3xl bg-white bg-opacity-90 text-black flex flex-row text-center items-center justify-between w-128 h-44 z-50 px-12 hover:bg-slate-300 hover:-translate-y-1 hover:scale-110">
                            <h1 class="text-4xl">帳號管理</h1>
                            <img src="@/assets/arrow.png" class="w-16 h-16">
                        </div>
                    </router-link>
                </div>
                <div class="flex flex-row justify-around mt-16">
                    <router-link to="/admin-preferencemanage">
                        <div class="rounded-3xl bg-white bg-opacity-90  text-black flex flex-row text-center items-center justify-between w-128 h-44  z-50 px-12 hover:bg-slate-300 hover:-translate-y-1 hover:scale-110">
                            <h1 class="text-4xl">志願序管理</h1>
                            <img src="@/assets/arrow.png" class="w-16 h-16">
                        </div>
                    </router-link>
                    <router-link to="/admin-changemanage">
                    <div class="rounded-3xl bg-white bg-opacity-90 text-black flex flex-row text-center items-center justify-between w-128 h-44  z-50 px-12 hover:bg-slate-300 hover:-translate-y-1 hover:scale-110">
                        <h1 class="text-4xl">分發後導生異動管理</h1>
                        <img src="@/assets/arrow.png" class="w-16 h-16">
                    </div>
                    </router-link>
                </div>
                
            </div>
        </div>
    </div>
</template>
