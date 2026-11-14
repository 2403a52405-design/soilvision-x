import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ClassificationConsole } from './components/ClassificationConsole';
import { SoilCatalog } from './components/SoilCatalog';
import { HowItWorks } from './components/HowItWorks';
import { ModelSpecs } from './components/ModelSpecs';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PredictionRecord } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [lastPredictionTimestamp, setLastPredictionTimestamp] = useState<number>(Date.now());

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePredictionComplete = (record: PredictionRecord) => {
    // Notify analytics dashboard of new prediction
    setLastPredictionTimestamp(Date.now());
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-800 font-sans selection:bg-emerald-700 selection:text-white flex flex-col">
      {/* Top Bar Navigation */}
      <Navbar onNavigate={scrollToSection} activeSection={activeSection} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <div id="hero">
          <HeroSection
            onExplore={() => scrollToSection('about')}
            onClassify={() => scrollToSection('classify')}
          />
        </div>

        {/* About Project Section */}
        <AboutSection />

        {/* Soil Classification Console (Main Feature) */}
        <ClassificationConsole onPredictionComplete={handlePredictionComplete} />

        {/* Soil Categories Encyclopedia (7 Classes) */}
        <SoilCatalog
          onSelectSoilForTest={() => scrollToSection('classify')}
        />

        {/* How It Works (5-Step Swin Pipeline) */}
        <HowItWorks />

        {/* Model Architecture & Specifications */}
        <ModelSpecs />

        {/* Real-time Dashboard & Analytics */}
        <AnalyticsDashboard lastUpdated={lastPredictionTimestamp} />

        {/* Contact & Researcher Information */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
