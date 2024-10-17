// Button Status
const buttonsStatus = document.querySelectorAll("[button-status]");
if (buttonsStatus.length > 0) {
  let url = new URL(window.location.href);
  buttonsStatus.forEach(button => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      url.searchParams.delete("page");
      if (status) {
        url.searchParams.set("availabilityStatus", status);
      } else
        url.searchParams.delete("availabilityStatus");
      window.location.href = url;
    })
  })
}

// End Button Status

// Form Search 
const formSearch = document.querySelector("#form-search");
if (formSearch) {
  let url = new URL(window.location.href);
  formSearch.addEventListener("submit", (e) => {
    const keyword = e.target.elements.keyword.value
    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else
      url.searchParams.delete("keyword");

    e.preventDefault();

    window.location.href = url;
  })
}
// End Form Search 

//Phân trang

const buttonsPagination = document.querySelectorAll("[button-pagination]");
if(buttonsPagination){
  buttonsPagination.forEach(button => {
    button.addEventListener('click', () => {
      let url = new URL(window.location.href);
      const currentPage = button.getAttribute("button-pagination");
      url.searchParams.set("page", currentPage);
      window.location.href = url;
    })
  })
}

//End phân trang

//Checkbox Multi
const checkboxMulti = document.querySelector("[table-change-multi]");
if (checkboxMulti) {
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
  const inputsId = checkboxMulti.querySelectorAll("input[name='id']");

  inputCheckAll.addEventListener('click', () => {
    if (inputCheckAll.checked) {
      inputsId.forEach(input => {
        input.checked = true;
      })
    } else {
      inputsId.forEach(input => {
        input.checked = false;
      })
    }
  })

  inputsId.forEach(input => {
    input.addEventListener('click', () => {
      const count = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
      if (count == inputsId.length)
        inputCheckAll.checked = true
      else
        inputCheckAll.checked = false;
    })
  })

}

//End Checkbox Multi

// Form Change Multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti){
  formChangeMulti.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");
  
    const typeChange = e.target.elements.type.value;
    if(typeChange == "delete-all") {
      const isConfirm = confirm("Bạn có chắc chắn xóa những sản phẩm này?")
      if(!isConfirm)
        return;
    }
  
    if (inputsChecked.length > 0) {
      const ids = [];
      inputsChecked.forEach(input => {
        if(typeChange=="change-position"){
          const position = input.closest("tr").querySelector("input[name='position']").value;
          ids.push(`${input.value}-${position}`)
        }
        else 
          ids.push(input.value);
      })
      inputsId = formChangeMulti.querySelector("input[name='ids']");
      
      inputsId.value = ids.join(", ");
      formChangeMulti.submit();
  
    }
    else 
      alert("Chọn 1 sản phẩm bất kỳ!");
  })
}


// End Form Change Multi

// Show Alert
const showAlert = document.querySelector("[show-alert]")
if(showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));
  const closeAlert = showAlert.querySelector("[close-alert]");


  setTimeout(()=> {
    showAlert.classList.add("alert-hidden");
  }, time);

  closeAlert.addEventListener('click', () => {
    showAlert.classList.add("alert-hidden");
  })

}
// End Show Alert

// Upload Image Preview
const uploadImage = document.querySelector("[upload-image]")
if(uploadImage) {
  const uploadImageInput = document.querySelector("[upload-image-input]")
  const uploadImagePreview = document.querySelector("[upload-image-preview]")
  uploadImageInput.addEventListener("change", (e) => {
    const file = e.target.files[0]
    if(file) {
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  })
}
// End Upload Image Preview

// Sort
const sort = document.querySelector("[sort]")
if(sort){
  let url = new URL(window.location.href);

  const sortSelect = sort.querySelector("[sort-select]");
  const sortClear = sort.querySelector("[sort-clear]");
  
  sortSelect.addEventListener("change", (e) => {
    const [sortKey, sortValue] = e.target.value.split('-');

    url.searchParams.set("sortKey", sortKey);
    url.searchParams.set("sortValue", sortValue);

    window.location.href = url;
  })

  //Xóa sort
  sortClear.addEventListener("click", (e) => {
    url.searchParams.delete("sortKey");
    url.searchParams.delete("sortValue");

    window.location.href = url;
  })

  const sortKey = url.searchParams.get("sortKey");
  const sortValue = url.searchParams.get("sortValue");
  if(sortKey && sortValue) {
    const valueSort = `${sortKey}-${sortValue}`;
    const selectedOption = sortSelect.querySelector(`option[value=${valueSort}]`);
    selectedOption.setAttribute("selected", true);
  }
}
// End Sort