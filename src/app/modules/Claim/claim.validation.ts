import { z } from "zod";

const createClaimSchema = z.object({
    body:z.object({
        foundItemId:z.string({required_error:'foundItemId is required'}),
        distinguishingFeatures:z.string({required_error:'distinguishingFeatures is required'}),
        lostDate:z.string({required_error:'lostDate is required'})
    })
})


export const claimValidation = {
    createClaimValidation:createClaimSchema
}