<template>
<!-- vue3组件中的模版结构可以没有根标签 -->
<!-- @hello="showHelloMsg" -->
<showDemo  msg='你好啊' school="清华">
  <template v-slot:qwe>
   <span>清华</span>
  </template>
</showDemo>
</template> 

<script>
import showDemo from "./components/Demo.vue"
export default {
  name: 'App',
  components:{ showDemo},
  setup(){
    function showHelloMsg(value){
       alert('hello',value)
    }
    return{
     showHelloMsg
    }
  }

}
</script>
