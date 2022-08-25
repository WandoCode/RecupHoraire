const SpreadsheetFactory = async (APIKey, spreadsheetId) => {
  const allSheets = []

  const getAllSheets = async () => {
    const datas = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?key=${APIKey}&includeGridData=true`
    )
    const docs = await datas.json()
    const sheetAId = docs.sheets[0]
    allSheets = docs
    return docs
  }

  const getRowValues = () => {}
}

export { SpreadsheetFactory }
