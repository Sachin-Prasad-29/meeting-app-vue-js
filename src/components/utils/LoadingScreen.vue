<template>
<div></div>
</template>

<script>
export default {
    name:'LoadingScreen',
    created(){
        this.loadScreen = this.$loading.show({
            color: 'rgb(51, 102, 255)',
            backgroundColor: 'lightblue',
            blur: '9px',
            height: 150,
            width: 150,
        });
    }
}
</script>

<style>

</style>