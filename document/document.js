window.addEventListener("load", (event) => {
    async function getDocumentData(){
        year = location.pathname.split("/document/")[1].split("/")[0]
        console.log(year)
        return await (await fetch(`/document/${year}/documents.json`)).json();
    };
    (async()=>{
        const pages = await getDocumentData();
        console.log(pages);
        if (location.pathname == `/document/${pages.year}/` || location.pathname == `/document/${pages.year}/index.html`) { //部誌のインデックスなら
            const block = document.getElementsByClassName("document")[0];
            for (let i = 0;i<pages["pages"].length;i++) {
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
        } else { //部誌の個別ページなら
            const Prev = document.getElementsByClassName("nextPrev")[0];

            for (let i = 0;i<pages["pages"].length;i++){
                if (pages["pages"][i]["URL"] == location.pathname) {
                    if (i == 0) {
                        Prev.innerHTML =
                        `
                        <div class="prev">次へ<a href="${pages["pages"][i+1]["URL"]}">${pages["pages"][i+1]["name"]} &gt;</a></div>
                        `;
                    } else if (i == pages["pages"].length -1) {
                        Prev.innerHTML =
                        `
                        <div class="next">前へ<a href="${pages["pages"][i-1]["URL"]}">${pages["pages"][i-1]["name"]} &gt;</a></div>
                        `;
                    } else {
                        Prev.innerHTML =
                        `
                        <div class="next">前へ<a href="${pages["pages"][i-1]["URL"]}">${pages["pages"][i-1]["name"]} &gt;</a></div>
                        <div class="prev">次へ<a href="${pages["pages"][i+1]["URL"]}">${pages["pages"][i+1]["name"]} &gt;</a></div>
                        `;
                    }
                }
            }

            const sidemenu = document.getElementById("sidemenu");

            for (let i = 0;i<pages["pages"].length;i++){
                if (pages["pages"][i]["URL"] == location.pathname) {
                    if (i == 0) { //最新
                        sidemenu.innerHTML =
                        `
                        <div class="side-back"><a href="../index.html">記事の一覧へもどる<i class="fas fa-sign-out-alt"></i></a></div>
                        <div class="side-prev"><a href="${pages["pages"][i+1]["URL"]}">${pages["pages"][i+1]["name"]}<i class="fas fa-angle-right"></i></a></div>
                        `;
                    } else if (i == pages["pages"].length - 1) { //最古
                        sidemenu.innerHTML =
                        `
                        <div class="side-back"><a href="../index.html">記事の一覧へもどる<i class="fas fa-sign-out-alt"></i></a></div>
                        <div class="side-prev"><a href="${pages["pages"][i-1]["URL"]}"><i class="fas fa-angle-left"></i>${pages["pages"][i-1]["name"]}</a></div>
                        `;
                    } else { //中間
                        sidemenu.innerHTML =
                        `
                        <div class="side-back"><a href="../index.html">記事の一覧へもどる<i class="fas fa-sign-out-alt"></i></a></div>
                        <div class="side-prev"><a href="${pages["pages"][i+1]["URL"]}">${pages["pages"][i+1]["name"]}<i class="fas fa-angle-right"></i></a></div>
                        <div class="side-prev"><a href="${pages["pages"][i-1]["URL"]}"><i class="fas fa-angle-left"></i>${pages["pages"][i-1]["name"]}</a></div>
                        `;
                    }
                }
            }

            const Author = document.getElementsByClassName("author")[0];

            for (let i = 0;i<pages["pages"].length;i++){
                if (pages["pages"][i]["URL"] == location.pathname) {
                    Author.innerHTML = `
                    <i class="fas fa-user-edit"></i>${pages["pages"][i]["writer"]}
                    `;
                }
            }

            const Title = document.getElementById("title");
            const Path = document.getElementById("breadcrumbs");
            const TwitterButton = document.getElementsByClassName("twitter-share-button")[0];


            for (let i = 0;i<pages["pages"].length;i++){
                if (pages["pages"][i]["URL"] == location.pathname) {
                    Title.innerHTML = pages["pages"][i]["name"];
                    Path.innerHTML = `
                    <i class="fas fa-home" aria-hidden="true"></i><a href="/index.html">ホーム</a>
                    <i class="fas fa-angle-right" aria-hidden="true"></i><a href="/document/index.html">部誌</a>
                    <i class="fas fa-angle-right" aria-hidden="true"></i><a href="../index.html">${pages["year"]}年度部誌</a>
                    <i class="fas fa-angle-right" aria-hidden="true"></i><a href="./index.html">${pages["pages"][i]["name"]}</a>
                    `;
                    TwitterButton.setAttribute("href",`https://twitter.com/intent/tweet?url=${pages["pages"][i]["url"]}&text=${pages["pages"][i]["name"]}&via=Uchi54_APC&related=Uchi54_APC`);
                }
            }
        }
    })()
});
