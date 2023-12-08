<template>
    <v-app>
        <v-main :class="[{'logged-in': isLoggedIn}]">
            <router-view/>
        </v-main>
    </v-app>
</template>

<script setup>
const isLoggedIn = window.axios.defaults.headers.Authorization.indexOf('null') < 0;
</script>

<style lang="scss">
</style>