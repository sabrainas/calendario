export const eventoPadrao = [
    {
      id: 1,
      title: 'campanha 1',
      start: new Date(2024, 3, 5, 10, 0),
      end: new Date(2024, 3, 5, 11, 0),
      description: 'campanha doação de sangue',
      allDay: false,
    },
    {
      id: 2,
      title: 'campanha 2',
      start: new Date(2024, 3, 6, 10, 0),
      end: new Date(2024, 3, 6, 11, 0),
      description: 'campanha doação de sangue',
      allDay: false,
    },
  ]

export const dadosArmazenados = (data:any):any => {
  console.log(data)
  eventoPadrao.push(data)
}