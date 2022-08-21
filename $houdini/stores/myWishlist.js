import { houdiniConfig } from '$houdini';
import { queryStore } from '../runtime/stores'
import artifact from '../artifacts/myWishlist'
import { defaultConfigValues } from '../runtime/lib'

// create the query store
const factory = () => queryStore({
    artifact,
    config: defaultConfigValues(houdiniConfig),
    storeName: "GQL_myWishlist",
    paginated: false,
    paginationMethods: [],
})

export const GQL_myWishlist = factory()

export const myWishlistStore = factory

export default GQL_myWishlist
