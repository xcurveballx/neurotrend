export const getters = {
    apiKey: state => state.apiKey,
    isAppBusy: state => state.isAppBusy,
    user: state => state.user,
    loadingMsg: state => state.loadingMsg,
    errorMsg: state => state.errorMsg,
    isLoading: state => state.isLoading,
    isError: state => state.isError,
    currentItem: state => state.currentItem,
    isItemLoading: state => state.isItemLoading,
    isItemError: state => state.isItemError,
    selectedItemIndex: state => state.selectedItemIndex,
    isInEditMode: state => state.isInEditMode,
    isMenuShownOnMob: state => state.isMenuShownOnMob,
    validationErrors: state => state.validationErrors,
    notifications: state => state.notifications,
    prevPage: state => state.prevPage,
    nextPage: state => state.nextPage,
    count: state => state.count,
    currentCount: state => state.currentCount,
    perPage: state => state.perPage,
};
