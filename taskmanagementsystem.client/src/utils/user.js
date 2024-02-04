import Cookies from 'js-cookie';

export function saveToken(token) {
    Cookies.set(token);
}