<template>
    <h1>{{counter}}</h1>
    <h1>{{counterDouble}}</h1>
</template>

<script>
import useCounter from '@/composables/useCounter'
import { toRefs } from 'vue';

export default {
    props: {
        user: String
    },
    setup(props) {
        const { user } = toRefs(props);
        const { counter, counterDouble } = useCounter(user);
        //将第一个组件的内容传给第二个组件
        
        return {
            counter: counter,
            counterDouble: counterDouble
        }
    },
    created() {
        //this.addCount()
    }

}
    
    
    
</script>