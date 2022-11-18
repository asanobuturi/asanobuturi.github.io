function setTimelineHeight() {
    let timeline = document.getElementById("twittertimeline");
    let TwitterArticle = document.getElementsByClassName("twitter-article")[0];
    let height = document.getElementById("blog-list").offsetHeight;
    if (height == 0) { // ブログの更新欄が表示されていない、つまり横幅が小さい画面のとき
        height = 500;
    }
    timeline.setAttribute("style", `border:none;width: 100%; height:${height}px;`);
    TwitterArticle.setAttribute("style", `height:${height}px;`);
}

window.addEventListener("load", function() {
    setTimelineHeight();
});
