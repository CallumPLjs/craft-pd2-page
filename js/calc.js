let pickItem = document.getElementById("pickItem");
let pickBase = document.getElementById("pickBase");
let pickBasew = document.getElementById("pickBasew");
let pickwep = document.getElementById("pickwep");
let pickBaseDiv = document.getElementById("pickBaseDiv");
let pickWepDiv = document.getElementById("pickWepDiv");
let pickBaseDivw = document.getElementById("pickBaseDivw");
let craftSource = document.getElementById("craftBase");
let buyerLevel = document.getElementById("bLevel");
let crafterLevel = document.getElementById("cLevel");
let qlvlF = document.getElementById("qlvl");
let selectionParams = {
    "type" : "",
    "class" : "",
    "alvl" : 0,
    "color" : ""
}


function generateALvl(item_iLvl, qLvl) {
    let itemALvl = 0;
    let magLvl = 0;
    // let qlvl = qLvl;
    if (magLvl > 0) {
        itemALvl = item_iLvl + magLvl;
    }
    if (magLvl == 0) {
        if (item_iLvl < (99 - (Math.floor(qLvl/2)))) {
            itemALvl = Math.max(item_iLvl, qLvl) - (Math.floor(qLvl/2));
        } else { 
            itemALvl = (2*item_iLvl) - 99;
        }
    }
    return itemALvl;
}



function displayOutput(buyerLevel, crafterLevel, spawned_iLvl, crafted_iLvl, shoppedItemAfixLevel, craftedItemAfixLevel) {
    var outputText = `Buyer Level: ${buyerLevel}<br>Crafter Level: ${crafterLevel}<br>Shopped item iLvl: <b style="font-size:1.5em;color:green;">${spawned_iLvl}</b><br>Shopped item afix level: ${shoppedItemAfixLevel}<br>Crafted item iLvl: <b style="font-size:1.5em;color:green;">${crafted_iLvl}</b><br>Crafted item afix level: <b style="font-size:1.5em;color:green;">${craftedItemAfixLevel}</b><br>Item color: <b style="font-size:1.5em;color:${selectionParams.color === 'blue' ? 'lightblue' : 'orange'};">${selectionParams.color}</b>`;
    document.getElementById("outputText").innerHTML = outputText;
    document.getElementById("outputDisplay").style.display = "block";
}

