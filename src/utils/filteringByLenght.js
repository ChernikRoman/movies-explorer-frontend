function filteringByLenght(arr) {
    const filteredItem = [];
    arr.forEach((item) => {
        if (item.duration <= 40) {
            filteredItem.push(item)
        }
    })
    return filteredItem
}

export default filteringByLenght