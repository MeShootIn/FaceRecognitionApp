/*
    При нажатии на кнопки RU, EN не должна перезагружаться страница
*/

class Content {
    lang = "EN";

    set lang(language) {
        this.lang = language;
    }

    static print() {
        return (this.lang === "EN") ? "Language" : "Язык";
    }

    static language = (this.lang === "EN") ? "Language" : "Язык";

    static description = (this.lang === "EN") ?
        ("Have you ever imagined yourself as a character in a popular series? " +
        "What star you could easily replace on the set? Find out now! " +
        "Just upload image of your face and we will show you a character that you looks like.") :

        ("Вы когда-нибудь представляли себя персонажем популярного сериала? Какую звезду вы могли бы " +
        "легко заменить на съемочной площадке? Узнайте сейчас! Просто загрузите изображение своего лица, " +
        "и мы покажем вам персонаж, который выглядит как вы.");

    static upload = (this.lang === "EN") ? ("Upload your picture") : ("Загрузите фотографию");
}

export default Content;