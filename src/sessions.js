import * as Cookies from 'js-cookie';
import React from 'react';

export const setSessionCookie = (session) => {
    Cookies.remove('session');
    // var in1Minute = new Date(new Date().getTime() + 1 * 60 * 1000);
    Cookies.set('session', session, {expires: 1}); // cookie is acitve for 1 day by default
};

export const getSessionCookie = () => {
    const sessionCookie = Cookies.get('session');
    if(sessionCookie === undefined)
        return {}

    return JSON.parse(sessionCookie);
}

// session context
export const SessionContext = React.createContext(getSessionCookie());