<template>
    <div ref="treeMenu" style="height:100%">
        <el-tree-v2 :data="data" :props="props" class="treeMenu" style="height: calc(100% - 0px)"/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data: [],
            menuHeight: "100%"
        }
    },
    computed: {
        // menuHeight() {
        //     return 200
        // }
    },
    mounted() {
        // const body = document.body;
        // this.menuHeight = this.$refs.treeMenu.scrollHeight;
        // body.onresize = () => {
        //     this.menuHeight = this.$refs.treeMenu.scrollHeight;
        // }
        
    },
    created() {
        const getKey = (prefix, id) => {
            return `${prefix}-${id}`
        }
        const createData = (maxDeep, maxChildren, minNodesNumber, deep = 1, key = 'node') => {
            let id = 0
            return Array.from({ length: minNodesNumber })
            .fill(deep)
            .map(() => {
                const childrenNumber = deep === maxDeep ? 0 : Math.round(Math.random() * maxChildren)
                const nodeKey = getKey(key, ++id)
                return {
                    id: nodeKey,
                    label: nodeKey,
                    children: childrenNumber
                    ? createData(maxDeep, maxChildren, childrenNumber, deep + 1, nodeKey)
                    : undefined,
                }
            })
        }
        this.data = createData(4, 30, 40)
    }
}
</script>

<style scoped>
/* .treeMenu{
    height: 100%;
}
.treeMenu :deep(.el-vl__wrapper){
    height: 100%;
}
.treeMenu :deep(.el-tree-virtual-list){
    height: 100% !important;
} */
</style>