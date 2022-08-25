import { SpreadsheetFactory } from './Script/GoogleSpreadsheet.js'

const env_var_reponse = await fetch('./env.json')
const env_var = await env_var_reponse.json()
const API_key = env_var.GOOGLE_API_KEY
const spreadSheetID = env_var.spreadSheetID
const spreadsheetInstance = SpreadsheetFactory(API_key, spreadSheetID)
