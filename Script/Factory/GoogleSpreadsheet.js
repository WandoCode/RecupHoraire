const SpreadsheetFactory = async (
  APIKey = 0,
  spreadsheetId = 0,
  rangeParam
) => {
  let spreadsheet = []
  let range = rangeParam || 'A1:R55'

  const init = async () => {
    spreadsheet = await getAllSheets()
  }

  const getAllSheets = async () => {
    /* DEV */
    // const datas = await fetch(
    //   `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?key=${APIKey}`
    // )
    const datas = await fetch('test/mockSpreadsheet.json')
    /* FIN DEV */

    const spreadsheet = await datas.json()
    return spreadsheet
  }

  const loadValuesFromSpreadsheet = async () => {
    const sheetsTitle = getAllSheetsTitle()
    const allSheetsValues = await getAllSheetsValues(sheetsTitle, range)

    return allSheetsValues
  }

  const getAllSheetsTitle = () => {
    if (spreadsheet.length === 0) {
      console.error('Spreadsheet object not loaded. Unable to get sheets')
    }

    const sheets = spreadsheet.sheets
    const sheetsTitle = sheets.map((sheet) => {
      return sheet.properties.title
    })

    return sheetsTitle
  }

  const getOneSheetValues = async (sheetTitle, range) => {
    const datas = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetTitle}!${range}?key=${APIKey}`
    )
    const sheetValues = await datas.json()

    return sheetValues
  }

  const getAllSheetsValues = async (sheetsTitle, range) => {
    let allSheetsValues = {}
    /* DEV */
    // for (const sheetTitle of sheetsTitle) {
    //   const sheetData = await getOneSheetValues(sheetTitle, range)
    //   const sheetValues = sheetData.values
    //   const formattedSheetValues = unmergeDates(sheetValues)
    //   allSheetsValues[sheetTitle] = formattedSheetValues
    // }
    const allSheetsValuesJSON = await fetch('test/mockSheetsValues.json')
    allSheetsValues = await allSheetsValuesJSON.json()
    /* FIN DEV */
    return allSheetsValues
  }

  const unmergeDates = (sheetData) => {
    const dataCopy = [...sheetData]
    const colTitlesRow = dataCopy[0]
    let unmergedRow = ['']

    for (let i = 1; i <= colTitlesRow.length; i++) {
      const colValue = colTitlesRow[i]
      if (colValue === undefined || colValue === '') {
        unmergedRow.push(colTitlesRow[i - 1])
      } else {
        unmergedRow.push(colTitlesRow[i])
      }
    }
    dataCopy[0] = unmergedRow

    return dataCopy
  }

  return {
    init,
    loadValuesFromSpreadsheet,
  }
}

export { SpreadsheetFactory }
