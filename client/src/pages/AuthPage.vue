<template>
    <Header :headerContent="headerContent" />
    <main class="wrapper__main-auth box">
        <AuthForm />
    </main>
    <Footer />
</template>

<script setup lang="ts">
import Footer from './components/Footer/Footer.vue';
import AuthForm from './components/Auth/AuthForm.vue'
import Header from './components/Header/Header.vue';


const headerContent = {
    button: {
        to: '/',
        text: 'На главную'
    },
    nav: [] 
}
</script>

<style lang="scss">
.wrapper__main-auth {
    @include FlexRow( center );
    height: 100dvh;
    background: url('../assets/img/background_reg.jpg') rgba(0, 0, 0, 0.5);
    background-size: 100% 100%;
    background-blend-mode: multiply;
    background-repeat: no-repeat;
}
</style>