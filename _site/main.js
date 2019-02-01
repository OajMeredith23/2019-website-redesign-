
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