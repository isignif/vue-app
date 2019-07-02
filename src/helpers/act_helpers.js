export function formatActHistoryStep(step) {
    const cssClass = getActHistoryStepCssClass(step)
    const content = translateActHistoryStep(step)

    return `<span class="${cssClass}">${content}</span>`
}

export function translateActHistoryStep(step) {
    switch (step) {
        case 'created':
          return 'En attente de confirmation'
        case 'confirmed':
          return 'Confirmé'
        case 'read':
          return 'AR'
        case 'signified':
          return 'Signifié'
        case 'complete':
          return 'Complet'
        case 'ask_cancel':
          return 'Demande annulation'
        case 'archive':
          return 'Archivé'
    }
}


export function getActHistoryStepCssClass(step) {
    switch (step) {
        case 'created':
          return 'danger'
        case 'confirmed':
          return 'primary'
        case 'read':
          return 'info'
        case 'signified':
          return 'success'
        case 'complete':
          return 'success'
        case 'ask_cancel':
          return 'danger'
        case 'canceled':
          return 'danger'
        case 'archive':
          return 'secondary'
    }
}