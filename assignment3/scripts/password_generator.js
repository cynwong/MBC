//----------- alert message functions ------------------
let showAlert = function (alertId) {
    document.querySelector(`#${alertId}`).style.display = "block";
}
let hideAlert = function (alertId) {
    document.querySelector(`#${alertId}`).style.display = "none";
}
let closeButtonHandler = function (event) {
    if (event.target.parentElement.matches("div") && event.target.parentElement.classList.contains("modal-footer")) {
        //this is modal close button
        // check lowercase characters checkbox again and remove the alert within the modal
        document.querySelector("#ckb_lowercase").checked = true; 
        hideAlert("alertOneChartype");
        return;
    }
    hideAlert(event.target.parentElement.parentElement.attributes.id.nodeValue);
}

//------------ Password generator ---------------------
let generator = function () {
    //declare a var to hold the result
    let newPassword = "";

    //get which chartypes are selected. 
    let selectedChartype = [];
    for (let i of document.querySelectorAll("input[type='checkbox']")) {
        if (i.checked) {
            //if checked/selected, then add to our queue
            selectedChartype.push(i.value);
        }
    }

    let getRandomChar = function () {
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
            rangeEnd = ASCIIcodeRanges.special[i].end + 1;
        } else {
            rangeStart = ASCIIcodeRanges[selectedChartype[typeIndex]].start;
            rangeEnd = ASCIIcodeRanges[selectedChartype[typeIndex]].end + 1;
        }
        return (String.fromCharCode(Math.floor(Math.random() * (rangeEnd - rangeStart) + rangeStart)));
    }
    for (let i = 0; i < parseInt(document.querySelector("#pwdLength").value); i++) {
        newPassword += getRandomChar();
    }
    //display result in passwordDisplay 
    document.querySelector("#passwordDisplay").innerHTML = newPassword;

    //hide the modal now to show the result
    $("#modalSettingform").modal("hide");
}

let generateNowHandler = function () {
    //check at least one character type is selected. 
    if (!document.querySelector("#ckb_lowercase").checked && !document.querySelector("#ckb_uppercase").checked && !document.querySelector("#ckb_numeric").checked && !document.querySelector("#ckb_special").checked) {
        //if not throw an error. and quit the function
        showAlert("alertOneChartype");
        return;
    }
    //if at least one char type is selected. we can proceed. 
    generator();

    //there is a password now. we can copy so remove the error message if there is
    hideAlert("alertNoPassword");
};



// ---------- Copy to Clipboard functions ------------------
let copy2ClipboardHandler = function () {
    if (document.querySelector("#passwordDisplay").innerHTML.trim().length === 0) {
        //if no password, there is nothing to copy.
        showAlert("alertNoPassword");
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
};




//---------------- Event Listeners -----------------
//create a function to call when the "Generate Password" button is clicked.
document.querySelector("#btn_generateNow").addEventListener("click", generateNowHandler);

//"Copy to Clipboard action"
document.querySelector("#btnCopy2Clipboard").addEventListener("click", copy2ClipboardHandler);


//Alert close buttons
document.querySelector("#alertNoPassword button").addEventListener("click", closeButtonHandler);
document.querySelector("#alertNoPassword button").addEventListener("click", closeButtonHandler);
document.querySelector(".modal-footer .grayButton").addEventListener("click", closeButtonHandler);



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
