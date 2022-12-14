
    let slideshow1 = document.getElementById("slideshow1")
    let slideshow2=  document.getElementById("slideshow2")
    let slideimg = document.createElement("img")
    let slideimg2=document.createElement("img")

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

    let products = document.getElementById("products")
    fetch("https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-tech-products")
        .then((responseobj) => {
            return responseobj.json()
        })
        .then((actualData) => {
            realdata = actualData.data
            displayproduct(actualData.data)

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
            price.innerText = el.price

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

