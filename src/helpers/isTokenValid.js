function isTokenValid(decodedToken) {

    const expiration = decodedToken.exp;
    const currentTime = Date.now()/1000;

    if (currentTime < expiration) {
        return true;
    } else {
        return false;
    }



}

export default isTokenValid;