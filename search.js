
function styleSearch (o) {
  o.style.color = "#AAFF00";
  o.style.fontWeight = "bold";
  o.style.textTransform = "uppercase";
}
function clearStyle(o) {
  o.style.color = "";
  o.style.fontWeight = "normal";
  o.style.textTransform = "none";
}

let dropdown = document.getElementById("runes");

dropdown.addEventListener("change", function() {
  input = document.getElementById("searchInput");
  input.value = "";
  // textContent.trim()
  // Iterate through the table cells and compare the content
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (let i = 1; i < tr.length; i++) {
    let found = false; // Initialize found flag for each row
    td = tr[i].getElementsByTagName("td");
    for (let j = 1; j < td.length; j++) {
      if (td[j]) {
        txtValue = td[j].textContent || td[j].innerText;
        // Compare the content of the cell with the selected value
        if (txtValue.toUpperCase().trim() === dropdown.value.toUpperCase()) {
          styleSearch(td[j]);
          found = true;
        } else {
          clearStyle(td[j]);
        }
        if (dropdown.value.toUpperCase() === "") {
          clearStyle(td[j]);
          found = true;
        }
      }
    }
    if (found) {
      tr[i].style.display = ""; // If a match is found in any cell, display the row
    } else {
      tr[i].style.display = "none"; // If no match is found in any cell, hide the row
    }
    
  }
  
});

document.getElementById("searchInput").addEventListener("input", function() {
  let input, filter, table, tr, td, txtValue;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  
  for (let i = 1; i < tr.length; i++) {
    found = false; // Initialize found flag for each row
    td = tr[i].getElementsByTagName("td");
    for (let j = 1; j < td.length; j++) {
      if (td[j]) {
        document.getElementById("runes").value = "";
        txtValue = td[j].textContent || td[j].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          styleSearch(td[j]);
          found = true;
        } else {
          clearStyle(td[j]);
        }
        if (!filter) {
          clearStyle(td[j]);
        }
      }
    }
    
    if (found) {
      tr[i].style.display = ""; // If a match is found in any cell, display the row
    } else {
      tr[i].style.display = "none"; // If no match is found in any cell, hide the row
    }
  }
});


let button = document.getElementById("clear");

// Add an event listener for the 'click' event
button.addEventListener("click", function() {
  document.getElementById("searchInput").value = "";
  document.getElementById("runes").value = "";

  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (let i = 1; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td");
    for (let j = 1; j < td.length; j++) {
      clearStyle(td[j]);
    }
    tr[i].style.display = ""; // If a match is found in any cell, display the 
  }
});