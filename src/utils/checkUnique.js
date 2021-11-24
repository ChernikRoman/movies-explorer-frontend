function checkUnuque(arr) {
    let uniqueArr = []
    arr.forEach((item)=>{
        if (!(JSON.stringify(uniqueArr).includes(`${item.nameRU}`))) {
            uniqueArr.push(item)
        }
    })
    return uniqueArr
}

export default checkUnuque