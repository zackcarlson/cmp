import { h, Component } from 'preact';
import Popup from '../../../../components/popup/popup';
import PopupFooter from '../../../../components/popup/popupFooter';
import PopupThin from '../../../../components/popup/popupThin';
import Footer from '../../../../components/footer/footer';
import Publisher from './publisher.jsx';
import style from '../../../../components/app.less';
import { readPublisherConsentCookie } from '../../../../lib/cookie/cookie';

export default class PublisherIntegration extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            consentCookieExists: false
        }
    }

    validateCookieExistence = () => {
        const result = readPublisherConsentCookie();
        return result._value ? true : false;
    }

    handleUserConsent = () => {
        document.hasStorageAccess().then(hasAccess => {
            if (!hasAccess) {
                return document.requestStorageAccess();
            }
        }).then(_ => {
            // Now we have first-party storage access!
            // Example:
            const json = {
                "id":"jyEB2UHSjLo=",
                "version": 2,
                "producer": "1CrsdUNAo6",
                "privacy":
                 {
                  "optout": false
                 }
            };

            document.cookie = `safariCookieExample=${encodeURIComponent(btoa(JSON.stringify(json)))}`;

        }).catch(_ => {
        // error obtaining storage access.
        });
    }

    componentDidMount = () => {
        const { vendor } = navigator;
        this.setState({
            consentCookieExists: this.validateCookieExistence()
        }, () => {
            if (vendor === 'Apple Computer, Inc.') this.handleUserConsent();
        });
    }

    render() {
        const { consentCookieExists } = this.state;
        const { store, localization, onSave, config, updateCSSPrefs } = this.props;

        return (
            consentCookieExists ? 
            <Publisher/> : 
            (
                <div class={style.gdpr}>
                    <Popup
                        store={store}
                        localization={localization}
                        onSave={onSave}
                        config={config}
                        updateCSSPrefs={updateCSSPrefs}
                    />
                    <PopupFooter
                        store={store}
                        localization={localization}
                        onSave={onSave}
                        config={config}
                        updateCSSPrefs={updateCSSPrefs}
                    />
                    <PopupThin
                        store={store}
                        localization={localization}
                        onSave={onSave}
                        config={config}
                        updateCSSPrefs={updateCSSPrefs}
                    />
                    <Footer
                        store={store}
                        localization={localization}
                        config={config}
                        updateCSSPrefs={updateCSSPrefs}
                    />
                </div> 
            )
        );
    }
}