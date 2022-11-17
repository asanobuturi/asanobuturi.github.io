function loadTwitterJS() {
    let ad = document.createElement("script");
    ad.type = "text/javascript";
    ad.async = false;
    ad.src = "https://platform.twitter.com/widgets.js";
    let sc = document.getElementsByTagName("script")[0];
    sc.parentNode.insertBefore(ad, sc);
}

function setTimelineHeight() {
    let timeline = document.getElementsByClassName("twitter-timeline")[0];
    let height = document.getElementById("blog-list").offsetHeight;
    timeline.setAttribute("data-height", height);
}

window.addEventListener("load", function() {
    loadTwitterJS();
    setTimelineHeight();
});
