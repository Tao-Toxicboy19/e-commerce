import { ImagesEntities } from "../ImagesEntities"

describe('ImagesEntities', () => {
    it('should throw an error when required fields are missing', () => {
        expect(() => new ImagesEntities({ asset_id: null as any, public_id: 'http://localhost', url: 'http://localhost', secure_url: 'http://localhost' })).toThrow('asset_id is required')
        expect(() => new ImagesEntities({ asset_id: 'http://localhost', public_id: null as any, url: 'http://localhost', secure_url: 'http://localhost' })).toThrow('public_id is required')
        expect(() => new ImagesEntities({ asset_id: 'http://localhost', public_id: 'http://localhost', url: null as any, secure_url: 'http://localhost' })).toThrow('url is required')
        expect(() => new ImagesEntities({ asset_id: 'http://localhost', public_id: 'http://localhost', url: 'http://localhost', secure_url: null as any })).toThrow('secure_url is required')
    })

    it('should throw an error if fields are not strings', () => {
        expect(() => new ImagesEntities({ asset_id: 123 as any, public_id: 'http://localhost', url: 'http://localhost', secure_url: 'http://localhost' })).toThrow('asset_id must be string')
        expect(() => new ImagesEntities({ asset_id: 'http://localhost', public_id: 123 as any, url: 'http://localhost', secure_url: 'http://localhost' })).toThrow('public_id must be string')
        expect(() => new ImagesEntities({ asset_id: 'http://localhost', public_id: 'http://localhost', url: 123 as any, secure_url: 'http://localhost' })).toThrow('url must be string')
        expect(() => new ImagesEntities({ asset_id: 'http://localhost', public_id: 'http://localhost', url: 'http://localhost', secure_url: 123 as any })).toThrow('secure_url must be string')
    })
})
