function filteringByLenght(arr) {
    const filteredItem = [];
    arr.forEach((item) => {
        if (item.duration <= 70) {
            filteredItem.push(item)
        }
    })
    return filteredItem
}

export default filteringByLenght