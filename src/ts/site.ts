namespace HugoThemeSimplicity {
    // tslint:disable-next-line:variable-name
    const ShareBaseLinks = {
        twitter: "https://twitter.com/intent/tweet",
        facebook: "https://www.facebook.com/sharer.php",
        google: "https://plus.google.com/share",
        linkedin: "https://www.linkedin.com/shareArticle"
    };

    function socialShareUtil(site: string, url: string, shareUrl: string) {
        ga("send", "social", site, "share", url);
        const win = window.open(shareUrl, "_blank", "height=400, width=500, menubar=0");
    }

    function socialShareUtilBuildUrl(site: string, title: string, url: string) {
        switch (site) {
            case "twitter":
                return `${ShareBaseLinks.twitter}?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}&original_referer=${encodeURIComponent(url)}`;
            case "facebook":
                return `${ShareBaseLinks.facebook}?u=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
            case "linkedin":
                return `${ShareBaseLinks.linkedin}?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
            case "google":
                return `${ShareBaseLinks.google}?url=${encodeURIComponent(url)}`;
        }
    }

    export class Simplicity {
        start() {
            this.attachEventNavToggle();
            this.attachEventShareLinks();
            this.attacheEventScrollTop();
        }

        private attachEventNavToggle() {
            const navToggles: [HTMLElement] = Array.prototype.slice.call(document.getElementsByClassName("navbar-burger"));
            
            navToggles.forEach(el => {
                const targetId = el.dataset.targetId;

                if (targetId !== undefined && targetId !== null) {
                    el.addEventListener("click", (ev) => {
                        ev.preventDefault();
                        ev.stopPropagation();

                        const target = document.getElementById(targetId);
                        const active = el.classList.contains("is-active");

                        if (active) {
                            el.classList.remove("is-active");
                            target.classList.remove("is-active");
                        } else {
                            el.classList.add("is-active");
                            target.classList.add("is-active");
                        }
                    });
                }

            });
        }

        private attachEventShareLinks() {
            const social: [HTMLElement] = Array.prototype.slice.call(document.getElementsByClassName("social-share-link"));
            const url = window.location.toString();
            const title = window.document.title;

            social.forEach(el => {
                const social = el.dataset.social;
                const site = el.dataset.site;

                if (site !== undefined && site !== null && social !== undefined && social !== null) {
                    el.addEventListener("click", (ev) => {
                        ev.preventDefault();
                        ev.stopPropagation();

                        socialShareUtil(social, url, socialShareUtilBuildUrl(site, title, url));
                    });
                }
            });
        }

        private attacheEventScrollTop() {
            const scrollTop: [HTMLElement] = Array.prototype.slice.call(document.getElementsByClassName("scroll-top"));

            scrollTop.forEach(el => {
                el.addEventListener("click", (ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();

                    const loc = window.scrollY;

                    if (loc <= 0) {
                        return;
                    }

                    let offset = 1;
                    const timer = window.setInterval(() => {
                        window.scrollTo(0, (loc - offset));

                        if ((loc - offset) < 0) {
                            window.clearInterval(timer);
                        }

                        offset += (offset * 0.18);
                    }, 10);
                });
            });
        }
    }

    export function executeIfElementWithIdExists(elementId: string, callback: Function) {
        const element = document.getElementById(elementId);

        if(element !== null && element !== undefined) {
            callback();
        }
    }
}

const simplicity = new HugoThemeSimplicity.Simplicity();
simplicity.start();