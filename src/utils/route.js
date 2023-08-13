const renderRouteToUrl = (rawRoutes = []) => {
    if(typeof rawRoutes !== "object") return;
    if(rawRoutes.length === 0) return;
    let outp = "" 
    rawRoutes.forEach(({ latitude, longitude }, index) => {
        outp += longitude + "%2C" + latitude;
        if(index < rawRoutes.length - 1) outp += "%3B";
    })

    return outp;
}

export { renderRouteToUrl };