export class ImagesEntities {
    public asset_id: string
    public public_id: string
    public url: string
    public secure_url: string

    constructor({
        asset_id,
        public_id,
        url,
        secure_url,
    }: {
        asset_id: string
        public_id: string
        url: string
        secure_url: string
    }) {
        if (!asset_id || asset_id === null || asset_id === undefined) {
            throw new Error('asset_id is required')
        } else if (
            !public_id ||
            public_id === null ||
            public_id === undefined
        ) {
            throw new Error('public_id is required')
        } else if (!url || url === null || public_id === undefined) {
            throw new Error('url is required')
        } else if (
            !secure_url ||
            secure_url === null ||
            public_id === undefined
        ) {
            throw new Error('secure_url is required')
        } else if (typeof asset_id !== 'string') {
            throw new Error('asset_id must be string')
        } else if (typeof public_id !== 'string') {
            throw new Error('public_id must be string')
        } else if (typeof url !== 'string') {
            throw new Error('url must be string')
        }else if (typeof secure_url !== 'string'){
            throw new Error('secure_url must be string')
        }

        this.asset_id = asset_id
        this.public_id = public_id
        this.url = url
        this.secure_url = secure_url
    }
}
