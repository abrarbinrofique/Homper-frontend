async function servicetails()
{
    const param=new URLSearchParams(window.location.search).get("dataid")

    console.log(param)

    let x=await fetch(`http://127.0.0.1:8000/service/list/${param}/`)

   

    let data=await x.json()
    console.log(data)
    const parent=document.getElementById("detailid")
    const div=document.createElement('div')
 
        div.innerHTML=`
        <div class="d-flex justify-content-center">
        <div class="col-lg-4 justify-content-center align-items-center mt--5 ">

        <image class="imager" src=${data.image}></image>
     
          </div>
     
          <div class="col-lg-4  align-items-center justify-content-center  bgdesc p-5 ">
     
           <h1 class="text-white text-center">${data.Name}</h1>
           <h5 class="text-white">${data.description}</h5>
           <button class="bg-success m-2 p-2 "><i class="fas fa-tag mr-2 "></i>${data.price}$</button>
           <button class="bg-success m-2 p-2 "><i class="fas fa-star mr-2 "></i>${data.average_rating}</button> 
            <button class="bg-waring m-2 p-2 "><i class="fas fa-bag mr-2 "></i>Take service</button>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Give Review
</button>
         </div>`
     
     
     
    
        

    parent.appendChild(div)

    return data

    













}


async  function handleReviewSubmit(event) {
    const  x= await servicetails()

        event.preventDefault();
        const service =x.id
        console.log(x.id)
        const rating = document.getElementById('ratting').value;
        const reviewText = document.getElementById('textreview').value;
        const customerId = localStorage.getItem('customer_id');

        const formData = {
            service: service,
            rating: rating,
            textreview: reviewText,
            customer: customerId
        };

        fetch('http://127.0.0.1:8000/service/review/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Review posted successfully:', data);
            
            alert('Review posted successfully!');
          
            reviewForm.reset();
        })
        .catch(error => {
            console.error('Error posting review:', error);
           
            alert('Error posting review. Please try again.');
        });
    };



servicetails()