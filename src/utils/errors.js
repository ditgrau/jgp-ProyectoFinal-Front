export const gettingErrors = (code) => {
    switch (code) {
        case 401:
            return ('Su cuenta no está confirmada');
        case 403:
            return ('No está autorizadx');
        default:
            return ('Ha habido un error, recargue la página')
    }
}