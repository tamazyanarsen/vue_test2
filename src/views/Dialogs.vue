<template>
    <div>
        <div class="dialogs-list">
            Сообщения {{messagesCount}}
            <hr>
            <list :items="dialogs">
                <template v-slot:item-template="item">
                    <div class="dialog-item"
                         @click="clickDialog(item.item)"
                         :class="{ selectedDialog: selectedDialog && (selectedDialog.id === item.item.id) }">
                        <div>
                            <div class="left">{{item.item.subject}}</div>
                            <div class="right">{{item.item.created}}</div>
                        </div>
                        <br><br>
                        <div class="dialog-text">{{item.item.parts[0].text}}</div>
                    </div>
                    <hr>
                </template>
            </list>
        </div>
        <div class="messages-list"
             v-if="selectedDialog || loadingDialog">
            <loader v-if="loadingDialog"></loader>
            <list v-if="selectedDialog"
                  :items="selectedDialog.parts"
                  class="dialog-messages">
                <template v-slot:item-template="item">
                    <div class="message"
                         :class="{ 'left': selectedDialog.parts[0].id === item.item.id, 'right': selectedDialog.parts[0].id !== item.item.id }">
                        <div :class="{ 'left-color': selectedDialog.parts[0].id === item.item.id, 'right-color': selectedDialog.parts[0].id !== item.item.id }">
                            {{item.item.text}}
                        </div>
                        <br>
                        {{item.item.author}} {{item.item.created}}
                    </div>
                    <br>
                </template>
            </list>
            <form v-if="selectedDialog"
                  @submit.prevent="onSubmit"
                  class="form">
                <label>
                    <input type="text"
                           :disabled="sendMessageProcess"
                           v-model="newMsgText"
                           placeholder="Введите текст..."
                           name="text">
                </label>
                <button v-if="!sendMessageProcess">Отправить</button>
                <button-loader v-if="sendMessageProcess"></button-loader>
            </form>
        </div>
    </div>
</template>

<script>

    import List from "../components/List";
    import { Store } from '../state';
    import { Message } from "../models/Message";
    import Loader from "../components/Loader";
    import ButtonLoader from "../components/ButtonLoader";

    export default {
        name: "Dialogs",
        components: { ButtonLoader, Loader, List },
        data() {
            return {
                dialogs: Store.state.messages,
                selectedDialog: null,
                newMsgText: '',
                loadingDialog: false,
                sendMessageProcess: false
            };
        },
        computed: {
            messagesCount() {
                return this.dialogs.length && this.dialogs.map(e => e.parts.length).reduce((a, b) => a + b, 0) || 0;
            }
        },
        methods: {
            clickDialog(item) {
                this.selectedDialog = null;
                this.loadingDialog = true;
                setTimeout(() => {
                    this.selectedDialog = item;
                    if (this.$route.params.id !== item.id) {
                        this.$router.push(`/${item.id}`);
                    }
                    this.loadingDialog = false;
                }, 2000);
            },
            onSubmit() {
                this.sendMessageProcess = true;
                setTimeout(() => {
                    Store.commit('addMessage', {
                        dialogId: this.selectedDialog.id,
                        newMsg: new Message(new Date().getTime(), 'petya', new Date(), this.newMsgText)
                    });
                    this.newMsgText = '';
                    this.sendMessageProcess = false;
                }, 2000);
            }
        }
    };
</script>

<style>
    .dialogs-list {
        background: lightgrey;
    }

    .list-item {
        height: 10vh;
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
        position: relative;
        overflow: hidden;
    }

    .left-color {
        background: lightgrey;
    }

    .right-color {
        background: lightcyan;
    }

    .form {
        width: 100%;
        position: absolute;
        bottom: 1%;
        padding: 1%;
    }

    .form > label, .form input {
        width: 90%;
    }

    .selectedDialog {
        border: lightcyan solid 2px;
        background: antiquewhite;
    }

    .dialog-messages {
        overflow: auto;
        height: 90%;
    }
</style>
