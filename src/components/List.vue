<template>
    <div>
        <div v-for="item in items"
             :key="item.id">
            <slot name="item-template"
                  :item="item"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "List",
        props: {
            items: Array
        }
    }
</script>

<style scoped>

</style>
