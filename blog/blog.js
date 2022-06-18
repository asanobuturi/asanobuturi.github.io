window.addEventListener("load", (event) => {
    function blog() {
        if (location.pathname == "/blog/" || location.pathname == "/blog/index.html") { //ブログのインデックスなら
            const block = document.getElementById("blogBlock");
            for (let i = 0;i<pages["pages"].length;i++){
                let date = pages["pages"][i]["date"].split("/");
        
                block.innerHTML += 
                `
                <div class="blogPosts">
                    <div class="articleUnit">
                        <p class="title"><a href="${pages["pages"][i]["URL"]}">${pages["pages"][i]["name"]}</a></p>
                        <p class="date"><time datetime="${date[0]}-${date[1]}-${date[2]}">${date[0]}年${date[1]}月${date[2]}日</time></p>
                        <p class="text">${pages["pages"][i]["desc"]}</p>
                        <p class="readMore"><a href="${pages["pages"][i]["URL"]}">記事を読む &gt;</a></p>
                    </div>
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
    }
    async function getBlogData(){
        return await (await fetch("/blog/blog.json")).json();
    };
    (async()=>{
        const pages = await getBlogData();
        blog();
    })()
});
