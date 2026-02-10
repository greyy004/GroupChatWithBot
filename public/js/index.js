document.addEventListener("DOMContentLoaded", async ()=>
{
    const username = document.getElementById("username");
try {
    const response = await fetch('/user/dashboard/username', {
        method: "get",
        headers : { "content-type": "application/json"}, 
        credentials: "include" 
    })
    const data = await response.json();
    if(!response.ok)
    {
        alert("data failed to be retrieved from the database");
    }
    username.innerHTML=`
    <p>${data.firstname} ${data.lastname}</p>
    `
}catch(err)
{
    alert("error fetching routes from the database");
}
})