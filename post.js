setUI();
  function setUI(){
 var login=document.getElementById("div-login");
 var logout=document.getElementById("div-logout");
 const token=localStorage.getItem("token");


 if(token==null)
 {
login.style.setProperty("display","flex","important");
logout.style.setProperty("display","none","important");

 }
 else{

  logout.style.setProperty("display","flex","important");
  login.style.setProperty("display","none","important");


 }

 let theusename=getcurrentuser();
document.getElementById("username-prophile").innerHTML=theusename.username;
document.getElementById("photo_profile").src=theusename.profile_image;

  }

  //================================================================================================
  function getcurrentuser()
{
   let user ="";
  const currenuser=localStorage.getItem("user");
  if(currenuser!=null){
    user=JSON.parse(currenuser);
    console.log(user);
  }


return user;


}
//==============================================
document.getElementById("login").addEventListener("click", function(){


    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    axios.post('https://tarmeezacademy.com/api/v1/login', {
      
        "username" : username,
        "password" : password,
    })
    .then(function (response) {
      console.log(response.data);
   
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setUI(); 
//to hide modal
  //  const modal=  document.getElementById("loginmodal");
  //  const modelinstans=bootstrap.Modal.getInstance(modal);
  //    modelinstans.hide();
//
$('#loginmodal').modal('hide');//the zweite 
showalarm("You have successfully logged in");

    })
    .catch(function (error) {
        alert(error.message);
      console.log(error);
    });
    



  });

  //=======================
  
//=======================================================================

document.getElementById("logout").addEventListener("click",function()
{

  localStorage.removeItem("token");
  localStorage.removeItem("user");
  //window.location.href="index.html";
  setUI();
  showalarm("sucessfully loged out","danger");
});





//========================================================================

function showalarm(masseage,type="success")
{

  const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
  const appendAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('')
  
    alertPlaceholder.append(wrapper)
  }
  
  appendAlert(masseage, type)

}



//========================================================================
function register(){

    var usename = document.getElementById("register-username").value;
    var name = document.getElementById("register-name").value;
   var password = document.getElementById("register-password").value;
    var email = document.getElementById("register-email").value;
    var image_prphile=document.getElementById("register-photo").files[0];
   
    let parm=new FormData();
    parm.append("username",usename);
    parm.append("name",name);
    parm.append("password",password);
    parm.append("email",email);
    parm.append("image",image_prphile);
   
   
   var baseurl="https://tarmeezacademy.com/api/v1";
   var path="/register";
   var url=baseurl+path;
   
   let header={
   
     
       'Content-Type': 'multipart/form-data',
     };
   
   
   
   
     axios.post(url,parm )
     .then(function (response) {
       showalarm("registered successfully");
       localStorage.setItem("token",response.data.token);
       $('#Registermodal').modal('hide');
       setUI();
   
     })
     .catch(function (error) {
       $('#Registermodal').modal('hide');
       showalarm(error.response.data.message,type="danger");
     });
   
   
   }
   
   
   //================================================================
   const urlparm=new URLSearchParams(window.location.search);
  const id= urlparm.get("postid");
  console.log("id");
console.log(id);
 //======================================


 getposts(id);
 function getposts(postid)
{
  
  axios.get('https://tarmeezacademy.com/api/v1/posts/'+id)

  .then(function (response) {
    // handle success
  const post=response.data.data;
   const comments=post.comments;
   const   author=post.author;
   const body=post.body;
 
   const imge_comment=author.profile_image;
  console.log("response.data.data down");
  console.log(post);
  console.log("response.data.data upper");
  console.log(comments);
  console.log(author);
  console.log(body);
  console.log(imge_comment);
//=========================================

    document.getElementById("comments").innerHTML="";
   
    posttitle=document.getElementById("posttitle");
    posttitle.innerHTML=author.username;
    if(post.title!=null)
    {
      posttitle=document.getElementById("posttitle");
      posttitle.innerHTML=author.username;
    }
    let commentsconntet="";
    for(comment of comments){
    
      commentsconntet += `
      <div id="comment" class="col-9 rounded-5 p-3 m-3 " style="background-color: rgba(231, 225, 225, 0.3); ">
      <div > 
     <img id="comment-image" class="rounded-circle" src="${comment.author.profile_image}" style="width: 40px; height: 40px;">
     <b>${comment.author.username} </b>
     </div>
     <div id="comment-body" class="">
    ${comment.body}</div>
    </div>
      `};


      //=====================
var html = `  <div id="post" class="card my-5 shadow p-3 "" >
    <div class="card-header">
    <img class="rounded-circle border border-2" src="${author.profile_image}" style="width: 40px;height: 40px;"/>
    <b> ${author.username}</b>
    </div>

    <div class="card-body">
        <img class="w-100" alt="maessangerphoto" src="${post.image}">
        <p style="color: gray;">${post.created_at}
        </p>
      <h5 class="card-title"> ${ post.title!=null ? post.title :" titel" }</h5>
      <p class="card-text">${post.body}</p>
      <hr>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
      </svg>
      <span> (${post.comments_count}) comments
      
      <span id="post-tag-${post.id}">
      <button  class="border border-light btn-outline-secondary rounded-5"> police </button>
     
    </span>
      
      </span>
      </div>


      <div id="comments" class="justify-content-center d-flex row">


      
      ${commentsconntet}
  



  </div>

  <div class="container">
  <div class="d-flex justify-content-center"> 
      <input id="input-comment" class="w-80 rounded form-control" type="text" placeholder="add your comment">
     
      <button onclick="creatcomment()" class="btn btn-outline-primary rounded-3">send</button>
  </div>
</div>




  </div>`;



    document.getElementById("posts").innerHTML=html;





  //=========================================








  })
  .catch(function (error) {
   alert(error.message);
    console.log(error);
  })


}


//===============================

function creatcomment(){

let commentbody=document.getElementById("input-comment").value;

let url=`https://tarmeezacademy.com/api/v1/posts/${id}/comments`;
parm={"body": commentbody}
token=localStorage.getItem("token");
const bearerToken = 'Bearer ' + token;
 
  const headers = {
    'Authorization': bearerToken,
 
  };


axios.post(url,parm,{headers} )
.then(function (response) {
  console.log(response);
  document.getElementById("input-comment").value="";
  showalarm("Comment have been added successfully","sucess");
  getposts(id);
})
.catch(function (error) {
  console.log(error.response.data);
  console.log(error.response.data.errors);

  console.log(error.response.data.message);
  showalarm(error.response.data.message,type="danger");
  
});

}