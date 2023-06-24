function openModal() {
  document.getElementById("addNewItemModal").style.display = "block";
}

function closeModal() {
  document.getElementById("addNewItemModal").style.display = "none";
}

function submitAddNewItemForm() {
  // 提交表单
  document.getElementById("add_new_Item").submit();
  // 关闭模态框
  closeModal();
}

function openOldItemModal() {
  document.getElementById("addOldItemModal").style.display = "block";
}

function closeOldItemModal() {
  document.getElementById("addOldItemModal").style.display = "none";
}

function submitAddOldItemForm() {
  // 提交表单
  document.getElementById("add_old_Item").submit();
  // 关闭模态框
  closeOldItemModal();
}