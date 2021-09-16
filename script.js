// checking the performance
const t0 = performance.now();

// some variables to work with in our code
const navbarList = document.getElementById("navbar__list");
const frag = document.createDocumentFragment();
const sections = document.querySelectorAll("section");

// Helper function to get siblings of an element
var getSiblings = function(link) {
    var siblings = [];
    var sibling = link.parentNode.firstChild;
    while (sibling) {
        if (sibling.nodeType === 1 && sibling !== link) {
            siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
    }
    return siblings;
};

// loop to create links for each section created in this page

sections.forEach((section, index) => {
    let linkText = section.getAttribute("data-nav");
    let link = document.createElement("a");
    let textNode = document.createTextNode(linkText);
    let Item = document.createElement("li");
    Item.classList.add("nav-item");
    link.classList.add("navLinks");
    link.classList.add("nav-link");

    link.appendChild(textNode);
    Item.appendChild(link);

    link.addEventListener("click", (event) => {
        section.scrollIntoView({ behavior: "smooth" });
    });
    frag.appendChild(link);
});
navbarList.appendChild(frag);

// an event Listener to check if Section is in viewport to be active for us or not.
// this is the helper function for this task.
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

window.addEventListener("scroll", () => {
    sections.forEach((section, index) => {
        const secRectangle = section.getBoundingClientRect();
        sections.forEach((section) => {
            if (isInViewport(section)) {
                section.classList.add("your-active-class");
            } else {
                section.classList.remove("your-active-class");
            }
        });
    });
});

// loop for giving the active link an activebtn class which is given some style in the CSS.
const allLinks = document.querySelectorAll("a");
allLinks.forEach((Link) => {
    Link.addEventListener("click", function() {
        Link.classList.add("activebtn");
        var otherLinks = getSiblings(Link);
        otherLinks.forEach((Link) => {
            Link.classList.remove("activebtn");
        });
    });
});

// function to check if the user stopped scrolling or not.
function scrollStop(callback, refresh = 4000) {
    if (!callback || typeof callback !== "function") return;
    let isScrolling;
    window.addEventListener("scroll", function(event) {
        window.clearTimeout(isScrolling);
        const nav = document.querySelector(".navbar__menu");
        nav.style.visibility = "visible";
        isScrolling = setTimeout(callback, refresh);
    });
}
scrollStop(function() {
    const nav = document.querySelector(".navbar__menu");
    nav.style.visibility = "hidden";
});

// this part is for the return to top button we have created.
$(document).ready(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $(".scrollup").fadeIn();
        } else {
            $(".scrollup").fadeOut();
        }
    });
    $(".scrollup").click(function() {
        $("html, body").animate({
                scrollTop: 0,
            },
            50
        );
        return false;
    });
});

// this part is necessary to remove the activebtn class which is not needed in this link.
const arrowUp = document.querySelector(".scrollup");
arrowUp.addEventListener("click", () => {
    arrowUp.classList.remove("activebtn");
});

// checking the performance of our Js Functions
const t1 = performance.now();
console.log(t1 - t0);