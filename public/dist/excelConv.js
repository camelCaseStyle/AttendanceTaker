

function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }
document.getElementById("export-to-excel").addEventListener('click', ()=>{
    let allCheckBoxes = document.getElementsByClassName("form-check-input");
    for(let i = 0; i < allCheckBoxes.length; i++){
        if(allCheckBoxes[i].checked){
            allCheckBoxes[i].parentElement.innerText = "1";
        }else{
            allCheckBoxes[i].innerHTML = "0";
        }
    }
    let wb =XLSX.utils.table_to_book(document.getElementById('attendance-table'), {sheet: "Attendance"});
    let wbOut = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST:true, 
        type: 'binary'
    });
    wb = XLSX.utils.table_to_book(document.getElementById('attendance-table'), {sheet: "Attendance"});
    saveAs(new Blob([s2ab(wbOut)],{type:"application/octet-stream"}), `attendace${Date(new Date().toLocaleString("en-US"))
}.xlsx`);
})