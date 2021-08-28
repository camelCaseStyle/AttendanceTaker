export {Model}
const Model ={
    getAllStudentsURI: '/getAllStudents',
    addStudentURI: '/addStudent',
    getExcelURI: '/generateExcelFile',
    data: {
        students:[]
    },

    load: function(){
        fetch(this.getAllStudentsURI).then(response =>{
            return response.json();
        }).then((data)=>{
            this.data.students = data.students;
            console.log(this.data.students)
            console.log(this.data.students) 
            let event = new CustomEvent('modelUpdated');
            window.dispatchEvent(event);
        })
    },
    getAllStudents: function(){
        return this.data.students;
    },
    getAStudent: function(id){
        this.data.students.forEach(student =>{
            if(student.id == id) return student; 
        })
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
        }).then(data =>{
            
            let event = new CustomEvent('studentAdded');
            window.dispatchEvent(event);
        })
    },
    updatePresent: function(id, isPresent){
        this.data.students.forEach(student =>{
            if(student.id == id){
                if(isPresent){
                    student.Present = 1;
                }else{
                    student.Present  = 0;
                }
            } 
        })
        console.log(this.data.students)
    },
    getExcelFile: function(){
        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.json_to_sheet(this.data.students);
        XLSX.utils.book_append_sheet(wb, ws, 'attendance');
        XLSX.writeFile(wb,`Attendance${Date(new Date().toLocaleString("en-US"))}.xlsx`, {
            type: 'file',
            bookType: 'xlsx',
        });
    }
    
}