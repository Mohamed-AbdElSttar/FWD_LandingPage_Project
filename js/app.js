/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

let sections = document.querySelectorAll("section");
let nav = document.getElementById("navbar__list");


const nav_fragment = document.createDocumentFragment();


/**
 * End Global Variables
 * Begin Main Functions
*/

// build the nav
nav.style = "background-color:blue;";
function buildNav(section) {

    let nav_link = document.createElement("li");

    let link = document.createElement("a");
    link.setAttribute("class", "menu__link");
    link.style = "cursor:pointer";
    nav_link.appendChild(link);

    let link_text = document.createTextNode(section.getAttribute("data-nav"));
    link.appendChild(link_text);

    nav_fragment.appendChild(nav_link);
}
sections.forEach(buildNav);
nav.appendChild(nav_fragment);

// Add class 'active' to section and link when section near top of viewport
let links = document.querySelectorAll(".menu__link");
sections.forEach(function (section) {
    const observer = new IntersectionObserver((entry) => {
        section.classList.remove("your-active-class");
        if (entry[0].isIntersecting) {
            section.classList.add("your-active-class");
            // remove and add active class to the links according the active section
            links.forEach(function (link) {
                link.classList.remove("active");
                if (link.textContent === section.getAttribute("data-nav")) {
                    link.classList.add("active");
                }
            });
        }
    }, {
        rootMargin: "-50%"
    });
    observer.observe(section);
});

// Scroll to anchor ID using scrollTO event
function scrollToSection(event) {
    if (event.target.nodeName === "A") {
        link = event.target;
        id = link.textContent.split(" ").join("").toLowerCase();
        section = document.getElementById(id);
        section.scrollIntoView({ behavior: "smooth" });
    }
}
nav.addEventListener("click", scrollToSection);


/**
 * End Main Functions
*/

