<template>
    <div>
        <Filter ref="filter" @update="updateFilter"/>
        <button @click="add">add</button>
        <button @click="stop">stop</button>
        <button @click="showFilter" @update="updateFilter">filter</button>
        <div ref="outerContainer" id="outer-container" :style="{height: CONTAINER_HEIGHT + 'px'}">
            <ul id="inner-container" :style="innerContainerStyle">
                <li 
                    v-for="item in tableDataShow"       
                    @click="selectRow(item)"
                    :key="item.id"
                    :style="{height: TABLE_ITEM_HEIGHT + 'px'}"
                    :class="`row ${currentRow.id === item.id ? 'selected' : ''}`"
                >{{item.cmd}} / {{item.is_push}} / {{item.uid}}</li>
            </ul>
        </div>
    </div>
</template>

<script setup>
    import { computed, onMounted, ref, defineAsyncComponent } from 'vue'
    const Filter = defineAsyncComponent(() => import('./Filter.vue'))

    let tableData = [];
    let tableDataFilter = [];
    const tableDataLength = ref(0)
    const CONTAINER_HEIGHT = 500;
    const TABLE_ITEM_HEIGHT = 60;
    const startIndex = ref(0);
    const DISPLAY_LENGTH = 10;
    const currentRow = ref({});
    const outerContainer = ref(null)
    const innerContainerStyle = computed(() => {
        const start = startIndex.value;
        return {
            paddingTop: `${start * TABLE_ITEM_HEIGHT}px`,
            paddingBottom: `${(tableDataLength.value - start - DISPLAY_LENGTH) * TABLE_ITEM_HEIGHT}px`
        }
    })
    const tableDataShow = computed(() => {
        if(tableDataLength.value > 0) {
            const start = startIndex.value
            if(hasRules.value) {
                return tableDataFilter.slice(start, start + DISPLAY_LENGTH);
            }
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
    const words = "abcdefghijklmnopqrstuvwxyz"
    const randomStr = () => {
        return (Math.random() + "").slice(0, 8)
    }
    let timer = null;
    const add = (function () {
        let i = 100;
        return function(){
            timer = setInterval(() => {
                console.log(1)
                const data = {
                    cmd: ++i + "",
                    is_push: true,
                    uid: randomStr()
                }
                tableData.push(data);
                if(hasRules.value && verify(data)) {
                    tableDataFilter.push(data)
                }
                tableDataLength.value++;
                //setMiddleIndex(tableLength.value - DISPLAY_HALF_NUM)
            }, 100);
        }
    })()
    const stop = () => {
        clearInterval(timer)
    }
    const selectRow = () => {};
    const init = () => {
        tableData = Array.from({length: 100}).map((_, index) => ({
            cmd: index + 1 + "",
            is_push: true,
            uid: randomStr()
        }));
        tableDataLength.value = tableData.length;
    }
    const filter = ref(null)
    const showFilter = () => {
        filter.value.dialogVisible = true;
    }
    const rules = ref({});
    const hasRules = computed(() => {
        let ruleObj = rules.value;
        if(Object.prototype.toString.call(ruleObj) !== '[object Object]') {
            return false
        }
        return Object.keys(ruleObj).length > 0
    })
    const verify = (data) => {
        for(let key in rules.value) {
            let rule = rules.value[key];
            if(rule instanceof RegExp) {
                if(!rule.test(data[key])) return false
            } else if (rule instanceof Function) {
                if(!rule(data[key])) return false
            }
        }
        return true;
    }
    const updateFilter = (r) => {
        console.log(r);
        rules.value = r
        tableDataFilter = tableData.filter(item => verify(item));
        console.log(tableDataFilter)
    }


    init();
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
