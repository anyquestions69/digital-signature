<template>
    <div class="info__doc-to-signature">
        <div class="doc-to-signature__header" v-if="AuthStore.getUserRole">
            <a :class="`personal-info ${ isToPersonalType ? '' : 'un' }active`" @click="infoSearch">Разослать</a>
            <a :class="`chat ${ !isToPersonalType ? '' : 'un' }active`" @click="chatSearch">Подать на подпись</a>
        </div>
        <div class="doc-to-signature__content">
            <div v-if="isToPersonalType" class="content__to-personal" style="padding: 30px;">
                <div v-if="!isLoaded" class="to-persona__form">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M0 96C0 60.7 28.7 32 64 32l384 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6l96 0 32 0 208 0c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/>
                    </svg>
                    <h2>Загрузить файл(ы)</h2>
                </div>
                <input v-if="!isLoaded" type="file" 
                        ref="fileInput" 
                        class="to-personal__file-input" 
                        @change="handleFileChange" 
                        multiple 
                        accept=".pdf"
                        max-files="3">
                <div class="to-personal__load-files">
                    <ul class="load-files__list">
                        <li class="list__item" v-for="(item, index) in files" :key="index">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="item__file-svg">
                                <path d="M64 464l48 0 0 48-48 0c-35.3 0-64-28.7-64-64L0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 304l-48 0 0-144-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16zM176 352l32 0c30.9 0 56 25.1 56 56s-25.1 56-56 56l-16 0 0 32c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-48 0-80c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24l-16 0 0 48 16 0zm96-80l32 0c26.5 0 48 21.5 48 48l0 64c0 26.5-21.5 48-48 48l-32 0c-8.8 0-16-7.2-16-16l0-128c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-16 0 0 96 16 0zm80-112c0-8.8 7.2-16 16-16l48 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 32 32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 48c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-64 0-64z"/>
                            </svg>
                            <p>{{ item.name }}</p>
                            <button class="item__del-btn" title="Удалить документ" @click="deleteFile( index )">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                                </svg>
                            </button>
                        </li>
                    </ul>
                </div>
                <button v-if="isLoaded" class="to-personal__btn" @click="create_post">Разослать всем</button>
            </div>
            <div v-else class="content__to-chief" title="В разработке" style="padding: 30px;">
                <p>В разработке</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

import { authStore } from '../../../store/authStore'
import { postStore } from '../../../store/postStore'

var isToPersonalType = ref(true)
const PostStore = postStore()
const AuthStore = authStore()
const fileInput = ref( null )
var files = reactive<File[]>( [] )
var isLoaded = ref( false )
const create_post = async () => {
	for (const file of files) {
		await PostStore.createPost({
			title: file.name,
			file: file
		})
	}
    files = []
    isLoaded.value = false
}
 
const infoSearch = () => {
	isToPersonalType.value = true
}

const chatSearch = () => {
	isToPersonalType.value = false
}

const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files) {
        files.push(...Array.from(target.files));
        isLoaded.value = true
    }
}

const deleteFile = (index: number) => {
	if (index >= 0 && index < files.length) {
		files.splice(index, 1)
	}
}
</script>

<style lang="scss">
.info__doc-to-signature {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .doc-to-signature__header {
        border-bottom: 2px solid $border-color;
        height: 40px;
        @include Flex( row, start, center );

        a {
            height: 100%;
            width: 22%;
            border-right: 2px solid $border-color;
            cursor: pointer;
            overflow: hidden;
            word-wrap: none;
            @include Flex( row, center, center );

            &.active {
                box-shadow: 0px 0px 4px white inset;
            }

            &.unactive {

                &:hover {
                    box-shadow: 0px 0px 4px rgba(255, 255, 255, 0.5) inset;
                }
            }
        }
    }

    .doc-to-signature__content {
        position: relative;
        width: 100%;
        height: 100%;

        .content__to-personal {
            width: 100%;
            height: 100%;

            .to-persona__form {
                width: 100%;
                height: 83%;
                border: 4px dashed $main-font-color;
                border-radius: 20px;
                @include Flex;

                svg {
                    width: 60px;
                    height: auto;

                    path {
                        fill: $main-font-color;
                    }
                }

                h2 {
                    margin-top: 30px;
                }
            }

            .to-personal__file-input {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 83%;
                opacity: 0;

                &::-webkit-file-upload-button {
                    display: none;
                }
            }

            .to-personal__load-files {
                width: 100%;
                height: auto;
                z-index: 10;
                margin-top: 15px;

                .load-files__list {
                    width: 100%;
                    height: 100%;
                    margin-left: 8px;
                    @include Flex(row, start, center);
                    gap: 20px;

                    .list__item {
                        height: auto;
                        position: relative;
                        fill: $main-font-color;

                        .item__file-svg {
                            width: 35px;
                        }

                        p {
                            margin-top: 5px;
                        }

                        .item__del-btn {
                            position: absolute;
                            top: -5px;
                            right: 0px;
                            background: transparent;
                            border: 0;
                            width: 15px;
                        }
                    }
                }
            }

            .to-personal__btn {
                margin-top: 50px;
                padding: 10px 20px;
            }
        }

        .content__to-chief {}
    }
}
</style>
