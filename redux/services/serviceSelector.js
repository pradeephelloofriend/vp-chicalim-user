import { createSelector } from 'reselect'
const selectService = state => state.services

export const selectServiceData= createSelector(
    [selectService],
    data => data.servicesData
);