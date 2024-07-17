// PAGE-SPECIFIC SCRAPER
async function getData(){
  const colorContainer = document.querySelector('div[data-automation="pdp-colour-container-desktop"]')
  // console.log("colorContainer", colorContainer);
  let colors = []
  if(colorContainer){
    colorBoxes = colorContainer.querySelectorAll('a')
    for (const colorBox of colorBoxes) {
      colors = [...colors, colorBox.getAttribute("value")]
    }
  }
  else{
    const colorIfExists = document.querySelector('span[data-automation="pdp-colour-display-value"]')
    if(colorIfExists)
      colors = [colorIfExists.innerHTML]
  }

  const sizeContainers = document.querySelectorAll('input[name="size"]:not([disabled]')
  const sizeContainersArray = [...sizeContainers]
  let sizes = []
  for (const sizeContainer of sizeContainersArray) {
    sizes = [...sizes, sizeContainer.getAttribute("value")]
  }

  if(colors.length > 0 || sizes.length > 0){
    for (const color of colors) {
      for (const size of sizes) {

        const productNameArray = document.querySelector('span[data-automation="product-title"]').innerHTML.split(" ")
        productNameArray[productNameArray.length-1] = color

        const product = {
          productName: colors.length > 0 ? productNameArray.join(" ") : document.querySelector('span[data-automation="product-title"]').innerHTML,
          product_id: document.querySelector('p[data-automation="product-part-number"]').querySelector('span').innerHTML,
          category: document.querySelector('a[data-automation="breadcrumb-level-1"]').innerHTML,
          subcategory: document.querySelector('a[data-automation="breadcrumb-level-2"]') ? document.querySelector('a[data-automation="breadcrumb-level-2"]').innerHTML : null,
          brand: document.querySelector('span[data-automation="product-brand-name"]').innerHTML.replace('&amp;', '&'),
          size: size ? size : null,
          color: color ? color : null,
          product_image_1: document.querySelector('a[data-automation="product-list-img-0"]') ? document.querySelector('a[data-automation="product-list-img-0"]').innerHTML : null,
          product_image_2: document.querySelector('a[data-automation="product-list-img-1"]') ? document.querySelector('a[data-automation="product-list-img-1"]').innerHTML : null,
          product_image_3: document.querySelector('a[data-automation="product-list-img-2"]') ? document.querySelector('a[data-automation="product-list-img-2"]').innerHTML : null,
          product_image_4: document.querySelector('a[data-automation="product-list-img-3"]') ? document.querySelector('a[data-automation="product-list-img-3"]').innerHTML : null,
          product_image_5: document.querySelector('a[data-automation="product-list-img-4"]') ? document.querySelector('a[data-automation="product-list-img-4"]').innerHTML : null,
          product_image_6: document.querySelector('a[data-automation="product-list-img-5"]') ? document.querySelector('a[data-automation="product-list-img-5"]').innerHTML : null,
          product_image_7: document.querySelector('a[data-automation="product-list-img-6"]') ? document.querySelector('a[data-automation="product-list-img-6"]').innerHTML : null,
          discountedPrice: document.querySelector('h3[data-automation="product-price-now"]') ? document.querySelector('h3[data-automation="product-price-now"]').innerHTML : null,
          price: document.querySelector('h3[data-automation="product-price-was"]').innerHTML,
          rating: document.querySelector('div[itemprop="ratingValue"]').innerHTML,
        }

        console.log(product); // REPLACE console.log WITH AXIOS/FETCH CALL
      }
    }
  }
  else{
    const product = {
      productName: document.querySelector('span[data-automation="product-title"]').innerHTML,
      product_id: document.querySelector('p[data-automation="product-part-number"]').querySelector('span').innerHTML,
      category: document.querySelector('a[data-automation="breadcrumb-level-1"]').innerHTML,
      subcategory: document.querySelector('a[data-automation="breadcrumb-level-2"]') ? document.querySelector('a[data-automation="breadcrumb-level-2"]').innerHTML : null,
      brand: document.querySelector('span[data-automation="product-brand-name"]').innerHTML.replace('&amp;', '&'),
      size: null,
      color: null,
      product_image_1: document.querySelector('a[data-automation="product-list-img-0"]') ? document.querySelector('a[data-automation="product-list-img-0"]').innerHTML : null,
      product_image_2: document.querySelector('a[data-automation="product-list-img-1"]') ? document.querySelector('a[data-automation="product-list-img-1"]').innerHTML : null,
      product_image_3: document.querySelector('a[data-automation="product-list-img-2"]') ? document.querySelector('a[data-automation="product-list-img-2"]').innerHTML : null,
      product_image_4: document.querySelector('a[data-automation="product-list-img-3"]') ? document.querySelector('a[data-automation="product-list-img-3"]').innerHTML : null,
      product_image_5: document.querySelector('a[data-automation="product-list-img-4"]') ? document.querySelector('a[data-automation="product-list-img-4"]').innerHTML : null,
      product_image_6: document.querySelector('a[data-automation="product-list-img-5"]') ? document.querySelector('a[data-automation="product-list-img-5"]').innerHTML : null,
      product_image_7: document.querySelector('a[data-automation="product-list-img-6"]') ? document.querySelector('a[data-automation="product-list-img-6"]').innerHTML : null,
      discountedPrice: document.querySelector('h3[data-automation="product-price-now"]') ? document.querySelector('h3[data-automation="product-price-now"]').innerHTML : null,
      price: document.querySelector('h3[data-automation="product-price-was"]').innerHTML,
      rating: document.querySelector('div[itemprop="ratingValue"]').innerHTML,
    }

    console.log(product); // REPLACE console.log WITH AXIOS/FETCH CALL
  }
}

