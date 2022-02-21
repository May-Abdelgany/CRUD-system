var allProduct;
if (localStorage.getItem("all_products") == null) {
    allProduct = [];
}
else {
    allProduct = localStorage.getItem("all_products");
    allProduct = JSON.parse(allProduct);
    displayProduct();
}
function addProduct() {
    var oneProduct = {
        pName: document.getElementById("pNameId").value,
        pPrice: document.getElementById("pPriceId").value,
        pCat: document.getElementById("pCatId").value,
        pDesc: document.getElementById("pDescId").value,
    }
    if (oneProduct.pName == "" && oneProduct.pPrice == "" && oneProduct.pCat == "" && oneProduct.pDesc == "") {
        document.getElementById("error").innerHTML = "*required add data in inputs";
        document.getElementById("error").setAttribute("class", "bg-danger  my-4");
    }
    else {
        allProduct.push(oneProduct);
        document.getElementById("error").innerHTML = "*DONE";
        document.getElementById("error").setAttribute("class", "bg-success  my-4");
        localStorage.setItem("all_products", JSON.stringify(allProduct));
        displayProduct();
        clearInputs();
    }

}

function clearInputs() {
    document.getElementById("pNameId").value = "";
    document.getElementById("pPriceId").value = "";
    document.getElementById("pCatId").value = "";
    document.getElementById("pDescId").value = "";
}

function displayProduct() {
    var rows = ``;
    for (var i = 0; i < allProduct.length; i++) {
        rows += `<tr>
               <td>${i}</td>        
               <td>${allProduct[i].pName}</td>
               <td>${allProduct[i].pPrice}</td>
               <td>${allProduct[i].pCat}</td>
               <td>${allProduct[i].pDesc}</td>
               <td><button  class="btn btn-outline-warning" onclick="getData(${i})">get data</button></td>
               <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button></td>
        </tr>`
    }
    document.getElementById("tBody").innerHTML = rows;
}

function deleteProduct(indexProduct) {
    allProduct.splice(indexProduct, 1);
    displayProduct();
    localStorage.setItem("all_products", JSON.stringify(allProduct));
}

function searchProduct(searchTerm) {
    var rows = ``;
    for (var i = 0; i < allProduct.length; i++) {
        if (allProduct[i].pName.toLowerCase().includes(searchTerm.toLowerCase())) {
            rows += `<tr>
        <td>${i}</td>        
        <td>${allProduct[i].pName}</td>
        <td>${allProduct[i].pPrice}</td>
        <td>${allProduct[i].pCat}</td>
        <td>${allProduct[i].pDesc}</td>
        <td><button  class="btn btn-outline-warning">Update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button></td>
        </tr>`
        }
    }
    document.getElementById("tBody").innerHTML = rows;
}
function getData(updateTerm) {
    document.getElementById("pNameId").value = allProduct[updateTerm].pName;
    document.getElementById("pPriceId").value = allProduct[updateTerm].pPrice;
    document.getElementById("pCatId").value = allProduct[updateTerm].pCat;
    document.getElementById("pDescId").value = allProduct[updateTerm].pDesc;
    document.getElementById("btn").setAttribute("class", "btn btn-warning text-white");
    document.getElementById("btn").innerHTML = "Update Product"
    document.getElementById("btn").setAttribute(`onclick`, `update(${updateTerm})`);

}
function update(proIndex) {
    allProduct[proIndex].pName = document.getElementById("pNameId").value;
    allProduct[proIndex].pPrice = document.getElementById("pPriceId").value;
    allProduct[proIndex].pCat = document.getElementById("pCatId").value;
    allProduct[proIndex].pDesc = document.getElementById("pDescId").value;
    clearInputs();
    displayProduct();
    localStorage.setItem("all_products", JSON.stringify(allProduct));
    document.getElementById("btn").setAttribute("class", "btn btn-info text-white");
    document.getElementById("btn").innerHTML = "Add Product"
    document.getElementById("btn").setAttribute(`onclick`, `addProduct()`);
}