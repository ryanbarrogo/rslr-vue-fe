<template>
    <v-btn
        @click="func"
        :type="type"
        :class="['btn-primary', classList]"
        :disabled="disabled || isLoading"
        :data-dismiss="dismiss"
        :title="title"
    >
        <i v-if="buttonIcon" :class="buttonIcon"></i>
        {{ text }}
        <font-awesome-icon v-if="isLoading" spin icon="fas fa-fa-spinner" />
    </v-btn>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
export default {
    name: "ButtonComponent",
    components: {FontAwesomeIcon},
    props: {
        type: {
            type: String,
            default: 'button',
        },
        text: {
            type: String,
            default: '',
        },
        func: {
            type: Function,
            default: () => {},
        },
        classList: {
            type: String,
            default: '',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        dismiss: {
            type: String,
            default: '',
        },
        title: {
            type: String,
            default: '',
        },
        isLoading: {
            type: Boolean,
            default: false,
        },
        buttonIcon: {
            type: String,
            default: null,
        },
    },
}
</script>
