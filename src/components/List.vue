<template>
    <div>
        <div v-for="(item, index) in items"
             :key="item.id" class="list-item">
            <slot name="item-template"
                  :item="item"
                  :index="index"/>
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
