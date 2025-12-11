
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    // In production, log this to Sentry/LogRocket
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF8F0] p-8 text-center">
          <div className="w-24 h-24 bg-[#FF9F1C] rounded-full flex items-center justify-center text-5xl mb-6 shadow-xl">
            🔧
          </div>
          <h1 className="text-3xl font-extrabold text-[#1F1F1F] mb-4">Something went wrong.</h1>
          <p className="text-gray-600 mb-8 max-w-md">
            Our systems encountered an unexpected issue. We've logged the error and our engineers are looking into it.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-[#1F1F1F] text-white rounded-xl font-bold hover:bg-black transition-colors"
          >
            Reload Application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
