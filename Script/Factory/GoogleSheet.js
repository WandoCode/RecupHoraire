function GoogleSheet(sheetData) {
  const data = sheetData

  const getValueAtPos = (posX, posY) => {
    let value = undefined
    const row = sheetData[posY]

    if (row) {
      value = row[posX]
    }

    return value
  }

  const getDate = (col) => {
    return getValueAtPos(col, 0, sheetData)
  }

  const getLocation = (row) => {
    let title = undefined
    let i = 0

    while (!title) {
      if (i === 20 || row - i < 0) {
        console.error('No title found for the given row : ' + row)
        return
      }

      const rowTitle = getValueAtPos(0, row - i, sheetData)
      if (rowTitle !== undefined && rowTitle !== '') return rowTitle

      i++
    }
  }

  const getHours = (posX, posY) => {
    if (posX % 2 === 1) {
      return getValueAtPos(1, posY, sheetData)
    }

    if (posX % 2 === 0) {
      return getValueAtPos(2, posY, sheetData)
    }
  }

  return { getHours, getValueAtPos, getLocation, getDate, data }
}

export default GoogleSheet
