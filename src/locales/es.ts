/* entre llaves estamos diciendo que los valores de la izquierda que son llaves de objeto ahora sean
string y los valores q devuelve cada uno tambien son string */
export const statusTranslation : {[key: string] : string} = {
    pending: 'Pendiente',
    onHold: 'En Espera',
    inProgress: 'En Progreso',
    underReview: 'En Revision',
    completed: 'Completado'
}