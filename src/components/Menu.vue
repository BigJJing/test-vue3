<template>
<div class="menu">
    <el-menu
    default-active="4"
    mode="horizontal"
    class="left-menu"
    >
        <el-menu-item index="1">Processing Center</el-menu-item>
        <el-sub-menu index="2">
        <template #title>Workspace</template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
        <el-sub-menu index="2-4">
            <template #title>item four</template>
            <el-menu-item index="2-4-1">item one</el-menu-item>
            <el-menu-item index="2-4-2">item two</el-menu-item>
            <el-menu-item index="2-4-3">item three</el-menu-item>
        </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="3" disabled>Info</el-menu-item>
        <el-menu-item index="4">Orders</el-menu-item>
    </el-menu>
    <!-- <el-menu
        class="right-menu"
        default-active="4"
        mode="horizontal"
    >
        <el-menu-item index="5">
            <el-icon :size="20">
                <user/>
            </el-icon>
        </el-menu-item>
    </el-menu> -->
    <div class="right-menu">     
          <el-dropdown size="large" class="usr">
            <span class="el-dropdown-link">
                <!-- <el-icon :size="20">
                    <user/>
                </el-icon> -->
                <i-ep-user />
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    
}
</script>

<style scoped>
.menu {
    width: 100%;
    display: flex;
}
.menu .left-menu {
    flex: 1;
}
.menu .right-menu {
    width: 50px;
    /* display: flex;
    align-items: center;
    justify-content: center; */
    background: transparent;
}
.menu .right-menu div:first-child {
    width: 100%;
    height: 100%;
}
.menu .right-menu div:first-child /deep/ .el-tooltip__trigger {
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>