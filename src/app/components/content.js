import App from "../app";


class Content {
    static Languages = [ "EN", "RU" ];
    
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

    static description = {
        "EN":
            "Have you ever imagined yourself as a character in a popular series? What star you could easily replace on " +
            "the set? Find out now! Just upload image of your face and we will show you a character that you looks like.",
        "RU":
            "Вы когда-нибудь представляли себя персонажем популярного сериала? Какую звезду Вы могли бы легко заменить " +
            "на съёмочной площадке? Узнайте сейчас! Просто загрузите изображение своего лица, и мы покажем персонажа, "  +
            "который выглядит как Вы."
    };

    static gallery = {
        "title" : {
            "EN": "Gallery",
            "RU": "Галерея"
        }
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

    static on() {
        return Content.content([
            " on",
            " на"
        ]);
    }

    static instruction = {
        'titles': {
            "first" : {
                "EN": "Upload a photo",
                "RU": "Загрузите фотографию"
            },

            "second" : {
                "EN": "The system detects the face",
                "RU": "Система распознает лицо"
            },

            "third" : {
                "EN": "Enjoy the result!",
                "RU": "Всё готово!"
            },
        },

        "descriptions" : {
            "first" : {
                "EN":
                    "There should be only one person in the photo. Face recognition accuracy depends on the resolution and " +
                    "quality of a face image.",
                "RU":
                    "На фотографии должен быть только один человек. Точность распознавания лица зависит от разрешения и " +
                    "качества изображения лица."
            },

            "second" : {
                "EN":
                    "The system recognizes a face and creates a face pattern. She is able to find key components of the face, " +
                    "including eyebrows, eyes, nose, mouth and position.",
                "RU":
                    "Система распознает лицо и создает шаблон лица. Она способна найти ключевые компоненты лица, в том числе " +
                    "брови, глаза, нос, рот и положение."
            },

            "third" : {
                "EN": "The Neural Network compares the person with celebrity faces and suggests the most similar one.",
                "RU": "Нейронная сеть сравнивает фото человека со знаменитостями и предлагает наиболее похожее."
            },
        }

    }

    static footer = {
        "share" : {
            "EN": "Tell about us",
            "RU": "Расскажите о нас"
        },

        "disclaimer": {
            "EN":
                "We do not store uploaded photos. Photos are deleted after recognition. If you want to share it, it " +
                "will be saved in the appropriate social network.",
            "RU":
                "Мы не храним загруженные фотографии. Фотографии удаляются после распознавания. Если Вы захотите поделиться " +
                "ею, она будет сохранена в соответствующей социальной сети."
        }
    }
}

export default Content;