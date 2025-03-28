"use client";

import React, { useState, useRef } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

export default function Settings() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setProfileImage(event.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="flex min-h-screen">
            {isSidebarVisible && <Sidebar />}
            <div className="flex-1 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500">
                <Header onMenuClick={toggleSidebar} />
                <div className="p-4">
                    <h2 className="text-2xl font-bold mb-6">Settings</h2>

                    <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-2/3">
                        <div className="flex items-center mb-6">
                            <div className="relative">
                                <div
                                    className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden cursor-pointer"
                                    onClick={triggerFileInput}
                                >
                                    {profileImage ? (
                                        <img
                                            src={profileImage}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-gray-500 text-2xl">👤</span>
                                    )}
                                </div>
                                <button
                                    className="absolute -bottom-2 -right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-blue-600 transition-colors"
                                    onClick={triggerFileInput}
                                >
                                    +
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                            </div>
                            <h3 className="ml-4 text-xl font-semibold">Change Profile</h3>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 mb-2">Username</label>
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className="flex-1 p-2 border rounded bg-gray-50"
                                />
                                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors">
                                    Update
                                </button>
                            </div>
                        </div>

                        <div className="border-t pt-6">
                            <h3 className="text-xl font-semibold mb-4">Change Password</h3>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-gray-700 mb-1">Current Password</label>
                                    <input
                                        type="password"
                                        placeholder="Current Password"
                                        className="w-full p-2 border rounded bg-gray-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-1">New password</label>
                                    <input
                                        type="password"
                                        placeholder="New password"
                                        className="w-full p-2 border rounded bg-gray-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-1">Confirm new password</label>
                                    <input
                                        type="password"
                                        placeholder="Confirm new password"
                                        className="w-full p-2 border rounded bg-gray-50"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors">
                                    Update
                                </button>
                                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}