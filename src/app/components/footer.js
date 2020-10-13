import React from 'react';
import Content from './content';



class Footer extends React.Component {
    shareTwitter() {
        window.open(
            'https://twitter.com/share?url=' + Content.HerokuLink + '&text=' + Content.description[this.props.language],
            'Twitter share', 'width=420,height=430,resizable=yes,scrollbars=yes,status=yes'
        );
    }

    shareFacebook() {
        window.open(
            'https://www.facebook.com/sharer.php?u=' + Content.HerokuLink, 'Facebook share',
            'width=420,height=230,resizable=yes,scrollbars=yes,status=yes'
        );
    }

    shareReddit() {
        window.open(
            'https://www.reddit.com/submit?url=' + Content.HerokuLink + '&title=' + Content.description[this.props.language],
            'Reddit share', 'width=860,height=860,resizable=yes,scrollbars=yes,status=yes'
        );
    }

    shareVK() {
        window.open(
            'https://vk.com/share.php?url=' + Content.HerokuLink + '&title=' + Content.AppName + '&description=' +
            Content.description[this.props.language], 'VK share', 'width=420,height=430,resizable=yes,scrollbars=yes,status=yes'
        );
    }

    render() {
        return (
            <footer className="container-fluid mt-4">
                <div className="row text-center">
                    <div className="col-12">
                        <h3 className="text-white" id="share-title">{Content.footer.share[this.props.language]}</h3>
                    </div>

                    <div className="col-12">
                        <button type="button" className="btn btn-twitter btn-lg" onClick={this.shareTwitter.bind(this)}>
                            <i className="fab fa-twitter"></i>
                        </button>

                        <button type="button" className="btn btn-facebook btn-lg" onClick={this.shareFacebook.bind(this)}>
                            <i className="fab fa-facebook-f"></i>
                        </button>

                        <button type="button" className="btn btn-reddit btn-lg" onClick={this.shareReddit.bind(this)}>
                            <i className="fab fa-reddit"></i>
                        </button>

                        <button type="button" className="btn btn-vk btn-lg" onClick={this.shareVK.bind(this)}>
                            <i className="fab fa-vk"></i>
                        </button>
                    </div>

                    <div className="col-12">
                        <p className="text-white" id="disclaimer">
                            {Content.footer.disclaimer[this.props.language]}
                        </p>

                        <p className="text-white">
                            <a className="btn btn-link" href={Content.company.website} target="blank" id="copyright">
                                &copy; {Content.company.years} - {Content.company.name}
                            </a>
                        </p>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;