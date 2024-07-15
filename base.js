async function getservice() {
    let x = await fetch('https://homeper.onrender.com/service/list/')
    let data = await x.json()
    return data
}

async function getre(){
    let x= await fetch('https://homeper.onrender.com/service/review/')
    let data=await x.json()
    return data
}



async function loadservice() {
    let datas = await  getservice()
    const parent = document.getElementById('service')

    datas.forEach((data) => {

        
        const div = document.createElement('div')

        console.log(data)
        
        div.innerHTML = `
     <div class="postcard dark blue py-5 my-5  carder">
        <a class="postcard__img_link" href="#">
          <img class="postcard__img" src=${data.image} alt="Image Title" />
        </a>
        <div class="postcard__text">
          <h1 class="postcard__title blue"><a href="#">${data.Name}</a></h1>
          <div class="postcard__subtitle small">
            <time datetime="2020-05-25 12:00:00">
              <h5 class="mr-2">${data.average_rating}⭐</h5>
            </time>
          </div>
          <div class="postcard__bar"></div>
          <div class="postcard__preview-txt">${data.description.slice(0,80)}</div>
          <ul class="postcard__tagbox">
          
             <h6 class="bg-success m-2 p-2 "><i class="fas fa-tag mr-2"></i>${data.price}$</h6>
           
           <h6 class="bg-success m-2 p-2 ">Boooking</h6>
            <a target="_blank" href="servicedetail.html?dataid=${data.id}" class="btn btn-dark">Details </a>
            

          </ul>
        </div>
      </div>

    
                    `
        parent.appendChild(div)



    })


   let review=await getre()

   const paren = document.getElementById('slider2')

   review.forEach((rv) => {

       
       const li = document.createElement('li')

       console.log(rv)
       
       li.innerHTML = `
            <li>
                <div class="card shadow h-100">
                    <div class="ratio ratio-1x1">
                       <img src="/image/re.jpg" class="card-img-top" loading="lazy" alt="...">
                    </div>
                    <div class="card-body d-flex flex-column flex-md-row">
                        <div class="flex-grow-1">
                            <strong>${rv.textreview}</strong>
                            <p class="card-text">${rv.customer}</p>
                        </div>
                        <div class="px-md-2">personal ratting:${rv.ratting}⭐</div>
                    </div>
                </div>
            </li>

   
                   `
       paren.appendChild(li)



   })

   


}

loadservice()


document.addEventListener("DOMContentLoaded", () => {
  const customerForm = document.getElementById("customerForm");
  const responseMessage = document.getElementById("responseMessage");

  customerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");

    if (!token || !userId) {
      responseMessage.textContent = "User is not authenticated.";
      return;
    }

    const formData = new FormData(customerForm);
    formData.append("user", userId);

    try {
      const response = await fetch("https://homeper.onrender.com/customer/", {
        method: "POST",
        headers: {
          "Authorization": `Token ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        responseMessage.textContent = "Customer information submitted successfully!";
      } else {
        responseMessage.textContent = `Error: ${data.detail || "Something went wrong."}`;
      }
    } catch (error) {
      responseMessage.textContent = `Error: ${error.message}`;
    }
  });
});



// AOS.init();

