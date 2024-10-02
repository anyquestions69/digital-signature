<template>
    <Header :head_content="head_content" />
    <main class="wrapper__main-pdf box">
        <PdfContent />
    </main>
    <Footer />
</template>

<script setup lang="ts">
import PdfContent from "./components/Pdf/PdfContent.vue"
import Footer from './components/Footer/Footer.vue';
import Header from './components/Header/Header.vue';

const head_content = {
    button: {
        to: '/auth',
        text: 'Вход / Регистрация'
    },
    nav: [
        {
            id: 0,
            name: 'Вступление'
        },
        {
            id: 1,
            name: 'Обновления'
        },
        {
            id: 2,
            name: 'О нас'
        }
    ] 
}
</script>