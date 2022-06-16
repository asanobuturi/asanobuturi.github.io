window.addEventListener("load", (event) => {
    const pages =
    {
        "pages": [
            {
                "name": "高校数学で描くマンデルブロ集合",
                "date": "2022/05/15",
                "URL": "/blog/20220508/",
                "desc": "数学によってもたらされる美しい図像「マンデルブロ集合」を高校数学の知識だけで描画することを試みます。"
            },
            {
                "name": "AviUtlについて、導入など",
                "date": "2019/03/06",
                "URL": "/blog/20190306/",
                "desc": "AviUtlについて、お話しします。みんな、AviUtlって知ってるかな？"
            },
            {
                "name": "MIDIについて語る その三",
                "date": "2018/12/29",
                "URL": "/blog/20181229/",
                "desc": "Dominoをもっと触る。"
            },
            {
                "name": "MIDIについて語る その二",
                "date": "2018/11/30",
                "URL": "/blog/20181130/",
                "desc": "Dominoを触る。"
            },
            {
                "name": "MIDIについて語る その一",
                "date": "2018/11/23",
                "URL": "/blog/20181123/",
                "desc": "MIDIってなんだよ"
            },
            {
                "name": "DELL OPTIPLEX 780手術",
                "date": "2018/11/13",
                "URL": "/blog/20181113/",
                "desc": "備品のDELL OPTIPLEX 780が壊れたので修理しました。"
            },
            {
                "name": "物理部員のよく使うブラウザ",
                "date": "2018/11/09",
                "URL": "/blog/20181109/",
                "desc": "物理部員はブラウザについてはうるさいほうです。"
            },
            {
                "name": "物理部員PC班のよく使う言語",
                "date": "2018/11/02",
                "URL": "/blog/20181102/",
                "desc": "物理部で使われている言語とは...？"
            },
            {
                "name": "物理部員のよく使うソフト",
                "date": "2018/10/26",
                "URL": "/blog/20181026/",
                "desc": "物理部員が使っているソフトを一部紹介。"
            },
            {
                "name": "近況報告とか",
                "date": "2018/10/25",
                "URL": "/blog/20181025/",
                "desc": "前回のブログ更新から一年が経とうとしています。この一年弱のあいだにあったことなどの報告。"
            },
            {
                "name": "2018年2月は満月にならない",
                "date": "2017/12/17",
                "URL": "/blog/20171217_2/",
                "desc": "2018年2月は，満月になりません。その理由や，2018年以外にはいつあるのかなど。"
            },
            {
                "name": "ホームページ引っ越し",
                "date": "2017/12/17",
                "URL": "/blog/20171217/",
                "desc": "ホームページを引っ越しました。"
            },
            {
                "name": "ホームページ更新",
                "date": "2017/11/26",
                "URL": "/blog/20171126/",
                "desc": "ようやくホームページを更新したので，その変更点などについて軽く紹介します。"
            }
        ]
    };

    if (location.pathname == "/blog/" || location.pathname == "/blog/index.html") { //ブログのインデックスなら
        const block = document.getElementById("blogBlock");
        for (let i = 0;i<pages["pages"].length;i++){
            let date = pages["pages"][i]["date"].split("/");

            block.innerHTML += 
            `<div class="blogPosts">
                <div class="articleUnit">
                    <p class="title"><a href="${pages["pages"][i]["URL"]}">${pages["pages"][i]["name"]}</a></p>
                    <p class="date"><time datetime="${date[0]}-${date[1]}-${date[2]}">${date[0]}年${date[1]}月${date[2]}日</time></p>
                    <p class="text">${pages["pages"][i]["desc"]}</p>
                    <p class="readMore"><a href="20220508">記事を読む &gt;</a></p>
                </div>
            </div>
            `
        }
    }
});