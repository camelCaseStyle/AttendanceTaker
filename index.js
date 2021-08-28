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

app.post('/generateExcelFile', (req, res) =>{
    // console.log(req.body.students)
    // let wb = XLSX.utils.book_new();
    // let ws = XLSX.utils.json_to_sheet([
    //     { S:1, h:2, e:3, e_1:4, t:5, J:6, S_1:7 },
    //     { S:2, h:3, e:4, e_1:5, t:6, J:7, S_1:8 }
    //   ], {header:["S","h","e","e_1","t","J","S_1"]});
    // XLSX.utils.book_append_sheet(wb, ws, 'attendance');
    

    // // XLSX.writeFile(wb,"Attendance.xlsx", {
    // //     type: 'file',
    // //     bookType: 'xlsx',
    // //     sheet:'Attendance'
    // // });
    // res.send(XLSX.writeFile(wb, 'out.xlsx'));
}); 
function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}