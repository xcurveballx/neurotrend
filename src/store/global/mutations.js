export const mutations = {
    setApiKey(state, key) {
        state.apiKey = key;
    },
    setAppBusy(state, isAppBusy) {
        state.isAppBusy = isAppBusy;
    },
    setUser(state, name) {
        state.user = name;
    },
    setIsLoading(state, isLoading) {
        state.isLoading = isLoading;
    },
    setIsError(state, isError) {
        state.isError = isError;
    },
    setCurrentItem(state, currentItem) {
        state.currentItem = currentItem;
    },
    setIsItemLoading(state, isItemLoading) {
        state.isItemLoading = isItemLoading;
    },
    setIsItemError(state, isItemError) {
        state.isItemError = isItemError;
    },
    setSelectedItemIndex(state, selectedItemIndex) {
        state.selectedItemIndex = selectedItemIndex;
    },
    toggleEditMode(state) {
        state.isInEditMode = !state.isInEditMode;
    },
    toggleIsMenuShownOnMob(state) {
        state.isMenuShownOnMob = !state.isMenuShownOnMob;
    },
    clearIsMenuShownOnMob(state) {
        if (state.isMenuShownOnMob) state.isMenuShownOnMob = false;
    },
    setValidationErrors(state, validationErrors) {
        if (validationErrors)
            state.validationErrors = validationErrors;
        else
            state.validationErrors = {};
    },
    setNotification(state, notification) {
        state.notifications.push(notification);
    },
    clearNotification(state, key) {
        state.notifications = state.notifications.filter(el => el.id != key);
    },
    setPrevPage(state, page) {
        state.prevPage = page;
    },
    setNextPage(state, page) {
        state.nextPage = page;
    },
    setCount(state, count) {
        state.count = count;
    },
    setCurrentCount(state, count) {
        state.currentCount += count;
    },
    clearCurrentCount(state) {
        state.currentCount = 0;
    },
};
