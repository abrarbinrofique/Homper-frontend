
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
      




async function serviceslip()
{

    const customer =  localStorage.getItem("customer");
    const customerid=JSON.parse(customer).id
    const x=await fetch(`https://homeper.onrender.com/serviceslot/?customer_id=${customerid}`)
    const data= await x.json()
    console.log(data)
   const parent=document.getElementById('tableslip')
   let i=0
   data.forEach(element => {
    const tr=document.createElement('tr')

     i=i+1   

    console.log(element)

    tr.innerHTML=`

    <tr>
    
    <td class="bg-primary text-center border border-2 text-white">${i}</td>
    <td class="bg-success text-center border border-2 text-white">${element.service}</td>
    <td class="bg-danger text-center border border-2 text-white">${element.chooce}</td>
    

    </tr>
    `
    parent.appendChild(tr)


        
    });
}

function logoutuser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('customer');
    
    
    window.location.href = 'login.html';  
  }
  



serviceslip()


}

else
{
    window.location.href = 'login.html'; 
}