'use client';

import { useState, useEffect } from 'react';
import { API_URL } from '../api';

export default function Reviews() {
  // Review Section Header ke liye state (CMS dynamic)
  const [sectionHeader, setSectionHeader] = useState({
    tagline: '✨ Devotees Love',
    heading: 'What Bhakts Say About Us',
    subheading: 'Read heartfelt experiences from devotees who adorned their deities with Madhav Radha poshak.',
  });

  // Strapi se Review Section header fetch karne ke liye useEffect
  useEffect(() => {
    async function fetchReviewHeader() {
      try {
        const res = await fetch(`${API_URL}/api/review-section`);
        const json = await res.json();
        if (json && json.data) {
          setSectionHeader({
            tagline: json.data.tagline || sectionHeader.tagline,
            heading: json.data.heading || sectionHeader.heading,
            subheading: json.data.subheading || sectionHeader.subheading,
          });
        }
      } catch (error) {
        console.error('Error fetching review section header from Strapi:', error);
      }
    }

    fetchReviewHeader();
  }, []);

  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: 'Sunita Sharma',
      location: 'Mathura',
      rating: 5,
      comment: 'Thakur ji ki poshak ka fabric aur zardozi work behad sundar hai! Aligarh se aisi pure quality ki ummeed nahi thi, it is truly divine.',
      date: '2 days ago',
    },
    {
      id: 2,
      name: 'Rahul Verma',
      location: 'Delhi',
      rating: 5,
      comment: 'Poshak ki fitting aur color combination ekdum perfect hai. Laddu Gopal par ye vastra bahut aloukik lag rahe hain. Highly recommended!',
      date: '1 week ago',
    },
    {
      id: 3,
      name: 'Pooja Agrawal',
      location: 'Vrindavan',
      rating: 5,
      comment: 'Packing bohot secure thi aur delivery bhi time par mil gayi. Madhav Radha ki craftsmanship bilkul authentic hai. 🙏',
      date: '2 weeks ago',
    },
  ]);

  // Popup modal open/close state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Jab popup open ho tab background scroll freeze karne ke liye
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  const [newReview, setNewReview] = useState({
    name: '',
    location: '',
    rating: 5, // Default rating 5 rahegi, par user change kar sakega
    comment: '',
  });

  // Hover effect ke liye star state (optional UX enhancement)
  const [hoverRating, setHoverRating] = useState(0);

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;

    const reviewToAdd = {
      id: reviews.length + 1,
      ...newReview,
      date: 'Just now',
    };

    setReviews([reviewToAdd, ...reviews]);
    setNewReview({ name: '', location: '', rating: 5, comment: '' });
    setSubmitted(true);
    
    // 2 seconds baad popup apne aap close ho jayega
    setTimeout(() => {
      setSubmitted(false);
      setIsModalOpen(false);
    }, 2000);
  };

  return (
    <section id="reviews" className="py-24 bg-gradient-to-b from-white via-amber-50/40 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header - Dynamic from Strapi */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 font-semibold text-xs tracking-widest uppercase shadow-xs">
            {sectionHeader.tagline}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-amber-950 font-serif mt-3">
            {sectionHeader.heading}
          </h2>
          <p className="text-gray-600 mt-3 text-lg">
            {sectionHeader.subheading}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {reviews.map((rev) => (
            <div 
              key={rev.id}
              className="bg-white p-8 rounded-3xl border border-amber-200/60 shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col justify-between group"
            >
              <div>
                <div className="flex gap-1 mb-4 text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <span key={i} className="text-lg">★</span>
                  ))}
                </div>
                
                <p className="text-gray-700 italic leading-relaxed text-sm">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-amber-100 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-amber-950 font-serif">{rev.name}</h4>
                  <p className="text-xs text-gray-500">{rev.location}</p>
                </div>
                <span className="text-xs text-gray-400 font-medium">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Trigger Button with Pulse Animation */}
        <div className="text-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="relative inline-flex items-center gap-3 px-8 py-2 rounded-full bg-gradient-to-r from-amber-700 to-orange-600 text-white font-bold shadow-xl hover:from-amber-800 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer group animate-pulse"
          >
            <span className="absolute -inset-1 rounded-full bg-amber-400 opacity-50 blur-md animate-ping"></span>
            <span className="relative z-10 text-xl">✍️</span>
            <span className="relative z-10 text-base">Share Your Experience</span>
          </button>
        </div>

        {/* --- POPUP MODAL FOR REVIEW SUBMISSION --- */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            
            <div className="relative w-full max-w-lg bg-white p-8 sm:p-10 rounded-3xl border border-amber-200 shadow-2xl overflow-hidden transform transition-all animate-scale-up">
              
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-700"></div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-amber-50 text-amber-900 flex items-center justify-center font-bold hover:bg-amber-100 transition cursor-pointer"
              >
                ✕
              </button>

              <h3 className="text-2xl font-bold text-amber-950 font-serif mb-2 text-center">
                Share Your Experience
              </h3>
              <p className="text-gray-600 text-sm text-center mb-6">
                Aapka anubhav doosre bhakto ki madad karega. Apna review share karein!
              </p>

              {submitted ? (
                <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-center text-sm font-medium animate-fade-in">
                  🙏 Dhanyawad! Aapka review successfully add ho gaya hai.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Interactive Star Rating Selector */}
                  <div className="text-center mb-2">
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Select Your Rating</label>
                    <div className="flex justify-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="text-2xl focus:outline-none transition transform hover:scale-110 cursor-pointer"
                        >
                          <span className={(hoverRating || newReview.rating) >= star ? 'text-amber-500' : 'text-gray-300'}>
                            ★
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Priya Sharma"
                        value={newReview.name}
                        onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-amber-600 text-sm bg-amber-50/20 text-gray-900 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">City / Location</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vrindavan"
                        value={newReview.location}
                        onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-amber-600 text-sm bg-amber-50/20 text-gray-900 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Your Review / Message</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Write about the quality, design, and divine feel..."
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-amber-600 text-sm bg-amber-50/20 text-gray-900 font-medium resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-amber-700 py-3.5 text-white font-semibold shadow-md hover:bg-amber-800 transition-all duration-300 transform active:scale-95 cursor-pointer text-sm"
                  >
                    Submit Review ✨
                  </button>
                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
}