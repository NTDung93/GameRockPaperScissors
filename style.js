const VALUE = [
    {id:"scissors", value: '✌️'},
    {id:"rock", value: '✊'},
    {id:"paper", value: '✋'}
]

//hàm mỗi khi gọi sẽ thay đổi giá trị của máy chơi
let i = 0
const compChange = () => {
    const comp = document.querySelector("#computer")
    comp.textContent = VALUE[i].value
    comp.dataset.id = VALUE[i].id
    if(i == VALUE.length - 1){
        i = 0
    }else{
        i++
    }
}

let interval = setInterval(compChange, 150)

const compare = (idPlayer, idComputer) => {
    let indexPlayer = VALUE.findIndex(item => item.id == idPlayer)
    let indexComputer = VALUE.findIndex(item => item.id == idComputer)
    let check = indexPlayer - indexComputer
    if(check == 1 || check == -2){
        return 1
    }else if(check == 0){
        return 0 
    }else{
        return -1
    }
}

//code chức năng khi bấm vô user
playerItem = document.querySelectorAll(".user")

playerItem.forEach(item => {
    item.addEventListener("click", event => {
        //dừng máy lại
        clearInterval(interval)
        //khi click vào 1 thằng thì mấy thằng còn lại ko thể bị click nữa
        playerItem.forEach(_item => {
            _item.classList.remove("actived")
            _item.style.pointerEvents = "none" //lệnh này để clear cursorPointer khi rê chuột tới các item
        })
        event.target.classList.add("actived") //add thêm class actived cho cái item mà mình click vào
        //
        let idPlayer = event.target.id //event.target là cái item bị click
        let idComputer = document.querySelector("#computer").dataset.id
        let result = compare(idPlayer, idComputer)

        //design cái card notification
        const noti = document.createElement('div')
        noti.className = "text-center alert mt-5"
        if(result == 1){
            noti.classList.add("alert-success")
            noti.textContent = "Thắng rồi, nhìn đần đần mà giỏi đấy :)"
        }
        if(result == 0){
            noti.classList.add("alert-warning")
            noti.textContent = "Hòa !!!"
        }
        if(result == -1){
            noti.classList.add("alert-dark")
            noti.textContent = "Thua rồi, gà quá =))"
        }
        document.querySelector(".notification").appendChild(noti)

        //cho cái nút chơi lại bỏ cái d-none cho nó hiện lên màn hình
        document.querySelector("#play-again").classList.remove("d-none")
    })
})

//chức năng chơi lại
document.querySelector(".btn-play-again").addEventListener("click", event => {
    interval = setInterval(compChange, 150)
    playerItem.forEach(item => {
        item.classList.remove("actived")
        item.style.pointerEvents = ""
    })
    document.querySelector(".notification").innerHTML = ""
    document.querySelector("#play-again").classList.add("d-none")
})