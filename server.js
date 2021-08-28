import express from 'express';
import { Low, JSONFile } from 'lowdb'
import { join, dirname } from 'path'


const __dirname = dirname('db.json');
const file = join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);
await db.read();

const app = express(); 
app.listen(process.env.PORT||3000, ()=> console.log(`Server is running at ${process.env.PORT}`));
app.use(express.static('public'));
app.use(express.json());

app.get("/getAllStudents", (req, res) =>{
    console.log(db.data.students);
    res.send(db.data);
})


app.post('/addStudent', (req, res) =>{
    let student = req.body; 
    let {students} = db.data;
    students.push(student);
    db.write().then(()=>{
        res.send(db.data);
    })

})

app.post('/updateStudent', (req, res) =>{
    let student = req.body; 
    let {students} = db.data;
    for(let i = 0; i < students.length; i++){
        if(student.id == students[i].id){
            students[i].Present = student.Present;
        }
    }
    db.write().then(()=>{
        res.send(db.data);
    })

})

app.post('/removeStudent', (req, res) =>{
    let student = req.body;
    console.log(student)
    let {students} = db.data;
    students.pop(student);
    db.write().then(()=>{
        res.send(db.data);
    })
})
