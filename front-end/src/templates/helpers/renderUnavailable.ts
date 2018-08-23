/**
 * If a value does not exist, we render 'unavailable' string
 */
export default (data: string) => {
  if (data) {
    return `<span>${data}</span>`
  }

  return '<span class="unavailable">Unavailable</span>'
}