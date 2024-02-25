const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns=document.querySelectorAll(".dropdown select");
const button=document.querySelector("form button")
const fromcurr=document.querySelector(".from select")
const tocurr=document.querySelector(".to select")
const msg=document.querySelector(".msg")
for(let select of dropdowns){
    for(code in countryList){
        let newoption=document.createElement("option");
        newoption.innerText=code;
        newoption.value=code;
        select.append(newoption)
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    })
}
const updateflag=(element)=>{
    let currcode=element.value;
    let countryCode=countryList[currcode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

const update=async()=>{
       
        let amount=document.querySelector(".amount input")
        let amtval=amount.value;
        const url = `${BASE_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
        let res=await fetch(url);
        let data=await res.json();
        let rate=data[tocurr.value.toLowerCase()]
        let finalAmount = amtval * rate;
  msg.innerText = `${amtval} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`;
        

        
}

button.addEventListener("click",(evt)=>{
    evt.preventDefault();
    update();
})
window.addEventListener("load", () => {
    updateExchangeRate();
  });