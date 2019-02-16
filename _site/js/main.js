



//Create a list of items from the current page ofeach element with an ID, and class .anchor-target, links becomes clickable and scrolls to that item

if(window.innerWidth >= 1280){

    let anchorLinks = [];
    const target = document.querySelector('ul.js-portfolio-links');
    const anchorLink = document.querySelectorAll('.anchor-target');

    const anchorHTML = (anchLink, anchTitle, i) => { return `
                        <a href="#${anchLink}">
                            <li class="anchor-link">
                                <button class="anchor-button anchor-delay-${i + 1}"  type="button">
                                    <p>${anchTitle}</p>
                                </button>
                            </li>
                        </a>
                        `
                        }
    console.log(anchorHTML('a link', 'a title'));
    if(anchorLink.length){

        for (let i = 0; i < anchorLink.length; i++) {
            let attr = anchorLink[i].id;
            let link = attr.substring(attr.indexOf('#'));
            let title = anchorLink[i].querySelector('h1').innerHTML.trim();
            
            anchorLinks.push(anchorHTML(link, title, i));

        }

        
        target.innerHTML = anchorLinks.join(' ');
    }

    const anchorButton = document.querySelectorAll('.anchor-button')
    anchorButton.forEach((elm, i) => {
      elm.addEventListener('mouseover', function(){
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

const addclass = (element, cls) => {
    element.classList.add(cls);
}
const removeclass = (element, cls) => {
    element.classList.remove(cls);
}

//lightbox function for images with class .lightbox-img 

const lightboxItem = document.querySelectorAll('.lightbox-img');
const lightboxTarget = document.querySelector('.lightbox-target')
const lightbox = document.querySelector('.lightbox')


lightboxItem.forEach(e => {
    e.addEventListener('click', function(){
        addclass(lightbox, 'focused')
        lightboxTarget.src = e.getAttribute('src');
    })
})

function closeLightBox(elem){
    const target = document.querySelectorAll(elem);
    target.forEach(c => {
        c.addEventListener('click', function(){
            removeclass(c.parentElement, 'focused')
        })
    })
}

closeLightBox('.lightbox-close')


const addAnimOnEnter = document.querySelectorAll('.animateIn');


observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      addclass(entry.target, 'animate');
      observer.unobserve(entry.target);
    }
  });
});


window.addEventListener("load", function(){
    addAnimOnEnter.forEach(targ => {
      observer.observe(targ);
    });
})

//LAZY LOAD

document.addEventListener("DOMContentLoaded", function() {
    var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  
    if ("IntersectionObserver" in window) {
      var options = {
        rootMargin: '300px'
      }
      let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            let lazyImage = entry.target;
            lazyImage.src = lazyImage.dataset.src;
            // lazyImage.srcset = lazyImage.dataset.srcset;
            lazyImage.classList.remove("lazy");

            lazyImageObserver.unobserve(lazyImage);
          }
        });
      }, options);
  
      lazyImages.forEach(function(lazyImage) {
        lazyImageObserver.observe(lazyImage);
      });
    } else {
      // Possibly fall back to a more compatible method here
    }
  });
  