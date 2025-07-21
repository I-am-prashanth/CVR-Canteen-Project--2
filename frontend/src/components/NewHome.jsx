import React from 'react';
import ItemComponent from './ItemComponent';

function Home() {
  const categories = [
    { name: "🍒🍏 FRUIT STALL 🍎🍒", id: "fruits" },
    { name: "🍔🍟 FAST FOOD 🍔🍟", id: "fastfood" },
    { name: "SHAWARMA POINT", id: "shawarma" },
    { name: "GENERAL STORE", id: "general" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li><a>Homepage</a></li>
              <li><a>Portfolio</a></li>
              <li><a>About</a></li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl font-bold">CVR CANTEEN</a>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </button>
        </div>
      </nav>

      {/* Information Alert */}
      <div role="alert" className="alert alert-info mx-4 mt-4 shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-6 w-6 shrink-0 stroke-current">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span className='text-sm md:text-lg'>
          Select items, pay online, and show the token at the counter
        </span>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-4">
        {/* Featured Items */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center mb-4">TODAY'S SPECIAL</h2>
          <div className="flex overflow-x-auto pb-6 pl-4 gap-4 md:grid md:grid-cols-4 md:gap-4 md:pl-0">
            <div className="min-w-[85vw] md:min-w-0">
              <ItemComponent />
            </div>
            <div className="min-w-[85vw] md:min-w-0">
              <ItemComponent />
            </div>
            <div className="min-w-[85vw] md:min-w-0">
              <ItemComponent />
            </div>
            <div className="min-w-[85vw] md:min-w-0">
              <ItemComponent />
            </div>
          </div>
        </div>

        {/* Category Sections */}
        {categories.map((category) => (
          <section key={category.id} className="mb-10">
            <div className="text-2xl md:text-3xl rounded-md font-bold text-center py-3 mb-4 bg-gray-700 text-white tracking-wide">
              {category.name}
            </div>
            <div className="flex overflow-x-auto pb-6 pl-4 gap-4 md:grid md:grid-cols-4 md:gap-4 md:pl-0">
              <div className="min-w-[85vw] md:min-w-0">
                <ItemComponent />
              </div>
              <div className="min-w-[85vw] md:min-w-0">
                <ItemComponent />
              </div>
              <div className="min-w-[85vw] md:min-w-0">
                <ItemComponent />
              </div>
              <div className="min-w-[85vw] md:min-w-0">
                <ItemComponent />
              </div>
            </div>
          </section>
        ))}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-8">
        {/* ... footer code remains the same ... */}
      </footer>
    </div>
  );
}

export default Home;