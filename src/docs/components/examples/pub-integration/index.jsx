import { h, Component } from 'preact';
import PopupFooter from '../../../../components/popup/popupFooter';
import Publisher from './publisher.jsx';
import style from '../../../../components/app.less';
import { readPublisherConsentCookie } from '../../../../lib/cookie/cookie';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'; 

export default class PublisherIntegration extends Component { 
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

    handleSave = () => {
        const { onSave } = this.props;
        onSave();
        setTimeout(() => window.location = '/', 250);
    }

    componentDidMount = () => {
        const { vendor } = navigator;
        if (vendor === 'Apple Computer, Inc.') this.handleUserConsent();
    }

    render(props) {
        const { store, localization, config, updateCSSPrefs } = props;

        const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
                this.validateCookieExistence() 
                ? <Component {...props} />
                : <Redirect to='/cmp' />
            )} />
        ) 

        return (
            <Router>
                <Switch>
                    <Route exact path='/cmp'>
                        <div className={style.gdpr}>
                            <PopupFooter
                                store={store}
                                localization={localization}
                                onSave={this.handleSave}
                                config={config}
                                updateCSSPrefs={updateCSSPrefs}
                                isActive={true}
                                selectedPanelIndex={1}
                            />
                        </div>
                    </Route>
                    <PrivateRoute exact path='/' component={Publisher}/>
                </Switch>
            </Router>
        );
    }
}