import React, { Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';

// Lazy load pages
const Home = React.lazy(() => import('./pages/Home'));
const Services = React.lazy(() => import('./pages/Services'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Approach = React.lazy(() => import('./pages/Approach'));
const Founder = React.lazy(() => import('./pages/Founder'));
const Work = React.lazy(() => import('./pages/Work'));
const Insights = React.lazy(() => import('./pages/Insights'));

// Growth Partner Imports
const GrowthPartnerLanding = React.lazy(() => import('./pages/GrowthPartner/Landing'));
const GrowthPartnerApply = React.lazy(() => import('./pages/GrowthPartner/Apply'));
const GrowthPartnerSignup = React.lazy(() => import('./pages/GrowthPartner/Signup'));
const GrowthPartnerLogin = React.lazy(() => import('./pages/GrowthPartner/Login'));
const GrowthPartnerDashboard = React.lazy(() => import('./pages/GrowthPartner/Dashboard'));
const AdminDashboard = React.lazy(() => import('./pages/Admin/Dashboard'));

const LoadingFallback = () => <div className="min-h-screen bg-black" />;

export const routes: RouteObject[] = [
    { path: '/', element: <Home /> },
    { path: '/approach', element: <Approach /> },
    { path: '/services', element: <Services /> },
    { path: '/contact', element: <Contact /> },
    { path: '/founder-bhanudeep', element: <Founder /> },
    { path: '/work', element: <Work /> },
    { path: '/insights', element: <Insights /> },

    // Growth Partner Ecosystem
    { path: '/growth-partner', element: <GrowthPartnerLanding /> },
    { path: '/growth-partner/apply', element: <GrowthPartnerApply /> },
    { path: '/growth-partner/signup', element: <GrowthPartnerSignup /> },
    { path: '/growth-partner/login', element: <GrowthPartnerLogin /> },
    { path: '/growth-partner/dashboard', element: <GrowthPartnerDashboard /> },

    // Admin
    { path: '/admin/login', element: <GrowthPartnerLogin /> },
    { path: '/admin/growth-partners-dashboard', element: <AdminDashboard /> },
];
