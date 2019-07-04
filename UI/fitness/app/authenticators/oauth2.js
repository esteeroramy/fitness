import OAuth2PasswordGrant  from 'ember-simple-auth/authenticators/oauth2-password-grant';
import config from 'fitness/config/environment';

const host = config.apiUrl || '';
const serverTokenEndpoint = [ host, 'login' ];

export default OAuth2PasswordGrant.extend({
    rejectWithResponse: true,
    serverTokenEndpoint: serverTokenEndpoint.join('/')
});
