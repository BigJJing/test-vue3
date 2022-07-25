<template>
  <button @click="add">add</button>
  <button @click="stop">stop</button>
  <div ref="outerContainer" id="outer-container" :style="{height: CONTAINER_HEIGHT + 'px'}">
    <ul id="inner-container" :style="innerContainerStyle">
        <li 
            v-for="item in tableDataShow"       
            @click="selectRow(item)"
            :key="item.id"
            :style="{height: TABLE_ITEM_HEIGHT + 'px'}"
            :class="`row ${currentRow.id === item.id ? 'selected' : ''}`"
        >{{item.name}}</li>
    </ul>
  </div>
</template>

<script setup>
    import { computed, onMounted, ref } from 'vue'
    let tableData = [];
    const tableDataLength = ref(0)
    const CONTAINER_HEIGHT = 200;
    const TABLE_ITEM_HEIGHT = 60;
    const startIndex = ref(0);
    const DISPLAY_LENGTH = 10;
    const currentRow = ref({});
    const outerContainer = ref(null)
    const innerContainerStyle = computed(() => {
        const start = startIndex.value;
        console.log((tableDataLength.value - start - DISPLAY_LENGTH) * TABLE_ITEM_HEIGHT)
        return {
            paddingTop: `${start * TABLE_ITEM_HEIGHT}px`,
            paddingBottom: `${(tableDataLength.value - start - DISPLAY_LENGTH) * TABLE_ITEM_HEIGHT}px`
        }
    })
    const tableDataShow = computed(() => {
        console.log(tableDataLength.value)
        if(tableDataLength.value > 0) {
            const start = startIndex.value
            return tableData.slice(start, start + DISPLAY_LENGTH);
        }
        return []
    })
    const triggerScroll = (e) => {
        const target = e.target;
        //console.log(target.scrollTop);
        startIndex.value = Math.floor(target.scrollTop / TABLE_ITEM_HEIGHT);
    }
    onMounted(()=> {
        outerContainer.value.addEventListener("scroll", triggerScroll)
    })

    const timer = null;
    const add = (function () {
        let i = 0;
        return function(){
            timer = setInterval(() => {
                const data = {
                    id: ++i,
                    name: "name" + i
                }
                tableData.push(data);
                tableDataLength.value++;
                //setMiddleIndex(tableLength.value - DISPLAY_HALF_NUM)
            }, 100);
        }
    })()
    const stop = () => {}
    const selectRow = () => {};
    // const init = () => {
    //     tableData = Array.from({length: 100}).map((_, index) => ({
    //         id: index + 1,
    //         name: 'name' + (index+1)
    //     }));
    //     console.log(tableData)
    //     tableDataLength.value = tableData.length;
    // }
    // init();
</script>

<style scoped>
    #outer-container {
        overflow: auto;
        background: #ccc;
    }
    #inner-container > li{
        display: flex;
        align-items: center;
        
    }
</style>
