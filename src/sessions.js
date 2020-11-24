import * as Cookies from 'js-cookie';

export const setSessionCookie = (session) => {
    Cookies.remove('session');
    Cookies.set('session', session, { expires: 1 }); // cookie is acitve for 1 day by default
};

export const getSessionCookie = () => {
    const sessionCookie = Cookies.get('session');
    if(sessionCookie === undefined)
        return {}

    return JSON.parse(sessionCookie);
}
