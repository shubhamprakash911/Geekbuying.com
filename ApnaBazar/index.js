
    let slideshow1 = document.getElementById("slideshow1")
    let slideshow2=  document.getElementById("slideshow2")
    let slideimg = document.createElement("img")
    let slideimg2=document.createElement("img")
    let realdata;
    let body=document.getElementById("mainBody")

    let images = ["https://img.gkbcdn.com/bn/2205/1500x2603-628f67f02b40c91f8ca376fa._p1_.jpg",
        "https://img.gkbcdn.com/bn/2205/1500x260-628f67db2b40c91f8ca376f8._p1_.jpg",
        "https://img.gkbcdn.com/bn/2205/1500x2602-628f67e92b40c91f8ca376f9._p1_.jpg"
    ]

    let images2 =[
        "https://m.media-amazon.com/images/G/31/img21/audio/NOISE/TWO/shopnow/Artboard_1_copy_3_1._CB605782644_.png",
        "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/G/31/img22/Wearables/Pebble-LP_Banner/1500x300._CB618793543_.jpg",
        "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/G/31/img22/Wearables/Muse_Banner/3-1500x300._CB618737529_.jpg"
    ]


    let i = 0;
    setInterval(() => {
        if (images.length === i) {
            i = 0
        }  
        slideimg.src = images[i];
        slideimg2.src= images2[i]
        slideshow2.append(slideimg2)
        slideshow1.append(slideimg)
        i++
    }, 3000)

    let LScart=JSON.parse(localStorage.getItem("cart"))||[];
    let products = document.getElementById("products")
    fetch("https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-tech-products")
        .then((responseobj) => {
            return responseobj.json()
        })
        .then((actualData) => {
            realdata = actualData.data
            displayproduct(actualData.data)
            searchProduct(actualData.data)
        })
        .catch((err) => {
            console.error(err)
        })

    function displayproduct(data) { 
        data.forEach((el) => {
            let card = document.createElement("div")

            let image = document.createElement("img")
            image.setAttribute("src", el.img)

            let brand = document.createElement("h3")
            brand.innerText = el.brand

            let price = document.createElement("h5")
            price.innerText = "₹ "+el.price

            let category = document.createElement("p")
            category.innerText = el.category

            let btn = document.createElement("button")
            btn.innerText = "Add To Cart"

            btn.addEventListener("click", () => {
                let flage = true;
                for (let i = 0; i < LScart.length; i++) {
                    if (LScart[i].id == el.id) {
                        flage = false;
                        break;
                    }
                }
                if (flage) {
                    LScart.push({ ...el, quantity: 1 })
                    localStorage.setItem("cart", JSON.stringify(LScart))
                    alert("Product Added To Cart")

                } else {
                    alert("Product Already in Cart")
                }

            })
             
            card.append(image, brand, price, category, btn)
            products.append(card)
        })
    }

    let searchbtn=document.getElementById("searchBtn")

    let searchinp=document.getElementById("searchInp")
    function searchProduct(data){
        searchbtn.addEventListener("click",()=>{
            body.innerHTML=null

            let filterdata=data.filter((e)=>{
                return e.brand==searchinp.value
            })
            displayfilterData(filterdata)
            
        })
    }

    function displayfilterData(filterdata){
        body.innerHTML=null;
        if(filterdata.length==0){
            let div=document.createElement("div")
            div.setAttribute("id","notFound")
            let h3=document.createElement("h3")
            h3.innerText="No Result Found, Please try other search."
            let img=document.createElement("img")
            img.setAttribute("src","https://www.reliancedigital.in/build/client/images/store_not_found.png")
            div.append(img,h3)
            body.append(div)
        }else{

            let searchItems=document.createElement("div")
            searchItems.setAttribute("id","searchItems")
            filterdata.forEach((el) => {
                let card = document.createElement("div")
    
                let image = document.createElement("img")
                image.setAttribute("src", el.img)
    
                let brand = document.createElement("h3")
                brand.innerText = el.brand
    
                let price = document.createElement("h5")
                price.innerText = "₹ "+el.price
    
                let category = document.createElement("p")
                category.innerText = el.category
    
                let btn = document.createElement("button")
                btn.innerText = "Add To Cart"
    
                btn.addEventListener("click", () => {
                    let flage = true;
                    for (let i = 0; i < LScart.length; i++) {
                        if (LScart[i].id == el.id) {
                            flage = false;
                            break;
                        }
                    }
                    if (flage) {
                        LScart.push({ ...el, quantity: 1 })
                        localStorage.setItem("cart", JSON.stringify(LScart))
                        alert("Product Added To Cart")
    
                    } else {
                        alert("Product Already in Cart")
                    }
    
                })
                 
                card.append(image, brand, price, category, btn)
                searchItems.append(card)
                body.append(searchItems)
            })

        }
    }

    let filterSelect=document.getElementById("filter")
    filterSelect.addEventListener("change",()=>{
        if(filterSelect.value===""){
            displayproduct(realdata)
        }else{
            let filterdata=realdata.filter((e)=>{
                return filterSelect.value===e.category
            })
            displayfilterData(filterdata)
        }
    })
   

