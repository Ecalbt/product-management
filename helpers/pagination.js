module.exports = (countProducts, query, objectPagination) => {
  if(query.page) 
    objectPagination.currentPage = parseInt(query.page);

  objectPagination.skip = (objectPagination.currentPage-1)*objectPagination.limitItems;
  
  objectPagination.totalPage = Math.ceil(countProducts/objectPagination.limitItems);

  return objectPagination;
}