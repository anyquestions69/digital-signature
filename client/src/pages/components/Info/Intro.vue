<template>
    <div class="wrapper__intro">
        <div class="intro__conteiner">
            <div class="conteiner__text">
                <h1 class="text__title">Система безопасного документаоборота</h1>
                <p class="text_description">Система позволяет безопасно передать посредством распределённого реестра информацию, в том числе находящуюся под грифом секретности!</p>
                <RouterLink class="text__link" to="/auth">
                    <p>Присоединиться</p>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/>
                    </svg>
                </RouterLink>
            </div>
            <div class="conteiner__animation">
                <img src="../../../assets/img/blockchein.gif" alt="blockchein">
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.wrapper__intro {
    margin-top: 80px;
    width: 100%;
    margin-bottom: 100px;

    .intro__conteiner {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 20px;

        .conteiner__text {
            width: 50%;

            .text__title {
                @include Title;
            }

            .text_description {
                margin-top: 25px;
                font-size: 18px;
            }

            .text__link {
                margin-top: 50px;
                @include ItemLink;
                gap: 10px;
                width: 220px;
                height: 58px;
                border: 2px solid;
                border-radius: 30px;
            }
        }

        .conteiner__animation {
            user-select: none;
            width: 40%;

            img {
                border-radius: 20px;
                width: 500px;
                height: auto;
            }
        }
    }
}
</style>