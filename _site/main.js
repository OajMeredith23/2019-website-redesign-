
//DEBOUNCE
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};


//Use this variable to find 1/10th from the bottom of screen
const bottomOfScreen = Math.floor(window.innerHeight - (window.innerHeight / 10));
//Use this variable to find 1/10th from the top of screen
const topOfScreen = Math.floor(window.innerHeight / 10);

function addRemoveClassScroll(target, addClass, addOrRemove = true){
    const _target = document.querySelectorAll(target);

    _target.forEach((target) => {
        let xPos = target.getBoundingClientRect().top,
            functionAtHeight;

        if(addOrRemove){
             functionAtHeight =  xPos <  bottomOfScreen
        } else {
             functionAtHeight = xPos > bottomOfScreen
        }

        if(functionAtHeight){
            addOrRemove ? target.classList.add(addClass) : target.classList.remove(addClass)
        }
    })

}

var addRemoveClass = debounce(function() {
    //Gets the current scroll distance
    wScroll = window.scrollY;
    //Parameters are
    //1.String = target, should be a class or tag, not ID as uses querySelectorAll
    //2.String = class to add/remove,
    //3. Boolean = if the class is to be added it can be left blank, the default is true, if it is to be removed it should be set to false

    //Targets elements with an animateIn class, add the class of 'animate' when that element is scrolled into viewport
    addRemoveClassScroll('.animateIn', 'animate')
    //Targets elements with an animateOut class, removes the class of 'animate' when that element is scrolled into viewport
    addRemoveClassScroll('.animateOut', 'animate', false)
},15)

window.addEventListener('scroll', addRemoveClass);



//Create a list of items from the current page ofeach element with an ID, and class .anchor-target, links becomes clickable and scrolls to that item

if(window.innerWidth >= 1280){

    let anchorLinks = [];
    const target = document.querySelector('ul.js-portfolio-links');
    const anchorLink = document.querySelectorAll('.anchor-target');
    if(anchorLink.length){

        for (let i = 0; i < anchorLink.length; i++) {
            let attr = anchorLink[i].id;
            let link = attr.substring(attr.indexOf('#'));
            let title = anchorLink[i].querySelector('h1').innerHTML.trim();
            
            anchorLinks.push(`
                                <a href="#${link}">
                                    <li class="anchor-link animateIn">
                                        <button type="button"></button>
                                        <p>${title}</p>
                                    </li>
                                </a>
                                
                              `);
        }
        
        target.innerHTML = anchorLinks.join(' ');
    }
}




//Smooth scrolling anchor links
let scrollLinks = [];

const scrollLink = document.querySelectorAll('a').forEach(link => {
    if(link.getAttribute('href').includes('#')){
        scrollLinks.push(link);
    }
})

if(scrollLinks.length > -1){
    for (let i = 0; i < scrollLinks.length; i++) {

        scrollLinks[i].addEventListener('click', function(e){


            const attr = scrollLinks[i].getAttribute('href')
            const target = document.getElementById(attr.substring(attr.indexOf('#') + 1));

            target.scrollIntoView({behavior: "smooth"})

            if(target != null || target != undefined){
                e.preventDefault();
            }

        })

    }
}
//lightbox function for images with class .lightbox-img 

const lightboxItem = document.querySelectorAll('.lightbox-img');
const lightboxTarget = document.querySelector('.lightbox-target')
const lightbox = document.querySelector('.lightbox')

console.log(lightboxTarget.parentElement);

lightboxItem.forEach(e => {
    e.addEventListener('click', function(){
        lightbox.classList.add('focused');
        lightboxTarget.src = e.getAttribute('src');

    })
})

function closeLightBox(elem){
    const target = document.querySelectorAll(elem);
    target.forEach(c => {
        c.addEventListener('click', function(){
            c.parentElement.classList.remove('focused')
            console.log(c)
        })
    })
}

closeLightBox('.lightbox-close')
