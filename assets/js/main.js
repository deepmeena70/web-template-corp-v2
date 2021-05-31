// dropdowns
const menuItem = document.getElementsByClassName("menu-item");
const list = document.getElementsByClassName("list");
const expand = (i) => {
    list[i].style.display = "block";
};

const collapse = (i) => {
    list[i].style.display = "none";
};
const dropdowns = () => {

    for (let i = 0; i < menuItem.length; i++) {
        menuItem[i].addEventListener('mouseover', e => {
            expand(i);
        });
        menuItem[i].addEventListener('mouseleave', e => {
            collapse(i);
        });
    }
};

// progress
const circleHalfOne = document.getElementsByClassName("circle-half-one");
const circleHalfTwo = document.getElementsByClassName("circle-half-two");

const progress = () => {
    for (let i = 0; i < circleHalfOne.length; i++) {

        circleHalfOne[i].style.animation = "load-1 1s ease-out 1s forwards";
        circleHalfTwo[i].style.animation = "load-2 1s ease-in  forwards";
    }
};

//accordion
const accTitle = document.getElementsByClassName("accordion-title");
const accDescription = document.getElementsByClassName("accordion-description");
const accExpandCollapse = document.getElementsByClassName("accordion-expand-collapse");

const accordionActions = () => {

    accDescription[0].style.display = "block";
    accExpandCollapse[0].style.animation = "acc-expand-collapse 200ms ease-in-out forwards";

    for (let i = 0; i < accDescription.length; i++) {
        accTitle[i].addEventListener('click', e => {

            if (window.getComputedStyle(accDescription[i]).display == "block") {
                accDescription[i].style.display = "none";
                accExpandCollapse[i].style.animation = "acc-expand-collapse 200ms ease-in-out reverse";
            } else {
                accDescription[i].style.display = "block";
                accExpandCollapse[i].style.animation = "acc-expand-collapse 200ms ease-in-out forwards";
            }

        });
    }

};

// slides
const mobSlides = document.getElementsByClassName("mob-slide");
const testimonialSlides = document.getElementsByClassName("testimonal-slide");

const slider = (slides, slideCount) => {

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    if (slideCount >= slides.length - 1) {

        slides[0].style.display = "block";
        slides[0].style.animation = "slide-animate 500ms ease-out forwards";
    }
    if (slideCount < slides.length - 1) {
        slides[slideCount + 1].style.display = "block";
        slides[slideCount + 1].style.animation = "slide-animate 500ms ease-out";
    }

};
const playSlide = (slides, duration) => {
    let slideCount = 0;
    setInterval(() => {
        slider(slides, slideCount);
        if (slideCount < slides.length - 1)
            slideCount++;
        else
            slideCount = 0;
    }, duration);
    setInterval(() => { console.log(slideCount) }, 3000);
};

// footer count

const footerCount = () => {
    const globalReach = document.getElementById("global-reach");
    const globalClient = document.getElementById("global-clients");
    const globalReachVal = globalReach.innerHTML;
    const globalClientVal = globalClient.innerHTML;
    const clientNumber = Number(globalClientVal.replace(/,/g, ''));
    const globalReachNumber = Number(globalReachVal.replace(/,/g, ''));

    let count = 1;
    const digits = (num, count = 0) => {
        if (num) {
            return digits(Math.floor(num / 10), ++count);
        }
        return count;
    };

    // ReadNumber Function to make number readable
    const numToReadable = function(val) {

        // Prevent falling in undefined value
        if (val === '' || val === undefined || val == isNaN) return 0;

        // if there's a truthy number..
        if (val) {

            // Make a Regex
            let re = /\d{1,3}/g; // grouping each 3 digit
            let target = val.toString();
            let matchy;
            // make an array for matchy string
            let arr = [];
            while ((matchy = re.exec(target)) !== null) {
                arr.push(matchy[0].length);
            }

            // Convert String to Array
            let string = target.split('');
            // Add a comma every three digit from back
            arr.splice(arr.length - 1); // remove buggy first comma
            for (let i = 0; i < arr.length; i++) {
                let count = arr[i];
                let position = i * (count + 1);
                string.splice(string.length - position - count, 0, ',');
            }

            // join Array
            return string.join('');
        }

        // Prevent falling in undefined value
        return val;
    };
    const counter = () => {
        if (count >= globalReachNumber)
            clearInterval(counterInterval);

        if (count >= globalReachNumber) {
            globalReach.innerHTML = globalReachVal;
        } else {
            globalReach.innerHTML = numToReadable(count);
        }
        if (count >= clientNumber) {
            globalClient.innerHTML = globalClientVal;
        } else {
            globalClient.innerHTML = numToReadable(count);
        }

        count *= 2;

    };

    let counterInterval = setInterval(counter, 100);
};

//load 
dropdowns();
accordionActions();
playSlide(mobSlides, 2000);
playSlide(testimonialSlides, 3000);


// on scroll

const body = document.body,
    html = document.documentElement;

const height = Math.max(body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight);

let footerActive = false;
let progressActive = false;

window.addEventListener('scroll', e => {
    for (let i = 0; i < list.length; i++) {
        collapse(i);
    }
    // progress circle animation
    if (scrollY > height * 0.4) {
        if (progressActive == false) {
            progress();
        }
        progressActive = true;
    }
    // footer count animation
    if (scrollY > height * 0.65) {
        if (footerActive == false)
            footerCount();

        footerActive = true;
    }
});