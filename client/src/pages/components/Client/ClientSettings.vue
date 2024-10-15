<template>
    <div class="setting__conteiner">
        <div class="conteiner__content">
            <div class="content__theme">
                <h3>Темная тема:</h3>
                <label for="checked">
                    <input type="checkbox"
                            id="checked"
                            v-model="isDarkTheme"
                            @focus="focusOnInput">
                    <span class="slider"
                          :style="`translate: ${ isDarkTheme ? '26' : '0'  }px 0px`">
                    {{ isDarkTheme ? 'on' : 'off' }}
                    </span>
                </label>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isDarkTheme = ref( true )

const focusOnInput = () => {

    console.log( isDarkTheme.value )
}
</script>

<style scoped lang="scss">
.setting__conteiner {
    padding: 30px;
    width: 100%;

    .conteiner__content {
        width: 100%;
        border: 0;

        .content__theme {
            border: 0;
            width: 100%;
            @include Flex(row, start, center);
            gap: 20px;

            h3 {
                font-size: 18px;
            }

            label {
                width: 60px;
                height: 34px;
                background: #a9a9a9;
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
                    @include Flex( row, center, center );
                    font-size: 13px;
                    font-weight: 900;
                    color: black;
                    width: 26px;
                    height: 26px;
                    border-radius: 50%;
                    background: #ffffff;
                    transition: all 0.3s ease-in-out;
                    position: absolute;
                    top: 4px;
                    left: 4px;
                    z-index: 21;
                }
            }
        }
    }
}
</style>
