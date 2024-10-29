
const cus=localStorage.getItem('customer')
const userication=localStorage.getItem('user_id')
const token=localStorage.getItem('token')


if (cus || userication || token)
{

    function logoutuser() {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('customer');
        
        
        window.location.href = 'login.html';  
      }
      

function payying(i)
{
   console.log(i)
   document.getElementById('servevalue').value=i
   const mod=new bootstrap.Modal(document.getElementById('exampleModal'))
   mod.show()

}



function delivery(ig)
{
    console.log(ig)
    document.getElementById('serveva').value=ig
    const mod=new bootstrap.Modal(document.getElementById('exampleModa'))
    mod.show()
}

async function serviceslip()
{

    const customer =  localStorage.getItem("customer");
    const customerid=JSON.parse(customer).id
    const x=await fetch(`https://homeper-backend.vercel.app/serviceslot/book/?customer_id=${customerid}`)
    const data= await x.json()
    console.log(data)
   const parent=document.getElementById('tableslip')
   let i=0
   data.forEach(element => {
    const tr=document.createElement('tr')
   
    

    console.log(element)
    if(element.service_status==='pending')
    {
        tr.innerHTML=`

        <tr>
        
      
        <td class="p-2 m-2 bg text-center border border-2 text-white">${element.service}</td>
        <td class="p-2 m-2 bg text-center border border-2 text-white">${element.chooce}</td>
         <td class="p-2 m-2 bg text-center border border-2"> 
         
         <button data-bs-toggle="dropdown" aria-expanded="false" class="btn  ${
            element.service_status==='paid'?'btn-success bg-success text-white' :
            element.service_status==='pending'?' btn-danger bg-danger':
            element.service_status==='Cash on delivery'?' btn-warning bg-warning':''}">
           
           
        
        ${element.service_status}
          ${element.service_status==='paid'?'<i class="fa fa-cart-arrow-down" style="font-size:20px;color:black;background: none;"></i>':
            element.service_status==='pending'?'<i style="font-size:24px" class="far">&#xf150;</i>':
            element.service_status==='Cash on delivery'?'<i style="font-size:24px" class="fas">&#xf63b;</i>': ''}  
         
           ${element.service_status==='pending'?`
     <ul class="dropdown-menu bg">
        <li  class="p-3 dropdown-item bg" onclick="event.preventDefault(); payying(${element.id})">Pay Now</li>
        <li class="dropdown-item bg" onclick="event.preventDefault(); delivery(${element.id})">Cash on Delivery</a></li>
      </ul>
            
            `: ''}
    
         </button>
    
    
         
         </td>
    
        </tr>
        `
        parent.appendChild(tr)
    }

   


        
    });
}





async function orderhistory()
{

    const customer =  localStorage.getItem("customer");
    const customerid=JSON.parse(customer).id
    const x=await fetch(`https://homeper-backend.vercel.app/serviceslot/book/?customer_id=${customerid}`)
    const data= await x.json()
    console.log(data)
   const parent=document.getElementById('tablular')

   data.forEach(element => {
    const tr=document.createElement('tr')
   
 

    console.log(element)

    if(element.service_status!=='pending')
    {
        tr.innerHTML=`

    <tr>
    <td class="p-2 m-2 bg text-center border border-2 text-white">${element.service}</td>
    <td class="p-2 m-2 bg text-center border border-2 text-white">${element.chooce}</td>
     <td class="p-2 m-2 bg text-center border border-2"> 
     
     <button data-bs-toggle="dropdown" aria-expanded="false" class="btn  ${
        element.service_status==='paid'?'btn-success bg-success text-white' :
        element.service_status==='pending'?' btn-danger bg-danger':
        element.service_status==='Cash on delivery'?' btn-warning bg-warning':''}">
       
       
    
    ${element.service_status}
      ${element.service_status==='paid'?'<i class="fa fa-cart-arrow-down" style="font-size:20px;color:black;background: none;"></i>':
        element.service_status==='pending'?'<i style="font-size:24px" class="far">&#xf150;</i>':
        element.service_status==='Cash on delivery'?'<i style="font-size:24px" class="fas">&#xf63b;</i>': ''}  
     
       ${element.service_status==='pending'?`
 <ul class="dropdown-menu bg">
    <li  class="p-3 dropdown-item bg" onclick="event.preventDefault(); payying(${element.id})">Pay Now</li>
    <li class="dropdown-item bg" onclick="event.preventDefault(); delivery(${element.id})">Cash on Delivery</a></li>
  </ul>
        
        `: ''}

     </button>


     
     </td>

    </tr>
    `
    parent.appendChild(tr)


        
   
    }
});

  
}




function logoutuser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('customer');
    
    
    window.location.href = 'login.html';  
  }
  



