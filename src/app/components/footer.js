import React from "react";
import Content from "./content";


class Footer extends React.Component {
    shareTwitter() {
        window.open("https://twitter.com/share?url=" + Content.HerokuLink + "&text=" + Content.description(), "Twitter share",
            "width=420,height=430,resizable=yes,scrollbars=yes,status=yes");
    }

    shareFacebook() {
        window.open("https://www.facebook.com/sharer.php?p[title]=MyTitle&p[summary]=" + Content.description() + "&p[url]=" + Content.HerokuLink, "Facebook share",
            "width=420,height=230,resizable=yes,scrollbars=yes,status=yes");
    }

    shareReddit() {
        window.open("https://www.reddit.com/submit?url=" + Content.HerokuLink + "&title=" + Content.description(),
            "Reddit share", "width=860,height=860,resizable=yes,scrollbars=yes,status=yes");
    }

    shareVK() {
        window.open("https://vk.com/share.php?url=" + Content.HerokuLink + "&title=" + Content.description() +
            "&description=" + Content.description(), "VK share", "width=420,height=430,resizable=yes,scrollbars=yes,status=yes");
    }

    render() {
        return (
            <footer className="container-fluid mt-4">
                <div className="row text-center">
                    <div className="col-12">
                        <h3 className="text-white">{Content.tellAboutUs()}</h3>
                    </div>

                    <div className="col-12">
                        <button type="button" className="btn btn-twitter btn-lg" onClick={this.shareTwitter}>
                            <i className="fab fa-twitter"></i>
                        </button>

                        <button type="button" className="btn btn-facebook btn-lg" onClick={this.shareFacebook}>
                            <i className="fab fa-facebook-f"></i>
                        </button>

                        <button type="button" className="btn btn-reddit btn-lg" onClick={this.shareReddit}>
                            <i className="fab fa-reddit"></i>
                        </button>

                        <button type="button" className="btn btn-vk btn-lg" onClick={this.shareVK}>
                            <i className="fab fa-vk"></i>
                        </button>
                    </div>

                    <div className="col-12">
                        <p className="text-white">
                            {Content.disclaimer()}
                        </p>

                        <p className="text-white">
                            <a className="btn btn-link" href="https://github.com/FaceRecognitionTeam" target="blank">&copy; 2020 - FaceRecognitionTeam</a>
                        </p>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;