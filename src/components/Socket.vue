<template>
    <h1>socket</h1>
</template>

<script setup>
 import io from 'socket.io-client'
 const socket = io('http://127.0.0.1:4000');
 console.log(socket)
</script>