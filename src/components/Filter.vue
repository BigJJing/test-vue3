<template>
  <el-dialog
    v-model="dialogVisible"
    title="筛选"
    width="800px"
  >
    <div>
        <div class="btn-group">
            <el-button @click="add">添加条件</el-button>
        </div>
        <div>
            <div class="row" v-for="(item, index) in conditions">
                <el-select 
                    v-model="item.condition" 
                    placeholder="Select" 
                    size="small"
                    @change="selectCondition(item)"
                >
                    <el-option
                    v-for="(opt, key) in conditionMap"
                    :key="key"
                    :label="opt.label"
                    :value="key"
                    />
                </el-select>
                <el-select v-model="item.operator" placeholder="Select" size="small">
                    <el-option
                    v-for="opt in conditionMap[item.condition].operatorOptions"
                    :key="opt.value"
                    :label="opt.label"
                    :value="opt.value"
                    />
                </el-select>
                <template v-if="conditionMap[item.condition].type === 'select'" >
                     <el-select 
                        v-model="item.value" 
                        placeholder="Select" 
                        size="small"
                        class="auto-input"
                    >
                        <el-option
                        v-for="opt in conditionMap[item.condition].valueOptions"
                        :key="opt.value"
                        :label="opt.label"
                        :value="opt.value"
                        />
                    </el-select>
                </template>
                <template v-else-if="conditionMap[item.condition].type === 'input'" >
                    <el-input v-model="item.value" size="small" class="auto-input"></el-input>
                </template>
                <el-icon @click="remove(index)"><Delete /></el-icon>
            </div>
        </div>
    </div>
    <template #footer>
        <el-button type="primary" @click="submitForm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
    import { ref } from 'vue'
    import { Delete } from '@element-plus/icons-vue'

    const emit = defineEmits(["update"])

    const dialogVisible = ref(false);
    const operatorMap = {
        contain: {label: "包含", value: "contain"},
        equal: {label: "等于", value: "equal"}
    }

    const getOperatorOptions = (arr) => {
        return arr.map(item => {
            return operatorMap[item]
        })
        
    }
    const conditionMap = {
        cmd: {
            label: "命令字",
            operatorOptions: getOperatorOptions(['contain', 'equal']),
            type: 'input',
        },
        is_push: {
            label: "推送",
            operatorOptions: getOperatorOptions(['equal']),
            type: 'select',
            valueOptions: [
                {label: "是", value: true},
                {label: "否", value: false},
            ]
        },
        uid: {
            label: "账号",
            operatorOptions: getOperatorOptions(['contain', 'equal']),
            type: 'input'
        }
    }
    const createRule = (operator, value) => {
        //返回结果可以为正则、function
        switch(operator) {
            case 'contain': 
                return  new RegExp(value);
            case 'equal': 
                return (s) => s === value;
        }
    }
    console.log(conditionMap)
    
    const conditions = ref([]);
    const add = () => {
        let first = "cmd"
        conditions.value.push({
            condition: first,
            operator: conditionMap[first].operatorOptions[0].value,
            value: ""
        });
    }

    const remove = (index) => {
        conditions.value.splice(index, 1);
    }
    const submitForm = () => {
        let data = conditions.value;
        //验证数据
        for(let i = 0; i < data.length; i++) {
            if(data[i].value === "") {
                //提示

                alert(`筛选条件"${conditionMap[data[i].condition].label}"的值不能为空`)
            }
        }
        //将匹配规则整理成正则
        let rules = {};
        console.log(data)
        data.forEach(item => {
            rules[item.condition] = createRule(item.operator, item.value)
        })
        
        //提交给父组件
        emit("update", rules)
    }
    const selectCondition = (row) => {
        console.log(row);
        row.operator = conditionMap[row.condition].operatorOptions[0]
    }

    add();

    defineExpose({
        dialogVisible
    })

</script>

<style scoped>
    .btn-group {
        display: flex;
        justify-content: flex-end;
    }
    .row {
        display: flex;
        align-items: center;
        padding-top:10px;
    }
    .row > div {
        padding-right: 4px;
    }
    .row > .el-icon {
        font-size: 18px;
        padding: 2px;
    }
    .auto-input {
        flex: 1;
    }
</style>