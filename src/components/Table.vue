<template>
  <button @click="add">add</button>
  <button @click="stop">stop</button>
    <ul ref="table" id="table">
        <li 
            v-for="item in tableDataShow"
            @click="selectRow(item)"
            :key="item.id"
            :class="`row ${currentRow.id === item.id ? 'selected' : ''}`"
        >{{item.name}}</li>
    </ul>
</template>

<script setup>
    import { ref, reactive, computed, watch, onMounted, nextTick } from 'vue' 
    const DISPLAY_NUM = 20;
    const DISPLAY_HALF_NUM = DISPLAY_NUM/2
    const ROW_HEIGHT = 42;
    const MIN_DISTANCE = 100;   //加载数据的最小限高：当距顶部或底部距离为x时，加载新数据
    const middleIndex = ref(DISPLAY_NUM/2);
    let tableData = [];
    const tableLength = ref(0);
    const table = ref(null);
    const currentRow = ref({});
    let lastTableDataShow = [];
    let timer = null;
    const inBottom = ref(true);
    let maxScrollTop = 0; 
    const hasSelected = computed(() => {
        return Object.keys(currentRow.value).length > 0;
    })
    const tableDataShow = computed(() => {
        if(hasSelected.value) {
            //如果被选择了就停止添加
            return lastTableDataShow;
        }
        //只显示最后十条
        const len = tableLength.value;
        if (len <= DISPLAY_NUM) {
            lastTableDataShow = tableData
        } else {
            //lastTableDataShow = tableData.slice(len - DISPLAY_NUM);
            let middle = middleIndex.value;
            console.log(middle)
            let start = middle - DISPLAY_HALF_NUM;
            lastTableDataShow = tableData.slice((start > 0 ? start : 0), middle + DISPLAY_HALF_NUM);
        }
        //滚动到底部
        //如果没有选中，或者滚动条到底部的时候就自动滚动
        if(table.value && !hasSelected.value && inBottom.value) {
            table.value.scrollTop = table.value.scrollHeight;
        }  
        return lastTableDataShow;
    })
    
    const add = (function () {
        let i = 0;
        return function(){
            timer = setInterval(() => {
                const data = {
                    id: ++i,
                    name: "name" + i
                }
                tableData.push(data);
                tableLength.value++;
                setMiddleIndex(tableLength.value - DISPLAY_HALF_NUM)
            }, 100);
        }
    })()
    const stop = () => {
        clearInterval(timer)
    }
    const selectRow = (row) => {
        currentRow.value = row;
    }
    const setMiddleIndex = (index) => {
        //middleIndex范围只能在[DISPLAY_HALF_NUM, tableData.length - DISPLAY_HALF_NUM]
        if(index < DISPLAY_HALF_NUM || index > tableData.length - DISPLAY_HALF_NUM) {
            return false;
        }
        middleIndex.value = index;
        return true;
    }
    const scrollOverflow = async (up) => {
        const middle = middleIndex.value;
        //如果已经滚动到了顶部或底部，就不用加载了
        if(
            (up && middle <= DISPLAY_HALF_NUM) || 
            (!up && middle >= tableData.length - DISPLAY_HALF_NUM)
        ) {
            return;
        } 
        
        let index = up ? middle - DISPLAY_HALF_NUM : middle + DISPLAY_HALF_NUM;
        if(!setMiddleIndex(index)) return;
        //滚动条滚动回中间部分
        await nextTick();
        table.value.scrollTop = maxScrollTop / 2;
    }
    const throttle = (fn, time) => {
        let timer = null,
            mark = false;
        return function(...args) {
            if(mark) return;
            mark = true;
            timer = setTimeout(() => {
                mark = false;
                fn(...args);
            }, time);
        }
    }
    let currentScrollTop = 0;   //当前的滚动条位置，用来判断是向上滚动还是向下滚动
    const triggleScroll = e => {
        const tableHeight = table.value.offsetHeight
        const scrollTop = e.target.scrollTop;
        const maxScrollHeight = e.target.scrollHeight - tableHeight;   //完整高度
        //初始化表格无法计算scrollTop，所以要动态计算高度
        if(maxScrollTop < scrollTop) {
            maxScrollTop = scrollTop;
        }
        //滚动到底部
        if(maxScrollTop === scrollTop) {
            inBottom.value = true;
        } else {
            inBottom.value = false;
        }
        if(scrollTop === currentScrollTop) return;
        //如果当前离顶部距离大于 MIN_DISTANCE，或者离底部 就不用加载数据
        const up = scrollTop < currentScrollTop;
        currentScrollTop = scrollTop;
        if(
            (up && scrollTop > MIN_DISTANCE) ||
            (!up && scrollTop < maxScrollHeight - MIN_DISTANCE)
        ) return;
        console.log("!!!")
        scrollOverflow(up)
    }
    const loadInitData = (length) => {
        tableData = Array.from({ length }).map((_, index) => ({
            id: index,
            name: 'init' + index
        }))
        tableLength.value = length;
    }
    //loadInitData(100);
    onMounted(() => {
        //const tableDiv = table.value;
        //const tableHeight = tableDiv.offsetHeight;         //展示的高度
        //滚动事件
        table.value.addEventListener("scroll", throttle(triggleScroll, 100));
    })
    
    
</script>

<style scoped>
    ul {
        height: 300px;
        overflow: auto
    }
    ul li.row {
        padding: 10px
    }
    ul li.selected {
        background: #ccc
    }
</style>
