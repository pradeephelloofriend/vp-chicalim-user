import { createSelector } from 'reselect'
const selectOrg= state => state.organisation

export const selectOrgData= createSelector(
    [selectOrg],
    data => data.orgData
);