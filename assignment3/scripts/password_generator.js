window.onload = function () {
    var option;
    //add values for password lenght form field
    for (var i = 8; i <= 128; i++) {
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
    var possibleCharSet = "";
    //declare a var to hold the result
    var generatedPassword = "";
    var length = parseInt(document.getElementById("pwdLength").value);

    //check the checkboxes for which charset to add to chosen charset variable
    if (document.getElementById("ckb_lowercase").checked) {
        possibleCharSet += "abcdefghijklmnopqrstuvwxyz";
    }
    if (document.getElementById("ckb_uppercase").checked) {
        possibleCharSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (document.getElementById("ckb_numeric").checked) {
        possibleCharSet += "0123456789";
    }
    if (document.getElementById("ckb_special").checked) {
        possibleCharSet += " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
    }

    //use for loop and Math.random to grap the random chars and add to result var. 
    //note:use #pwdLenght for for-loop terminating condition.

    for (var i = 0, n = possibleCharSet.length; i < length; i++) {
        generatedPassword += possibleCharSet.charAt(Math.floor(Math.random() * n));
    }
    //display result in passwordDisplay 
    document.getElementById("passwordDisplay").innerHTML = generatedPassword;

    //hide the modal now to show the result
    $("#modalSettingform").modal("hide");
});

//"Copy to Clipboard action"
document.getElementById("btnCopy2Clipboard").addEventListener("click", function () {
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