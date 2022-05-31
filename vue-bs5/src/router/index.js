import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

import { 
    CFN,            
    HMENU,          
    LMENUS,         
    RMENUS,         
    VUE3_SYNTAX,    
    USER_MANAGER,   
} from '@/assets/properties'

const getChildren = (pageMenu) => {
    const children = []
    pageMenu.GROUPS.forEach((group) => {
        group.MENUS.forEach((menu) => {
            const child = {
                path: menu.TO,
                name: menu.NAME,
                component: menu.COMPONENT,
            }
            children.push(child)
        })
    })
    return children
}

const routes = [
    // {   path: '/', name: 'Home', component: Home, },
    {   path: HMENU.TO, name: HMENU.NAME, component: HMENU.COMPONENT, },
    {   path: RMENUS[0].TO, name: RMENUS[0].NAME, component: RMENUS[0].COMPONENT, },

    // Vue3 Syntax
    {   path: LMENUS[0].TO, name: LMENUS[0].NAME, component: LMENUS[0].COMPONENT, 
        children: getChildren(VUE3_SYNTAX) },
    // Todos
    {   path: LMENUS[1].TO, name: LMENUS[1].NAME, component: LMENUS[1].COMPONENT, },

    // User Manager
    {   path: LMENUS[2].TO, name: LMENUS[2].NAME, component: LMENUS[2].COMPONENT, 
        children: getChildren(USER_MANAGER) },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

// web/Django/DRFandVue3/app/src/router 참조
const getCurrentMenuId = (path) => {
    let currMenuId = CFN.MENUS.NON_SELECTION_MENU_ID
    try {
        currMenuId = (path === HMENU.TO) ? 
            HMENU.ID: [...LMENUS, ...RMENUS].find((menu) => menu.TO === path).ID 
    } catch(TypeError) {
        console.log(`Invalid path error: ${path}`)
    }
    // console.log(`router.beforeEach.to: ${currMenuId}, ${path}`)
    return currMenuId
}

router.beforeEach((to) => {
    store.commit(CFN.MENUS.SET_CMI, CFN.MENUS.NON_SELECTION_MENU_ID)
    store.commit(CFN.MENUS.SET_CMI, getCurrentMenuId(to.matched[0].path))
})

export default router
