//18:00 -> ["18","00"] -> [18, 00]

export function convertHourStringToMinutes(hourString: string) {


  const [hours, minutes] = hourString.split(':').map(Number); //fazendo desestruturação, removendo : e convertentdo as strings em number no map.



  const minutesAmount = (hours * 60) + minutes;


  return minutesAmount;
}