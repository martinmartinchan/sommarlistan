import { filter, propEq, groupBy } from 'ramda'

const groupByType = groupBy((item) => {
  return propEq('type', 'PU', item) ? 'PU' :
         propEq('type', 'skoj', item) ? 'skoj' :
         propEq('type', 'mat', item) ? 'mat' :
         'rest'
})

const fetchData = (setData) => {
  return fetch('https://75usikij68.execute-api.eu-north-1.amazonaws.com/default/sommarlistan')
    .then((res) => res.json())
    .then(result => {
      const Ylva = groupByType(filter(propEq('person', 'Ylva'), result))
      const Emelie = groupByType(filter(propEq('person', 'Emelie'), result))
      const Martin = groupByType(filter(propEq('person', 'Martin'), result))
      setData({ Ylva, Emelie, Martin })
    })
}

export default fetchData