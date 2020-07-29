import App from "../app";


class Content {
    static Languages = {
        EN: 0,
        RU: 1
    };
    
    static HerokuLink = "https://seriesface.herokuapp.com/";
    static Celebrities = require("../../resourсes/dataset.json");
    static AppName = "SeriesFace";

    static company = {
        "name" : "FaceRecognitionTeam",
        "years" : "2020",
        "website" : "https://github.com/FaceRecognitionTeam"
    }

    static content(contents) {
        return contents[App.language];
    }

    static description = [
        "Have you ever imagined yourself as a character in a popular series? What star you could easily replace on " +
        "the set? Find out now! Just upload image of your face and we will show you a character that you looks like.",
        
        "Вы когда-нибудь представляли себя персонажем популярного сериала? Какую звезду Вы могли бы легко заменить " +
        "на съёмочной площадке? Узнайте сейчас! Просто загрузите изображение своего лица, и мы покажем персонажа, "  +
        "который выглядит как Вы."
    ];

    static gallery = {
        "title" : [
            "Gallery",
            "Галерея"
        ]
    }

    static buttons = {
        "previous": [
            "Previous",
            "Следующий"
        ],

        "next": [
            "Next",
            "Предыдущий"
        ],

        "upload": [
            "Upload",
            "Загрузить"
        ]
    }

    static previous() {
        return Content.content([
            "Previous",
            "Предыдущий"
        ]);
    }

    static next() {
        return Content.content([
            "Next",
            "Следующий"
        ]);
    }

    static chooseFile() {
        return Content.content([
            "Choose file",
            "Выберите файл"
        ]);
    }

    static uploadYourPicture() {
        return Content.content([
            "Upload your picture",
            "Загрузите ваше изображение"
        ]);
    }

    static uploadButton() {
        return Content.content([
            "Upload",
            "Загрузить"
        ]);
    }

    static algorithm() {
        return Content.content([
            "Comparison algorithm",
            "Алгоритм сравнения"
        ]);
    }

    static advanced() {
        return Content.content([
            "Advanced",
            "Продвинутый"
        ]);
    }

    static naive() {
        return Content.content([
            "Naive",
            "Наивный"
        ]);
    }

    static successUpload() {
        return Content.content([
            "Image uploaded successfully",
            "Изображение успешно загружено"
        ]);
    }

    static errorFileCount() {
        return Content.content([
            "Choose only ONE file",
            "Выберите только ОДИН файл"
        ]);
    }

    static errorFileType(fileTypesPrintable) {
        return Content.content([
            "Wrong file format (ONLY " + fileTypesPrintable.join(", ") + ")",
            "Неверный формат файла (ТОЛЬКО " + fileTypesPrintable.join(", ") + ")"
        ]);
    }

    static errorNoFace() {
        return Content.content([
            "No faces were found in the photo",
            "Не обнаружено ни одного лица на фотографии"
        ]);
    }

    static loading() {
        return Content.content([
            "Loading...",
            "Загрузка..."
        ]);
    }

    static errorCanvas() {
        return Content.content([
            "Your browser does not support drawing",
            "Ваш браузер не поддерживает рисование"
        ]);
    }

    static errorImageUpload() {
        return Content.content([
            "Image upload error",
            "Ошибка загрузки изображения"
        ]);
    }

    static moreDetails() {
        return Content.content([
            "More details",
            "Подробнее"
        ]);
    }

    static youLookLike() {
        return Content.content([
            "You look like ",
            "Вы выглядите как "
        ]);
    }

    static celebrityName(originalName) {
        return Content.Celebrities[originalName][App.language];
    }

    static celebrityNameNew(originalName, lang) {
        return Content.Celebrities[originalName][lang];
    }

    static on() {
        return Content.content([
            " on",
            " на"
        ]);
    }

    static instruction = {
        'titles': {
            "first" : [
                "Upload a photo",
                "Загрузите фотографию"
            ],

            "second" : [
                "The system detects the face",
                "Система распознает лицо"
            ],

            "third" : [
                "Enjoy the result!",
                "Всё готово!"
            ],
        },

        "descriptions" : {
            "first" : [
                "There should be only one person in the photo. Face recognition accuracy depends on the resolution and " +
                "quality of a face image.",
                
                "На фотографии должен быть только один человек. Точность распознавания лица зависит от разрешения и " +
                "качества изображения лица."
            ],

            "second" : [
                "The system recognizes a face and creates a face pattern. She is able to find key components of the face, " +
                "including eyebrows, eyes, nose, mouth and position.",

                "Система распознает лицо и создает шаблон лица. Она способна найти ключевые компоненты лица, в том числе " +
                "брови, глаза, нос, рот и положение."
            ],

            "third" : [
                "The Neural Network compares the person with celebrity faces and suggests the most similar one.",
                "Нейронная сеть сравнивает фото человека со знаменитостями и предлагает наиболее похожее."
            ],
        }
    }

    static footer = {
        "share" : [
            "Tell about us",
            "Расскажите о нас"
        ],

        "disclaimer": [
            "We do not store uploaded photos. Photos are deleted after recognition. If you want to share it, it " +
            "will be saved in the appropriate social network.",

            "Мы не храним загруженные фотографии. Фотографии удаляются после распознавания. Если Вы захотите поделиться " +
            "ею, она будет сохранена в соответствующей социальной сети."
        ]
    }
}

export default Content;