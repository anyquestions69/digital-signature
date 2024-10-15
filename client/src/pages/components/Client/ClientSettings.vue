<template>
    <div class="setting__conteiner">
        <div class="conteiner__content">
            <div class="content__theme">
                <h3>Темная тема:</h3>
                <label for="checked">
                    <input type="checkbox" id="checked" v-model="themeVar">
                    <span class="slider"></span>
                </label>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const themeVar = ref(false);
</script>

<style scoped lang="scss">
.setting__conteiner {
    padding: 30px;
    width: 100%;
}

.conteiner__content {
    width: 100%;
    border: 0;

    .content__theme {
        border: 0;
        width: 100%;
        @include Flex(row, start, center);
        gap: 20px;

        h3 {
            font-size: 16px;
        }

        label {
            width: 60px;
            height: 34px;
            background: #e0e0e0;
            border-radius: 17px;
            overflow: hidden;
            position: relative;
            cursor: pointer;

            input {
                width: 100%;
                height: 100%;
                opacity: 0;
                z-index: 20;
            }

            span.slider {
                width: 26px;
                height: 26px;
                border-radius: 50%;
                background: #ffffff;
                transition: transform 0.3s ease-in-out;
                position: absolute;
                top: 4px;
                left: 4px;
                z-index: 21;

                &::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: #ffffff;
                    opacity: 0;
                    transition: opacity 0.3s ease-in-out;
                }

                &:checked {
                    transform: translateX(26px);
                    background-color: #2196f3;

                    &::before {
                        opacity: 1;
                    }
                }
            }
        }
    }
}
</style>
