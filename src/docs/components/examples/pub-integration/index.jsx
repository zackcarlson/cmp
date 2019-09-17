import { h, Component } from 'preact';
import CMP from '../../../../components/app.jsx';
import Publisher from './publisher';
import { readPublisherConsentCookie } from '../../../../lib/cookie/cookie';

export default class PublisherIntegration extends Component { 

    state = {
        consentCookieExists: false
    }

    componentDidMount = () => {
        this.setState({
            consentCookieExists: readPublisherConsentCookie() ? true : false
        });
    }

    render(state) {
        const { consentCookieExists } = state;

        {
            consentCookieExists ? <Publisher /> : <CMP/>
        }
    }
}