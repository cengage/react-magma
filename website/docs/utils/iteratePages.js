let setValue = (pagePath, page, pages) => {
  if (pagePath.length > 1) {
    pages[pagePath[0]] = pages[pagePath[0]] || {};
    return setValue(pagePath.slice(1), page, pages[pagePath[0]]);
  } else {
    pages[pagePath[0]] = page;
    return pages;
  }
};

module.exports = pages =>
  pages.reduce((pages, page) => {
    const pagePath = page.fields.pagePath.split('/').slice(1);
    setValue(pagePath, page, pages);
    return pages;
  }, {});
