import App from "../app";

class Content {
    static content(eng, rus) {
        return (App.language === "EN") ? eng : rus;
    }

    static description() {
        return Content.content(
            "Have you ever imagined yourself as a character in a popular series? What star you could easily replace on" +
            "the set? Find out now! Just upload image of your face and we will show you a character that you looks like.",

            "Вы когда-нибудь представляли себя персонажем популярного сериала? Какую звезду Вы могли бы легко заменить " +
            "на съёмочной площадке? Узнайте сейчас! Просто загрузите изображение своего лица, и мы покажем Вам " +
            "персонажа, который выглядит как Вы."
        );
    }

    static gallery() {
        return Content.content(
            "Gallery",
            "Галерея"
        );
    }

    static AlyciaDebnamCarey() {
        return Content.content(
            "Alycia Debnam-Carey",
            "Алисия Дебнем-Кэри"
        );
    }

    static AshleyBenson() {
        return Content.content(
            "Ashley Benson",
            "Эшли Бенсон"
        );
    }

    static NinaDobrev() {
        return Content.content(
            "Nina Dobrev",
            "Нина Добрев"
        );
    }

    static KendallJenner() {
        return Content.content(
            "Kendall Jenner",
            "Кендалл Дженнер"
        );
    }

    static uploadYourPicture() {
        return Content.content(
            "Upload a picture",
            "Загрузите вашу изображение"
        );
    }

    static chooseFile() {
        return Content.content(
            "Choose file",
            "Выберите файл"
        );
    }

    static yourFace() {
        return Content.content(
            "Your face",
            "Ваше лицо"
        );
    }

    static celebrityFace() {
        return Content.content(
            "Most similar celebrity",
            "Наиболее похожая знаменитость"
        );
    }

    static match() {
        return Content.content(
            "Match",
            "Совпадение"
        );
    }

    static upload() {
        return Content.content(
            "Upload a photo",
            "Загрузите фотографию"
        );
    }

    static uploadDescription() {
        return Content.content(
            "There should be only one person in the photo. Face recognition accuracy depends on the resolution and " +
            "quality of a face image.",

            "На фотографии должен быть только один человек. Точность распознавания лица зависит от разрешения и " +
            "качества изображения лица."
        );
    }

    static wrongFileFormat() {
        return Content.content(
            "Wrong file format (ONLY ",
            "Неверный формат файла (ТОЛЬКО "
        );
    }

    static successUpload() {
        return Content.content(
            "Image uploaded successfully",
            "Изображение успешно загружено"
        );
    }

    static detection() {
        return Content.content(
            "The system detects the face",
            "Система распознает лицо"
        );
    }

    static detectionDescription() {
        return Content.content(
            "The system detects the face and creates a facial pattern. It can locate the key components of faces, " +
            "including eyebrows, eyes, nose, mouth and position.",

            "Система распознает лицо и создает шаблон лица. Он может найти ключевые компоненты лица, в том числе " +
            "брови, глаза, нос, рот и положение."
        );
    }

    static result() {
        return Content.content(
            "Enjoy the result!",
            "Всё готово!"
        );
    }

    static resultDescription() {
        return Content.content(
            "The Neural Network compares the person with celebrity faces and suggests the most similar one.",
            "Нейронная сеть сравнивает фото человека со знаменитостями и предлагает наиболее похожее."
        );
    }

    static tellAboutUs() {
        return Content.content(
            "Tell about us",
            "Расскажите о нас"
        );
    }

    static disclaimer() {
        return Content.content(
            "We do not store uploaded photos. All photos are deleted after recognition. The photo will be saved only" +
            "if you want to share it.",

            "Мы не храним загруженные фотографии. Все фотографии удаляются после распознавания. Фотография будет" +
            "сохранена, только если вы захотите поделиться ею."
        );
    }
}

export default Content;