async function profile()
{  const customer =  localStorage.getItem("customer");
  const customerid=JSON.parse(customer).id

  const userinfo =  localStorage.getItem("user_id");
  // const userid=JSON.parse(customer).id

  console.log(customerid)
  const response = await fetch(`https://homeper.onrender.com/customer/${customerid}`);
  const data = await response.json();
  console.log(data);


    const  parent=document.getElementById('profilebox')
    const div=document.createElement('div')


    if (data.user==='admin')
        {
            const response = await fetch(`https://homeper.onrender.com/customer/userlist/`);
            const data = await response.json();
            console.log(data);
    const tr=document.createElement('tr')
    const parent=document.getElementById('tableslip')

    tr.innerHTML=

    `<tr>

        <td class="table-secondary  text-center">customer id</td>
        <td class="table-success text-center">Customer username</td>
        <td class="table-danger text-center">Add an Admin</td>
       
    </tr>
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
    <td class="bg-primary text-center border border-2 text-dark">${element.id}</td>
    <td class="bg-info text-center border border-2 text-dark">${element.first_name} ${element.last_name} </td>
    <td class="bg-warning text-center border border-2 "><button class="adminbutton ${buttoncolor}  text-dark m-4" onclick="makeUserAdmin(${element.id})">${ad}</button></td>
    `
    parent.append(tr)
    

   }});

          
        }
   else{

    const response = await fetch(`https://homeper.onrender.com/customer/userlist/`);
    const userdata = await response.json();

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
         <img class="dpimg" src="${data.dp}" alt="">
        
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
}

profile()





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

function logoutuser() {
  localStorage.removeItem('token');
  localStorage.removeItem('user_id');
  localStorage.removeItem('customer');
  
  
  window.location.href = 'login.html';  
}

