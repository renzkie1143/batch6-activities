let addBtn = document.querySelector("#addBtn");
let inputField = document.querySelector("#inpuField");
let toDoContainer = document.querySelector("#toDoContainer");

let checker = [];
addBtn.addEventListener("click",() =>{
    // creating elements in order to display the users input
    let toDoList = document.createElement("li");
    let output = document.createElement("span")
    let buttonDiv = document.createElement("span");
    let removeBtn = document.createElement("button");
    // create element for the done button
    let doneBtn = document.createElement("button")
    doneBtn.innerHTML ="Done"
    doneBtn.classList.add("doneBtn");
    // passing the value of user input
    output.innerHTML = inputField.value;
    output.classList.add("toDoList") 
    buttonDiv.classList.add("buttonDiv")
    // passing the value of the users input  to another varailable
    let toDoListValue = output.innerHTML;
    // check the existing value if not exist it return -1
    let toDoListValueLowerCase = checker.findIndex(value => {
        return value.toLowerCase() === toDoListValue.toLowerCase();
    })
    // validate if the input is aleardy exist
    if (  toDoListValue == ""){
        alert(" Please fill out")
    }else if (checker[0] != undefined && toDoListValueLowerCase != -1){ 
        alert("Already Exist");
    }else{
        checker.push(toDoListValue);
        toDoContainer.append(toDoList);
        toDoList.append(output);
        toDoList.append(buttonDiv)
        buttonDiv.append(doneBtn);
        buttonDiv.append(removeBtn);
        // alert (toDoListValue + " has been Added")
    }

    // create element for the removebutton
    removeBtn.innerHTML = "Delete";
    removeBtn.classList.add("removeBtn");
    // delete the users input
    removeBtn.addEventListener("click", (e) =>{ 
        let findParentNode = e.target.parentNode;
        let deleteInput = findParentNode.parentNode
        let innerValue = deleteInput.querySelector(".toDoList").innerHTML;
        checker.map((value )=>{
            if (value == innerValue ){
                let targetLock = checker.indexOf(value)
                checker.splice(targetLock,1)
                deleteInput.remove();
                alert(innerValue + " has been deleted")
            } else{
                return
            }
        })
    }) 
    doneBtn.addEventListener("click", (e) =>{
        let findParentNode = e.target.parentNode;
        let targetParentNode = findParentNode.parentNode;
        let innerValue = targetParentNode.querySelector(".toDoList");
        innerValue.classList.toggle("toDoListChange")

    
         
         if (doneBtn.innerHTML != "Undone"){
            doneBtn.innerHTML = "Undone"
         }  else {
            doneBtn.innerHTML = "Done"
         }
    })
    
    return inputField.value = "";
})

 
