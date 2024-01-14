const request = require('request')

const ATLAS_API_BASE_URL = 'https://cloud.mongodb.com/api/atlas/v1.0'
const ATLAS_PROJECT_ID = process.env.MONGODB_ATLAS_PROJECT_ID
const ATLAS_CLUSTER_NAME = process.env.MONGODB_ATLAS_CLUSTER
const ATLAS_CLUSTER_API_URL = `${ATLAS_API_BASE_URL}/groups/${ATLAS_PROJECT_ID}/clusters/${ATLAS_CLUSTER_NAME}`
const ATLAS_SEARCH_INDEX_API_URL = `${ATLAS_CLUSTER_API_URL}/fts/indexes`

const ATLAS_API_PUBLIC_KEY = process.env.MONGODB_ATLAS_PUBLIC_KEY
const ATLAS_API_PRIVATE_KEY = process.env.MONGODB_ATLAS_PRIVATE_KEY
const DIGEST_AUTH = `${ATLAS_API_PUBLIC_KEY}:${ATLAS_API_PRIVATE_KEY}`

const PRODUCT_SEARCH_INDEX_NAME = 'product_search'
const PRODUCT_AUTOCOMPLETE_INDEX_NAME = 'product_autocomplete'



async function findIndexByName(indexName) {
    const allIndexesResponse = await request(
      `${ATLAS_SEARCH_INDEX_API_URL}/TechBuyDB/products`,
      {
        dataType: 'json',
        contentType: 'application/json',
        method: 'GET',
        digestAuth: DIGEST_AUTH,
      }
    )
  
    return (allIndexesResponse?.data).find((i) => i?.name === indexName)
  }


async function upsertSearchIndex() {
    try{
        const userSearchIndex = await findIndexByName(PRODUCT_SEARCH_INDEX_NAME)
        if (!userSearchIndex) {
            await request(ATLAS_SEARCH_INDEX_API_URL, {
                data: {
                name: PRODUCT_SEARCH_INDEX_NAME,
                database: 'TechbuyDB',
                collectionName: 'products',
                mappings: {
                    dynamic: true,
                },
                },
                dataType: 'json',
                contentType: 'application/json',
                method: 'POST',
                digestAuth: DIGEST_AUTH,
            })
        }
    }
    catch(err){
        console.log(err)
    }
    
    
  }

  module.exports=upsertSearchIndex;