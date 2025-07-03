// src/components/Reusable.js
import React from 'react';

/**
 * A reusable section wrapper component with consistent padding.
 */
export const Section = ({ children, id, className = '' }) => (
  <section id={id} className={`py-20 scroll-mt-20 ${className}`}>
    {children}
  </section>
);

/**
 * A reusable card component with consistent styling for sections.
 */
export const SectionCard = ({ children, className = '' }) => (
    <div className={`bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-green-900/30 rounded-lg shadow-2xl shadow-slate-300/20 dark:shadow-green-900/10 p-8 mx-auto ${className}`}>
        {children}
    </div>
);
