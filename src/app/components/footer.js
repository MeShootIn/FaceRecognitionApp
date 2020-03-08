import React from "react";
import Content from "./content";

class Footer extends React.Component {
    shareTwitter() {
        window.open("https://twitter.com/share?text=" + Content.description, "Twitter share",
        "width=420,height=430,resizable=yes,scrollbars=yes,status=yes");
    }

    // Доделать
    shareFacebook() {
        //window.open("https://www.facebook.com/sharer.php?u=https://starbyface.com","Facebook share","width=420,height=230,resizable=yes,scrollbars=yes,status=yes");
    }

    shareReddit() {
        //window.open("https://www.reddit.com/submit?url=https://starbyface.com&title=The Face-recognizing search engine based on deep neural networks. Find Look-alike Celebrity", "Reddit share", "width=860,height=860,resizable=yes,scrollbars=yes,status=yes");
    }

    shareGooglePlus() {
        //window.open("https://plus.google.com/share?url=https://starbyface.com", "Google+ share", "width=420,height=430,resizable=yes,scrollbars=yes,status=yes");
    }

    shareVK() {
        //window.open("https://vk.com/share.php?url=https://starbyface.com&title=Cистема распознания лиц для поиска похожих на вас знаменитостей основанная на глубоких нейронных сетях&description=Cистема распознания лиц для поиска похожих на вас знаменитостей основанная на глубоких нейронных сетях", "VK share", "width=420,height=430,resizable=yes,scrollbars=yes,status=yes");
    }

    render() {
        return (
            <footer className="container-fluid mt-5">
                <div className="row text-center">
                    <div className="col-12">
                        <h3 className="text-white">Tell about us</h3>
                    </div>

                    <div className="col-12">
                        <button type="button" className="btn btn-twitter btn-lg" onClick={this.shareTwitter}>
                            <i class="fab fa-twitter"></i>
                        </button>

                        <button type="button" className="btn btn-facebook btn-lg" onClick={this.shareFacebook}>
                            <i class="fab fa-facebook-f"></i>
                        </button>

                        <button type="button" className="btn btn-reddit btn-lg" onClick={this.shareReddit}>
                            <i class="fab fa-reddit"></i>
                        </button>

                        <button type="button" className="btn btn-google-plus-g btn-lg" onClick={this.shareReddit}>
                            <i class="fab fa-google-plus-g"></i>
                        </button>

                        <button type="button" className="btn btn-vk btn-lg" onClick={this.shareVK}>
                            <i class="fab fa-vk"></i>
                        </button>
                    </div>

                    <div className="col-12">
                        <p className="text-white">
                            We do not store uploaded photos. All photos are deleted after recognition. 
                            The photo will be saved only if you want to share it.
                        </p>
                        <p className="text-white">
                            &copy; 2020 - FaceRecognitionTeam
                        </p>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;