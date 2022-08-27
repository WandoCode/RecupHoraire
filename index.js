import GoogleSheet from './Script/Factory/GoogleSheet.js'
import {
  loadEnvVariables,
  loadSheetsFromSpreadsheet,
  formatHours,
} from './Script/Utils/helpers.js'
import horaireUI from './Script/Views/horaireUI.js'
import horaire from './Script/Pages/horaire.js'
import layout from './Script/Views/layout.js'

const rootElement = document.getElementById('root')

const main = async () => {
  // DEV
  // const envVar = await loadEnvVariables()

  // const allSheets = await loadSheetsFromSpreadsheet(
  //   envVar.API_key,
  //   envVar.spreadSheetID
  // )

  const allSheets = await loadSheetsFromSpreadsheet(0, 0)
  // FIN DEV
  const schedules = getSchedulesArray(allSheets)

  rootElement.innerHTML = layout()

  // Populate page
  const mainElement = document.getElementById('main')
  mainElement.innerHTML = horaireUI()

  horaire(schedules)
  console.log(schedules)
}
const getSchedulesArray = (sheetsData) => {
  const schedules = {}

  for (const sheet in sheetsData) {
    const sheetModel = GoogleSheet(sheetsData[sheet])
    const week = sheetModel.data

    // Parcourt chaque case du tableau de la semaine donnée
    for (let y = 3; y < week.length; y++) {
      for (let x = 3; x < 18; x++) {
        const val = sheetModel.getValueAtPos(x, y)

        if (val !== '' && val !== undefined) {
          const formattedVal = val.trim().toLowerCase()

          // Cas où on a un OUT sur une periode en fin de page => Pas pris en compte
          if (formattedVal.split(' ').length > 2) break

          const date = sheetModel.getDate(x)
          const location = getScheduleLocation(formattedVal, sheetModel, y)
          const hours = getScheduleHours(formattedVal, sheetModel, x, y)
          const name = getScheduleName(formattedVal)

          const { startHour, endHour } = formatHours(hours)

          schedules[name] ? 0 : (schedules[name] = {})
          schedules[name][date] ? 0 : (schedules[name][date] = {})

          // Ajout des heures de début et fin
          if (!schedules[name][date][location]) {
            schedules[name][date][location] = {
              horaire_debut: startHour,
              horaire_fin: endHour,
            }
          } // Si la salle existe déjà, on remplace son heure de fin par celle de la valeur actuelle pour avoir l'horaire de la journée complète
          else {
            schedules[name][date][location].horaire_fin = endHour
          }
        }
      }
    }
  }
  return schedules
}

const getScheduleLocation = (formattedVal, sheetModel, posY) => {
  if (formattedVal.split(' ').length === 1) return sheetModel.getLocation(posY)
  else if (formattedVal.split(' ').length === 2)
    return formattedVal.split(' ')[1]
}

const getScheduleName = (formattedVal) => {
  if (formattedVal.split(' ').length === 1) return formattedVal
  else if (formattedVal.split(' ').length === 2)
    return formattedVal.split(' ')[0]
}

const getScheduleHours = (formattedVal, sheetModel, posX, posY) => {
  if (formattedVal.split(' ').length === 1)
    return sheetModel.getHours(posX, posY)
  else return undefined
}

await main()

// TODO: Passer à react
// Ajouter un router
// Ajouter un login
