function filteringByLenght(arr) {
    const filteredItem = [];
    arr.forEach((item) => {
        if (item.duration <= 75) {
            filteredItem.push(item)
        }
    })
    return filteredItem
}

export default filteringByLenght