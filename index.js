let totalprice=0
let itemarray=[]
let pricearray=[]

function displayprice(price){
    let p=document.getElementById('totalprice')
    p.innerHTML=`Totalprice: ${price}`

}

function additemtoDOM(item,price){
    itemarray.push(item)
    pricearray.push(price)
    let list=document.getElementById('expenseList')
    let listitem=document.createElement('li')
    listitem.innerHTML=`${item}: ${price}`
    listitem.classList.add('expense-item')
    list.appendChild(listitem)

    totalprice=totalprice+price
    displayprice(totalprice)

    //local storage
    localStorage.setItem('items',JSON.stringify(itemarray))
    localStorage.setItem('prices',JSON.stringify(pricearray))

    let deletebutton=document.createElement('button')
    listitem.appendChild(deletebutton)
    deletebutton.innerHTML=`Remove item`
    deletebutton.addEventListener('click',()=>{
        let parent=deletebutton.parentElement
        parent.remove()
        let index=itemarray.indexOf(item)
        if(index!=-1){
            itemarray.splice(index,1)
            pricearray.splice(index,1)
        }

        totalprice=totalprice-price
        displayprice(totalprice)

        localStorage.setItem('items',JSON.stringify(itemarray))
        localStorage.setItem('prices',JSON.stringify(pricearray))
        
    })
}

document.addEventListener('DOMContentLoaded',()=>{
    //upload from local storage
    let saveditems=JSON.parse(localStorage.getItem('items'))||[]
    let savedprices=JSON.parse(localStorage.getItem('prices'))||[]
    for(let i=0;i<saveditems.length;i++){
        additemtoDOM(saveditems[i],savedprices[i])
    }
    let button=document.getElementById('additem')
    button.addEventListener('click',()=>{
        let item=document.getElementById('item').value.trim()
        let expense=Number(document.getElementById('expense').value.trim())
        if(item && expense){
            additemtoDOM(item,expense)
        }
        else{
            alert("Kindly fill the form")
        }
        document.getElementById('item').value=""
        document.getElementById('expense').value=""
    })
})