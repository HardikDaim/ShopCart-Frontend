import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = (e) => {
        e.preventDefault();
        // Handle password change logic here
        console.log('Password changed');
    };

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-200">
            <Header />
            <main className="container mx-auto p-4">
                <h2 className="text-xl font-semibold mb-4 text-center">Change Password</h2>
                <form 
                    className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-md max-w-md mx-auto"
                    onSubmit={handleChangePassword}
                >
                    <div className="mb-4">
                        <label 
                            htmlFor="current-password" 
                            className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300"
                        >
                            Current Password
                        </label>
                        <input 
                            type="password" 
                            id="current-password" 
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200"
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label 
                            htmlFor="new-password" 
                            className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300"
                        >
                            New Password
                        </label>
                        <input 
                            type="password" 
                            id="new-password" 
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200"
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label 
                            htmlFor="confirm-password" 
                            className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300"
                        >
                            Confirm New Password
                        </label>
                        <input 
                            type="password" 
                            id="confirm-password" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200"
                            required 
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
                    >
                        Change Password
                    </button>
                </form>
            </main>
            <Footer />
        </div>
    );
};

export default ChangePassword;
