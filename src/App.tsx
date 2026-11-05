import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { HighlightsBar } from './components/HighlightsBar';
import {
  HomeFeaturedSection,
  HomeAboutBrief,
  WhyChooseUsSection,
  HomeCTASection,
} from './components/HomeSections';
import { PropertiesPage } from './components/PropertiesPage';
import { AboutPage } from './components/AboutPage';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PropertyModal } from './components/PropertyModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { BackToTop } from './components/BackToTop';
import { Property } from './data/properties';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'properties' | 'about' | 'contact'>('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);
  const [propertyModalMode, setPropertyModalMode] = useState<'details' | 'enquire'>('details');

  // Sync hash routing
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'properties', 'about', 'contact'].includes(hash)) {
        setActiveTab(hash as any);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleTabChange = (tab: 'home' | 'properties' | 'about' | 'contact') => {
    setActiveTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewPropertyDetails = (property: Property) => {
    setSelectedProperty(property);
    setPropertyModalMode('details');
    setIsPropertyModalOpen(true);
  };

  const handleEnquireProperty = (property: Property) => {
    setSelectedProperty(property);
    setPropertyModalMode('enquire');
    setIsPropertyModalOpen(true);
  };

  const handleHighlightSelect = (_category: string) => {
    handleTabChange('properties');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf9] text-slate-800">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleTabChange}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <HeroSection
              onExploreProperties={() => handleTabChange('properties')}
              onContactClick={() => handleTabChange('contact')}
            />
            <HighlightsBar onHighlightSelect={handleHighlightSelect} />
            <HomeFeaturedSection
              onViewDetails={handleViewPropertyDetails}
              onEnquire={handleEnquireProperty}
              onViewAllProperties={() => handleTabChange('properties')}
            />
            <HomeAboutBrief
              onLearnMore={() => handleTabChange('about')}
              onContact={() => handleTabChange('contact')}
            />
            <WhyChooseUsSection />
            <HomeCTASection
              onContactClick={() => handleTabChange('contact')}
            />
          </>
        )}

        {activeTab === 'properties' && (
          <PropertiesPage
            onViewDetails={handleViewPropertyDetails}
            onEnquire={handleEnquireProperty}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage
            onExploreProperties={() => handleTabChange('properties')}
            onContactClick={() => handleTabChange('contact')}
          />
        )}

        {activeTab === 'contact' && (
          <ContactSection />
        )}
      </main>

      {/* Footer */}
      <Footer onNavClick={handleTabChange} />

      {/* WhatsApp Floating Contact Button */}
      <WhatsAppButton />

      {/* Back To Top Floating Button */}
      <BackToTop />

      {/* Dedicated Property Details & Direct Inquiry Modal */}
      <PropertyModal
        property={selectedProperty}
        isOpen={isPropertyModalOpen}
        onClose={() => setIsPropertyModalOpen(false)}
        initialMode={propertyModalMode}
      />
    </div>
  );
}