serviceslip()

orderhistory()




document.getElementById('exampleModal').addEventListener('submit',submitpayment)


async function submitpayment(event)
{
    console.log("submitpayment function called");
    event.preventDefault();

    const name=document.getElementById('customerName').value
    const email=document.getElementById('customerEmail').value
    const phone=document.getElementById('phones').value
    const address=document.getElementById('addr').value
    const amount=document.getElementById('amm').value
    const serviceid=document.getElementById('servevalue').value

    console.log(name,email,phone,address,amount,serviceid)
    
    const f={

    name: name,
    email: email,
    phone: phone,
    address:  address,
    payment_amount:amount
        
       
     
    }

    console.log(JSON.stringify(f))
    try{
        const res=await fetch(`https://homeper-backend.vercel.app/serviceslot/purchase/${serviceid}/post/`,{

            method:'POST',
            headers:{
                'Content-Type':'application/json',

            },
            body:JSON.stringify(f),
        })
        console.log(res)
        if (res.ok) {
            const d = await res.json();
            console.log(d);
            console.log(d.order);
            console.log(d.payment_url);
            alert("We're here for your home! Let us handle the hard work while you relax.");

          
            if (d.payment_url) {

                window.location.href = d.payment_url;  // Redirect if payment_url is valid
            } else {
                console.error("payment_url is undefined.");
                alert("Payment URL not found. Please try again later.");
            }
           
          
                
         
        }
        else
        {
            alert('There was an issue with your request. Please try again.');
        }

    }catch (error) {
        console.error('Error posting info:', error);
        alert('Please try again.');

    

}


}






document.getElementById('exampleModa').addEventListener('submit',cashdelivery)


async function cashdelivery(event)
{
    console.log("submitpayment function called");
    event.preventDefault();

    const name=document.getElementById('customerNam').value
    const email=document.getElementById('customerEmai').value
    const phone=document.getElementById('phone').value
    const address=document.getElementById('add').value
    const amount=document.getElementById('am').value
    const serviceid=document.getElementById('serveva').value

    console.log(name,email,phone,address,amount,serviceid)
    
    const f={

    name: name,
    email: email,
    phone: phone,
    address:  address,
    payment_amount:amount
        
       
     
    }

    console.log(JSON.stringify(f))
    try{
        const res=await fetch(`https://homeper-backend.vercel.app/serviceslot/purchase/${serviceid}/post/`,{

            method:'POST',
            headers:{
                'Content-Type':'application/json',

            },
            body:JSON.stringify(f),
        })
        console.log(res)
        if (res.ok) {
          
            alert("Our service is at your doorstep, ready to make your home shine!");

          
            window.location.href=`https://homeper-backend.vercel.app/serviceslot/purchase/${serviceid}/cod/`
          
                
         
        }
        else
        {
            alert('There was an issue with your request. Please try again.');
        }

    }catch (error) {
        console.error('Error posting info:', error);
        alert('Please try again.');

    

}


}






}

else
{
    window.location.href = 'login.html'; 
}