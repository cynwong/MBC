window.onload = function () {
    let option;
    //add values for password lenght form field
    for (let i = 8; i <= 128; i++) {
        option = document.createElement("option");
        option.value = i;
        option.text = i;
        document.getElementById("pwdLength").add(option);
    }
}
//create a function to call when the "Generate Password" button is clicked.
document.getElementById("btn_generateNow").addEventListener("click", function () {
    //check at least one character type is selected. 
    if (!document.getElementById("ckb_lowercase").checked && !document.getElementById("ckb_uppercase").checked && !document.getElementById("ckb_numeric").checked && !document.getElementById("ckb_special").checked) {
        //if not throw an error. and quit the function TODO make sure it goes back to modal
        document.getElementsByClassName("alert")[0].classList.remove("d-none");
        return;
    }

    //if at least one char type is selected. we can proceed. 

    //create variable to hold chosen charset
    let possibleCharSet = "";
    //declare a var to hold the result
    let generatedPassword = "";
    let length = parseInt(document.getElementById("pwdLength").value);

    function addToCharSet(min,max){
        for(let i=min; i<=max; i++){
            possibleCharSet += String.fromCharCode(i);
        }
    }

    //check the checkboxes for which charset to add to chosen charset variable
    if (document.getElementById("ckb_lowercase").checked) {
        // possibleCharSet += "abcdefghijklmnopqrstuvwxyz";
        addToCharSet(95,122);
    }
    if (document.getElementById("ckb_uppercase").checked) {
        // possibleCharSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        addToCharSet(65,90);
    }
    if (document.getElementById("ckb_numeric").checked) {
        // possibleCharSet += "0123456789";
        addToCharSet(48,57);
    }
    if (document.getElementById("ckb_special").checked) {
        // possibleCharSet += " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
        addToCharSet(32,47);
        addToCharSet(58,64);
        addToCharSet(91,96);
        addToCharSet(123,126);
    }
    // console.log(possibleCharSet);
    //use for loop and Math.random to grap the random chars and add to result var. 
    //note:use #pwdLenght for for-loop terminating condition.

    for (let i = 0, n = possibleCharSet.length; i < length; i++) {
        generatedPassword += possibleCharSet.charAt(Math.floor(Math.random() * n));
    }
    //display result in passwordDisplay 
    document.getElementById("passwordDisplay").innerHTML = generatedPassword;

    //hide the modal now to show the result
    $("#modalSettingform").modal("hide");
});

//"Copy to Clipboard action"
document.getElementById("btnCopy2Clipboard").addEventListener("click", function () {
    if(document.getElementById("passwordDisplay").innerHTML.trim().length === 0){
        //if no password, there is nothing to copy. 
        alert("Generate the password first"); //TODO Bootstrap?
        return;
    }
    //clear any current selection
    const selection = window.getSelection();
    selection.removeAllRanges();

    //select the password
    const range = document.createRange();
    range.selectNodeContents(document.getElementById("passwordDisplay"));
    selection.addRange(range);
    
    //copy
    document.execCommand('copy');
});
