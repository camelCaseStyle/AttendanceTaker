export {Model}
const Model ={
    getAllStudentsURI: '/getAllStudents',
    addStudentURI: '/addStudent',
    getExcelURI: '/generateExcelFile',
    deleteStudentURI: '/removeStudent',
    updateStudentURI: '/updateStudent',
    data: {
        students:[]
    },

    load: function(){
        fetch(this.getAllStudentsURI).then(response =>{
            return response.json();
        }).then((data)=>{
            this.data.students = data.students;
            let event = new CustomEvent('modelUpdated');
            window.dispatchEvent(event);
        })
    },
    getAllStudents: function(){
        return this.data.students.filter(student => student.id);
    },
    getAStudent: function(id){
        for(let i = 0; i < this.data.students.length; i++){
            if(id == this.data.students[i].id){
                return this.data.students[i];
            }
        }
    },
    addStudent: function(student){
        fetch(this.addStudentURI,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify(student)
        }).then(response =>{
            return response.json()
        }).then(data=>{
            let event = new CustomEvent('studentAdded');
            window.dispatchEvent(event);
        })
    },
    updateStudent: function(student){
        fetch(this.updateStudentURI,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify(student)
        }).then(response =>{
            return response.json()
        }).then(data=>{
            let event = new CustomEvent('studentUpdated');
            window.dispatchEvent(event);
        })
    },
    deleteStudent: function(student){
        fetch(this.deleteStudentURI,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify(student)
        }).then(response =>{
            return response.json()
        }).then(data=>{
            let event = new CustomEvent('studentDeleted');
            window.dispatchEvent(event);
        })
    },
    getExcelFile: function(weekId){
        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.json_to_sheet(this.data.students.filter(student => student.week == weekId));
        XLSX.utils.book_append_sheet(wb, ws, 'attendance');
        XLSX.writeFile(wb,`Attendance${Date(new Date().toLocaleString("en-US"))}.xlsx`, {
            type: 'file',
            bookType: 'xlsx',
        });
    },
    getWeeksList: function(){
        let numberOfWeeks = []; 
        this.data.students.forEach(student =>{
            if(!numberOfWeeks.includes(student.week)){
                numberOfWeeks.push(student.week)
            }
        })
        return numberOfWeeks;
    },
    getAllStudentsByWeek: function(weekId){
        let students = []; 
        this.data.students.forEach(student =>{
            if(student.week == weekId){
                students.push(student);
            }
        })
        return students;
    }
    
}