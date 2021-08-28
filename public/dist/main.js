import {Model} from './model.js';
import {Views} from './views.js';

window.onload = function() {
    Model.load(); 
};


window.addEventListener('modelUpdated', ()=>{
    loadPage(); 
    bindings();
});

function loadPage(){
    Views.MainPageView(Model.getAllStudents());
}

function bindings(){
    let genExcelButton = document.getElementById('export-to-excel');
    genExcelButton.addEventListener('click', generateExcelFile);
    let checkBoxes = document.getElementsByClassName('form-check-input');
    for(let i = 0; i < checkBoxes.length; i++){
        checkBoxes[i].addEventListener('click', checkBoxClicked);
    }
}

function generateExcelFile(){
    Model.getExcelFile();
}

function checkBoxClicked(e){
    console.log(this.dataset.id);
    let checkBox = document.getElementById(`defaultCheck${this.dataset.id}`);
    if(checkBox.checked){
        Model.updatePresent(this.dataset.id, true);
    }else{
        Model.updatePresent(this.dataset.id, false);
    }
}