window.onload = function () {
    let option;
    //add values for password lenght form field
    for (let i = 8; i <= 128; i++) {
        option = document.createElement("option");
        option.value = i;
        option.text = i;
        document.getElementById("pwdLength").add(option);
    }
    //for popover
    // $('[data-toggle="popover"]').popover();
    // $('.popover-dismiss').popover({
    //     trigger: 'focus'
    // });
}
//create a function to call when the "Generate Password" button is clicked.
document.getElementById("btn_generateNow").addEventListener("click", function () {
    //check at least one character type is selected. 
    if (!document.getElementById("ckb_lowercase").checked && !document.getElementById("ckb_uppercase").checked && !document.getElementById("ckb_numeric").checked && !document.getElementById("ckb_special").checked) {
        //if not throw an error. and quit the function
        document.getElementsByClassName("alert")[0].classList.remove("d-none");
        return;
    }
    //if at least one char type is selected. we can proceed. 
    generator();

    //there is a password now. we can copy so remove the error message if there is
    document.getElementById("alertNoPassword").classList.add("d-none");
});

//"Copy to Clipboard action"
document.getElementById("btnCopy2Clipboard").addEventListener("click", function () {
    if (document.getElementById("passwordDisplay").innerHTML.trim().length === 0) {
        //if no password, there is nothing to copy. 
        document.getElementById("alertNoPassword").classList.remove("d-none")
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




// function generateMethod3() {
function generator()
{
    //declare a var to hold the result
    let newPassword = "";
    let selectedChartype = [];

    //get which chartypes are selected. 
    let inputChartypes = document.getElementsByTagName("input");
    for (var i = 0; i < inputChartypes.length; i++) {
        if (inputChartypes[i].checked) {
            //if checked/selected, then add to our queue
            selectedChartype.push(inputChartypes[i].value);
        }
    }

    function getRandomChar() {
        //create variable to hold all charset
        let ASCIIcodeRanges = {
            lowercase: { start: 97, end: 122 },
            uppercase: { start: 65, end: 90 },
            numeric: { start: 48, end: 57 },
            special: [{ start: 32, end: 47 },
            { start: 58, end: 64 },
            { start: 91, end: 96 },
            { start: 123, end: 126 }],
        };
        let typeIndex = Math.floor(Math.random() * selectedChartype.length);
        let rangeStart, rangeEnd;
        //first we need to decide the character range.
        if (selectedChartype[typeIndex] === "special") {
            //special characters has 4 ranges so we need to choose which range again
            let i = Math.floor(Math.random() * ASCIIcodeRanges.special.length);
            rangeStart = ASCIIcodeRanges.special[i].start;
            rangeEnd = ASCIIcodeRanges.special[i].end;
        } else {
            rangeStart = ASCIIcodeRanges[selectedChartype[typeIndex]].start;
            rangeEnd = ASCIIcodeRanges[selectedChartype[typeIndex]].end;
        }
        return (String.fromCharCode(Math.floor(Math.random() * (rangeEnd - rangeStart) + rangeStart)));
    }
    for (var i = 0; i < parseInt(document.getElementById("pwdLength").value); i++) {
        newPassword += getRandomChar();
    }
    //display result in passwordDisplay 
    document.getElementById("passwordDisplay").innerHTML = newPassword;

    //hide the modal now to show the result
    $("#modalSettingform").modal("hide");


}

// function generateMethod1() {
//     //create variable to hold chosen charset
//     let possibleCharSet = "";
//     //declare a var to hold the result
//     let generatedPassword = "";
//     let length = parseInt(document.getElementById("pwdLength").value);
//     function addToCharSet(charset){
//         possibleCharSet += charset;
//     }
//     //check the checkboxes for which charset to add to chosen charset variable
//     if (document.getElementById("ckb_lowercase").checked) {
//         addToCharSet("abcdefghijklmnopqrstuvwxyz");
//     }
//     if (document.getElementById("ckb_uppercase").checked) {
//         addToCharSet("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
//     }
//     if (document.getElementById("ckb_numeric").checked) {
//         addToCharSet("0123456789");
//     }
//     if (document.getElementById("ckb_special").checked) {
//         addToCharSet(" !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~");
//     }
//     console.log(possibleCharSet);
//     //use for loop and Math.random to grap the random chars and add to result var. 
//     //note:use #pwdLenght for for-loop terminating condition.

//     for (let i = 0, n = possibleCharSet.length; i < length; i++) {
//         generatedPassword += possibleCharSet.charAt(Math.floor(Math.random() * n));
//     }
//     //display result in passwordDisplay 
//     document.getElementById("passwordDisplay").innerHTML = generatedPassword;

//     //hide the modal now to show the result
//     $("#modalSettingform").modal("hide");
// }

// function generateMethod2() {
//     //create variable to hold chosen charset
//     let possibleCharSet = "";
//     //declare a var to hold the result
//     let generatedPassword = "";
//     let length = parseInt(document.getElementById("pwdLength").value);

//     function addToCharSet(min, max) {
//         for (let i = min; i <= max; i++) {
//             possibleCharSet += String.fromCharCode(i);
//         }
//     }

//     //check the checkboxes for which charset to add to chosen charset variable
//     if (document.getElementById("ckb_lowercase").checked) {
//         // possibleCharSet += "abcdefghijklmnopqrstuvwxyz";
//         addToCharSet(97, 122);
//     }
//     if (document.getElementById("ckb_uppercase").checked) {
//         // possibleCharSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//         addToCharSet(65, 90);
//     }
//     if (document.getElementById("ckb_numeric").checked) {
//         // possibleCharSet += "0123456789";
//         addToCharSet(48, 57);
//     }
//     if (document.getElementById("ckb_special").checked) {
//         // possibleCharSet += " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
//         addToCharSet(32, 47);
//         addToCharSet(58, 64);
//         addToCharSet(91, 96);
//         addToCharSet(123, 126);
//     }
//     // console.log(possibleCharSet);
//     //use for loop and Math.random to grap the random chars and add to result var. 
//     //note:use #pwdLenght for for-loop terminating condition.

//     for (let i = 0, n = possibleCharSet.length; i < length; i++) {
//         generatedPassword += possibleCharSet.charAt(Math.floor(Math.random() * n));
//     }
//     //display result in passwordDisplay 
//     document.getElementById("passwordDisplay").innerHTML = generatedPassword;

//     //hide the modal now to show the result
//     $("#modalSettingform").modal("hide");
// }

