class Content {
    static lang = "EN";

    get lang() {
        return Content.lang;
    }

    static changeLanguage(lang) {
        Content.lang = lang;
    }
}

export default Content;