import React, { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import App from './App';

// Lazy load pages for performance
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
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Home />
                    </Suspense>
                ),
            },
            {
                path: 'approach',
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Approach />
                    </Suspense>
                ),
            },
            {
                path: 'services',
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Services />
                    </Suspense>
                ),
            },
            {
                path: 'contact',
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Contact />
                    </Suspense>
                ),
            },
            {
                path: 'founder-bhanudeep',
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Founder />
                    </Suspense>
                ),
            },
            {
                path: 'work',
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Work />
                    </Suspense>
                ),
            },
            {
                path: 'insights',
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Insights />
                    </Suspense>
                ),
            },
            // Growth Partner Ecosystem Routes
            {
                path: 'growth-partner',
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense fallback={<LoadingFallback />}>
                                <GrowthPartnerLanding />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'apply',
                        element: (
                            <Suspense fallback={<LoadingFallback />}>
                                <GrowthPartnerApply />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'signup',
                        element: (
                            <Suspense fallback={<LoadingFallback />}>
                                <GrowthPartnerSignup />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'login',
                        element: (
                            <Suspense fallback={<LoadingFallback />}>
                                <GrowthPartnerLogin />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'dashboard',
                        element: (
                            <Suspense fallback={<LoadingFallback />}>
                                <GrowthPartnerDashboard />
                            </Suspense>
                        ),
                    },
                ]
            },
            // Admin Routes
            {
                path: 'admin',
                children: [
                    {
                        path: 'login',
                        element: (
                            <Suspense fallback={<LoadingFallback />}>
                                <GrowthPartnerLogin />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'growth-partners-dashboard',
                        element: (
                            <Suspense fallback={<LoadingFallback />}>
                                <AdminDashboard />
                            </Suspense>
                        ),
                    },
                ]
            }
        ]
    }
];
