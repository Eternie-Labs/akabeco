type ClassNameParams = (string | string[])[]

const SEPARATOR = ' ' as const

const classNames = (...params: ClassNameParams) => {
    const elementsToJoin: string[] = []
    params.forEach((param) => {
        if (Array.isArray(param)) {
            elementsToJoin.push(param.join(SEPARATOR))
        } else {
            elementsToJoin.push(param)
        }
    })
    return elementsToJoin.join(SEPARATOR)
}

export default classNames