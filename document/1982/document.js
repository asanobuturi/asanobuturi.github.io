window.addEventListener("load", (event) => {
    const pages =
    {
        "year": "1982",
        "pages": [
            {
                "name": "物理部の五年間の中で...",
                "URL": "/document/1982/intro/index.html",
                "writer": "部長(高二)",
                "desc": "部長による物理部の体験記。"
            }
        ]
    };

    if (location.pathname == "/document/1982/" || location.pathname == "/document/1982/index.html") { //ブログのインデックスなら
        const block = document.getElementsByClassName("document")[0];
        for (let i = 0;i<pages["pages"].length;i++){
            console.log(pages["pages"][i]["name"]);
            block.innerHTML +=
            `
            <div class="documentcontent">
                <a href="${pages["pages"][i]["URL"]}" class="link-1">${pages["pages"][i]["name"]}</a>
                <h2 class="documentdetail">${pages["pages"][i]["desc"]}</h2>
                <p>著者:${pages["pages"][i]["writer"]}</p>
                <a href="${pages["pages"][i]["URL"]}" class="link-2">記事へ>></a>
            </div>
            `
        }
    } else {
        const Prev = document.getElementsByClassName("nextPrev")[0];

        for (let i = 0;i<pages["pages"].length;i++){
            if (pages["pages"][i]["URL"] == location.pathname.split("index.html")[0]) {
                if (i == 0) {
                    Prev.innerHTML = 
                    `
                    <div class="next">次へComing Soon...</div>
                    <div class="prev">前へ<a href="${pages["pages"][i+1]["URL"]}">${pages["pages"][i+1]["name"]} &gt;</a></div>
                    `;
                } else if (i == pages["pages"].length -1) {
                    Prev.innerHTML = 
                    `
                    <div class="next">次へ<a href="${pages["pages"][i-1]["URL"]}">${pages["pages"][i-1]["name"]} &gt;</a></div>
                    `;
                } else {
                    Prev.innerHTML =
                    `
                    <div class="next">次へ<a href="${pages["pages"][i-1]["URL"]}">${pages["pages"][i-1]["name"]} &gt;</a></div>
                    <div class="prev">前へ<a href="${pages["pages"][i+1]["URL"]}">${pages["pages"][i+1]["name"]} &gt;</a></div>
                    `;
                }
            }
        }
    }
});