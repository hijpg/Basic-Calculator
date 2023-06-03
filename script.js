const mainDisplay = $('.main-display');
const secDisplay = $('.sec-display');
const tempDisplay = $('.temp-display');
const calNumber = $('.number');
const calOperator = $('.operator');
const calEqual = $('.equal');
const clearAll = $('.clear-all');
const clearRecent = $('.clearLatest');


var secAnsDisplay = '';
var mainAnsDisplay = '';
var result = null;
var lastOperator = '';
var haveDot = false;

calNumber.click((e)=>{
   if(e.target.innerText === '.' && !haveDot){
    haveDot = true;
    if(!mainAnsDisplay) mainAnsDisplay+='0';
   }
   else if(e.target.innerText ==='.' && haveDot){
    return;
   }
   if(e.target.innerText ==='0' && !mainAnsDisplay) mainDisplay.text('0');
   else{
        mainAnsDisplay += e.target.innerText;
        mainDisplay.text(mainAnsDisplay);
    }
});

calOperator.click((e)=>{
    if(!mainAnsDisplay) return;
    haveDot = false;

    const operatorVal = e.target.innerText;
    if(secAnsDisplay && mainAnsDisplay && lastOperator){
        CalValue();
    }
    else {
        result = parseFloat(mainAnsDisplay);
    }
    clearDisplay(operatorVal);
    lastOperator = operatorVal;
    console.log(result);
});

function clearDisplay(name = ''){
    secAnsDisplay += mainAnsDisplay + ' ' + name + ' ';
    secDisplay.text(secAnsDisplay);
    mainDisplay.text('');
    mainAnsDisplay = '';
    tempDisplay.text(result);
}

function CalValue(){
    if(lastOperator=== "X"){
        result = parseFloat(result) * parseFloat(mainAnsDisplay);
    }
    else if(lastOperator=== "+"){
        result = parseFloat(result) + parseFloat(mainAnsDisplay);
    }
    else if(lastOperator=== "-"){
        result = parseFloat(result) - parseFloat(mainAnsDisplay);
    }
   else if(lastOperator=== "/"){
        result = parseFloat(result) / parseFloat(mainAnsDisplay);
    }
    else if(lastOperator=== "%"){
        result = parseFloat(result) % parseFloat(mainAnsDisplay);
    }
}

calEqual.click( (e)=>{
    if(!mainAnsDisplay || !secAnsDisplay) console.log(e.target.innerText);
    
    haveDot = false;
    CalValue();
    clearDisplay();

    mainDisplay.text(result);
    tempDisplay.text('');
    secAnsDisplay = '';
    mainAnsDisplay = result;
    secAnsDisplay = '';
});


clearAll.click( ()=>{
    mainAnsDisplay =  '';
    secAnsDisplay = '';
    mainDisplay.text('0');
    secDisplay.text('0');
    result = '';
    tempDisplay.text('0');
})

clearRecent.click( ()=>{
    mainAnsDisplay = mainAnsDisplay.substring(0, mainAnsDisplay.length -1);
    mainDisplay.text(mainAnsDisplay);
});

document.addEventListener('keydown', (e)=>{
    if(
        e.key === '0' ||
        e.key === '1' || 
        e.key === '2' ||
        e.key === '3' ||
        e.key === '4' ||
        e.key === '5' ||
        e.key === '6' ||
        e.key === '7' ||
        e.key === '8' ||
        e.key === '9' ||
        e.key === '.' 
      ){
        clickButton(e.key) ; // console.log(e.key);
      }
      else if(
        e.key === '+' ||
        e.key === '-' ||
        e.key === '/' ||
        e.key === '%' 
      ){
        clickOperator(e.key);
      }
      else if(e.key === '*'){
        clickOperator('X'); // console.log(e.key);
      }
      else if(e.key === "return" || e.key==="="){
        clickEqual();
      }
})

function clickOperator(key){
    if(calOperator.text(key)){
        calOperator.click(key);
    }
}

function clickButton(key){
        calNumber.click(key);
}

function clickEqual(){
    calEqual();
}