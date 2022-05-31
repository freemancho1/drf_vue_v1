const store = {
    namespaced: true,

    state: {
        currentMenuId: -1,
    },

    mutations: {
        setCurrentMenuId(state, menuId) {
            state.currentMenuId = menuId
        },
    },

    getters: {
        getCurrentMenuId(state) {
            return state.currentMenuId
        },
    },
}

export default store