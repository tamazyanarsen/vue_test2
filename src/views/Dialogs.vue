<template>
    <div>
        <div class="dialogs-list">
            Сообщения {{messagesCount}} {{dialogId}}
            <hr>
            <list :items="dialogs">
                <template v-slot:item-template="item">
                    <div class="dialog-item"
                         @click="clickDialog(item.item)">
                        <div>
                            <div class="left">{{item.item.subject}}</div>
                            <div class="right">{{item.item.created}}</div>
                        </div>
                        <br><br>
                        <div class="dialog-text">{{item.item.parts[0].text}}</div>
                        <hr>
                    </div>
                </template>
            </list>
        </div>
        <div class="messages-list">
            <list :items="selectedDialog.parts">
                <div class="message">

                </div>
            </list>
        </div>
    </div>
</template>

<script>

    import List from "../components/List";
    import { Store } from '../state';

    export default {
        name: "Dialogs",
        components: { List },
        data() {
            return {
                dialogs: Store.state.messages,
                selectedDialog: null
            };
        },
        computed: {
            messagesCount() {
                return this.dialogs.map(e => e.parts.length).reduce((a, b) => a + b, 0);
            },
            dialogId() {
                return this.$route.params.id || null;
            }
        },
        methods: {
            clickDialog(item) {
                this.$router.push(`/${item.id}`);
                this.selectedDialog = item;
            }
        }
    };
</script>

<style scoped>
    .dialogs-list {
        background: lightgrey;
    }

    .dialog-item {
        padding: 1%;
    }

    .left {
        float: left;
    }

    .right {
        float: right;
    }

    .dialogs-list {
        float: left;
        width: 25%;
        height: 85vh;
    }

    .dialog-text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .messages-list {
        float: right;
        width: 75%;
        height: 85vh;
    }
</style>
