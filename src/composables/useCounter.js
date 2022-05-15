import {onMounted, ref, toRefs, watch, computed} from 'vue';

export default function userCounter(user) {
    //使用ref添加data，但只能通过value属性修改值
    const counter = ref(0);
    const addCount = function() {
        counter.value ++;
    }
    //使用生命周期钩子函数：命名都加上前缀on，如mounted => onMounted
    onMounted(addCount)
    //使用watch
    watch(counter, (newValue, oldValue) => {
        console.log(`counter watch: ${newValue}`)
    })
    //对props中的user进行响应式引用，如果直接引用的话就是一个静态数据
    // const { user } = toRefs(props)
    watch(user, (newValue, oldValue) => {
            console.log(`user watch: ${newValue}`) 
    })
    //创建一个computed
    const counterDouble = computed(() => {
        return counter.value * 2
    })
    //返回的属性和方法都可以通过this.xx访问
    return {
        counter,
        addCount,
        counterDouble
    }
}