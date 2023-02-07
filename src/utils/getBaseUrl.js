// import url from 'url';

export function getBaseUrl(req) {
    return new URL(`${req.protocol}://${req.get('host')}`);
    // return url.format({
    //     protocol: req.protocol,
    //     host: req.get('host'),
    //     pathname: req.originalUrl
    // });
}