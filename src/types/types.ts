export type TReposRespone = {
    repository: {
        issues: {
            edges: [
                {
                    node: TRepo
                }
            ]
        }
    }
}

export type TRepo = {
    id: string,
    title: string,
    bodyText: string,
    comments: {
        totalCount: number
    }
}

export type TSearchBarParams = {
    apikey: string,
    setApikeyDebounced: (value: string) => void,
    onOwnerChange: (value: string) => void,
    onRepoChange: (value: string) => void
}

export type TRepoCardParams = {
    subjectId: string,
    title: string,
    text: string,
    commentsCount: number
}

export type TAddCommentModalParameters = {
    modalIsOpen: boolean,
    setModalIsOpen: (newState: boolean) => void,
    callback: (input: string) => void
}