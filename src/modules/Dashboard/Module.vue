<template>
    <div>
        <side-menu></side-menu>
        <app-bar></app-bar>

        <router-view />
    </div>
</template>

<script setup>
import AppBar from "@/modules/Dashboard/components/AppBar.vue";
import SideMenu from "@/modules/Dashboard/components/SideMenu.vue";
</script>