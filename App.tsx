
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { authService } from './services/authService';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy Load Heavy Components for Performance/Scalability
// The user shouldn't download the Dashboard code until they actually log in.
const Navbar = React.lazy(() => import('./components/Navbar'));
const Hero = React.lazy(() => import('./components/Hero'));
const ProductGrid = React.lazy(() => import('./components/ProductGrid'));
const ProductDetail = React.lazy(() => import('./components/ProductDetail'));
const CartDrawer = React.lazy(() => import('./components/CartDrawer'));
const Exchange = React.lazy(() => import('./components/Exchange'));
const Learn = React.lazy(() => import('./components/Learn'));
const Community = React.lazy(() => import('./components/Community'));
const Earn = React.lazy(() => import('./components/Earn'));
const Wallet = React.lazy(() => import('./components/Wallet'));
const InfoPage = React.lazy(() => import('./components/InfoPage'));
const About = React.lazy(() => import('./components/About'));
const Footer = React.lazy(() => import('./components/Footer'));
const Mascot = React.lazy(() => import('./components/Mascot'));

// Landing Page & Login are needed immediately, but we can still lazy load them to prioritize the core bundle
const LandingPage = React.lazy(() => import('./components/LandingPage'));
const Login = React.lazy(() => import('./components/Login'));

import { PAPERS } from './constants';
import { Paper, ViewState } from './types';

// Loading Spinner for Suspense Fallback
const LoadingScreen = () => (
  <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#FFF8F0]">
    <div className="w-12 h-12 border-4 border-[#FF9F1C] border-t-transparent rounded-full animate-spin mb-4"></div>
    <span className="text-[#1F1F1F] font-bold animate-pulse">Initializing ClayMind...</span>
  </div>
);

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
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  // --- App State ---
  const [viewState, setViewState] = useState<ViewState>({ type: 'home' });
  const [papers, setPapers] = useState<Paper[]>([]);
  const [userUpvotes, setUserUpvotes] = useState<string[]>([]);
  const [readingList, setReadingList] = useState<Paper[]>([]);
  const [isReadingListOpen, setIsReadingListOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('Market');

  // --- Initialization & Persistence ---
  useEffect(() => {
    // Check session via robust service
    const session = authService.getSession();
    if (session) {
        setIsLoggedIn(true);
    }
    setIsAuthChecking(false);

    // Load Data
    const storedUpvotesString = localStorage.getItem('userUpvotes');
    if (storedUpvotesString) {
      try { setUserUpvotes(JSON.parse(storedUpvotesString)); } catch (e) { setUserUpvotes([]); }
    }
    const storedLibrary = localStorage.getItem('cryptoWatchlist');
    if (storedLibrary) {
      try { setReadingList(JSON.parse(storedLibrary)); } catch (e) { setReadingList([]); }
    }
    setPapers(PAPERS);
  }, []);

  useEffect(() => { localStorage.setItem('cryptoWatchlist', JSON.stringify(readingList)); }, [readingList]);
  useEffect(() => { localStorage.setItem('userUpvotes', JSON.stringify(userUpvotes)); }, [userUpvotes]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
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

  if (isAuthChecking) return <LoadingScreen />;

  // --- PUBLIC VIEW ---
  if (!isLoggedIn) {
    return (
      <ErrorBoundary>
        <Suspense fallback={<LoadingScreen />}>
            <LandingPage onLoginClick={() => setShowLoginModal(true)} />
            {showLoginModal && (
                <Login onClose={() => setShowLoginModal(false)} onLogin={handleLoginSuccess} />
            )}
        </Suspense>
      </ErrorBoundary>
    );
  }

  // --- PRIVATE DASHBOARD VIEW ---
  return (
    <ErrorBoundary>
        <div className="flex h-screen bg-[#FFF8F0] overflow-hidden">
        <Suspense fallback={<LoadingScreen />}>
            {/* 1. Sidebar Layout */}
            <Navbar 
                onNavClick={handleNavClick} 
                activeCategory={activeCategory}
                cartCount={readingList.length}
                onOpenCart={() => setIsReadingListOpen(true)}
                onLogout={handleLogout}
            />

            {/* 2. Main Content Area */}
            <main className="flex-1 overflow-y-auto overflow-x-hidden h-full relative p-4 md:p-8 scroll-smooth">
                <div className="max-w-[1600px] mx-auto min-h-full pb-20">
                    
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

            <CartDrawer 
                isOpen={isReadingListOpen}
                onClose={() => setIsReadingListOpen(false)}
                items={readingList}
                onRemoveItem={handleToggleSave} 
                onItemClick={handleProductClick}
            />
            
            {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
            <Mascot />
        </Suspense>
        </div>
    </ErrorBoundary>
  );
};

export default App;
