window.addEventListener('load', (event) => {
    const sidebar=
    `
    <input id="nav-input" type="checkbox" class="nav-unshown">
    <label id="nav-open" for="nav-input">
        <span class="bar bar1"></span>
        <span class="bar bar2"></span>
        <span class="bar bar3"></span>
        <span class="menu">MENU</span>
        <span class="close">CLOSE</span>
    </label>
    <label id="nav-close" for="nav-input"></label>
    <div id="nav-content">
        <a class="nav-link" href="/index.html">ホーム</a>
        <a class="nav-link" href="/about.html">物理部とは</a>
        <a class="nav-link" href="/document/index.html">部誌</a>
        <a class="nav-link" href="/game/index.html">ゲーム</a>
        <a class="nav-link" href="/blog/index.html">ブログ</a>
        <a class="nav-link" href="/electronics/index.html">電工の部屋</a>
        <div class="nav-separator"></div>
        <a class="nav-link" href="http://d.hatena.ne.jp/apc/">ブログ(外部サイト)</a>
    </div>
    `;

    document.getElementById("nav-drawer").innerHTML = sidebar;

    const URLs={
        "/index.html"              : "^/$|^/index.html$",
        "/about.html"              : "^/about.html$",
        "/document/index.html"     : "^/document.html$",
        "/document/index.html"     : "^/document.*$",
        "/game/index.html"         : "^/game/.*$",
        "/blog/index.html"         : "^/blog/.*$",
        "/electronics/index.html"  : "^/electronics/.*$",
    };

    let path;
    for (let i of Object.entries(URLs)){
        if ((new RegExp(i[1])).test(location.pathname)){
            path=i[0];
            break;
        }
    }
    document.querySelector(`div#nav-content a[href="${path}"]`).classList.add("isActive");
});
