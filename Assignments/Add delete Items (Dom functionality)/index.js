function addItem() {

    const itemDisplayRef = document.getElementById("itemDisplay");
    const insertItemRef = document.getElementById("insertItem");
    const insertItem = insertItemRef.value;

    if (insertItem.trim() !== "") {

        const newElement = document.createElement("p");
        newElement.textContent = insertItem;

        const delButtonRef = document.createElement("button");
        delButtonRef.onclick = function deleteMe() {
            newElement.remove()
            delButtonRef.remove()
        }

        delButtonRef.textContent = "Delete";

        itemDisplayRef.appendChild(newElement);
        newElement.appendChild(delButtonRef);
        insertItemRef.value = "";
    }
    else {
        alert("No Value Entered")
    }




}

// delete logic function...



// displaying the content on webpage...




