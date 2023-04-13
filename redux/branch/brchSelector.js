import { createSelector } from 'reselect'
const selectbrch= state => state.branch

export const selectBrchData= createSelector(
    [selectbrch],
    data => data.BrchData
);