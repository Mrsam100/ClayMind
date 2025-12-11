
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

// CTO NOTE: This service abstracts the authentication provider.
// Currently acts as a robust mock, but ready to be swapped for Firebase/Auth0.

const STORAGE_KEY = 'claymind_session_v1';
const SESSION_DURATION = 1000 * 60 * 60 * 24; // 24 Hours

interface UserSession {
  token: string;
  expiry: number;
  user: {
    id: string;
    role: 'student' | 'teacher';
    name: string;
  }
}

export const authService = {
  login: async (role: 'student' | 'teacher', identifier: string): Promise<UserSession> => {
    // Simulate API Latency
    await new Promise(resolve => setTimeout(resolve, 800));

    const session: UserSession = {
      token: `mock_token_${Date.now()}_${Math.random().toString(36).substr(2)}`,
      expiry: Date.now() + SESSION_DURATION,
      user: {
        id: identifier,
        role: role,
        name: identifier.split('@')[0] || 'Explorer'
      }
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    return session;
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
  },

  getSession: (): UserSession | null => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    try {
      const session: UserSession = JSON.parse(stored);
      if (Date.now() > session.expiry) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      return session;
    } catch (e) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
  },

  isAuthenticated: (): boolean => {
    return !!authService.getSession();
  }
};
