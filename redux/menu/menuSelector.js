import { createSelector } from 'reselect'
const selectmenu= state => state.menu

export const selectMenuData= createSelector(
    [selectmenu],
    data => data.MenuData
);
export const selectToggleActive= createSelector(
    [selectmenu],
    data => data.toggleActive
);
export const selectRegStatus= createSelector(
    [selectmenu],
    data => data.regStatus
);
export const selectUserUploadStatus= createSelector(
    [selectmenu],
    data => data.userUploadStatus
);
export const selectRegCertData= createSelector(
    [selectmenu],
    data => data.regCertData
);
export const selectTabKey= createSelector(
    [selectmenu],
    data => data.tabKey
);
export const selectMenuId= createSelector(
    [selectmenu],
    data => data.menuId
);
export const selectSubMenuId= createSelector(
    [selectmenu],
    data => data.subMenuId
);