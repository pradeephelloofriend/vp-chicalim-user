import { createSelector } from 'reselect'
const selectUdc = state => state.udc

export const selectUdcData = createSelector(
    [selectUdc],
    data => data.udcData
);
export const selectMenuData = createSelector(
    [selectUdc],
    data => data.menuData
);