interface HeaderNav {
    id: number,
    text: string
}

export interface HeaderContent {
    nav: HeaderNav[] | [],
    button: {
        to: string
        text: string
    }
}