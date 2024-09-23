module.exports = (query) => {
  let filterStatus = [
    {
      name: "Tất cả",
      status: "",
      class: ""
    },
    {
      name: "Hoạt động",
      status: "InStock",
      class: ""
    },
    {
      name: "Dừng hoạt động",
      status: "LowStock",
      class: ""
    }
  ];
  if(query.availabilityStatus){
    const index = filterStatus.findIndex(item => item.status == query.availabilityStatus);
    filterStatus[index].class = "active";
  }
  else {
    const index = filterStatus.findIndex(item => item.status == "");
    filterStatus[index].class = "active";
  }
  return filterStatus;
}