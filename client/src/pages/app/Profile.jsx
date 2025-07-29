// src/pages/app/Profile.jsx
import React, { useState } from "react";

export default function Profile() {
  // Placeholder for demo user data
  const [user, setUser] = useState({
    name: "Ava Stratifier",
    email: "ava@example.com",
    memberSince: "January 2024",
    avatar: "https://ui-avatars.com/api/?name=Ava+Stratifier&background=0d3b66&color=fff&size=128"
  });

  return (
    <main className="bg-white min-h-screen py-16 px-2">
      <section className="max-w-3xl mx-auto">
        <div className="flex items-center gap-8 mb-10">
          <img src={user.avatar} alt={user.name} className="w-28 h-28 rounded-full shadow-lg"/>
          <div>
            <h1 className="text-4xl font-extrabold text-navyblue">{user.name}</h1>
            <div className="text-lg text-gray-700">{user.email}</div>
            <div className="text-sm text-gray-400">Member since {user.memberSince}</div>
          </div>
        </div>

        <section className="bg-calmblue/10 rounded-xl shadow p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-calmblue">Account Settings</h2>
          <ul className="text-gray-700 space-y-2">
            <li>
              <span className="font-semibold">Name:</span> {user.name}
              {/* Add edit button/input if you want inline editing */}
            </li>
            <li>
              <span className="font-semibold">Email:</span> {user.email}
              {/* For edit/reset add logic here */}
            </li>
            <li>
              <span className="font-semibold">Password:</span> <span className="text-gray-500">********</span> <a href="#" className="text-calmblue underline">Change</a>
            </li>
          </ul>
        </section>

        <section className="bg-calmblue/10 rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold mb-4 text-calmblue">Activity & Preferences</h2>
          <div className="text-gray-700 mb-4">
            <div><span className="font-semibold">Portfolios Created:</span> 2</div>
            <div><span className="font-semibold">Simulated Trades:</span> 32</div>
            <div><span className="font-semibold">Last Login:</span> 4 hours ago</div>
          </div>
          <div>
            <button className="px-4 py-2 border border-calmblue text-calmblue rounded font-bold hover:bg-calmblue/10">Log Out</button>
          </div>
        </section>
      </section>
    </main>
  );
}