function fillSecondDropdown(selection) {
   
  // Fetch the JSON data from bases.json
  fetch('json/bases.json')
    .then(response => response.json())
    .then(data => {
        
        // Find the corresponding data in the JSON
        const selectedData = data[selection];
        
        // Clear existing options or add template first option
        pickBase.innerHTML = '<option value="">Select Base</option>';
        const qualityGroups = {};

        // Loop through the selected data and fill the options
        selectedData.forEach(item => {
            
            const quality = item.quality;
    
            // If the quality group doesn't exist, create it
            if (!qualityGroups[quality]) {
                qualityGroups[quality] = document.createElement("optgroup");
                qualityGroups[quality].label = quality; // Set the label for the optgroup
                pickBase.appendChild(qualityGroups[quality]); // Append the optgroup to the dropdown
            }

            // Create an option element
            const option = document.createElement("option");
            option.value = item.name;
            option.text = item.name;
            option.dataset.qlvl = item.qlvl;
            option.dataset.type = item.type;
            option.dataset.class = item.class;

            // Append the option to the corresponding quality group
            qualityGroups[quality].appendChild(option);

        });
        //reset other dropdown set
        pickwep.value = "";
        pickBasew.innerHTML = '<option value="">Select Base</option>';
        qlvlF.value = 0;

        //get second dropdown option and set qlvl
        pickBase.addEventListener("change", function () {
            // Retrieve the selected option
            const selectedOption = this.options[this.selectedIndex];

            // Retrieve the value of the "qlvl" property
            const qlvlValue = parseFloat(selectedOption.dataset.qlvl);
            // console.log("qlvlValue:", qlvlValue);
            const typeValue = selectedOption.dataset.type;
            // console.log("typeValue:", typeValue);
            const classValue = selectedOption.dataset.class;
            // console.log("classValue:", classValue);
            
            // Push the value into the form field
            qlvlF.value = qlvlValue;
            selectionParams.type = typeValue;
            selectionParams.class = classValue;
            // console.log(selectionParams);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Attach the function to the change event of the first dropdown
pickItem.addEventListener("change", function () {
    fillSecondDropdown(this.value);  
});

function fillSecondDropdown2(selection) {
   
  // Fetch the JSON data from weapons.json
  fetch('json/weapons.json')
    .then(response => response.json())
    .then(data => {
        // Find the corresponding data in the JSON
        const selectedData = data[selection];
        
        // Clear existing options or add template first option
        pickBasew.innerHTML = '<option value="">Select Base</option>';
         const qualityGroups = {};
        // Loop through the selected data and fill the options
        selectedData.forEach(item => {
            const quality = item.quality;
    
            // If the quality group doesn't exist, create it
            if (!qualityGroups[quality]) {
                qualityGroups[quality] = document.createElement("optgroup");
                qualityGroups[quality].label = quality; // Set the label for the optgroup
                pickBasew.appendChild(qualityGroups[quality]); // Append the optgroup to the dropdown
            }

            // Create an option element
            const option = document.createElement("option");
            option.value = item.name;
            option.text = item.name;
            option.dataset.qlvl = item.qlvl;
            option.dataset.type = item.type;
            option.dataset.class = item.class;

            // Append the option to the corresponding quality group
            qualityGroups[quality].appendChild(option);
        });
        //reset other dropdown set
        pickItem.value = "";
        pickBase.innerHTML = '<option value="">Select Base</option>';
        qlvlF.value = 0;
        
        //get second dropdown option and set qlvl
        pickBasew.addEventListener("change", function () {
            // Retrieve the selected option
            const selectedOption = this.options[this.selectedIndex];

            // Retrieve the value of the "qlvl" property
            const qlvlValue = parseFloat(selectedOption.dataset.qlvl);
            // console.log("qlvlValue:", qlvlValue);
            const typeValue = selectedOption.dataset.type;
            //  console.log("typeValue:", typeValue);
            const classValue = selectedOption.dataset.class;
            // console.log("classValue:", classValue);
            // Push the value into the form field
            qlvlF.value = qlvlValue;
            selectionParams.type = typeValue;
            selectionParams.class = classValue;
            // console.log(selectionParams);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Attach the function to the change event of the first dropdown
pickwep.addEventListener("change", function () {
  fillSecondDropdown2(this.value);
});



function fillAfixTables(id, tag) {
    fetch('json/affix.json')
    .then(response => response.json())
    .then(data => {
        
        // console.log(data.prefixes);
        let afixTableBody = document.getElementById(id);
        afixTableBody.innerHTML = "";
        let counter = 0;
        // Find the corresponding data in the JSON
        // const selectedData = data[selectionParams.type];
        // Loop through the selected data and fill the options
        data[tag].forEach(item => {
            // Check if the selected type matches the item type
            console.log(selectionParams.color);
            const isMatch = item.items && 
                            item.items.some(item => item.type === selectionParams.type && item.class === selectionParams.class) &&
                            selectionParams.alvl >= item.min_lvl &&
                            selectionParams.alvl <= item.max_lvl &&
                            (
                                selectionParams.color === "blue" ||  selectionParams.color === item.color
                            );
                            // selectionParams.color === item.color;
            if (isMatch) {
                // If they match, insert a new row in the table
                let row = afixTableBody.insertRow(counter);
                let nameCell = row.insertCell(0);
                let propertyCell = row.insertCell(1);
                let minLvlCell = row.insertCell(2);
                let maxLvlCell = row.insertCell(3);
                let rLvlCell = row.insertCell(4);

                // Fill the cells with item data
                nameCell.innerHTML = item.name;
                propertyCell.innerHTML = item.property;
                minLvlCell.innerHTML = item.min_lvl;
                maxLvlCell.innerHTML = item.max_lvl;
                rLvlCell.innerHTML = item.rlvl;
                counter++;
            }
            
        });
    })
    .catch(error => console.error('Error fetching data:', error));
}


function validateForm() {
    let buyer_cLvl = parseFloat(document.getElementById("bLevel").value); 
    let crafter_cLvl = parseFloat(document.getElementById("cLevel").value);
    let dropped_iLvl = parseFloat(document.getElementById("ilvl").value);
    let spawned_iLvl = Math.min((buyer_cLvl + 5), 99);
    let qlvl = parseFloat(document.getElementById("qlvl").value); 

    if (qlvl > spawned_iLvl) {
        spawned_iLvl = qlvl;
    }

    let crafted_iLvl;
    if (buyer_cLvl && !dropped_iLvl) {
        crafted_iLvl = Math.floor(crafter_cLvl/2) + Math.floor(spawned_iLvl/2);
    }
    if (dropped_iLvl && !buyer_cLvl) {
        crafted_iLvl = Math.floor(crafter_cLvl/2) + Math.floor(dropped_iLvl/2);
    }
    if (dropped_iLvl && buyer_cLvl) {
        crafted_iLvl = Math.floor(crafter_cLvl/2) + Math.floor(dropped_iLvl/2);
    }


    let shoppedItemAfixLevel = generateALvl(spawned_iLvl, qlvl);
    
    let craftedItemAfixLevel = generateALvl(crafted_iLvl, qlvl);
    
    if (isNaN(craftedItemAfixLevel)){
        selectionParams.alvl = shoppedItemAfixLevel;
        selectionParams.color = "blue";
    } else {
        selectionParams.alvl = craftedItemAfixLevel;
        selectionParams.color = "yellow";
    }
    // console.log(selectionParams.alvl);

    displayOutput(buyer_cLvl, crafter_cLvl,spawned_iLvl, crafted_iLvl, shoppedItemAfixLevel, craftedItemAfixLevel);
    // fillPreffixTable();
    // fillSuffixTable();
    fillAfixTables("tab", 'prefixes');
    fillAfixTables("tab2", 'suffixes');
}

var currentSortColumn = -1;
var currentSortDirection = "asc";

function sortTable(columnIndex, tableName) {
    var table, rows, switching, i, x, y, shouldSwitch, switchcount = 0;
    table = document.getElementById(tableName);
    switching = true;

    if (currentSortColumn === columnIndex) {
        // If clicking on the same column, toggle the sorting direction
        currentSortDirection = (currentSortDirection === "asc") ? "desc" : "asc";
    } else {
        // If clicking on a different column, reset the sorting direction
        currentSortColumn = columnIndex;
        currentSortDirection = "asc";
    }

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("td")[columnIndex];
            y = rows[i + 1].getElementsByTagName("td")[columnIndex];

            var xValue = isNaN(x.innerHTML) ? x.innerHTML.toLowerCase() : parseFloat(x.innerHTML);
            var yValue = isNaN(y.innerHTML) ? y.innerHTML.toLowerCase() : parseFloat(y.innerHTML);

            if (currentSortDirection === "asc" && xValue > yValue) {
                shouldSwitch = true;
                break;
            } else if (currentSortDirection === "desc" && xValue < yValue) {
                shouldSwitch = true;
                break;
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount === 0 && currentSortDirection === "asc") {
                currentSortDirection = "desc";
                switching = true;
            }
        }
    }
}

function toggleElement() {
    var element = document.getElementById("runeSearchContainer");
    element.classList.toggle("hidden");
}
// Initial fill when the page loads
// fillSecondDropdown(document.getElementById("firstDropdown").value);

// function hideElement(e) {
//   e.classList.add('hidden');
// }

// function showBuyer() {
     
//     if (craftSource.value === "drop") {
//         // buyerLevel.classList.add("hidden");
//         buyerLevel.style.display = "none";
//     } else {
//         // buyerLevel.classList.remove("hidden");
//         buyerLevel.style.display = "block";
//     }
// }   
// function showDropdown() {
     
//     if ((pickItem.value === "") || (pickItem.value === "amulet") || (pickItem.value === "ring")) {
//         pickBase.style.display = "none";
//     } else {
//         pickBase.style.display = "block";
//     }
//     if (pickItem.value === "weaponClass") {
//         pickwep.style.display = "block";
//     } else {
//         pickwep.style.display = "none";
//     }
// }

/*
First step is to hardcode values, create formulas and find the crafter's level to achieve certain ilvls, based on base type and alvl.

Next step, ideally, would be to input the base type and alvl and receive the best buyer/crafter levels combo for a desired final ilvl.
*/

/*
- where or how an item is born or created determines the item's iLvl (drop, shop, gamble, craft, imbue)
- required for this project: a collection or JSON with each item or base qLvl, as dictated by Blizzard, data available on pd2 wiki
- magLvl also dictated by Blizzard, data available bellow

based on these 3 params (2 fixed and 1 variable) we can determine the item's aLvl -noted bellow as itemAfixLvl- (afix level, which in this case represents the pool to choose from, an upside down pyramid of available options; the higher the level, the more options available with each increasing level, but excluding some low levels which have a max cap to appear and after a certain level -their max range- they dissapear from the pool)

each property present in the afix or sufix pool has a (min) level or a range of itemAfixLevels to appear on an item at the moment of birth or creation. in other words, if at birth an item gets assigned itemAffixLevel=40, all properties with a targetAfixLvl of 40 or lower will have a chance to spawn on the item, excluding the ranges that ended under 40.
*/


 //declare target or desired afix level for a certain afix, later will split into existing afix values decided by pd2 and desired by player afix level necessary for a certain property to spawn

// Most items have a maglvl of 0 so this isn't relevant for them, but a few items have a non-zero magic level: non-elite wands (1), staves (1), orbs (1), and circlets: Circlet (3), Coronet (8), Tiara (13), Diadem (18).


/*
For items with a magic level, this has the effect of reducing the minimum ilvl needed for an affix to spawn. For example, a tiara can get +2 to class skills at ilvl 77 rather than needing to be ilvl 90+. Diadems are an interesting case here - they have such a high qlvl and maglvl that their ilvl is irrelevant and their alvl is always 99.
*/



/*
Next todos:
- generate blizzard data
- create first draft = hard user input lvl values: qlvl and maglvl (knows what base, fixed lvls), alvl (knows what property is looking for and what alvl is required)
- create significant input form fields
- create output UI
- create logic to compare itemalvl to targetalvl and display optimal buyerlvl and or crafterlvl; i.e. user inputs desired afix level for his property, base type, code assigns that value to item alvl and reverses the function to deduct buyer lvl for certain base
*/



//define the ilvl breakpoint ranges, example bellow commented out:
/*var numberArray = Array.from({ length: 50 }, (_, index) => index + 1);

var jsonObject = {
  "key1": "value1",
  "key2": numberArray,
  "key3": ["apple", "orange", "banana"]
};*/

// ++++++++++++++++++++++++++++++++++++++++++++++++
// retired functions

function fillPreffixTable() {
    fetch('json/affix.json')
    .then(response => response.json())
    .then(data => {
        
        // console.log(data.prefixes);
        let prefixTableBody = document.getElementById("tab");
        prefixTableBody.innerHTML = "";
        let counter = 0;
        // Find the corresponding data in the JSON
        // const selectedData = data[selectionParams.type];
        // Loop through the selected data and fill the options
        data.prefixes.forEach(item => {
            // Check if the selected type matches the item type
            console.log(selectionParams.color);
            const isMatch = item.items && 
                            item.items.some(item => item.type === selectionParams.type && item.class === selectionParams.class) &&
                            selectionParams.alvl >= item.min_lvl &&
                            selectionParams.alvl <= item.max_lvl &&
                            (
                                selectionParams.color === "blue" ||  selectionParams.color === item.color
                            );
                            // selectionParams.color === item.color;
            if (isMatch) {
                // If they match, insert a new row in the table
                let row = prefixTableBody.insertRow(counter);
                let nameCell = row.insertCell(0);
                let propertyCell = row.insertCell(1);
                let minLvlCell = row.insertCell(2);
                let maxLvlCell = row.insertCell(3);
                let rLvlCell = row.insertCell(4);

                // Fill the cells with item data
                nameCell.innerHTML = item.name;
                propertyCell.innerHTML = item.property;
                minLvlCell.innerHTML = item.min_lvl;
                maxLvlCell.innerHTML = item.max_lvl;
                rLvlCell.innerHTML = item.rlvl;
                counter++;
            }
            
        });
    })
    .catch(error => console.error('Error fetching data:', error));
}

function fillSuffixTable() {
    fetch('json/affix.json')
    .then(response => response.json())
    .then(data => {
        
        // console.log(data.prefixes);
        let suffixTableBody = document.getElementById("tab2");
        suffixTableBody.innerHTML = "";
        let counter = 0;
        // Find the corresponding data in the JSON
        // const selectedData = data[selectionParams.type];
        // Loop through the selected data and fill the options
        data.suffixes.forEach(item => {
            // Check if the selected type matches the item type
            console.log(selectionParams.color);
            const isMatch = item.items && 
                            item.items.some(item => item.type === selectionParams.type && item.class === selectionParams.class) &&
                            selectionParams.alvl >= item.min_lvl &&
                            selectionParams.alvl <= item.max_lvl &&
                            (
                                selectionParams.color === "blue" ||  selectionParams.color === item.color
                            );
                            // selectionParams.color === item.color;
            if (isMatch) {
                // If they match, insert a new row in the table
                let row = suffixTableBody.insertRow(counter);
                let nameCell = row.insertCell(0);
                let propertyCell = row.insertCell(1);
                let minLvlCell = row.insertCell(2);
                let maxLvlCell = row.insertCell(3);
                let rLvlCell = row.insertCell(4);

                // Fill the cells with item data
                nameCell.innerHTML = item.name;
                propertyCell.innerHTML = item.property;
                minLvlCell.innerHTML = item.min_lvl;
                maxLvlCell.innerHTML = item.max_lvl;
                rLvlCell.innerHTML = item.rlvl;
                counter++;
            }
            
        });
    })
    .catch(error => console.error('Error fetching data:', error));
}
