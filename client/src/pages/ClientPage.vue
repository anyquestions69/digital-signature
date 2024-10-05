<template>
    <Header :headerContent="headerContent" />
    <main class="wrapper__main-client">
        <ClientConteiner />
    </main>
    <Footer />
</template>

<script setup lang="ts">
import Header from './components/Header/Header.vue'
import Footer from './components/Footer/Footer.vue'
import ClientConteiner from './components/Client/ClientConteiner.vue'

const headerContent = {
    button: {
        to: '/client/documents',
        text: 'Публикация приказов'
    },
    nav: []
}
</script>