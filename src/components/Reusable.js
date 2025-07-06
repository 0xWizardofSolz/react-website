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
 * Updated to match the ImpressumModal styles.
 */
export const SectionCard = ({ children, className = '' }) => (
    <div className={`bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-green-700 rounded-lg shadow-2xl shadow-slate-300/20 dark:shadow-green-900/10 p-8 mx-auto ${className}`}>
        {children}
    </div>
);
