<template>
    <div class="main__scope">
        <h1 class="scope__title">Преимущества системы:</h1>
        <div class="scope__list">
            <div class="scope__item">
                <img src="../../../assets/img/security.png" alt="">
                <h1>Безопасность</h1>
                <p>Обеспечение абсолютную безопасность передачи документов и приказов благодаря использованию технологии блокчейна.</p>
            </div>
            <div class="scope__item">
                <img src="../../../assets/img/integrity.svg" alt="">
                <h1>Целостность</h1>
                <p>Платформа гарантирует полную целостность всех документов и приказов с момента создания до момента их получения получателем.</p>
            </div>
            <div class="scope__item">
                <img src="../../../assets/img/availability.png" alt="">
                <h1>Доступность</h1>
                <p>Приложение обеспечивает бесперебойный доступ к вашим документам и приказам в любое время и из любой точки мира.</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.main__scope {
    margin-bottom: 100px;

    .scope__title {
        @include Title;
    }

    .scope__list {
        margin-top: 50px;
        @include Flex( row, space-between, stretch );

        .scope__item {
            width: 30%;
            border: 2px solid #f0f0f0;
            border-radius: 20px;
            margin-bottom: 20px;
            padding: 15px 30px;

            img {
                width: 60px;
                height: auto;
            }

            h1 {
                margin-top: 20px;
                @include Title;
                font-size: 1.5em;
            }

            p {
                margin-top: 20px;
                letter-spacing: -0.5px;
            }
        }
    }
}
</style>