const userinfo =  localStorage.getItem("user_id");
const  parent=document.getElementById('profilebox')
const div=document.createElement('div')
const customer =  localStorage.getItem("customer");
 const customerid=JSON.parse(customer).id
 async function profileuser()
 { 
   const response = await fetch(`https://homeper-backend.vercel.app/customer/userlist/`);
   const userdata = await response.json();


 const res = await fetch(`https://homeper-backend.vercel.app/customer/${customerid}/`);
 const data = await res.json();
console.log(data);
   console.log(userdata)
   console.log(userinfo)
          
   
  let k='first'
  let l='last'  
  let e='email'
  userdata.forEach(element => {
           console.log(element.id,userinfo)
   if(element.id===Number(userinfo))
     {
       k=element.first_name
       l=element.last_name
       e=element.email
     }
   })
   console.log(k,l)
 
   div.innerHTML=
   `
     <div  id="overlay">

        <div class="overlay">
     <div id="image" class="image">
       
     
       <div class="trick ">
        <img class="dpimg" src="https://res.cloudinary.com/dk2vgd0dv/${data.dp}" alt="">
       
       </div>
     </div>
    
     <ul class="text"></ul>
       <h2 class="text-center"> ${k} ${l}</h2>
      <div class="text-center">
        <div>
          <i class="fas fa-phone-alt fa-x"></i> ${data.phone}
      </div>
        <div>
         <i class="fa fa-envelope fa-x"></i> ${e}
       </div>
    
       <div>
     <div class=" justify-content-center align-items-center text-center">
   
     <div class="row row-cols-1 row-cols-md-3 g-4 justify-content-center align-items-center mb-5">
       <div class="col">
         <div class="card h-100">
  
           <div class="card-body">
             <h5 class="card-title">@${data.user}</h5>
             <p class="card-text">${data.bio}</p>
           </div>
           <div class="card-footer">
             <small class="text-muted">
             <div class="social-icons">
            
             
              
              <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
          <a href="${data.fb}" class="facebook"><i class="fab fa-facebook fa-x"></i></a>
       </button>
        <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
          <a href="${data.twitter}" class="twitter"><i class="fab fa-twitter fa-x"></i></a>
       </button>
        <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
        <a href="${data.ln}" class="linkedin"><i class="fab fa-linkedin-in fa-x"></i></a>
       </button>
             
              </div>
             </small>
           </div>
         </div>
       </div>
     </div>

   </div>
   <div class="'row d-flex justify-content-center">
     <a class="p-2 m-3 cb" href="bookiingslip.html">your cart</a> <a href="index.html" class="p-2 m-3 hb">back to Home</a>
   </div>
   </div>
 </div>
   `
   parent.append(div)

 }

 profileuser()
 async function usertable(){
  const response = await fetch(`https://homeper-backend.vercel.app/customer/userlist/`);
  const data = await response.json();
              console.log(data);
      const tr=document.createElement('tr')
      const parent=document.getElementById('tableslip')
      const parent2=document.getElementById('adminadd')
      const h3=document.createElement('h3')
  
      parent2.innerHTML=
      `
     <h2 class="justify-content-center bg-danger m-5 p-4"> Add a User as an Admin...</h2>
  
      `
     parent.append(h3)
      tr.innerHTML=
  
      `
  
          <td class="bg-primary text-center border border-2 text-dark p-3"><h3 class="bg-primary">customer id</h3></td>
          <td class="bg-info text-center border border-2 text-dark p-3"><h5 class="bg-info">Customer username</h5></td>
          <td class="bg-warning text-center border border-2 p-3"><h5 class="bg-warning">Add an Admin</h5></td>
         
      
     `
     parent.append(tr)
     
     data.forEach(element => {
  
      if(element.is_superuser!=true)
  
          
          {
  
     let ad='remove admin'     
     let buttoncolor='bg-danger'
     const tr=document.createElement('tr')
     if (element.is_staff!= true)
       {
      ad ='make admin';
      buttoncolor='bg-success'
  
     }
     
  
      tr.innerHTML=`
      <td class="bg-primary text-center border border-2 text-dark"><h3 class="bg-primary">${element.id}</h3></td>
      <td class="bg-info text-center border border-2 text-dark"><h5 class="bg-info">${element.first_name} ${element.last_name}</h5> </td>
      <td class="bg-warning text-center border border-2 "><button class="adminbutton ${buttoncolor}  text-white m-4" onclick="makeUserAdmin(${element.id})">${ad}</button></td>
      `
      parent.append(tr)
      
  
     }















 })}

