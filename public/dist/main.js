import {Model} from './model.js';
import {Views} from './views.js';

window.onload = function() {
    Model.load(); 
};


window.addEventListener('modelUpdated', ()=>{
    loadPage(); 
    bindings();
});
window.addEventListener('studentDeleted', () =>{
    Model.load();
})
window.addEventListener('studentAdded', () =>{
    Model.load();
})

window.addEventListener('studentUpdated', ()=>{
    Model.load();
})
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
    let addStudentButton = document.getElementById('add-student');
    addStudentButton.addEventListener('submit', addStudent);
    let deleteButtons = document.getElementsByClassName('delete-button')
    for(let i = 0; i < deleteButtons.length; i++){
        deleteButtons[i].addEventListener('click', deleteButtonClicked);
    }
    applyCheckBoxes();
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
function addStudent(e){
    e.preventDefault();
    let student = {
        firstName: this.elements['firstName'].value,
        lastName: this.elements['lastName'].value,
        id: Date.now(),
        Present: 1
    }
    Model.addStudent(student);
}

function deleteButtonClicked(e){
    e.preventDefault(); 
    let student = Model.getAStudent(this.dataset.id)
    Model.deleteStudent(student);
}
function applyCheckBoxes(){
    let checkBoxes = document.getElementsByClassName('form-check-input');
    for(let i = 0; i < checkBoxes.length; i++){
        let student = Model.getAStudent(checkBoxes[i].dataset.id);
        if(student.Present == 1){
            checkBoxes[i].checked = true; 
        }else{
            checkBoxes[i].checked = false; 
        }
    }
}