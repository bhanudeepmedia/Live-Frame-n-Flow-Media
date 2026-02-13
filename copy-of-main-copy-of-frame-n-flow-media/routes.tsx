import React from 'react';
import type { RouteObject } from 'react-router-dom';

// Static imports for SSG SEO
import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Approach from './pages/Approach';
import Founder from './pages/Founder';
import Work from './pages/Work';
import Insights from './pages/Insights';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ProductMarketing from './pages/ProductMarketing';
import ServiceMarketing from './pages/ServiceMarketing';
import StartupMarketing from './pages/StartupMarketing';
import RealtorMarketing from './pages/RealtorMarketing';

// Growth Partner Imports
import GrowthPartnerLanding from './pages/GrowthPartner/Landing';
import GrowthPartnerApply from './pages/GrowthPartner/Apply';
import GrowthPartnerSignup from './pages/GrowthPartner/Signup';
import GrowthPartnerLogin from './pages/GrowthPartner/Login';
import GrowthPartnerDashboard from './pages/GrowthPartner/Dashboard';
import AdminDashboard from './pages/Admin/Dashboard';

// Blog Imports
import BlogIndex from './pages/Blog/Index';
import RevenueGrowthPost from './pages/Blog/RevenueGrowth';

export const routes: RouteObject[] = [
    { path: '/', element: <Home /> },
    { path: '/about', element: <About /> },
    { path: '/approach', element: <Approach /> },
    { path: '/services', element: <Services /> },
    { path: '/contact', element: <Contact /> },
    { path: '/founder-bhanudeep', element: <Founder /> },
    { path: '/work', element: <Work /> },
    { path: '/insights', element: <Insights /> },
    { path: '/privacy-policy', element: <PrivacyPolicy /> },
    { path: '/terms-of-service', element: <TermsOfService /> },

    // Growth Partner Ecosystem
    { path: '/growth-partner', element: <GrowthPartnerLanding /> },
    { path: '/growth-partner/apply', element: <GrowthPartnerApply /> },
    { path: '/growth-partner/signup', element: <GrowthPartnerSignup /> },
    { path: '/growth-partner/login', element: <GrowthPartnerLogin /> },
    { path: '/growth-partner/dashboard', element: <GrowthPartnerDashboard /> },

    // Admin
    { path: '/admin/login', element: <GrowthPartnerLogin /> },
    { path: '/admin/growth-partners-dashboard', element: <AdminDashboard /> },

    // Industry Specific Pages
    { path: '/product-marketing', element: <ProductMarketing /> },
    { path: '/service-marketing', element: <ServiceMarketing /> },
    { path: '/startup-marketing', element: <StartupMarketing /> },
    { path: '/realtor-marketing', element: <RealtorMarketing /> },

    // Blog
    { path: '/blog', element: <BlogIndex /> },
    { path: '/blog/revenue-growth-2026', element: <RevenueGrowthPost /> },
];
