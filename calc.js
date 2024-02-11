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

    displayOutput(buyer_cLvl, crafter_cLvl,spawned_iLvl, crafted_iLvl, shoppedItemAfixLevel, craftedItemAfixLevel);
}

function displayOutput(buyerLevel, crafterLevel, spawned_iLvl, crafted_iLvl, shoppedItemAfixLevel, craftedItemAfixLevel) {
    var outputText = `Buyer Level: ${buyerLevel}<br>Crafter Level: ${crafterLevel}<br>Shopped item iLvl: <b style="font-size:1.5em;color:green;">${spawned_iLvl}</b><br>Shopped item afix level: ${shoppedItemAfixLevel}<br>Crafted item iLvl: <b style="font-size:1.5em;color:green;">${crafted_iLvl}</b><br>Crafted item afix level: <b style="font-size:1.5em;color:green;">${craftedItemAfixLevel}</b>`;
    document.getElementById("outputText").innerHTML = outputText;
    document.getElementById("outputDisplay").style.display = "block";
}

function fillSecondDropdown(selection) {
   
  // Fetch the JSON data from bases.json
  fetch('bases.json')
    .then(response => response.json())
    .then(data => {
        
        // Find the corresponding data in the JSON
        const selectedData = data[selection];
        
        // Clear existing options or add template first option
        pickBase.innerHTML = '<option value="">Select Base</option>';

        // Loop through the selected data and fill the options
        selectedData.forEach(item => {
            // Set the value and text of the option
            // Create an option element
            const option = document.createElement("option");
            
            
            option.value = item.name;
            option.text = item.name;
            option.dataset.qlvl = item.qlvl;
            // Append the option to the second dropdown
            pickBase.appendChild(option);

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

                // Push the value into the form field
                qlvlF.value = qlvlValue;
            });

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
  fetch('weapons.json')
    .then(response => response.json())
    .then(data => {
        // Find the corresponding data in the JSON
        const selectedData = data[selection];
        
        // Clear existing options or add template first option
        pickBasew.innerHTML = '<option value="">Select Base</option>';

        // Loop through the selected data and fill the options
        selectedData.forEach(item => {
            // Set the value and text of the option
            // Create an option element
            const option = document.createElement("option");
            const qlvl = document.getElementById("qlvl");
            
            option.value = item.name;
            option.text = item.name;
            option.dataset.qlvl = item.qlvl;
            // Append the option to the second dropdown
            pickBasew.appendChild(option);

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
                
                // Push the value into the form field
                qlvlF.value = qlvlValue;
            });

        });
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Attach the function to the change event of the first dropdown
pickwep.addEventListener("change", function () {
  fillSecondDropdown2(this.value);
});


// Initial fill when the page loads
// fillSecondDropdown(document.getElementById("firstDropdown").value);



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



