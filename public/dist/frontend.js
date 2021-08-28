/**
 * All Event listeners
 */
document.getElementById("search").addEventListener('keyup', search_table);
document.getElementById("search").addEventListener('input', search_clear);







/**
 * All event listener implementations
 */
function search_table(){
  let allFirstName = document.getElementsByClassName('firstName');
  let allLastName = document.getElementsByClassName('lastName');
  for(let i = 0; i < allFirstName.length; i++){
    let text = allFirstName[i].innerText.toUpperCase() + ' '+allLastName[i].innerText.toUpperCase();
    let searchText = document.getElementById('search').value.toUpperCase();
    if(text.indexOf(searchText) > -1){
      document.getElementsByClassName('name-row')[i].style.display = '';
    }else{
      document.getElementsByClassName('name-row')[i].style.display = 'none';
    }

  }
}

function search_clear(){
  let allFirstName = document.getElementsByClassName('firstName');
  if(document.getElementById('search').value.toUpperCase() ==''){
    for(let i = 0; i < allFirstName.length; i++){    
        document.getElementsByClassName('name-row')[i].style.display = '';
    }
  }
}
