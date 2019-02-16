"use strict";

console.log("booble"); //Create a list of items from the current page ofeach element with an ID, and class .anchor-target, links becomes clickable and scrolls to that item

if (window.innerWidth >= 1280) {
  var anchorLinks = [];
  var target = document.querySelector('ul.js-portfolio-links');
  var anchorLink = document.querySelectorAll('.anchor-target');

  var anchorHTML = function anchorHTML(anchLink, anchTitle, i) {
    return "\n                        <a href=\"#".concat(anchLink, "\">\n                            <li class=\"anchor-link\">\n                                <button class=\"anchor-button anchor-delay-").concat(i + 1, "\"  type=\"button\">\n                                    <p>").concat(anchTitle, "</p>\n                                </button>\n                            </li>\n                        </a>\n                        ");
  };

  if (anchorLink.length) {
    for (var i = 0; i < anchorLink.length; i++) {
      var attr = anchorLink[i].id;
      var link = attr.substring(attr.indexOf('#'));
      var title = anchorLink[i].querySelector('h1').innerHTML.trim();
      anchorLinks.push(anchorHTML(link, title, i));
    }

    target.innerHTML = anchorLinks.join(' ');
  }

  var anchorButton = document.querySelectorAll('.anchor-button');
  anchorButton.forEach(function (elm, i) {
    elm.addEventListener('mouseover', function () {
      elm.classList.remove("anchor-delay-".concat(i + 1));
    });
  });
} //Smooth scrolling anchor links


var scrollLinks = [];
var scrollLink = document.querySelectorAll('a').forEach(function (link) {
  if (link.getAttribute('href').includes('#')) {
    scrollLinks.push(link);
  }
});

if (scrollLinks.length > -1) {
  var _loop = function _loop(_i) {
    scrollLinks[_i].addEventListener('click', function (e) {
      var attr = scrollLinks[_i].getAttribute('href');

      var target = document.getElementById(attr.substring(attr.indexOf('#') + 1));
      target.scrollIntoView({
        behavior: "smooth"
      });

      if (target != null || target != undefined) {
        e.preventDefault();
      }
    });
  };

  for (var _i = 0; _i < scrollLinks.length; _i++) {
    _loop(_i);
  }
}

var addclass = function addclass(element, cls) {
  element.classList.add(cls);
};

var removeclass = function removeclass(element, cls) {
  element.classList.remove(cls);
}; //lightbox function for images with class .lightbox-img 


var lightboxItem = document.querySelectorAll('.lightbox-img');
var lightboxTarget = document.querySelector('.lightbox-target');
var lightbox = document.querySelector('.lightbox');
lightboxItem.forEach(function (e) {
  e.addEventListener('click', function () {
    addclass(lightbox, 'focused');
    lightboxTarget.src = e.getAttribute('src');
  });
});

function closeLightBox(elem) {
  var target = document.querySelectorAll(elem);
  target.forEach(function (c) {
    c.addEventListener('click', function () {
      removeclass(c.parentElement, 'focused');
    });
  });
}

closeLightBox('.lightbox-close');
var addAnimOnEnter = document.querySelectorAll('.animateIn');
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      addclass(entry.target, 'animate');
      observer.unobserve(entry.target);
    }
  });
});
window.addEventListener("load", function () {
  addAnimOnEnter.forEach(function (targ) {
    observer.observe(targ);
  });
}); //LAZY LOAD

document.addEventListener("DOMContentLoaded", function () {
  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

  if ("IntersectionObserver" in window) {
    var options = {
      rootMargin: '300px'
    };
    var lazyImageObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src; // lazyImage.srcset = lazyImage.dataset.srcset;

          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    }, options);
    lazyImages.forEach(function (lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {// Possibly fall back to a more compatible method here
  }
});