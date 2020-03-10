import React from "react";
import Content from "./content";

class Description extends React.Component {
    description = (Content.lang === "EN") ?
        ("Have you ever imagined yourself as a character in a popular series? " +
            "What star you could easily replace on the set? Find out now! " +
            "Just upload image of your face and we will show you a character that you looks like.") :

        ("Вы когда-нибудь представляли себя персонажем популярного сериала? Какую звезду Вы могли бы " +
            "легко заменить на съёмочной площадке? Узнайте сейчас! Просто загрузите изображение своего лица, " +
            "и мы покажем Вам персонажа, который выглядит как Вы.");

    render() {
        return (
            <div className="d-flex justify-content-center">
                <div className="col-10 col-sm-8 text-center border rounded shadow pt-3 mt-3 bg-white" style={{ fontSize: 22 }}>
                    <p>
                        {this.description}
                    </p>
                </div>
            </div>
        );
    }
}

export default Description;