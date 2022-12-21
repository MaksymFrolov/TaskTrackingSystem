export const convertDate = (date: Date) => {
    return new Date(date).toLocaleDateString()
  }
  export const convertDateWithTime = (date: Date) => {
    return new Date(date).toLocaleString()
  }