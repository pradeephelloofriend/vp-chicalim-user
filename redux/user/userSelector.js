import { createSelector } from 'reselect'
const selectUser = state => state.user
export const selectCuser = createSelector(
    [selectUser],
    (user) => user.cUser
)

export const selectUserPhone = createSelector(
    [selectUser],
    (user) => user.userPhone
)
export const selectUserProfileData = createSelector(
    [selectUser],
    (user) => user.userProfileData
)
export const selectUserActive = createSelector(
    [selectUser],
    (user) => user.userActive
)
export const selectHouseVerify = createSelector(
    [selectUser],
    (user) => user.houseVerify
)
