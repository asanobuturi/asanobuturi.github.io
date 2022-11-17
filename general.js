window.addEventListener("load", function() {
    (function(window,document){
        var lazyCss=document.querySelectorAll(".lazy-css");
        for(var i=0,l=lazyCss.length;i<l;i++){
            lazyCss[i].rel="stylesheet";
        }
    })(window,document);
});
