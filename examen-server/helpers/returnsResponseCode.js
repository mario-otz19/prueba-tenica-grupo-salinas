const returnsResponseCode = (res, responseCode, responseData) => {
    if (responseCode === 500) {
        return res.status(responseCode).json({
            ok: false,
            msg: '¡Ha ocurrido un error inesperado, favor de contactar al admin! D:'
        });
    }

    return res.status(responseCode).json(responseData);
}

module.exports = {
    returnsResponseCode
}