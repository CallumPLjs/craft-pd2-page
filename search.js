const table = document.getElementById("myTable");
const cellPopup = document.getElementById('cell-popup');

function styleSearch (o) {
  // o.style.color = "#AAFF00";
  o.style.color = "#111";
  o.style.fontWeight = "bold";
  // o.style.textTransform = "uppercase";
  o.style.background = "#fffcd8";
}
function clearStyle(o) {
  o.style.color = "";
  o.style.fontWeight = "normal";
  o.style.textTransform = "none";
  o.style.background = "";
}

let dropdown = document.getElementById("runes");
let input = document.getElementById("searchInput");

dropdown.addEventListener("change", function() {
  // input = document.getElementById("searchInput");
  input.value = "";
  // textContent.trim()
  // Iterate through the table cells and compare the content
  
  tr = table.getElementsByTagName("tr");
  for (let i = 1; i < tr.length; i++) {
    let found = false; // Initialize found flag for each row
    td = tr[i].getElementsByTagName("td");
    for (let j = 1; j < td.length-1; j++) {
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
  let filter, tr, td, txtValue;
  // input = document.getElementById("searchInput");
  let userInput = input.value.replace(/[^\w\s]/gi, '');
  filter = userInput.toUpperCase();
  tr = table.getElementsByTagName("tr");
  document.getElementById("runes").value = "";
  
  for (let i = 1; i < tr.length; i++) {
    found = false; // Initialize found flag for each row
    td = tr[i].getElementsByTagName("td");
    for (let j = 1; j < td.length-1; j++) {
      if (td[j]) {
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
  tr = table.getElementsByTagName("tr");
  for (let i = 1; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td");
    for (let j = 1; j < td.length-1; j++) {
      clearStyle(td[j]);
    }
    tr[i].style.display = ""; // If a match is found in any cell, display the 
  }
});






function displayHoverCard(x, y, content) {
  cellPopup.innerHTML = content;
  const cardWidth = cellPopup.offsetWidth;
  const screenWidth = window.innerWidth;
  // cellPopup.style.left = x + 'px';

  if (x > screenWidth / 2) {
    // Adjust the position towards the left side
    cellPopup.style.left = (x-650) + 'px';
  } else {
    // Position normally
    cellPopup.style.left = (x+50) + 'px';
  }

  cellPopup.style.top = y + 'px';
  cellPopup.classList.remove('hidden');
}

function hideHoverCard() {
  cellPopup.classList.add('hidden');
}

async function getCellObject(cellId) {
  try {
    // Replace 'your_data.json' with the path to your JSON file
    const response = await fetch('cells.json');
    const jsonData = await response.json();
    return jsonData[cellId];
  } catch (error) {
    console.error('Error fetching JSON data:', error);
    return {}; // Return an empty object in case of an error
  }
}

async function createCardContent(cellObject) {
  await Promise.resolve(cellObject);
  const { title, titleColor, subtitle, Line1, Line2, Line3, imageLink } = cellObject;

  const imageContent = imageLink ? `<img src="${imageLink}" alt="" style="width:320px;height:120px;" class="popupImage">` : '';

  // console.log(cellObject);

  // Create the HTML content for the hover card
  return `
    <div class="popup-contents" style="border-color: ${titleColor};"> 
      <div class="popup-list">
        <p class="card-header" style="color: ${titleColor};">${title} + Jewel</p>
        <p style="color: ${titleColor}; font-weight: bold;">${subtitle}</p>
        <ul>
          <li>${Line1}</li>
          <li>${Line2}</li>
          <li>${Line3}</li>
        </ul>
      </div>  
      <div class="card-image">
        ${imageContent}
      </div>
    </div>
  `;
}

async function handleCellHover(cellId, x, y) {
  const cellObject = await getCellObject(cellId);
  const cardContent = await createCardContent(cellObject);
  displayHoverCard(x, y, cardContent);
}


table.addEventListener('mouseover', function (event) {
  const cellId = event.target.id;
  const x = event.clientX;
  const y = event.clientY;

  if (cellId) {
    handleCellHover(cellId, x, y);
  }
});

table.addEventListener('mouseout', function () {
  hideHoverCard();
});