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
    let checkBoxes = document.getElementsByClassName('present');
    let partipationCheckboxes = document.getElementsByClassName('participation');
    for(let i = 0; i < checkBoxes.length; i++){
        checkBoxes[i].addEventListener('click', checkBoxClicked);
        partipationCheckboxes[i].addEventListener('click', checkBoxClicked);
    }
    let addStudentButton = document.getElementById('add-student');
    addStudentButton.addEventListener('submit', addStudent);
    let deleteButtons = document.getElementsByClassName('delete-button')
    for(let i = 0; i < deleteButtons.length; i++){
        deleteButtons[i].addEventListener('click', deleteButtonClicked);
    }
    let clearAttendance = document.getElementById('clear-attendance');
    if(clearAttendance) clearAttendance.addEventListener('click',clearAll)
    applyCheckBoxes();
}

function generateExcelFile(){
    Model.getExcelFile();
}

function checkBoxClicked(e){
    console.log(this.dataset.id);
    let checkBoxPresent = document.getElementById(`defaultCheck${this.dataset.id}`);
    let checkBoxParticipation = document.getElementById(`defaultParticipation${this.dataset.id}`);
    if(checkBoxPresent.checked){
        Model.updatePresent(this.dataset.id, true);
    }else{
        Model.updatePresent(this.dataset.id, false);
    }
    if(checkBoxParticipation.checked){
        Model.updateParticipation(this.dataset.id, true);
    }else{
        Model.updateParticipation(this.dataset.id, false);
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
    let addStudentForm = document.getElementById('add-student');
    addStudentForm.reset();
    Model.addStudent(student);
}

function deleteButtonClicked(e){
    e.preventDefault(); 
    let student = Model.getAStudent(this.dataset.id)
    Model.deleteStudent(student);
}
function applyCheckBoxes(){
    let checkBoxesPresent = document.getElementsByClassName('present');
    let checkBoxesParticpation = document.getElementsByClassName('participation');
    for(let i = 0; i < checkBoxesPresent.length; i++){
        let student = Model.getAStudent(checkBoxesPresent[i].dataset.id);
        if(student.Present == 1){
            checkBoxesPresent[i].checked = true; 
        }else{
            checkBoxesPresent[i].checked = false; 
        }
        if(student.Participation == 1){
            checkBoxesParticpation[i].checked = true; 
        }else{
            checkBoxesParticpation[i].checked = false; 
        }
    }
}
function clearAll(e){
    let checkBoxesPresent = document.getElementsByClassName('present');
    let checkBoxesParticpation = document.getElementsByClassName('participation');
    e.preventDefault();
    for(let i = 0; i < checkBoxesPresent.length; i++){
        checkBoxesPresent[i].checked = false; 
        checkBoxesParticpation[i].checked = false;   
        Model.updatePresent(checkBoxesPresent[i].dataset.id, false);
        Model.updateParticipation(checkBoxesParticpation[i].dataset.id, false);
    }
}