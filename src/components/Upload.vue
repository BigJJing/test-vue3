<template>
  <div>
    <div>
      <el-button @click="handleStart" type="primary">upload</el-button>
      <input type="file"
             multiple 
             ref="fileButton"
             v-show="false"
             @change="selectFiles" />
    </div>
    <ul class="file-list">
      <li v-for="file in fileList" :key="file.name">
          <span>
              <el-icon><Document /></el-icon>
              {{file.name}}
          </span>
          <el-icon @click="removeFile(file)"><Close /></el-icon>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Close, Document } from '@element-plus/icons-vue'

const fileButton = ref(null);
const fileList = ref([]);
const handleStart = () => {
    fileButton.value.click();
}
const selectFiles = e => {
    const files = e.target.files;
    for(let i = 0; i < files.length; i++) {
        let obj = {};
        obj.name = files[i].name;
        const reader = new FileReader();
        reader.readAsText(files[i], 'utf8');
        reader.onload = () => {
            obj.data = reader.result;
            fileList.value.push(obj);
        }
    }
};

const removeFile = file => {
    let files = fileList.value;
    for(let i = 0; i < files.length; i++) {
        if(files[i] === file) {
            return files.splice(i, 1);
        }
    }
}

</script>

<style scoped>
    .file-list {
        padding: 10px 2px;
    }
    .file-list li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        padding: 4px 0;
    }
    .file-list li > span {
        display: flex;
        align-items: center;
    }
    .file-list li > span > .el-icon {
        padding-right: 4px;
    }
    .file-list li > .el-icon {
        opacity: 0;
    }
    .file-list li:hover {
        background: var(--el-fill-color-light);
    }
    .file-list li:hover > .el-icon{
        opacity: 1;
    }
    .file-list li > .el-icon:hover{
        opacity: 1;
        color: var(--el-color-primary);
    }
</style>