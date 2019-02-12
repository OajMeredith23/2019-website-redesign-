



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
                                    <li class="anchor-link">
                                        <button class="anchor-button anchor-delay-${i + 1}"  type="button">
                                            <p>${title}</p>
                                        </button>
                                    </li>
                                </a>
                                `
                            );
                                

        }

        
        target.innerHTML = anchorLinks.join(' ');
    }

    const anchorButton = document.querySelectorAll('.anchor-button')
    anchorButton.forEach((elm, i) => {
      elm.addEventListener('mouseover', function(){
          console.log(`anchor-delay-${i}`)
          elm.classList.remove(`anchor-delay-${i + 1}`);
      })  
    })
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


const addAnimOnEnter = document.querySelectorAll('.animateIn');

const addClassAnimate = element => {
    element.classList.add('animate');
}

const hasclass = element => {
    element.classList.contains('.js-portfolio-links')
}

observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      addClassAnimate(entry.target);
      observer.unobserve(entry.target);
    }
  });
});


window.addEventListener("load", function(){
    addAnimOnEnter.forEach(targ => {
      observer.observe(targ);
    });
})