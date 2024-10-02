<template>
    <Header :head_content="head_content" />
    <main class="wrapper__main-client">
        <ClientConteiner />
    </main>
    <Footer />
</template>

<script setup lang="ts">
import Header from './components/Header/Header.vue'
import Footer from './components/Footer/Footer.vue'
import ClientConteiner from './components/Client/ClientConteiner.vue'

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