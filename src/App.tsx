/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VisualShowcase } from './components/VisualShowcase';
import { AmenitiesSection } from './components/AmenitiesSection';
import { FloorPlansSection } from './components/FloorPlansSection';
import { MCMVSimulator } from './components/MCMVSimulator';
import { FamilySection } from './components/FamilySection';
import { LocationSection } from './components/LocationSection';
import { ConversionBanner } from './components/ConversionBanner';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminLeadsModal } from './components/AdminLeadsModal';
import { initAnalytics } from './utils/analytics';
import { FloorPlan } from './data/abiatarData';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState<string>('2 Dormitórios Standard');
  const formRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Initialize Google Analytics 4 & Meta Pixel
    initAnalytics();

    // Check for secret admin access via URL param (?admin=true or #admin)
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('admin') === 'true' || window.location.hash === '#admin') {
        setIsAdminOpen(true);
      }
    }
  }, []);

  const scrollToForm = (customInterest?: string) => {
    if (customInterest) {
      setSelectedInterest(customInterest);
    }
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      const element = document.getElementById('cadastro');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const scrollToPlans = () => {
    const element = document.getElementById('plantas');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectPlan = (plan: FloorPlan) => {
    scrollToForm(`Planta ${plan.name} (${plan.area})`);
  };

  const handleSelectSpace = (spaceName: string) => {
    scrollToForm(`Interesse em: ${spaceName}`);
  };

  const handleApplySimulation = (details: { renda: number; fgts: number; parcela: number }) => {
    scrollToForm(`Simulação Caixa: Renda R$ ${details.renda} | Parcela ~R$ ${details.parcela}`);
  };

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-slate-800 flex flex-col selection:bg-amber-400/30 selection:text-amber-950 font-sans">
      
      {/* Top Bar Navigation (Clean, 100% public sales presentation) */}
      <Navbar onScrollToForm={() => scrollToForm()} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section with Official Facade Render & Lead Capture */}
        <Hero
          onScrollToForm={() => scrollToForm()}
          onScrollToPlans={scrollToPlans}
        />

        {/* 2. Visual Bento Showcase with 100% Official Original Renders */}
        <VisualShowcase onSelectSpace={handleSelectSpace} />

        {/* 3. Club Amenities (+50 Items in 3 Levels) */}
        <AmenitiesSection onInterestClick={(amenity) => scrollToForm(`Interesse no Lazer: ${amenity}`)} />

        {/* 4. Official Floor Plans (Planta Tipo e Garden) */}
        <FloorPlansSection onSelectPlan={handleSelectPlan} />

        {/* 5. Caixa & Minha Casa Minha Vida Financing Simulator */}
        <MCMVSimulator onApplySimulation={handleApplySimulation} />

        {/* 6. Happy Family & First Home Conquista */}
        <FamilySection onSimulateClick={() => scrollToForm('Interesse da Família no MCMV')} />

        {/* 7. Strategic Location (5 min walk to Capão Redondo Metro Station) */}
        <LocationSection />

        {/* 8. Conversion Section & Lead Capture Form */}
        <ConversionBanner
          formRef={formRef}
          selectedInterest={selectedInterest}
        />
      </main>

      {/* Footer (with discreet consultant access) */}
      <Footer onSecretAdminTrigger={() => setIsAdminOpen(true)} />

      {/* Floating High-Converting WhatsApp Button with Remarketing Tracker */}
      <FloatingWhatsApp />

      {/* Admin Leads & Pixel Configuration Modal (Protected by PIN) */}
      <AdminLeadsModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

    </div>
  );
}
