
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';

interface LoginProps {
  onClose: () => void;
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose, onLogin }) => {
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
        setLoading(false);
        onLogin();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#4A4A4A]/40 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden animate-slide-up-fade">
         
         {/* Decorative Header */}
         <div className="bg-[#6A4FBF] p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="relative z-10">
                <div className="w-16 h-16 bg-white rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl shadow-lg">
                    {role === 'student' ? '🎓' : '🍎'}
                </div>
                <h2 className="text-2xl font-bold text-white">Welcome Back!</h2>
                <p className="text-white/80 text-sm">Sign in to continue your journey.</p>
            </div>
         </div>

         <div className="p-8">
             {/* Role Toggles */}
             <div className="flex bg-[#F5F5F5] p-1 rounded-xl mb-8">
                 <button 
                    onClick={() => setRole('student')}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${role === 'student' ? 'bg-white text-[#6A4FBF] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                 >
                    Student
                 </button>
                 <button 
                    onClick={() => setRole('teacher')}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${role === 'teacher' ? 'bg-white text-[#6A4FBF] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                 >
                    Teacher / Parent
                 </button>
             </div>

             <form onSubmit={handleSubmit} className="space-y-6">
                 <div>
                     <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        {role === 'student' ? 'Username or ID' : 'Email Address'}
                     </label>
                     <input 
                        type={role === 'student' ? "text" : "email"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#F9F9F9] border border-gray-200 rounded-xl px-4 py-3 text-[#4A4A4A] outline-none focus:border-[#6A4FBF] focus:bg-white transition-all font-medium"
                        placeholder={role === 'student' ? "e.g. AstroKid22" : "name@school.edu"}
                        required
                     />
                 </div>
                 
                 <div>
                     <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        Password
                     </label>
                     <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-[#F9F9F9] border border-gray-200 rounded-xl px-4 py-3 text-[#4A4A4A] outline-none focus:border-[#6A4FBF] focus:bg-white transition-all font-medium"
                        placeholder="••••••••"
                        required
                     />
                 </div>

                 <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#FF9F1C] text-white font-bold py-4 rounded-xl shadow-[0_4px_14px_rgba(255,159,28,0.4)] hover:shadow-[0_6px_20px_rgba(255,159,28,0.6)] hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                 >
                    {loading ? (
                        <>
                           <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
                           Accessing...
                        </>
                    ) : (
                        "Log In"
                    )}
                 </button>
             </form>
             
             <div className="mt-6 text-center">
                 <button onClick={onClose} className="text-sm font-bold text-gray-400 hover:text-[#4A4A4A]">Cancel</button>
             </div>
         </div>
      </div>
    </div>
  );
};

export default Login;
