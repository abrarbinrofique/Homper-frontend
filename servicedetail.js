const cus=localStorage.getItem('customer')
const userication=localStorage.getItem('user_id')
const token=localStorage.getItem('token')
if (cus && userication && token)
    {



        function logoutuser() {
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
            localStorage.removeItem('customer');
            
            
            window.location.href = 'login.html';  
          }

let serviceId; 
async function servicetails() {
    const param = new URLSearchParams(window.location.search).get("dataid");
    console.log(param);

    let response = await fetch(`https://homeper.onrender.com/service/list/${param}/`);
    let data = await response.json();
    console.log(data);

    serviceId = data.Name; // Store the service ID
    const rvtxt=document.getElementById('rvtxt')
const h1=document.createElement('h1')

console.log(serviceId)
h1.innerHTML=
`
<h3 class="mx-5 p-3  rvtxtds">Our customer reviews about ${serviceId} </h3>
`
rvtxt.append(h1)

    const parent = document.getElementById("detailid");
    const div = document.createElement('div');
    div.classList.add('cardcenter')

    div.innerHTML = `
        <div class="postcard dark blue py-5 my-5  carder  col-lg-5">
        <a class="postcard__img_link" href="#">
          <img class="postcard__img" src="https://res.cloudinary.com/dk2vgd0dv/${data.image}" alt="Image Title" />
        </a>
        <div class="postcard__text">
          <h1 class="postcard__title blue m-3"><a href="#">${data.Name}</a></h1>
          <div class="postcard__subtitle small">
            <time datetime="2020-05-25 12:00:00">
              <h5 class="m-5">${data.average_rating}⭐</h5>
            </time>
          </div>
          <div class="postcard__bar"></div>
          <div class="postcard__preview-txt">${data.description}</div>
          <ul class="postcard__tagbox">
          
             <h6 class="bg-success m-2 p-2 "><i class="fas fa-tag mr-2"></i>${data.price}$</h6>
           
           
                 <button type="button" class="btn btn-warning m-2" data-bs-toggle="modal" data-bs-target="#example">
                    Take service
                </button>
                <button type="button" class="btn btn-primary m-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Give Review
                </button>
          </ul>
        </div>
      </div>

    `;

    parent.appendChild(div);

   
    document.getElementById('reviewForm').addEventListener('submit', submitReview);
    document.getElementById('BookForm').addEventListener('submit', bookservice);
}

servicetails(); 

async function submitReview(event) {
    event.preventDefault();
    
  


    const ratingElement = document.getElementById('ratting');
    const reviewTextElement = document.getElementById('textreview');
    const customer =  localStorage.getItem("customer");
    const customerid=JSON.parse(customer).id

    console.log(customerid)

    console.log(customerid,ratingElement, reviewTextElement )
    if (!ratingElement || !reviewTextElement || !customerid) {
        alert('Missing required fields or customer not logged in.');
        return;
    }

    const ratting = parseInt(ratingElement.value); 
    const reviewText = reviewTextElement.value;
    console.log(ratting,reviewText,serviceId)

    const formData = {
        customer: customerid,
        service: serviceId, 
        ratting: ratting,
        textreview: reviewText,
        
    };
    console.log(JSON.stringify(formData))
    try {
        const response = await fetch('https://homeper.onrender.com/service/review/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),

           
        });
        console.log(response)

        let data = await response.json();
        console.log('Review posted successfully:', data);
        alert('Review posted successfully!');
        document.getElementById('reviewForm').reset();
    } catch (error) {
        console.error('Error posting review:', error);
        alert('Error posting review. Please try again.');
    }
}




async function bookservice(event) {
    event.preventDefault();
    
  


    const timeElement = document.getElementById('time');
    const customer =  localStorage.getItem("customer");
    const customerid=JSON.parse(customer).id

    console.log(customerid,timeElement)
    if (!timeElement || !customerid) {
        alert('Missing required fields or customer not logged in.');
        return;
    }

    const time =timeElement.value;
    console.log(time,serviceId)

    const formData = {
      
    service: serviceId,
    chooce: time,
    customer: customerid
        
    };
    console.log(JSON.stringify(formData))
    try {
        const response = await fetch('https://homeper.onrender.com/serviceslot/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),

           
        });
        console.log(response)

        let data = await response.json();
        console.log('Service Booked successfully:', data);
        alert('Service Booked successfully!');
        document.getElementById('BookForm').reset();
    } catch (error) {
        console.error('Error posting review:', error);
        alert('Error posting review. Please try again.');
    }
}


async function productreview()
{
    const param = new URLSearchParams(window.location.search).get("dataid");
    console.log(param);

    let response = await fetch(`https://homeper.onrender.com/service/review/?service_id=${param}`);
    let data = await response.json();
    console.log(data);

   
}


async function getre(){

    const param = new URLSearchParams(window.location.search).get("dataid");
    console.log(param);
    let response = await fetch(`https://homeper.onrender.com/service/review/?service_id=${param}`);
    let data = await response.json();
    console.log(data);
    

 const paren = document.getElementById('slider2')

 data.forEach((rv) => {

     
     const li = document.createElement('li')

     console.log(rv)

     let customerid=rv.customer
     console.log(customerid)
     rvname(customerid)
    
 
 
 
 
 
 
     async function rvname(customerid){
       const res =await  fetch(`https://homeper.onrender.com/customer/${customerid}`);
         const data =await  res.json();
     
        
       let  name= data.user
     
     li.innerHTML = `
          
              <div class="card shadow reviewcards mx-5">
                  
                       <img src="https://res.cloudinary.com/dk2vgd0dv/image/upload/v1723575835/jo4v5d6z6fifogomogao.jpg" class="card-img-top" loading="lazy" alt="...">
                     
                    <div class="card-body d-flex flex-column flex-md-row">
                        <div class="flex-grow-1">
                            <strong>${rv.textreview}</strong>
                            <p>personal ratting:${rv.ratting}⭐</p>
                             <p class="card-text">${name}</p>
                        </div>
                         
                       
                     
                    </div>
                    
                    
                    
                </div>
          

 
                 `
     paren.appendChild(li)

     }

 })

 


}

getre()
function logoutuser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('customer');
    
    
    window.location.href = 'login.html';  
  }
  
 }

else
{
    window.location.href = 'login.html'

}