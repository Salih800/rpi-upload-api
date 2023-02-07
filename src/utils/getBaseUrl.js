export function getBaseUrl(req) {
    return new URL(`${req.protocol}://${req.get('host')}`);
}