getData()

// SITE-WIDE SCRAPER
// var url = "https://www.myer.com.au"

// async function getNavBarData(url){
//   const res = await fetch(url)
//   const text = await res.text()
//   const doc = new DOMParser().parseFromString(text, "text/html")
//   // console.log("doc", doc)
//   const navListItems = doc.querySelectorAll('ul>li:nth-child(1)')
//   // console.log("navListItems", navListItems)
//   const navListItemsArray = [...navListItems]; // converts NodeList to Array
//   // console.log('navListItemsArray', typeof(navListItemsArray), navListItemsArray)

//   for (const navListItem of navListItemsArray) {
//     let pageNum = 1
//     let category = navListItem.querySelector("span").innerHTML
//     let link = navListItem.querySelector('a').getAttribute("href")
//     if(!category.startsWith("All ")){
//       // console.log('inside while loop', pageNum, category, navListItem, link)
//       if(link.length){
//         while(true){
//           const res = await fetch(url+link+"?pageNumber="+pageNum)
//           pageNum = pageNum + 1
//           const text = await res.text()
//           const doc = new DOMParser().parseFromString(text, "text/html")
//           // console.log(doc);

//           const productList = doc.querySelectorAll('a[data-automation="product-detail-link"]')
//           const productListArray = [...productList]
//           // console.log("fullUrl", url+link+"?pageNumber="+(pageNum-1), "productList", productList)
//           if(productListArray.length === 0 || link === '/c/offers'){
//             break
//           }

//           for (const productListItem of productListArray) {
//             const productLink = productListItem.getAttribute("href")
//             const res = await fetch(url+productLink)
//             const text = await res.text()
//             const doc = new DOMParser().parseFromString(text, "text/html")

//             const colorContainer = doc.querySelector('div[data-automation="pdp-colour-container-desktop"]')
//             // console.log("colorContainer", colorContainer);
//             let colors = []
//             if(colorContainer){
//               colorBoxes = colorContainer.querySelectorAll('a')
//               for (const colorBox of colorBoxes) {
//                 colors = [...colors, colorBox.getAttribute("value")]
//               }
//             }
//             else{
//               const colorIfExists = doc.querySelector('span[data-automation="pdp-colour-display-value"]')
//               if(colorIfExists)
//                 colors = [colorIfExists.innerHTML]

//               // console.log('colors value', doc.querySelector('span[data-automation="pdp-colour-display-value"]'), productListItem);
//             }
//             // console.log("colors", colors)

//             const sizeContainers = doc.querySelectorAll('input[name="size"]:not([disabled]')
//             const sizeContainersArray = [...sizeContainers]
//             let sizes = []
//             for (const sizeContainer of sizeContainersArray) {
//               sizes = [...sizes, sizeContainer.getAttribute("value")]
//             }

//             if(colors.length > 0 || sizes.length > 0){
//               for (const color of colors) {
//                 for (const size of sizes) {
//                   const res = await fetch(url+productLink+"?colour="+color+"&size="+size)
//                   const text = await res.text()
//                   const doc = new DOMParser().parseFromString(text, "text/html")

//                   const priceSelector = doc.querySelector('[data-automation="product-price-was"]')
//                   console.log(priceSelector, productLink)

//                   const product = {
//                     productName: doc.querySelector('span[data-automation="product-title"]').innerHTML,
//                     product_id: doc.querySelector('p[data-automation="product-part-number"]').querySelector('span').innerHTML,
//                     brand: doc.querySelector('a[data-automation="product-brand"]').innerHTML,
//                     size: size ? size : null,
//                     color: color ? color : null,
//                     // discountedPrice: doc.querySelector('h3[data-automation="product-price-now"]').innerHTML,
//                     // price: doc.querySelector('h3[data-automation="product-price-was"]').innerHTML,
//                     // rating: doc.querySelector('div[itemprop="ratingValue"]').innerHTML,
//                   }
    
//                   console.log(product);
//                 }
//               }
//             }
//             else{
//               const res = await fetch(url+productLink)
//               const text = await res.text()
//               const doc = new DOMParser().parseFromString(text, "text/html")

//               const priceSelector = doc.querySelector('[data-automation="product-price-was"]')
//               console.log(priceSelector, productLink)

//               const product = {
//                 productName: doc.querySelector('span[data-automation="product-title"]').innerHTML,
//                 product_id: doc.querySelector('p[data-automation="product-part-number"]').querySelector('span').innerHTML,
//                 brand: doc.querySelector('a[data-automation="product-brand"]').innerHTML,
//                 size: null,
//                 color: null,
//                 // discountedPrice: doc.querySelector('h3[data-automation="product-price-now"]').innerHTML,
//                 // price: doc.querySelector('h3[data-automation="product-price-was"]').innerHTML,
//                 // rating: doc.querySelector('div[itemprop="ratingValue"]').innerHTML,
//               }

//               console.log(product);
//             }
//             // console.log("sizes", sizes);
//             // console.log("productListItem", productListItem);
//           }
//         }
//         // throw new Error("Something went badly wrong!");
//       }
//     }
//   }
// }

// getNavBarData(url)