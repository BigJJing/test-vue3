<template>
<div class="menu">
    <el-menu
    default-active="4"
    mode="horizontal"
    class="left-menu"
    :router="true"
    >
        <el-menu-item index="/">table</el-menu-item>
        <el-menu-item index="/table2">table2</el-menu-item>
        <el-menu-item index="/Socket">Socket</el-menu-item>
    </el-menu>
</div>
</template>

<script setup>
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