async function profile()
{ 
 
 

  console.log(customerid)
  const response = await fetch(`https://homeper-backend.vercel.app/customer/${customerid}/`);
  const data = await response.json();
  console.log(data);


    







    const adresp = await fetch(`https://homeper-backend.vercel.app/customer/userlist/`);
    const userdata = await adresp .json();

    console.log(userdata)
    console.log(userinfo)
           
   userdata.forEach(element => {
            console.log(element.id,userinfo)
    if(element.id===Number(userinfo))
      {
        


    if (element.is_staff===true)
        {


const div=document.getElementById('serviceid')

div.innerHTML=
`
<div class="p-3 bg-success m-5"> <h3 class="text-white">Add a new Service...</h3></div>
<form class="serviceaddformer" id="registrationForm">
  <p id="error" class="error bg-danger text-white text-center"></p>
  <p id="success" class='bg-success text-white text-center'></p>

  


  
  <div class="serviceaddform form-outline mb-4">
      <input id="name" type="text" class="form-control" required placeholder="Service Name">
    
  </div>

  <!-- Confirm Password input -->
  <div class=" serviceaddform form-outline mb-4">
      <input id="price" type="number" class="form-control" required placeholder="price">
     
  </div>

  <!-- Additional fields -->
  <div class="serviceaddform form-outline mb-4">
      <input id="bio" type="text" class="form-control" placeholder="Description">
     
      
  </div>

  <div class=" serviceaddform form-outline mb-4">
      <input id="dp" type="file" class="form-control">
      
  </div>



  <!-- Submit button -->
  <button class=" serviceaddform btn btn-info" onclick="addservicebutton(event)"> <h5 class="text-white">Add Service</h5></button>

  <!-- Social login buttons -->
</form>

`


if (element.is_superuser===true)
  {
     usertable()
    
    }


 
  
   
     
    }}
   
   
  
  
  }

)}


profile()





async function makeUserAdmin(customerId) {
  const token = localStorage.getItem("token"); 

  fetch(`https://homeper-backend.vercel.app/customer/makeadmin/${customerId}/`, {
      method: 'POST',
      headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
      }
  }) .then(response => response.json())

}

function logoutuser() {
  localStorage.removeItem('token');
  localStorage.removeItem('user_id');
  localStorage.removeItem('customer');
  
  
  window.location.href = 'login.html';  
}


async function addservicebutton(event){
  event.preventDefault(); 
  alert('Button clicked!');
  
  const Name = document.getElementById('name').value;
  const Price = document.getElementById('price').value;
  const Description = document.getElementById('bio').value;
  const Image = document.getElementById('dp').files[0];
  const Token = localStorage.getItem('token');

  console.log(Name, Price, Description, Image);

  const formData = new FormData();
  formData.append('Name', Name);
  formData.append('price', Price);
  formData.append('description', Description);
  formData.append('image', Image);

  fetch("https://homeper-backend.vercel.app/service/list/", {
      method: "POST",
      headers: {
          "Authorization": `Bearer ${Token}`
      },
      body: formData
  })
  .then((res) => res.json())
  .then((data) => {
      console.log(data);
  })
  .catch((error) => {
      console.error("Error:", error);
  });
}
   