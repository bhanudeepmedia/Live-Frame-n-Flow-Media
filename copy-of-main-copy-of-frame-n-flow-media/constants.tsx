import { NavItem, ServiceItem, ProcessStep, Metric } from './types';
import { 
  BarChart3, 
  Target, 
  Cpu, 
  TrendingUp, 
  Monitor, 
  PenTool, 
  Camera 
} from 'lucide-react';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Approach', path: '/approach' },
  { label: 'Services', path: '/services' },
  { label: 'Work', path: '/work' },
  { label: 'Insights', path: '/insights' },
  { label: 'Contact', path: '/contact' },
];

export const SERVICES: ServiceItem[] = [
  {
    title: 'Business Intelligence & Research',
    description: 'Data-driven market mapping and competitor analysis before any creative execution.',
    icon: BarChart3,
  },
  {
    title: 'Performance Marketing',
    description: 'Meta-focused acquisition strategies designed for sales outcomes, not just clicks.',
    icon: Target,
  },
  {
    title: 'AI Product Visuals',
    description: 'High-fidelity, AI-generated product photography and creative assets.',
    icon: Cpu,
  },
  {
    title: 'Growth & Lead Systems',
    description: 'Scalable social media frameworks that build authority and capture leads.',
    icon: TrendingUp,
  },
  {
    title: 'Web Design & Dev',
    description: 'Conversion-optimized digital experiences built on modern tech stacks.',
    icon: Monitor,
  },
  {
    title: 'Brand Strategy',
    description: 'Holistic brand positioning and campaign execution.',
    icon: PenTool,
  },
  {
    title: 'On-site Shoots',
    description: 'Professional production services available in India.',
    icon: Camera,
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  { number: '01', title: 'Research' },
  { number: '02', title: 'Market Mapping' },
  { number: '03', title: 'Strategy Design' },
  { number: '04', title: 'Execution' },
  { number: '05', title: 'Optimization' },
  { number: '06', title: 'Scale' },
];

export const METRICS: Metric[] = [
  { value: '$50M+', label: 'Client Revenue Generated' },
  { value: '300%', label: 'Avg. ROI Increase' },
  { value: '45+', label: 'Enterprise Partners' },
];
