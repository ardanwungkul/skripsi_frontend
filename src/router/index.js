import { createWebHistory, createRouter } from 'vue-router'
import { useUsers } from '@/stores/auth'
import PageNotFound from '@/pages/errors/404.vue'
import Login from '@/pages/auth/Login.vue'
import Register from '@/pages/auth/Register.vue'
import ForgotPassword from '@/pages/auth/ForgotPassword.vue'
import ResetPassword from '@/pages/auth/ResetPassword.vue'
import VerifyEmail from '@/pages/auth/VerifyEmail.vue'

const APP_NAME = import.meta.env.VITE_APP_NAME

const routes = [
    {
        path: '/',
        name: 'welcome',
        component: () => import('@/pages/Welcome.vue'),
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/pages/Dashboard.vue'),
        meta: {
            title: 'Dashboard',
            guard: 'auth',
        },
    },
    // Domain
    {
        path: '/admin/domain',
        name: 'domain.index',
        component: () => import('@/pages/admin/domain/Index.vue'),
        meta: {
            title: 'Domain',
            guard: 'auth',
            role: 'admin',
        },
    },
    {
        path: '/admin/domain/create',
        name: 'domain.create',
        component: () => import('@/pages/admin/domain/Create.vue'),
        meta: {
            title: 'Domain',
            guard: 'auth',
            role: 'admin',
        },
    },
    {
        path: '/admin/domain/:id/edit',
        name: 'domain.edit',
        component: () => import('@/pages/admin/domain/Edit.vue'),
        meta: {
            title: 'Domain',
            guard: 'auth',
            role: 'admin',
        },
        props: true,
    },
    // User
    {
        path: '/admin/user',
        name: 'user.index',
        component: () => import('@/pages/admin/user/Index.vue'),
        meta: {
            title: 'User',
            guard: 'auth',
            role: 'admin',
        },
    },
    {
        path: '/admin/user/create',
        name: 'user.create',
        component: () => import('@/pages/admin/user/Create.vue'),
        meta: {
            title: 'User',
            guard: 'auth',
            role: 'admin',
        },
    },
    {
        path: '/admin/user/:id/edit',
        name: 'user.edit',
        component: () => import('@/pages/admin/user/Edit.vue'),
        meta: {
            title: 'User',
            guard: 'auth',
            role: 'admin',
        },
    },
    // Vendor
    {
        path: '/admin/vendor',
        name: 'vendor.index',
        component: () => import('@/pages/admin/vendor/Index.vue'),
        meta: {
            title: 'Vendor',
            guard: 'auth',
            role: 'admin',
        },
    },
    {
        path: '/admin/vendor/create',
        name: 'vendor.create',
        component: () => import('@/pages/admin/vendor/Create.vue'),
        meta: {
            title: 'Vendor',
            guard: 'auth',
            role: 'admin',
        },
    },
    {
        path: '/admin/vendor/:id/edit',
        name: 'vendor.edit',
        component: () => import('@/pages/admin/vendor/Edit.vue'),
        meta: {
            title: 'Vendor',
            guard: 'auth',
            role: 'admin',
        },
    },
    // Todo List
    {
        path: '/admin/todo-list',
        name: 'todolist.index',
        component: () => import('@/pages/admin/todoList/Index.vue'),
        meta: {
            title: 'Todo List',
            guard: 'auth',
            role: 'admin',
        },
    },
    {
        path: '/admin/todo-list/report/:user',
        name: 'todolist.report',
        component: () => import('@/pages/admin/todoList/Report.vue'),
        meta: {
            title: 'Todo List',
            guard: 'auth',
            role: 'admin',
        },
    },
    {
        path: '/support/todo-list',
        name: 'support.todolist.index',
        component: () => import('@/pages/support/todoList/Index.vue'),
        meta: {
            title: 'Todo List',
            guard: 'auth',
            role: 'support',
        },
    },
    {
        path: '/admin/todo-list/create',
        name: 'todolist.create',
        component: () => import('@/pages/admin/todoList/Create.vue'),
        meta: {
            title: 'Todo List',
            guard: 'auth',
            role: 'admin',
        },
    },
    {
        path: '/admin/todo-list/:id/edit',
        name: 'todolist.edit',
        component: () => import('@/pages/admin/todoList/Edit.vue'),
        meta: {
            title: 'Todo List',
            guard: 'auth',
            role: 'admin',
        },
    },
    // Package
    {
        path: '/admin/package',
        name: 'admin.package.index',
        component: () => import('@/pages/admin/package/Index.vue'),
        meta: {
            title: 'Package',
            guard: 'auth',
            role: 'admin',
        },
    },
    {
        path: '/admin/package/create',
        name: 'admin.package.create',
        component: () => import('@/pages/admin/package/Create.vue'),
        meta: {
            title: 'Package',
            guard: 'auth',
            role: 'admin',
        },
    },
    {
        path: '/admin/package/:id/edit',
        name: 'admin.package.edit',
        component: () => import('@/pages/admin/package/Edit.vue'),
        meta: {
            title: 'Package',
            guard: 'auth',
            role: 'admin',
        },
    },
    // Template
    {
        path: '/admin/template',
        name: 'admin.template.index',
        component: () => import('@/pages/admin/template/Index.vue'),
        meta: {
            title: 'Template',
            guard: 'auth',
            role: 'admin',
        },
    },
    {
        path: '/admin/template/create',
        name: 'admin.template.create',
        component: () => import('@/pages/admin/template/Create.vue'),
        meta: {
            title: 'Template',
            guard: 'auth',
            role: 'admin',
        },
    },
    {
        path: '/admin/template/:id/edit',
        name: 'admin.template.edit',
        component: () => import('@/pages/admin/template/Edit.vue'),
        meta: {
            title: 'Template',
            guard: 'auth',
            role: 'admin',
        },
    },

    // Order
    {
        path: '/admin/order',
        name: 'admin.order.index',
        component: () => import('@/pages/admin/order/Index.vue'),
        meta: {
            title: 'Order',
            guard: 'auth',
            role: 'admin',
        },
    },
    {
        path: '/website/order',
        name: 'user.order.create',
        component: () => import('@/pages/user/order/Create.vue'),
        meta: {
            title: 'Order Website',
            guard: 'auth',
            role: 'user',
        },
    },
    {
        path: '/order',
        name: 'user.order.index',
        component: () => import('@/pages/user/order/Index.vue'),
        meta: {
            title: 'Order Website',
            guard: 'auth',
            role: 'user',
        },
    },
    {
        path: '/order/checkout/:code',
        name: 'user.order.checkout',
        component: () => import('@/pages/user/order/Checkout.vue'),
        meta: {
            title: 'Checkout Order',
            guard: 'auth',
            role: 'user',
        },
    },
    {
        path: '/chat',
        name: 'chat',
        component: () => import('@/pages/ChatBox.vue'),
        meta: {
            title: 'Chat Box',
            guard: 'auth',
            role: 'user',
        },
    },
    {
        path: '/support/chat',
        name: 'support.chat',
        component: () => import('@/pages/support/ChatBox.vue'),
        meta: {
            title: 'Chat Box',
            guard: 'auth',
            role: 'support',
        },
    },
    {
        path: '/domain/order',
        name: 'user.domain.index',
        component: () => import('@/pages/user/domain/Index.vue'),
        meta: {
            title: 'Domain',
            guard: 'auth',
            role: 'user',
        },
    },

    {
        path: '/login',
        name: 'login',
        component: Login,
        query: {
            reset: 'reset',
        },
        meta: {
            title: 'Log in',
            guard: 'guest',
        },
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            title: 'Register',
            guard: 'guest',
        },
    },
    {
        path: '/forgot-password',
        name: 'forgot-password',
        component: ForgotPassword,
        meta: {
            title: 'Forget Password',
            guard: 'guest',
        },
    },
    {
        path: '/password-reset/:token',
        name: 'password-reset',
        component: ResetPassword,
        query: {
            email: 'email',
        },
        meta: {
            title: 'Reset Password',
            guard: 'guest',
        },
    },
    {
        path: '/verify-email',
        name: 'verify-email',
        component: VerifyEmail,
        query: {
            resend: 'resend',
        },
        meta: {
            title: 'Email Verification',
            guard: 'auth',
        },
    },
    {
        path: '/page-not-found',
        name: 'page-not-found',
        component: PageNotFound,
        meta: {
            title: 'Page Not Found',
        },
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/page-not-found',
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// Navigation guard
router.beforeEach((to, from, next) => {
    const store = useUsers()

    const auth = store.authUser

    if (to.matched.some(route => route.meta.guard === 'guest') && auth)
        next({ name: 'dashboard' })
    else if (to.matched.some(route => route.meta.guard === 'auth') && !auth)
        next({ name: 'login' })
    else next()
})

// Middleware Role
router.beforeEach((to, from, next) => {
    const store = useUsers()

    const role = store.userData.role

    if (to.matched.some(route => route.meta.role)) {
        if (role && to.matched.some(route => route.meta.role === role)) {
            next()
        } else {
            next({ name: 'dashboard' })
        }
    } else {
        next()
    }
})

// Page Title and Metadata

router.beforeEach((to, from, next) => {
    const nearestWithTitle = to.matched
        .slice()
        .reverse()
        .find(r => r.meta && r.meta.title)

    const nearestWithMeta = to.matched
        .slice()
        .reverse()
        .find(r => r.meta && r.meta.metaTags)

    if (nearestWithTitle) {
        document.title = nearestWithTitle.meta.title + ' - ' + APP_NAME
    } else {
        document.title = APP_NAME
    }

    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(
        el => el.parentNode.removeChild(el),
    )

    if (!nearestWithMeta) return next()

    nearestWithMeta.meta.metaTags
        .map(tagDef => {
            const tag = document.createElement('meta')

            Object.keys(tagDef).forEach(key => {
                tag.setAttribute(key, tagDef[key])
            })

            tag.setAttribute('data-vue-router-controlled', '')

            return tag
        })

        .forEach(tag => document.head.appendChild(tag))

    next()
})

export default router
