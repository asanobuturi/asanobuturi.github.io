function setTimelineHeight() {
    let timeline = document.getElementById("twittertimeline");
    let TwitterArticle = document.getElementsByClassName("twitter-article")[0];
    let height = document.getElementById("blog-list").offsetHeight;
    timeline.setAttribute("style", `border:none; width:100%; height:${height}px;`);
    TwitterArticle.setAttribute("style", `height:${height}px;`);
}

window.addEventListener("load", function() {
    console.log("Finished loading.");
    setTimelineHeight();
});
