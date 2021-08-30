export {Views};


const Views = {
    AttendanceView: function(students){
        
        applyTemplate('container', 'students-list-template', {students:students});
    },
    WeekView : function(weeks){
        console.log(weeks)
        weeks.sort((a,b) => a-b);
        applyTemplate('container', 'weeks-list-template', {weeks:weeks});
    }
}

function applyTemplate (targetId, templateId, data){
    let target = document.getElementById(targetId);
    let template = Handlebars.compile(document.getElementById(templateId).textContent);
    target.innerHTML = template(data);
 }