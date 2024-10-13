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
        this.asset_id = asset_id
        this.public_id = public_id
        this.url = url
        this.secure_url = secure_url
    }
}
