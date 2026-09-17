'use client';

import { useState, useEffect } from 'react';
import { API_URL } from '../api';

export default function FAQSection() {
  // FAQ Section Header ke liye state (CMS dynamic)
  const [sectionHeader, setSectionHeader] = useState({
    tagline: '✨ Got Questions?',
    heading: 'Frequently Asked Questions',
    subheading: 'Aapke man mein uthne wale saare sawaalon ke jawaab yahan mil jayenge.',
  });

  // Strapi se FAQ Section header fetch karne ke liye useEffect
  useEffect(() => {
    async function fetchFAQHeader() {
      try {
        const res = await fetch(`${API_URL}/api/faq-section`);
        const json = await res.json();
        if (json && json.data) {
          setSectionHeader({
            tagline: json.data.tagline || sectionHeader.tagline,
            heading: json.data.heading || sectionHeader.heading,
            subheading: json.data.subheading || sectionHeader.subheading,
          });
        }
      } catch (error) {
        console.error('Error fetching FAQ section header from Strapi:', error);
      }
    }

    fetchFAQHeader();
  }, []);

  // FAQs list
  const faqs = [
    {
      question: 'Kya ye saari Poshak aur Shringar Aligarh mein hi banaye jaate hain?',
      answer: 'Haan ji! Humari saari poshak aur shringar vastra Aligarh ke experienced aur traditional artisans dwara pure silk, velvet aur gold zardozi threads se hath (handcrafted) se tayaar kiye jaate hain.',
    },
    {
      question: 'Kya main apne Deity (Laddu Gopal / Radha Rani) ke size ke mutabiq custom poshak banwa sakta hoon?',
      answer: 'Bilkul! Agar aapko apne vigrah ke exact size ya specific color combination ke mutabiq poshak chahiye, toh aap humse contact kar sakte hain. Hum custom order bhi accept karte hain.',
    },
    {
      question: 'Delivery mein kitna samay lagta hai aur packing kaisi hoti hai?',
      answer: 'Order place hone ke baad standard delivery mein 3 se 5 working days lagte hain. Poshak par zardozi aur heavy work hone ki wajah se hum multi-layer secure aur waterproof packaging karte hain taaki vastra bilkul safe pahunche.',
    },
    {
      question: 'Kya product pasand na aane par return ya exchange ho sakta hai?',
      answer: 'Agar product mein koi manufacturing defect ya damage hai, toh delivery ke 48 ghante ke andar aap exchange ke liye request daal sakte hain. Pavitrata aur seva ko dhyan mein rakhte hue return policy ke kuch standard niyam lagu hote hain.',
    },
    {
      question: 'Poshak ki safai aur maintenance kaise karni chahiye?',
      answer: 'Kyunki inmein heavy zardozi, moti aur gotta-patti ka kaam hota hai, isliye inhein machine wash ya harsh chemical wash nahi karna chahiye. Hamesha gentle dry clean hi recommend kiya jata hai.',
    },
  ];

  // State to track which FAQ is open (null matlab sab band hain)
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-amber-50/40 via-white to-amber-50/50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        
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

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden shadow-xs hover:shadow-md ${
                  isOpen ? 'border-amber-500 ring-1 ring-amber-500/20' : 'border-amber-200/60'
                }`}
              >
                {/* Question Header */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer group"
                >
                  <span className="font-serif font-bold text-lg text-amber-950 group-hover:text-amber-700 transition-colors">
                    {faq.question}
                  </span>
                  
                  {/* Animated Arrow Icon */}
                  <span className={`w-8 h-8 rounded-full bg-amber-50 text-amber-900 flex items-center justify-center font-bold transition-transform duration-300 flex-shrink-0 ${
                    isOpen ? 'rotate-180 bg-amber-100 text-amber-700' : 'group-hover:bg-amber-100'
                  }`}>
                    ↓
                  </span>
                </button>

                {/* Animated Answer Body */}
                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-96 opacity-100 px-6 pb-6 pt-0' : 'max-h-0 opacity-0 px-6 pb-0 pt-0'
                  }`}
                >
                  <div className="pt-3 border-t border-amber-100 text-gray-600 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}