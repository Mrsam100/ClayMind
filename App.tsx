
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import CartDrawer from './components/CartDrawer';
import Exchange from './components/Exchange';
import Learn from './components/Learn';
import Community from './components/Community';
import Earn from './components/Earn';
import Wallet from './components/Wallet';
import InfoPage from './components/InfoPage';
import About from './components/About';
import Footer from './components/Footer';
import Mascot from './components/Mascot';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import { PAPERS } from './constants';
import { Paper, ViewState } from './types';

// Toast Component
const Toast: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-8 right-8 z-[10002] bg-[#1F1F1F] text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 animate-fade-in font-bold text-sm">
       <div className="w-2 h-2 bg-[#2EC4B6] rounded-full animate-pulse"></div>
       <span>{message}</span>
    </div>
  );
};

const App: React.FC = () => {
  // --- Auth State ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // --- App State ---
  const [viewState, setViewState] = useState<ViewState>({ type: 'home' });
  const [papers, setPapers] = useState<Paper[]>([]);
  const [userUpvotes, setUserUpvotes] = useState<string[]>([]);
  const [readingList, setReadingList] = useState<Paper[]>([]);
  const [isReadingListOpen, setIsReadingListOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('Market');

  // --- Initialization & Persistence ---
  useEffect(() => {
    // Check session
    const session = localStorage.getItem('claymind_session');
    if (session === 'active') setIsLoggedIn(true);

    const storedUpvotesString = localStorage.getItem('userUpvotes');
    if (storedUpvotesString) {
      try { setUserUpvotes(JSON.parse(storedUpvotesString)); } catch (e) { setUserUpvotes([]); }
    }
    const storedLibrary = localStorage.getItem('cryptoWatchlist');
    if (storedLibrary) {
      try { setReadingList(JSON.parse(storedLibrary)); } catch (e) { setReadingList([]); }
    }
    setPapers(PAPERS);
    setIsLoading(false);
  }, []);

  useEffect(() => { localStorage.setItem('cryptoWatchlist', JSON.stringify(readingList)); }, [readingList]);
  useEffect(() => { localStorage.setItem('userUpvotes', JSON.stringify(userUpvotes)); }, [userUpvotes]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
    localStorage.setItem('claymind_session', 'active');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('claymind_session');
    setViewState({ type: 'home' });
  };

  // --- Actions ---
  const handleNavClick = (targetId: string) => {
    if (['Market', 'Exchange', 'Earn', 'Wallet', 'Learn', 'Community'].includes(targetId)) {
        setActiveCategory(targetId);
        setViewState({ type: 'home' });
    } else if (['help', 'api', 'fees', 'security', 'privacy', 'terms'].includes(targetId)) {
        setViewState({ type: 'info', pageId: targetId });
    } else if (targetId === 'about') {
        setViewState({ type: 'about' });
    } else {
        setViewState({ type: 'home' });
        setActiveCategory('Market');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductClick = (paper: Paper) => {
    setViewState({ type: 'paper', paper });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSave = (paper: Paper) => {
    const isSaved = readingList.some(item => item.id === paper.id);
    if (isSaved) {
      setReadingList(prev => prev.filter(item => item.id !== paper.id));
      setToastMessage("Removed from Favorites");
    } else {
      setReadingList(prev => [paper, ...prev]);
      setToastMessage("Added to Favorites");
    }
  };

  const handleUpvote = (paperId: string) => {
    const isAlreadyUpvoted = userUpvotes.includes(paperId);
    const newUpvoteIds = isAlreadyUpvoted 
        ? userUpvotes.filter(id => id !== paperId)
        : [...userUpvotes, paperId];
    setUserUpvotes(newUpvoteIds);
  };

  const savedPaperIds = useMemo(() => readingList.map(p => p.id), [readingList]);
  const relatedPapers = useMemo(() => {
    if (viewState.type === 'paper') {
      return papers.filter(p => p.id !== viewState.paper.id).slice(0, 4);
    }
    return [];
  }, [papers, viewState]);

  if (isLoading) return <div className="h-screen w-screen flex items-center justify-center bg-[#FFF8F0] text-xl font-bold text-[#FF9F1C]">Loading ClayMind...</div>;

  // --- PUBLIC VIEW ---
  if (!isLoggedIn) {
    return (
      <>
        <LandingPage onLoginClick={() => setShowLoginModal(true)} />
        {showLoginModal && <Login onClose={() => setShowLoginModal(false)} onLogin={handleLoginSuccess} />}
      </>
    );
  }

  // --- PRIVATE DASHBOARD VIEW ---
  return (
    <div className="flex h-screen bg-[#FFF8F0] overflow-hidden">
      {/* 1. Sidebar Layout (Fixed Width on Desktop) */}
      <Navbar 
        onNavClick={handleNavClick} 
        activeCategory={activeCategory}
        cartCount={readingList.length}
        onOpenCart={() => setIsReadingListOpen(true)}
        onLogout={handleLogout}
      />

      {/* 2. Main Content Area - Responsive Flex Growth */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden h-full relative p-4 md:p-8 scroll-smooth">
         <div className="max-w-[1600px] mx-auto min-h-full pb-20">
            
            {/* Dynamic Content View */}
            {viewState.type === 'paper' ? (
                <ProductDetail 
                    product={viewState.paper} 
                    relatedPapers={relatedPapers}
                    onBack={() => setViewState({ type: 'home' })}
                    onToggleSave={handleToggleSave}
                    isSaved={savedPaperIds.includes(viewState.paper.id)}
                    onProductClick={handleProductClick}
                />
            ) : viewState.type === 'info' ? (
                <InfoPage pageId={viewState.pageId} />
            ) : viewState.type === 'about' ? (
                <About />
            ) : (
                <>
                    {/* Dashboard Routing */}
                    {activeCategory === 'Market' && (
                        <div className="space-y-8 animate-fade-in">
                            <Hero />
                            <ProductGrid 
                                papers={papers} 
                                onProductClick={handleProductClick} 
                                onUpvote={handleUpvote}
                                userUpvotes={userUpvotes}
                                onPublisherClick={() => {}}
                                onToggleSave={handleToggleSave}
                                savedPaperIds={savedPaperIds}
                                activeCategory={activeCategory}
                                setActiveCategory={setActiveCategory}
                            />
                        </div>
                    )}
                    {activeCategory === 'Exchange' && <Exchange />}
                    {activeCategory === 'Earn' && <Earn />}
                    {activeCategory === 'Wallet' && <Wallet />}
                    {activeCategory === 'Learn' && <Learn />}
                    {activeCategory === 'Community' && <Community />}
                </>
            )}

            <Footer onLinkClick={(e, id) => { e.preventDefault(); handleNavClick(id); }} />
         </div>
      </main>

      {/* Overlays */}
      <CartDrawer 
        isOpen={isReadingListOpen}
        onClose={() => setIsReadingListOpen(false)}
        items={readingList}
        onRemoveItem={handleToggleSave} 
        onItemClick={handleProductClick}
      />
      
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
      <Mascot />
    </div>
  );
};

export default App;
