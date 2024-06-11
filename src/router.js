import { defineAsyncComponent } from 'vue'; 
import { createRouter, createWebHistory } from 'vue-router';

// import CoachDetail from './paages/coaches/CoachDetail.vue';
import CoachesList from './paages/coaches/CoachesList.vue';
// import CoachRegistration from './paages/coaches/CoachRegistration.vue';
// import ContactCoach from './paages/requests/ContactCoach.vue';
// import RequestReceived from './paages/requests/RequestsReceived.vue';
import NotFound from './paages/NotFound.vue';
// import UserAuth from './paages/auth/UserAuth.vue';
import store from './store';

//Async Components
const CoachDetail = defineAsyncComponent(() => import('./paages/coaches/CoachDetail.vue'));
const CoachRegistration = defineAsyncComponent(() => import('./paages/coaches/CoachRegistration.vue'));
const ContactCoach = defineAsyncComponent(() => import('./paages/requests/ContactCoach.vue'));
const RequestReceived = defineAsyncComponent(() => import('./paages/requests/RequestsReceived.vue'));
const UserAuth = defineAsyncComponent(() => import('./paages/auth/UserAuth.vue'));

const router = createRouter( {
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/coaches'  },
        { path: '/coaches', component: CoachesList },
        { path: '/coaches/:id', component: CoachDetail, props: true, children: [
            { path: 'contact', component: ContactCoach  }, //   /coaches/c1/contact
        ] },
        { path: '/register', component: CoachRegistration, meta: {requiresAuth: true} },
        { path: '/requests', component: RequestReceived, meta: {requiresAuth: true} },
        { path: '/auth', component: UserAuth, meta: {requiresUnauth: true} },
        { path: '/:notFound(.*)', component: NotFound },
    ],
});

router.beforeEach(function(to, _, next) {
    if(to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next('/auth');
    } else if (to.meta.requiredUnauth && store.getters.isAuthenticated) {
        next('/coaches');
    } else {
         next();
    }
})

export default router;