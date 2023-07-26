// general sellectings
const genderRadios = document.querySelectorAll(".switcher__item")
const infoFields = document.querySelectorAll(".input__wrapper")
const activityRadios = document.querySelectorAll(".radio__wrapper")
const calculateBtn = document.querySelector(".form__submit-button")
const resetBtn = document.querySelector(".form__reset-button")
const cloriesSection = document.querySelector(".counter__result")
const form = document.querySelector(".counter__form")
const normCalories = document.querySelector("#calories-norm")
const minimalCalories = document.querySelector("#calories-minimal")
const maximalCalories = document.querySelector("#calories-maximal")

const male = genderRadios[0].children[0]
const female = genderRadios[1].children[0]
const age =  infoFields[0].children[0]
const height =  infoFields[1].children[0]
const weight =  infoFields[2].children[0]

// default state
function defaultState(e){
    male.checked = true
    age.value = 0
    height.value = 0
    weight.value = 0
    activityRadios[0].children[0].checked = true
    calculateBtn.disabled = true
    resetBtn.disabled = true
    cloriesSection.classList.add("counter__result--hidden")
}
defaultState()


// detecting fields chages
for (let i = 0; i < infoFields.length; i++) {
    infoFields[i].children[0].addEventListener("keyup", function() {
        if (age.value > 0 && height.value > 0 && weight.value > 0 ) {
            calculateBtn.disabled = false
        } else if (age.value > 0 || height.value > 0 || weight.value > 0) {
            resetBtn.disabled = false
        } 
    }
    )
}

// detecting gender radio chages
var prevRadio = null;
for (let i = 0; i < genderRadios.length; i++) {
    genderRadios[i].children[0].addEventListener('change', function() {
        if (this !== prevRadio) {
            prevRadio = this;
        }
        if (prevRadio.value == "female"){
            resetBtn.disabled = false
        }
    });
}

// detecting gender activity chages
var prevActivityRadio = null;
for (let i = 0; i < activityRadios.length; i++) {
    activityRadios[i].children[0].addEventListener('change', function() {
        if (this !== prevActivityRadio) {
            prevActivityRadio = this;
        }
        if (prevActivityRadio.value !== "min"){
            resetBtn.disabled = false
        }
    });
}


// resetting
resetBtn.addEventListener("click", (e) => defaultState(e))


// calculating
var N = 0;
var activity = 0;
var calories = 0;
var coeff = 0;
function handleCalculate(e){
    e.preventDefault()
    
    for (let i = 0; i < activityRadios.length; i++) {
        if(activityRadios[i].children[0].checked){
            activity = activityRadios[i].children[0].value
        }
    }
    
    switch (activity) {
        case 'min':
            coeff = 1.2
            break;
        case 'low':
            coeff = 1.375
            break;
        case 'medium':
            coeff = 1.55
            break;
        case 'high':
            coeff = 1.725
            break;
         case 'max':
            coeff = 1.9
            break;
    }

    N = (10 * weight.value) + (6.25 * height.value) -  (5 * age.value)
    if(male.checked){
        N = N + 5
        calories = N * coeff
    } else if (female.checked){
        N = N - 161
        calories = N * coeff
    }
    normCalories.innerText = Math.round( calories );
    minimalCalories.innerText = Math.round( calories - calories * 0.15 );
    maximalCalories.innerText = Math.round( calories + calories * 0.15 );
    cloriesSection.classList.remove("counter__result--hidden")

}

form.addEventListener("submit", (e) => handleCalculate(e))