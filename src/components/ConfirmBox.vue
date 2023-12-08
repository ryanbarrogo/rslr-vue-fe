<template>
    <section id="confirmation-box">
        <v-dialog persistent width="500" v-model="dialogVisible">
            <v-card dark>
                <v-card-title class="headline" primary-title>
                    <slot name="header"></slot>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <slot name="body"></slot>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn class="btn-tertiary" flat @click="onClickButton(false)">Close</v-btn>
                    <v-spacer></v-spacer>
                    <slot name="buttons"></slot>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </section>
</template>

<script>
export default {
    name: 'ConfirmBox',
    props: {
        show: {
            type: Boolean,
            required: true,
        },
        message: {
            type: String,
            default: '',
        },
        fn: {
            type: Function,
            default: () => {
            },
        },
    },
    computed: {
        dialogVisible: {
            get() {
                return this.show;
            },
            set(value) {
                // Emit an event to notify the parent component about changes in visibility
                this.$emit('update:show', value);
            },
        },
    },
    methods: {
        onClickButton(value) {
            this.dialogVisible = value;
        },
    },
}
</script>
