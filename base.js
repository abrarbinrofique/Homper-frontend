const cus=localStorage.getItem('customer')
const userication=localStorage.getItem('user_id')
const token=localStorage.getItem('token')


if (!cus || !userication || !token)
{

  const landing=document.getElementById('landing')

   landing.innerHTML=
   `
     <img class="logingsiteimage" src="https://res.cloudinary.com/dk2vgd0dv/image/upload/v1723571231/sl9lyh9xlzrexguhcvcm.jpg" alt="">
      <div class="color-secondary justify-content-center align-items-center m-5">
      <h1 class="">Busy in your daily life?</h1>
         <h3>Homper is here for making your life easy.Lets start the journey with us</h3>
  
         <div class="row d-flex justiy-content-center">
       <a href="sign.html" class="text-center"><button  class="text-white logings">Signup</button></a>
       <a href="login.html" class="text-center"><button  class="text-white logingl">Already have an account?</button></a>
         </div>
  
      </div>
   
   
   `


   const formid=document.getElementById('formid')

   formid.innerHTML=`
     <a href="sign.html" class="logings text-white p-2"> signup</a>
    <a href="login.html" class="logingl text-dark p-2">Login</a>
   
   
   `


}


if (cus && userication && token)
  {
  

const ui=document.getElementById('profileid')

ui.innerHTML=


`
 <a class="nav-link dropdown-toggle text-white " href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                <i class="fas fa-user-circle"></i>
              </a>
              <ul id="profileid" class="dropdown-menu">
                <li><a class="dropdown-item " href="profile.html">Profile</a></li>
                <li><a class="dropdown-item " href="bookiingslip.html">cart List</a></li>
                <li>
                  <hr class="dropdown-divider">
                </li>
                <li><a class="dropdown-item" onclick="logoutuser()">Logout</a></li>
              </ul>
`

}
else{
  const ui=document.getElementById('profileid')

ui.innerHTML=
`

`

}








function logoutuser() {
  localStorage.removeItem('token');
  localStorage.removeItem('user_id');
  localStorage.removeItem('customer');
  
  
  window.location.href = 'login.html';  
}





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
        div.classList.add("carder")
        console.log(data)
        
        div.innerHTML = `
     <div class="postcard dark blue py-5 mr-5">
        <a class="postcard__img_link" href="servicedetail.html?dataid=${data.id}">
          <img class="postcard__img" src="https://res.cloudinary.com/dk2vgd0dv/${data.image}" alt="Image Title" />
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
          
             <button class="bg-success text-white mx-5"><i class="fas fa-tag"></i>${data.price}$</button>
           
           
          <button class="btn btn-info ml-5 mr-5">  <a target="_blank" href="servicedetail.html?dataid=${data.id}">Details </a></button>
            

          </ul>
        </div>
      </div>

    
                    `
        parent.appendChild(div)



    })


    async function getre(){
      let x= await fetch('https://homeper.onrender.com/service/review/')
      let data=await x.json()
      return data
  }
  
  



   let review=await getre()

   const paren = document.getElementById('slider2')

   review.forEach((rv) => {

       
       const li = document.createElement('li')

       console.log(rv)
       
       li.innerHTML = `
           
                <div class="card shadow reviewcards">
                  
                       <img src="https://res.cloudinary.com/dk2vgd0dv/image/upload/v1723575835/jo4v5d6z6fifogomogao.jpg" class="card-img-top" loading="lazy" alt="...">
                     
                    <div class="card-body d-flex flex-column flex-md-row">
                        <div class="flex-grow-1">
                            <strong>${rv.textreview}</strong>
                            <p>personal ratting:${rv.ratting}⭐</p>
                             <p class="card-text">${rv.customer}</p>
                        </div>
                         
                       
                     
                    </div>
                    
                    
                    
                </div>
           

   
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


async function makeUserAdmin(customerId) {
  const token = localStorage.getItem("token"); 

  fetch(`https://homeper.onrender.com/customer/makeadmin/${customerId}/`, {
      method: 'POST',
      headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
      }
  }) .then(response => response.json())

}



