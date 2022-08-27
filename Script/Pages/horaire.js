import { capitalizeFirstLetter } from '../Utils/helpers.js'
// TODO: structurer de la meme maniere que le projet OC 8
function horaire(schedules) {
  const selectElement = document.getElementById('technologue')
  const horaireTableElement = document.getElementById('horaire_table')

  const init = () => {
    const selectValues = Object.keys(schedules)
    selectElement.innerHTML = getOptionsDOM(selectValues)
    horaireTableElement.innerHTML = getTableHoraireDOM(selectValues[0])

    selectElement.addEventListener('change', handleSelect)
  }

  const handleSelect = (e) => {
    const value = e.target.value
    const tableBodyElement = document.getElementById('horaire-table-body')

    tableBodyElement.innerHTML = rows(value)
  }

  const getOptionsDOM = (selectValues) => {
    const options = selectValues.map((name) => {
      return getOptionDOM(name)
    })
    return options
  }

  const getOptionDOM = (name) => {
    return `<option value="${name}">${capitalizeFirstLetter(name)}</option>`
  }

  const getTableHoraireDOM = (name) => {
    let horaireTable = `
    <table class="table table-sm table-striped table-hover">
        <thead>
            <tr class="table-dark">
                <th>Date</th>
                <th >Horaire</th>
                <th>Salle</th>
            </tr>
        </thead>
        <tbody id="horaire-table-body">
            ${rows(name)}
        </tbody>
    </table>`

    return horaireTable
  }

  const rows = (name) => {
    const datas = schedules[name]
    let rows = ''
    for (const dateKey in datas) {
      const rooms = datas[dateKey]
      for (const roomKey in rooms) {
        const hours = rooms[roomKey]
        rows += `
            <tr class="table-light">
                <th>${dateKey}</th>
                <td>${formatHours({ ...hours })}</td>
                <td>${roomKey}</td>
            </tr> `
      }
    }
    return rows
  }

  const formatHours = ({ horaire_debut, horaire_fin }) => {
    if (!horaire_debut || !horaire_fin) return ''
    else return `${horaire_debut} - ${horaire_fin}`
  }

  init()
  return
}

export default horaire
