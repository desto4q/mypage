let bar = document.querySelector(".main-nav .bars");
let vertNav = document.querySelector(".vert-nav");
let links =document.querySelectorAll("a");

function stopdefault (e) {
    e.preventDefault()

}

links.forEach(link => {
    link.addEventListener("click", stopdefault)
})

// for navigation  button
let vertNavState = false ;

let openNav = () => {
    if (vertNavState === false) {
        vertNav.style.cssText = "display: flex; opacity:1;";
        vertNavState = true;
        document.body.style.cssText = "overflow:hidden; "

    } else {
        vertNav.style.cssText = "display: none; opacity:0;";
        vertNavState = false;
        document.body.style.cssText = "overflow:visible: "
    }
}

bar.addEventListener("click", openNav);


// forscroll effect on nav bar 
 
let nav = document.querySelector(".main-nav");
let sections = document.querySelectorAll("section");

window.onwheel = e => {

    if (vertNavState === false) {
        if(e.deltaY >= 0) {
            // console.log("scrolldown")
            nav.style.cssText = "transform: translateY(-100%);"
            sections[0].style.cssText = "margin-top:0;"
        } else {
            nav.style.cssText =null
            sections[0].style.cssText = null
        }
    }
    
}

///////////////////


let resizeObserve = new ResizeObserver(entries => {
    // console.log(entries)  
    
    entries.forEach(entry => {
        if (entry.target.clientWidth >" 1000") {
            // console.log("gg")
            vertNav.style = vertNav.style= "display:none;";
            document.body.style.cssText = "overflow:visible; "
            vertNavState = false;
            

        }
    })
})

resizeObserve.observe(document.body);




let IntObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            // console.log(entry)
            let children = entry.target.children;
            let childcount = entry.target.childElementCount;
            if (entry.isIntersecting) {
                // console.log(entry.target);
                
                for (i = 0; i < childcount;i++ ) {
                    children[i].style.cssText = "transform: translateY(0); opacity:1;" ;

                }
            } else if (!entry.isIntersecting ) {
                for (i = 0; i < childcount;i++ ) {
                    children[i].style.cssText = "transform: translateY(120%); opacity:0;";
                 }
            }
        })
    }
, {threshold:0.2})

sections.forEach( section => {
    IntObserver.observe(section);
})
