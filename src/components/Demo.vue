<template>
<!-- <h2>当前求和为：{{sum}}</h2>
<button @click="sum++">点我++</button>
<hr>
<h2>当前的信息为：{{ms}}</h2>
<button @click="ms+='!'">修改</button> -->

<!-- <h2>当前点击鼠标的坐标为：x：{{point.x}},y:{{point.y}}</h2> -->
<!-- <h1>
 一个人的信息
</h1>
姓：<input type="text" v-model="person.firstName">
名：<input type="text" v-model="person.lastName">
全名：<input type="text"  v-model="person.fullName"> -->
<!-- <button @click="test">测试触发demo组件中的showHello</button> -->

<h1>姓名：{{firstName}}</h1>
<h1>年龄：{{age}}</h1>
<h1>工资：{{job.j1.salary}}</h1>
<h1>座驾信息：{{person.car}}</h1>
<button @click="firstName+='!'">修改</button>
<button @click="age++">增长年龄</button>
<button @click="person.job.j1.salary++">增长工资</button>
<button @click="addCar">给人添加一台车</button>
<button @click="person.car.name='宝马'">换车名</button>
<button @click="changePrice">改价格</button>
<br>
<br>
<input type="text" v-model="keyword">
<h1>{{keyword}}</h1>
</template>

<script>
// computed
import {reactive,ref,watch,watchEffect,toRef,toRefs,toRaw,markRaw,customRef} from "vue"
import usePoint from "../hooks/usePoint"
export default {
  name:'showDemo', 
  props:['msg','school'],

  setup(){
    let sum=ref(0)
    let ms=ref('你好啊')
    let point= usePoint()
    // watch(sum,(newValue,oldValue)=>{
    //    console.log('sum的值变化了',newValue,oldValue)
    // },{immediate:true})
    //  let person=shallowReactive({ 只考虑第一层数据的响应式
    let person=reactive({
       firstName:'张',
       lastName:'三',
       age:18,
       job:{
         j1:{
             salary:20 
         }
       }
    })
    const name2=toRef(person,'firstName')
    const x=toRefs(person)
    console.log(name2)
    console.log(x)

    function showRawData(){
        const p=toRaw(person)
        console.log(p)
    }

    function addCar(){
        let car={
            name:'奔驰',
            price:40,
        }
        person.car=markRaw(car)
    }

    function changePrice(){
        person.car.price++
        console.log(person.car.price)
    }

    function myRef(value){
        let timer
       console.log('---myRef---',value)
       return customRef((track,trigger )=>{
           return {
               get(){
                 console.log(`有人从myRef这个容器中读数据了，我把${value}给他了`)
                 track()//通知vue去追踪value的变化（提前和get商量一下，让他认为这个value是有用的）
                 return value
               }, 
               set(newValue){
                 console.log(`有人从把myRef这个容器中数据改为${newValue}`) 
                 clearTimeout(timer)
                 timer=setTimeout(()=>{
                 value=newValue   
                 trigger()//通知vue去重新解析模版
                 },500)

               }
           }
       })
     
    }

    let keyword=myRef('hello')
    //监视reactive所定义的一个响应式数据，此处无法争取获取 oldvalue,强制开启了深度监视：deep开启无效
    //  watch(person,(newValue,oldValue)=>{
    //    console.log('值变化了',newValue,oldValue)
    //  },{deep:true})

    //   watch(()=>person.age,(newValue,oldValue)=>{
    //    console.log('值变化了',newValue,oldValue)
    //  })
    //   watch([()=>person.age,()=>person.name],(newValue,oldValue)=>{
    //    console.log('值变化了',newValue,oldVal ue)
    //  })
     watch(()=>person.job,(newValue,oldValue)=>{
       console.log('值变化了',newValue,oldValue)
     },{deep:true})//由于此处监视的是reactive中定义的对象中的某个属性(为对象)，所以deep属性有效

     watchEffect(()=>{
         const x=sum.value
         console.log('watchEffect',x)
     })

     
     

    //计算属性——简写
//    person.fullName=computed(()=>{
//         return person.firstName+'-'+person.lastName
//     })

    //完整写法
    //  person.fullName=computed({
    //      get(){
    //       return person.firstName+'-'+person.lastName
    //      },
    //      set(value){
    //         const nameArr=value.split('-')
    //         person.firstName=nameArr[0]
    //         person.lastName=nameArr[1]
    //      }
      
    // })
    return {
        sum,
        ms,
        person,
        point,
        showRawData,
        changePrice,
        addCar,
        keyword,
        ...toRefs(person)
    }
  }
}
</script>

<style>

</style>