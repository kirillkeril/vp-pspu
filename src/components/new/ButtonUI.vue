<template>
<div role="button" class="vp-btn">
    <div class="vp-btn__line vp-btn__line_left"></div>
    <div class="vp-btn__text">
        <slot></slot>
    </div>
    <div class="vp-btn__line vp-btn__line_right"></div>
</div>
</template>

<script>
export default {
    props: {
        onclick
    },
    methods: {
        onClick() {
            this.onclick();
        },
    },
}
</script>

<style scoped>
.vp-btn {
    width: 100%;
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    background-color: white;
    border-radius: 15px;
    font-size: 3rem;
    line-height: 3rem;
    padding: 0.2em 4em;
    /* box-shadow: -2px 2px 15px -5px black; */
}
@media (max-width: 600px) {
    .vp-btn {
        font-size: 1rem;
        -webkit-text-stroke: 0;
    }
}
.vp-btn:active {
    /* box-shadow: inset -3px 3px 10px -3px black; */
}
.vp-btn__text {
    color: white;
    text-align: center;
    text-shadow: 0 0 2px black;
}
@supports (-webkit-text-stroke: 1px blue) {
    .vp-btn__text {
        -webkit-text-stroke: 1px black;
    }
}
.vp-btn__line {
    position: absolute;
    height: 1px;
    width: 20%;
    border: 2px solid #FF4600;
}
.vp-btn__line_left {
    top: 50%;
    left: 0;
    transform: translateY(-50%);
}
.vp-btn__line_right {
    top: 50%;
    right: 0;
    transform: translateY(-50%);
}
</style>