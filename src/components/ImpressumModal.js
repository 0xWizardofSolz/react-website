// src/components/ImpressumModal.js
import React, { memo } from 'react';
import { X } from 'lucide-react';

const ImpressumModal = memo(({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-50 flex justify-center items-center p-4" onClick={onClose}>
    <div className="bg-slate-100 dark:bg-slate-800 rounded-lg shadow-2xl max-w-2xl w-full max-h-full overflow-y-auto p-8 relative border border-slate-300 dark:border-green-700" onClick={(e) => e.stopPropagation()}>
      <button onClick={onClose} className="absolute top-4 right-4 text-slate-600 dark:text-slate-500 hover:text-green-600 dark:hover:text-green-400 transition-colors cursor-none" aria-label="Impressum schließen">
        <X size={24} />
      </button>
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Impressum</h3>
      <div className="text-slate-700 dark:text-slate-300 space-y-4 font-mono text-sm">
        <p><strong>Ragusa IT-Consulting</strong><br />
        Melvin Ragusa<br />
        Provinzialstraße 177 <br />
        44388 Dortmund<br />
        Deutschland</p>
        <p><strong>Inhaber:</strong><br />Melvin Ragusa</p>
        <p><strong>Kontakt:</strong><br />Telefon: +49 1529 2608773<br />E-Mail: kontakt@ragusa-it.dev</p>
        <p><strong>Verantwortlich für den Inhalt (gemäß § 55 Abs. 2 RStV):</strong><br />Melvin Ragusa<br />(Anschrift wie oben)</p>
        <p><strong>Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.</strong></p>
      </div>
    </div>
  </div>
));

export default ImpressumModal;
