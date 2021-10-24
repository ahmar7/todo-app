var userinput = document.getElementById("userinput")






firebase.database().ref('todos').on('child_added', function(data){
  
        var li = document.createElement("li")
        li.setAttribute('class', "list")
        var input = document.createElement("input")
        input.setAttribute("class", "enters")
        input.setAttribute("id", "inpt")
        input.setAttribute("value",data.val().value)
        input.setAttribute("readonly", "readonly")
        li.appendChild(input)

        
        var editbtn = document.createElement("button")
        editbtn.setAttribute("id", data.val().key)
        editbtn.setAttribute("onclick", "editval(this)")
        editbtn.setAttribute("class", "btns")
        var edittext = document.createTextNode("Edit")
        editbtn.appendChild(edittext)
        li.appendChild(editbtn)
        var dellbtn = document.createElement("button")
        dellbtn.setAttribute("id",data.val().key)
        dellbtn.setAttribute("onclick", "dellval(this)")
        dellbtn.setAttribute("class", "btns")
        var delltext = document.createTextNode("Delete")
        dellbtn.appendChild(delltext)
        li.appendChild(dellbtn)

        var record = document.getElementById("record")
        record.appendChild(li)
})




function addbtn() {
    if (userinput.value == "") {
        alert('Task cannot be empty!')
    } else {
         document.getElementById("addto")
        var key = firebase.database().ref("todos").push().key
        var todo = {
            value: userinput.value,
            key: key
        }
        firebase.database().ref('todos').child(key).set(todo)
        userinput.value = ""
    }
}

function dellval(o) {
    firebase.database().ref('todos').child(o.id).remove()
    o.parentNode.remove()

}

function deleteBtn() {
    firebase.database().ref('todos').remove()
    record.innerHTML = ""
}

function editval(c) {
 
    var editvall = prompt  ("Enter the update value: ", c.parentNode.childNodes[0].value)
    var edittodo ={
        value : editvall,
        key : c.id
    }
    firebase.database().ref("todos").child(c.id).set(edittodo)
    c.parentNode.childNodes[0].value = editvall; 
    console.log(c.parentNode.childNodes[0].value)
}







