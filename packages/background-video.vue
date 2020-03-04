<template>
    <video muted autoplay loop class="background-video">
        <source :src="resource" type="video/mp4"/>
        <source :src="resource" type="video/ogg">
    </video>
</template>

<script>
export default {
    name: 'backgroundVideo',
    props: {
        resource: {
            type: String, // 资源路径
            default: ''
        }
    }
}
</script>

<style lang="scss" scoped>
    .background-video {
        position: fixed;
        z-index: -1;
        top: 0;
        left: 0;
        min-width: 100%;
        min-height: 100%;
        background-size: cover;
    }
</style>