export {Views};


const Views = {
    MainPageView: function(students){
        applyTemplate('students-list', 'students-list-template', {students:students});
    }
}

function applyTemplate (targetId, templateId, data){
    let target = document.getElementById(targetId);
    let template = Handlebars.compile(document.getElementById(templateId).textContent);
    target.innerHTML = template(data);
 }