<template>
    <confirm :title="title" @cancel="cancelAction" @apply="applyAction"/>
</template>

<script>
    import Confirm from "./ModalWindow";

    export default {
        name: "ConfirmDialog",
        components: { Confirm },
        props: {
            cancelAction: Function,
            applyAction: Function,
            title: String
        }
    }
</script>

<style scoped>

</style>
