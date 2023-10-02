function logger (req, res, next) {
    const timeStamp = new Date().toLocaleString();
    const methodUsed = req.method;
    const url = req.originalUrl;

    console.log(`
        TIMESTAMP: ${timeStamp}
        METHOD: ${methodUsed}
        URL: ${url}
        `)

    next();
}


module.exports = {
    logger
}