export const PRODUCTION_CLERK_BASE_URL = "https://clerk.ordinant.ai"
export const PRODUCTION_ROO_CODE_API_URL = "https://app.ordinant.ai"

export const getClerkBaseUrl = () => process.env.CLERK_BASE_URL || PRODUCTION_CLERK_BASE_URL

export const getRooCodeApiUrl = () => process.env.ROO_CODE_API_URL || PRODUCTION_ROO_CODE_API_URL
