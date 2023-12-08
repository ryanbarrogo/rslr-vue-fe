<template>
    <v-app-bar>
        <template v-slot:append v-if="!drawer">
            <v-btn variant="text" class="side-bar-drawer" icon="mdi-chevron-right" @click.stop="toggleDrawer"></v-btn>
        </template>

        <v-spacer
            class="pt-1 app-bar-title"
            :class="[
                {'pl-12': !drawer},
                {'pl-6': drawer}
            ]"
        >
            Dashboard
        </v-spacer>

        <v-menu>
            <template v-slot:activator="{ props }">
                <v-icon
                    class="mr-5"
                    v-bind="props"
                >
                    <font-awesome-icon icon="fas fa-cog"/>
                </v-icon>
            </template>
            <v-list>
                <v-list-item
                    v-for="(item, index) in settings.items"
                    :key="index"
                    :value="index"
                >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>

        <v-menu>
            <template v-slot:activator="{ props }">
                <v-icon
                    class="mr-5"
                    v-bind="props"
                >
                    <font-awesome-icon icon="fas fa-user-check"/>
                </v-icon>
            </template>
            <v-list>
                <v-list-item
                    v-for="(item, index) in settings.items"
                    :key="index"
                    :value="index"
                >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>

        <v-icon @click="confirmationBoxVisible=true" class="mr-5">
            <font-awesome-icon icon="fas fa-sign-out-alt"/>
        </v-icon>

        <confirm-box
            :show="confirmationBoxVisible"
            @update:show="updateConfirmationBox"
        >
            <template #header>
                Logout
            </template>
            <template #body>
                Are you sure you want to logout?
            </template>
            <template #buttons>
                <ButtonComponent
                    v-if="true"
                    class-list=""
                    class="btn-cancel"
                    data-dismiss="modal"
                    :func="logout"
                    text="Yes, log me out"
                    :disabled="false"
                />
            </template>
        </confirm-box>
    </v-app-bar>
</template>

<script>
import {toRefs} from 'vue';
import {useSideMenuStore} from "@/store/sideMenuStore";
import ConfirmBox from "@/components/ConfirmBox.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";

export default {
    components: {ButtonComponent, ConfirmBox},
    setup() {
        const sideMenuStore = useSideMenuStore();
        const {drawer, toggleDrawer} = toRefs(sideMenuStore);

        return {
            drawer,
            toggleDrawer,
        }
    },
    name: "AppBar",
    data() {
        return {
            confirmationBoxVisible: false,
            settings: {
                items: [
                    {title: 'Click Me'},
                    {title: 'Click Me'},
                    {title: 'Click Me'},
                ],
            }
        }
    },
    methods: {
        updateConfirmationBox(value) {
            this.confirmationBoxVisible = value;
        },
        async logout() {
            console.log(this.$cookies.get('token'))
            this.$cookies.remove('token');
            console.log(this.$cookies.get('token'))

            setTimeout(function () {
                localStorage.removeItem('user_data');
                localStorage.removeItem('permissions');
                location.reload();
            }, 300);
        },
    }
}
</script>
