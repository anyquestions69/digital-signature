<template>
    <select @blur="blurOnSelection"
            @click="clickOnSelection"
            v-model="PagesStore.docPage.selectedValue"
            :style="`border-radius: ${ isBlur ? '10px' : '10px 10px 0px 0px' };`">
        <option value="0">Наименование</option>
        <option value="1">Должностное лицо</option>
        <option value="2">Дата</option>
    </select>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { pagesStore } from '../../../store/pagesStore';


const isBlur = ref( true )
const PagesStore = pagesStore()

const blurOnSelection = () => {
    isBlur.value = true
}

const clickOnSelection = () => {
    isBlur.value = !isBlur.value
}
</script>

<style lang="scss" scoped>
.sel__blure {
    border-radius: 10px !important;
}

select {
    border: 1px solid wheat;
    padding: 8px 10px;
    border-radius: 10px;
}
</style>