module.exports = function parsingQueryString(filterData) {
  if (filterData['productID']) {
    return {
      where: {
        productID: filterData.productID,
      },
      order: [['dateTime', 'DESC']]
    };
  }

  if(filterData.categoriesValue) {
    return {
      where: {
        categoriesValue: filterData.categoriesValue,
      },
    };   
  }

  return {};
};
