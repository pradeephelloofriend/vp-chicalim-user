import { createSelector } from 'reselect'
const selectfoot= state => state.foot

export const selectFootData= createSelector(
    [selectfoot],
    data => data.FootData
);