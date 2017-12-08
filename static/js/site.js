var HugoThemeSimplicity;
(function (HugoThemeSimplicity) {
    // tslint:disable-next-line:variable-name
    var ShareBaseLinks = {
        twitter: "https://twitter.com/intent/tweet",
        facebook: "https://www.facebook.com/sharer.php",
        google: "https://plus.google.com/share",
        linkedin: "https://www.linkedin.com/shareArticle"
    };
    function socialShareUtil(site, url, shareUrl) {
        ga("send", "social", site, "share", url);
        var win = window.open(shareUrl, "_blank", "height=400, width=500, menubar=0");
    }
    function socialShareUtilBuildUrl(site, title, url) {
        switch (site) {
            case "twitter":
                return ShareBaseLinks.twitter + "?url=" + encodeURIComponent(url) + "&text=" + encodeURIComponent(title) + "&original_referer=" + encodeURIComponent(url);
            case "facebook":
                return ShareBaseLinks.facebook + "?u=" + encodeURIComponent(url) + "&title=" + encodeURIComponent(title);
            case "linkedin":
                return ShareBaseLinks.linkedin + "?url=" + encodeURIComponent(url) + "&title=" + encodeURIComponent(title);
            case "google":
                return ShareBaseLinks.google + "?url=" + encodeURIComponent(url);
        }
    }
    var Simplicity = /** @class */ (function () {
        function Simplicity() {
        }
        Simplicity.prototype.start = function () {
            this.attachEventNavToggle();
            this.attachEventShareLinks();
            this.attacheEventScrollTop();
        };
        Simplicity.prototype.attachEventNavToggle = function () {
            var navToggles = Array.prototype.slice.call(document.getElementsByClassName("navbar-burger"));
            navToggles.forEach(function (el) {
                var targetId = el.dataset.targetId;
                if (targetId !== undefined && targetId !== null) {
                    el.addEventListener("click", function (ev) {
                        ev.preventDefault();
                        ev.stopPropagation();
                        var target = document.getElementById(targetId);
                        var active = el.classList.contains("is-active");
                        if (active) {
                            el.classList.remove("is-active");
                            target.classList.remove("is-active");
                        }
                        else {
                            el.classList.add("is-active");
                            target.classList.add("is-active");
                        }
                    });
                }
            });
        };
        Simplicity.prototype.attachEventShareLinks = function () {
            var social = Array.prototype.slice.call(document.getElementsByClassName("social-share-link"));
            var url = window.location.toString();
            var title = window.document.title;
            social.forEach(function (el) {
                var social = el.dataset.social;
                var site = el.dataset.site;
                if (site !== undefined && site !== null && social !== undefined && social !== null) {
                    el.addEventListener("click", function (ev) {
                        ev.preventDefault();
                        ev.stopPropagation();
                        socialShareUtil(social, url, socialShareUtilBuildUrl(site, title, url));
                    });
                }
            });
        };
        Simplicity.prototype.attacheEventScrollTop = function () {
            var scrollTop = Array.prototype.slice.call(document.getElementsByClassName("scroll-top"));
            scrollTop.forEach(function (el) {
                el.addEventListener("click", function (ev) {
                    ev.preventDefault();
                    ev.stopPropagation();
                    var loc = window.scrollY;
                    if (loc <= 0) {
                        return;
                    }
                    var offset = 1;
                    var timer = window.setInterval(function () {
                        window.scrollTo(0, (loc - offset));
                        if ((loc - offset) < 0) {
                            window.clearInterval(timer);
                        }
                        offset += (offset * 0.18);
                    }, 10);
                });
            });
        };
        return Simplicity;
    }());
    HugoThemeSimplicity.Simplicity = Simplicity;
    function executeIfElementWithIdExists(elementId, callback) {
        var element = document.getElementById(elementId);
        if (element !== null && element !== undefined) {
            callback();
        }
    }
    HugoThemeSimplicity.executeIfElementWithIdExists = executeIfElementWithIdExists;
})(HugoThemeSimplicity || (HugoThemeSimplicity = {}));
var simplicity = new HugoThemeSimplicity.Simplicity();
simplicity.start();
