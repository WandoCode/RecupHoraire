import { SpreadsheetFactory } from '../../Script/Factory/GoogleSpreadsheet.js'

const loadEnvVariables = async () => {
  const env_var_reponse = await fetch('./env.json')
  const env_var = await env_var_reponse.json()
  const API_key = env_var.GOOGLE_API_KEY
  const spreadSheetID = env_var.spreadSheetID

  return { API_key, spreadSheetID }
}

const loadSheetsFromSpreadsheet = async (API_KEY, spearsheetID) => {
  const spreadsheet = await SpreadsheetFactory(API_KEY, spearsheetID)
  await spreadsheet.init()
  const allSheets = await spreadsheet.loadValuesFromSpreadsheet()
  return allSheets
}

const countSpaceInString = (text) => {
  let count = 0
  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    char === ' ' ? count++ : 0
  }
  return count
}

// Separe une string du type "xx xx" en 2 string distincte. le nombre d'espace entre les 2 parties xx est indeterminé
const formatHours = (hours) => {
  if (!hours) return { startHour: undefined, startHour: undefined }
  else {
    const trimmedHours = hours.trim()
    const nbrSpace = countSpaceInString(trimmedHours)
    const splitRef = ' '.repeat(nbrSpace)
    const start = trimmedHours.split(splitRef)[0]
    const end = trimmedHours.split(splitRef)[1]

    return { startHour: start, endHour: end }
  }
}

const capitalizeFirstLetter = (text) => {
  return text[0].toUpperCase() + text.slice(1, text.length)
}
export {
  loadEnvVariables,
  loadSheetsFromSpreadsheet,
  formatHours,
  capitalizeFirstLetter,
}
