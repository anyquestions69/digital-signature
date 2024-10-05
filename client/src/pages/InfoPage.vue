<template>
    <Header :headerContent="headerContent" />
    <main class="wrapper__main box">
        <InfoIntro />
        <InfoScopeApplication />
        <InfoAdvantages />
    </main>
    <Footer />
</template>

<script setup lang="ts">
import Header from './components/Header/Header.vue';
import InfoIntro from './components/Info/InfoIntro.vue';
import InfoScopeApplication from './components/Info/InfoScopeApplication.vue';
import InfoAdvantages from './components/Info/InfoAdvantages.vue';
import Footer from './components/Footer/Footer.vue'


const headerContent = {
    button: {
        to: '/api/auth',
        text: 'Вход / Регистрация'
    },
    nav: [
        {
            id: 0,
            text: 'Вступление'
        },
        {
            id: 1,
            text: 'Обновления'
        },
        {
            id: 2,
            text: 'О нас'
        }
    ] 
}
</script>