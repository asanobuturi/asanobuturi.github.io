window.addEventListener("load", (event) => {
    async function getDocumentData(year){
        return await (await fetch(`/document/${year}/documents.json`)).json();
    };
    (async()=>{
        const document_data = await getDocumentData(location.pathname.split("/document/")[1].split("/")[0]);

        //console.log(document_data);

        if (location.pathname == `/document/${document_data.year}/` || location.pathname == `/document/${document_data.year}/index.html`) { //部誌のインデックスなら
            const block = document.getElementsByClassName("document")[0];
            for (let i = 0;i<document_data["pages"].length;i++) {
                console.log(document_data["pages"][i]["name"]);
                block.innerHTML +=
                `
                <div class="documentcontent">
                    <a href="/document/${document_data.year}/${document_data["pages"][i]["folder_name"]}/index.html" class="link-1">${document_data["pages"][i]["name"]}</a>
                    <h2 class="documentdetail">${document_data["pages"][i]["desc"]}</h2>
                    <p>著者:${document_data["pages"][i]["writer"]}</p>
                    <a href="/document/${document_data.year}/${document_data["pages"][i]["folder_name"]}/index.html" class="link-2">記事へ>></a>
                </div>
                `;
            }
        } else { //部誌の個別ページなら
            const Prev = document.getElementsByClassName("nextPrev")[0];
            const Sidemenu = document.getElementById("sidemenu");

            const Author = document.getElementsByClassName("author")[0];
            const Title = document.getElementById("title");
            const Path = document.getElementById("breadcrumbs");
            const TwitterButton = document.getElementsByClassName("twitter-share-button")[0];

            for (let i = 0;i<document_data["pages"].length;i++){
                if (document_data["pages"][i]["folder_name"] == location.pathname.split("/")[3]) {
                    if (i == 0) {
                        Prev.innerHTML =
                        `
                        <div class="prev">次へ<a href="${document_data["pages"][i+1]["URL"]}">${document_data["pages"][i+1]["name"]} &gt;</a></div>
                        `;
                        Sidemenu.innerHTML =
                        `
                        <div class="side-back"><a href="../index.html">記事の一覧へもどる<i class="fas fa-sign-out-alt"></i></a></div>
                        <div class="side-prev"><a href="${document_data["pages"][i+1]["URL"]}">${document_data["pages"][i+1]["name"]}<i class="fas fa-angle-right"></i></a></div>
                        `;
                    } else if (i == document_data["pages"].length - 1) {
                        Prev.innerHTML =
                        `
                        <div class="next">前へ<a href="${document_data["pages"][i-1]["URL"]}">${document_data["pages"][i-1]["name"]} &gt;</a></div>
                        `;
                        Sidemenu.innerHTML =
                        `
                        <div class="side-back"><a href="../index.html">記事の一覧へもどる<i class="fas fa-sign-out-alt"></i></a></div>
                        <div class="side-prev"><a href="${document_data["pages"][i-1]["URL"]}"><i class="fas fa-angle-left"></i>${document_data["pages"][i-1]["name"]}</a></div>
                        `;
                    } else {
                        Prev.innerHTML =
                        `
                        <div class="next">前へ<a href="${document_data["pages"][i-1]["URL"]}">${document_data["pages"][i-1]["name"]} &gt;</a></div>
                        <div class="prev">次へ<a href="${document_data["pages"][i+1]["URL"]}">${document_data["pages"][i+1]["name"]} &gt;</a></div>
                        `;
                        Sidemenu.innerHTML =
                        `
                        <div class="side-back"><a href="../index.html">記事の一覧へもどる<i class="fas fa-sign-out-alt"></i></a></div>
                        <div class="side-prev"><a href="${document_data["pages"][i+1]["URL"]}">${document_data["pages"][i+1]["name"]}<i class="fas fa-angle-right"></i></a></div>
                        <div class="side-prev"><a href="${document_data["pages"][i-1]["URL"]}"><i class="fas fa-angle-left"></i>${document_data["pages"][i-1]["name"]}</a></div>
                        `;
                    }

                    Author.innerHTML = `
                    <i class="fas fa-user-edit"></i>${document_data["pages"][i]["writer"]}
                    `;
                    Title.innerHTML = document_data["pages"][i]["name"];
                    Path.innerHTML = `
                    <i class="fas fa-home" aria-hidden="true"></i><a href="/index.html">ホーム</a>
                    <i class="fas fa-angle-right" aria-hidden="true"></i><a href="/document/index.html">部誌</a>
                    <i class="fas fa-angle-right" aria-hidden="true"></i><a href="../index.html">${document_data["year"]}年度部誌</a>
                    <i class="fas fa-angle-right" aria-hidden="true"></i><a href="./index.html">${document_data["pages"][i]["name"]}</a>
                    `;
                    TwitterButton.setAttribute("href",`https://twitter.com/intent/tweet?url=${document_data["pages"][i]["url"]}&text=${document_data["pages"][i]["name"]}&via=Uchi54_APC&related=Uchi54_APC`);
                }
            }
        }
    })()
});
