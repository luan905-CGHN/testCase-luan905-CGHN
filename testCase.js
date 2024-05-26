
    function resetInput() {
    document.getElementById("tên sản phẩm").value=""
    document.getElementById("mã sản phẩm").value=""
    document.getElementById("số lượng bán").value=""
    document.getElementById("giá bán").value=""
}

    function validateInput() {
    let formElement = document.querySelector(".form")
    let inputElement = formElement.querySelectorAll(".form-input")
    for (let i=0;i<inputElement.length;i++) {
    if (inputElement[i].value === ""){
    inputElement[i].parentElement.querySelector(".error-message").innerText = `Điền thông tin ${inputElement[i].id}`
}else {
    inputElement[i].parentElement.querySelector(".error-message").innerText = ""
}
}
}
    function addNew() {
    validateInput()
    let formElement = document.querySelector(".form")
    let errorElement = formElement.querySelectorAll(".error-message")
    let arrErrorElement = []
    for (let i = 0; i < errorElement.length; i++) {
    arrErrorElement.push(errorElement[i].innerText)}
    let checkErrorElement = arrErrorElement.every(value => value === "")
    if (checkErrorElement) {

    let name = document.getElementById("tên sản phẩm").value
    let number = document.getElementById("mã sản phẩm").value
    let quantity = document.getElementById("số lượng bán").value
    let price = document.getElementById("giá bán").value
    let listProduct = localStorage.getItem("listProduct") ? JSON.parse(localStorage.getItem("listProduct")) : []
    listProduct.push({
    name: name,
    number: number,
    quantity: quantity,
    price: price,
})
    localStorage.setItem("listProduct", JSON.stringify(listProduct))
    render()
}
}
    function render() {
    let listProduct = localStorage.getItem("listProduct") ? JSON.parse(localStorage.getItem("listProduct")) : []
    let product = `<tr>
                             <th>ID</th>
                            <th>Tên sản phẩm</th>
                            <th>Mã sản phẩm</th>
                            <th>số lượng bán </th>
                             <th>giá bán </th>
                              <th>chức năng</th>
                   </tr>`
    listProduct.map((value,index)=> {
    product += `<tr>
           <td>${index+1}</td>
          <td>${value.name}</td>
          <td>${value.number}</td>
          <td>${value.quantity}</td>
          <td>${value.price}</td>

             <td>
               <button onclick="editProduct(${index})">edit</button>
               <button onclick="deleteProduct(${index})">delete</button>
             </td>
        </tr>`
})
    document.getElementById("tableContent").innerHTML = product
}
    function editProduct(index) {
    let listProduct = localStorage.getItem("listProduct") ? JSON.parse(localStorage.getItem("listProduct")) : []
    document.getElementById("tên sản phẩm").value = listProduct[index].name
    document.getElementById("mã sản phẩm").value = listProduct[index].number
    document.getElementById("số lượng bán").value = listProduct[index].quantity
    document.getElementById("giá bán").value = listProduct[index].price
    document.getElementById("index").value = index

    document.getElementById("add").style.display= "none"
    document.getElementById("update").style.display= "inline-block"

}
    function changeProduct() {
    let listProduct = localStorage.getItem("listProduct") ? JSON.parse(localStorage.getItem("listProduct")) : []
    let index = document.getElementById("index").value
    listProduct[index]={
    name: document.getElementById("tên sản phẩm").value,
    number: document.getElementById("mã sản phẩm").value,
    quantity: document.getElementById("số lượng bán").value,
    price: document.getElementById("giá bán").value,
}
    localStorage.setItem("listProduct" , JSON.stringify(listProduct))

    document.getElementById("add").style.display= "inline-block"
    document.getElementById("update").style.display= "none"
    render()
    resetInput()
}
    function deleteProduct(index) {
    let listProduct = localStorage.getItem("listProduct") ? JSON.parse(localStorage.getItem("listProduct")) : []
    if (confirm("có chắc là xóa không ?")){
    listProduct.splice(index,1)
}
    localStorage.setItem("listProduct" , JSON.stringify(listProduct))
    render()
}

