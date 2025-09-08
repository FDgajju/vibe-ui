import React from 'react';

const Feed: React.FC = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-fuchsia-600 text-white mb-10">
        <div className="px-6 md:px-10 lg:px-12 py-14 md:py-16 lg:py-20">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Discover, share, and vibe together</h1>
            <p className="mt-4 text-white/90 md:text-lg">Curated posts from people and topics you follow. Join the conversation and find your next inspiration.</p>
            <div className="mt-6 flex items-center gap-3">
              <button className="inline-flex items-center rounded-md bg-white text-purple-700 font-semibold px-4 py-2.5 shadow-sm hover:bg-purple-50 transition">Create Post</button>
              <button className="inline-flex items-center rounded-md bg-white/10 text-white font-semibold px-4 py-2.5 ring-1 ring-inset ring-white/30 hover:bg-white/15 transition">Explore</button>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 md:h-72 md:w-72 rounded-full bg-white/10 blur-3xl" />
      </section>

      {/* Feed grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <article className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 overflow-hidden">
          <div className="aspect-video bg-gray-100">
            <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop" alt="Mountains" className="h-full w-full object-cover" />
          </div>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center rounded-full bg-purple-50 text-purple-700 text-xs font-medium px-2 py-1 ring-1 ring-purple-200">Travel</span>
              <span className="inline-flex items-center rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium px-2 py-1 ring-1 ring-indigo-200">Photography</span>
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">Exploring the Mountains</h3>
            <p className="text-gray-700 leading-relaxed mb-4">A breathtaking journey through the serene mountains, capturing the essence of nature's beauty and tranquility. Every peak tells a story.</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>By Jane Doe</span>
              <div className="flex items-center gap-3">
                <button className="inline-flex items-center gap-1 text-gray-600 hover:text-purple-700 transition"><span>❤</span><span>128</span></button>
                <button className="inline-flex items-center gap-1 text-gray-600 hover:text-purple-700 transition"><span>💬</span><span>24</span></button>
              </div>
            </div>
          </div>
        </article>

        <article className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 overflow-hidden">
          <div className="aspect-video bg-gray-100">
            <img src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200&auto=format&fit=crop" alt="Food" className="h-full w-full object-cover" />
          </div>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center rounded-full bg-pink-50 text-pink-700 text-xs font-medium px-2 py-1 ring-1 ring-pink-200">Food</span>
              <span className="inline-flex items-center rounded-full bg-amber-50 text-amber-700 text-xs font-medium px-2 py-1 ring-1 ring-amber-200">Travel</span>
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">Culinary Delights: A Food Tour</h3>
            <p className="text-gray-700 leading-relaxed mb-4">Indulge in a gastronomic adventure, exploring diverse cuisines and hidden culinary gems. From street food to fine dining, a treat for your taste buds.</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>By John Smith</span>
              <div className="flex items-center gap-3">
                <button className="inline-flex items-center gap-1 text-gray-600 hover:text-purple-700 transition"><span>❤</span><span>89</span></button>
                <button className="inline-flex items-center gap-1 text-gray-600 hover:text-purple-700 transition"><span>💬</span><span>12</span></button>
              </div>
            </div>
          </div>
        </article>

        <article className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 overflow-hidden">
          <div className="aspect-video bg-gray-100">
            <img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop" alt="Photography" className="h-full w-full object-cover" />
          </div>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center rounded-full bg-sky-50 text-sky-700 text-xs font-medium px-2 py-1 ring-1 ring-sky-200">Art</span>
              <span className="inline-flex items-center rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium px-2 py-1 ring-1 ring-indigo-200">Photography</span>
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">The Art of Photography</h3>
            <p className="text-gray-700 leading-relaxed mb-4">Unveiling the secrets behind captivating photographs, from composition techniques to lighting mastery. A visual journey through the lens.</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>By Emily White</span>
              <div className="flex items-center gap-3">
                <button className="inline-flex items-center gap-1 text-gray-600 hover:text-purple-700 transition"><span>❤</span><span>53</span></button>
                <button className="inline-flex items-center gap-1 text-gray-600 hover:text-purple-700 transition"><span>💬</span><span>8</span></button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Feed;