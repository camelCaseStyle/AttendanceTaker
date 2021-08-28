/**
 * All Event listeners
 */
document.getElementById("search").addEventListener('keyup', search_table);








/**
 * All event listener implementations
 */
function search_table(){
    // Declare variables 
    var input, filter, table, tr, td, i;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("attendance-table");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td"); 
      for(let j=0 ; j<td.length ; j++)
      {
        let tdata = td[j].innerText.replace(/ /g,'');
        if (tdata) {
          if (tdata.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
            break ; 
          } else {
            tr[i].style.display = "none";
          }
        } 
      }
    }
  }