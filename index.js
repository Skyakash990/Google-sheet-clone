let columns = 27;
let row = 100;

let headRow = document.querySelector(".head-row");
let snocol = document.querySelector(".serial-no");
let body = document.querySelector(".body");
let activeCellElement=document.querySelector(".selected-cell")
let form=document.querySelector(".form-container");
let formula=document.querySelector("#formula-input");

// Create column headers
for (let i = 0; i < columns; i++) {
    let headCell = document.createElement("div");
    headCell.classList.add("col-head");
    headCell.textContent = i === 0 ? "" : String.fromCharCode(i + 64);
    headRow.appendChild(headCell);
}

// Create row headers (serial numbers)
for (let i = 0; i < row; i++) {
    let headColCell = document.createElement("div");
    headColCell.textContent = i + 1;
    headColCell.classList.add("sno-col");
    snocol.appendChild(headColCell);
}

// Create Body of the cells
for (let i = 1; i <= row; i++) {
    let rowCell = document.createElement("div");
    rowCell.classList.add("row");

    for (let j = 1; j <columns; j++) {
        let colCell = document.createElement("span");
        colCell.id=`${String.fromCharCode(j+64)}${i}`;
        colCell.contentEditable="true";
        colCell.classList.add("cell");
        rowCell.appendChild(colCell);
    }

    body.appendChild(rowCell); 
}

let selectedCell="";
let allData ={};

body.addEventListener("click",(e)=>{
    selectedCell=e.target;
    activeCellElement.textContent=e.target.id;
    formula.value = selectedCell.innerText;
    applyCellInfoToForm();
});


form.addEventListener("change",()=>{
    if(!selectedCell.id){
        alert('please select a cell before applying style');
        form.reset();
        return;
    } 
    const Data={
        fontFamily: form["fontFamily"].value,
        fontSize:   form["fontSize"].value,
        fontWeight: form["fontWeight"].checked,
        fontStyle: form["fontStyle"].checked,
        fontUnderline:form["fontUnderline"].checked,
        align:      form["align"].value,
        textColor:  form["text-color"].value,
        backgroundColor:form["bg-color"].value,
    }
    // console.log(formData)

    allData[selectedCell.id]={...Data,innerText :selectedCell.innerText}
    applyStyleToSelectedCells(Data);
});

function applyStyleToSelectedCells(Data){
    selectedCell.style.fontSize=Data.fontSize;
    selectedCell.style.fontFamily=Data.fontFamily;
    selectedCell.style.fontWeight=Data.fontWeight ? "bold":"normal";
    selectedCell.style.fontStyle=Data.fontStyle ? "italic":"normal";
    selectedCell.style.textDecoration=Data.fontUnderline?"underline":"none";
    selectedCell.style.textAlign=Data.align;
    selectedCell.style.color=Data.textColor;
    selectedCell.style.backgroundColor=Data.backgroundColor;
    // formula.value = selectedCell.innerText;
}



function applyCellInfoToForm(){
    if(!selectedCell.id){
        form.reset();
        return;
    }
    let specificCellData = allData[selectedCell.id];
    console.log(specificCellData);
    
    for(let key in specificCellData){
        form[key];
        if(key=="fontWeight"||key=="fontStyle"|| key=="fontUnderline"){
            form[key].checked = specificCellData[key];
        }
        else{
            form[key].value=specificCellData[key];
        }
    }
}

body.addEventListener("input",(e)=>{
    if(e.target.classList.contains("cell")){
        formula.value=e.target.innerText;
        allData[selectedCell.id]={...allData[selectedCell.id],innerText:e.target.innerText};
    }
});

formula.addEventListener("input",()=>{
    if(selectedCell){
        selectedCell.innerText=formula.value;
        allData[selectedCell.id] = { ...allData[selectedCell.id], innerText: formula.value };
    }
}); 




















// body.addEventListener("input", (e) => {
//     if (e.target.classList.contains("cell")) {
//         formula.value = e.target.innerText; // Update formula input as user types
//         allData[selectedCell.id] = { ...allData[selectedCell.id], innerText: e.target.innerText }; // Store updated text
//     }
// });

// // Update cell content when typing inside the formula input
// formula.addEventListener("input", () => {
//     if (selectedCell) {
//         selectedCell.innerText = formula.value; // Update cell as user types in formula input
//         allData[selectedCell.id] = { ...allData[selectedCell.id], innerText: formula.value }; // Store updated text
//     }
// });






// selectedCell.style.fontWeight=formData["isBold"].checked?"bold":"normal";

// //store form data

// //apply this data to selected Cell