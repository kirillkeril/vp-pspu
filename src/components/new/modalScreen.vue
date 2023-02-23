<template>

<div v-if="opened" class="modal-screen modal-screen__opened" :id="'modalbox'+this.boxId">
    <div class="modal-body">
        <slot></slot>
    </div>
    <div class="modal-backdrop" @click="close">

    </div>
</div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: {
        boxId: {
            required: true
        },
        visibility: {
            required: true
        }
    },
    computed: {
        opened() {
            return this.visibility;
        }
    },
    methods: {
        close() {
            console.log("close");
            this.$emit('close');
        }
    },
}
</script>

<style>
.modal-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    visibility: hidden;
    z-index: 1000;
    overflow-y: auto;
}
.modal-screen__opened {
    opacity: 1;
    visibility: visible;
}
.modal-backdrop {
    background-color: rgba(0, 0, 0, 0.8);
}
.modal-body {
    max-width: 720px;
    min-width: 300px;
    min-height: 300px;
    max-height: 70vh;
    background-color: #FF4600;
    border-radius: 1rem;
    z-index: 10001;
    color: white;
    padding: 1rem;
    overflow-y: auto;
}
</style>