export function formatDate( isoString: string ) : string {
    const date = new Date(isoString)
    const formatter = new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
    return formatter.format(date)
}




/** Generado con ChatGpt (muy buena opcion ya que con el type permite varias opciones)
type FormatType = 'largo' | 'corto' | 'conHora';

export function formatDate(dateInput: string | Date, format: FormatType = 'largo'): string {
  const date = new Date(dateInput);

  if (format === 'corto') {
    // Retorna tipo "08/04/2025"
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const options: Intl.DateTimeFormatOptions =
    format === 'conHora'
      ? {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }
      : {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        };

  return date.toLocaleDateString('es-AR', options);
}
------------------------------------------------------------------------------------------------*/
/* 
Se usaria de la siguiente forma (ejemplo):
console.log(formatDate(fecha, 'corto'))
console.log(formatDate(fecha, 'conHora'))
*/