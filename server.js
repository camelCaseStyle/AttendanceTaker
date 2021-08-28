import express from 'express';
import { Low, JSONFile } from 'lowdb'
import { join, dirname } from 'path'
import XLSX from 'xlsx';




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
    console.log(db.data.students)
    res.send(db.data)
})

function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}