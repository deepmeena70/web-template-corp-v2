const body = document.body,
    html = document.documentElement;

const height = Math.max(body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight);

// dropdowns
const menuItem = document.getElementsByClassName("menu-item");
const list = document.getElementsByClassName("list");
const expand = (list, i) => {
    list[i].style.display = "block";
};

const collapse = (list, i) => {
    list[i].style.display = "none";
};
const dropdowns = () => {

    for (let i = 0; i < menuItem.length; i++) {
        menuItem[i].addEventListener('mouseover', e => {
            expand(list, i);
        });
        menuItem[i].addEventListener('mouseleave', e => {
            collapse(list, i);
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

    // setInterval(() => { console.log(slideCount) }, 3000);
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
/*********Phone************/
//dropdowns
const menuSmItem = document.getElementsByClassName("menu-sm-item");
const menuSmItemList = document.getElementsByClassName("menu-sm-item-list");

const dropdown_sm = () => {
    for (let i = 0; i < menuSmItemList.length; i++) {

        menuSmItem[i].addEventListener('click', e => {
            expand(menuSmItemList, i);
            for (let j = 0; j < menuSmItemList.length; j++) {
                if (j != i) {
                    menuSmItemList[j].style.display = "none";
                }
            }
        });
    }
};



// toggler
const toggle = document.getElementById("toggle");
const toggleBtn = document.getElementById("toggle-btn");
const menuSm = document.getElementById("menu-sm");
const menuSmItemBlock = document.getElementsByClassName("menu-sm-item-block");
const menuSmItemAct = (arr, show) => {

    for (let i = 0; i < arr.length; i++) {
        if (show) {
            arr[i].style.display = "block";
        } else {
            arr[i].style.display = "none";
        }
    }
};
const playToggle = () => {
    toggleBtn.addEventListener("load", e => {
        let svgDoc = toggleBtn.contentDocument;
        let svgIcon = svgDoc.getElementById("toggle-menu");
        let line1 = svgDoc.getElementById("line-1");
        let line2 = svgDoc.getElementById("line-2");
        let line3 = svgDoc.getElementById("line-3");
        let stroke1 = line2.getAttribute('stroke');
        let stroke2 = "#32E875";
        let active = false;
        svgIcon.addEventListener("click", e => {
            // hide menu item before close
            for (let i = 0; i < menuSmItemList.length; i++) {
                menuSmItemList[i].style.display = "none";
            }
            if (active) {
                line3.animate([
                    { transform: 'rotate(0deg)' }
                ], {
                    duration: 300,
                    fill: 'forwards'
                });
                line2.animate([
                    { transform: 'rotate(0deg)' }
                ], {
                    duration: 300,
                    fill: 'forwards'
                });

                line3.animate([
                    { transform: 'translateY(' + (line2.getAttribute('x1') / 2) + 'px)' }
                ], {
                    delay: 300,
                    duration: 200,
                    fill: 'forwards',
                });
                line1.animate([
                    { transform: 'rotate(0deg)' }
                ], {
                    delay: 500,
                    duration: 200,
                    fill: 'forwards',
                });
                toggleBtn.animate([
                    { transform: 'rotate(0deg)' }
                ], {
                    delay: 700,
                    duration: 300,
                    fill: 'forwards',
                });
                setTimeout(() => {
                    line2.setAttribute('stroke', stroke1);
                    line3.setAttribute('stroke', stroke1);
                }, 490);
                active = false;

            } else {
                toggleBtn.animate([
                    { transform: 'rotate(-90deg)' }
                ], {
                    duration: 300,
                    fill: 'forwards',
                });
                line1.animate([
                    { transform: 'rotate(-90deg)' }
                ], {
                    delay: 300,
                    duration: 200,
                    fill: 'forwards',
                });
                line3.animate([
                    { transform: 'translateY(' + (-line2.getAttribute('x1') / 2) + 'px)' }
                ], {
                    delay: 500,
                    duration: 200,
                    fill: 'forwards',
                });
                line3.setAttribute('y1', line2.getAttribute('y1'));
                line3.setAttribute('y2', line2.getAttribute('y2'));
                line2.style.transformOrigin = "center center";
                line3.style.transformOrigin = "center center";

                line2.animate([
                    { transform: 'rotate(-45deg)' }
                ], {
                    delay: 700,
                    duration: 200,
                    fill: 'forwards'
                });
                line3.animate([
                    { transform: 'rotate(45deg)' }
                ], {
                    delay: 700,
                    duration: 200,
                    fill: 'forwards'
                });
                setTimeout(() => {

                    line2.setAttribute('stroke', stroke2);
                    line3.setAttribute('stroke', stroke2);
                }, 490);
                active = true;
            }
            // menu components load
            if (active) {
                setTimeout(() => {
                    menuSm.style.display = 'block';
                }, 500);

                setTimeout(() => {
                    menuSmItemAct(menuSmItemBlock, true);
                }, 510);

                menuSm.style.animation = "menu_sm_background 400ms ease-in   forwards";
                // prevent document scroll
                body.style.overflow = "hidden";
            } else {
                menuSm.style.animation = "menu_sm_background_rev 400ms ease-in   forwards";
                setTimeout(() => {
                    menuSm.style.display = 'none';
                }, 400);
                setTimeout(() => {
                    menuSmItemAct(menuSmItemBlock, false);
                }, 300);

                // enable document scroll
                body.style.overflow = "auto";
            }

        });
    });
};
const toggler = () => {
    if (scrollY < 10) {
        toggle.style.display = "inline-block";
    } else {
        toggle.style.display = "none";

    }
};

// load animations on scrolling
const createIntersect = (target, fun) => {
    let options = {
        root: null,
        rootMargin: '0px',
        threshold: 1.0
    };

    const callback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                fun();
            }
        });
    };

    let observer = new IntersectionObserver(callback, options);


    observer.observe(document.querySelector(target));
};


//load on ready
document.addEventListener("DOMContentLoaded", e => {
    document.body.style.display = 'initial';
    dropdowns();
    playSlide(mobSlides, 3000);
    playSlide(testimonialSlides, 3000);
    playToggle();
    dropdown_sm();
    accordionActions();
    createIntersect("#our-skill", progress);
    createIntersect(".footer-data", footerCount);
});


// on scroll load

window.addEventListener('scroll', e => {
    // dropdowns
    for (let i = 0; i < list.length; i++) {

        if (innerWidth > 700)
            collapse(list, i);
    }

    // toggler
    toggler();
});