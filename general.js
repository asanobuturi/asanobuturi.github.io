const URLs={
    "/index.html"              : "^/$|^/index.html$",
    "/about/index.html"        : "^/about/$",
    "/document/index.html"     : "^/document/*$",
    "/game/index.html"         : "^/game/.*$",
    "/blog/index.html"         : "^/blog/.*$",
    "/electronic/index.html"  : "^/electronic/.*$",
};

let path;
for (let i of Object.entries(URLs)){
    if ((new RegExp(i[1])).test(location.pathname)){
        path=i[0];
        break;
    }
}


try {
    document.querySelector(`div#nav-content a[href="${path}"]`).classList.add("isActive");
} catch {
    console.log("Unknown page. :(");
}
