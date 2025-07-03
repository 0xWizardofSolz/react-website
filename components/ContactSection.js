// --- Contact Section Component ---
import React, {memo, useCallback, useRef, useState} from "react";
import {LoaderCircle} from "lucide-react";

const ContactSection = memo(() => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState({});
    const [formStatus, setFormStatus] = useState({ submitting: false, success: false, error: '' });
    const textareaRef = useRef(null);
    const isResizing = useRef(false);
    const startY = useRef(0);
    const startHeight = useRef(0);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({...prev, [name]: null}));
        }
    }, [errors]);

    const validateForm = useCallback(() => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name ist erforderlich.";
        if (!formData.email.trim()) {
            newErrors.email = "E-Mail ist erforderlich.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
        }
        if (!formData.message.trim()) newErrors.message = "Nachricht ist erforderlich.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    const handleResizeMouseMove = useCallback((e) => { if (isResizing.current) { const newHeight = startHeight.current + e.clientY - startY.current; textareaRef.current.style.height = `${Math.max(120, newHeight)}px`; } }, []);
    const handleResizeMouseUp = useCallback(() => { isResizing.current = false; window.removeEventListener('mousemove', handleResizeMouseMove); window.removeEventListener('mouseup', handleResizeMouseUp); }, [handleResizeMouseMove]);
    const handleResizeMouseDown = useCallback((e) => { isResizing.current = true; startY.current = e.clientY; startHeight.current = textareaRef.current.clientHeight; window.addEventListener('mousemove', handleResizeMouseMove); window.addEventListener('mouseup', handleResizeMouseUp); }, [handleResizeMouseMove, handleResizeMouseUp]);

    const encode = (data) => Object.keys(data).map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setFormStatus({ submitting: true, success: false, error: '' });

        try {
            const response = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: encode({ 'form-name': 'contact', ...formData }) });
            if (!response.ok) throw new Error(`Server error: ${response.statusText}`);
            setFormStatus({ submitting: false, success: true, error: '' });
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            setFormStatus({ submitting: false, success: false, error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.' });
            console.error('Form submission error:', error);
        }
    }, [formData, validateForm]);

    return (
        <Section id="contact">
            <SectionCard className="max-w-3xl">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 dark:text-white mb-8">Kontakt</h2>
                {formStatus.success ? (
                    <div className="text-center p-8 bg-green-100 dark:bg-green-900/50 rounded-lg">
                        <h3 className="text-2xl font-bold text-green-800 dark:text-green-300">Vielen Dank!</h3>
                        <p className="text-green-700 dark:text-green-200 mt-2">Ihre Nachricht wurde erfolgreich gesendet. Ich werde mich in Kürze bei Ihnen melden.</p>
                    </div>
                ) : (
                    <form name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={handleSubmit} noValidate>
                        <input type="hidden" name="form-name" value="contact" />
                        <p className="hidden"><label>Don't fill this out if you're human: <input name="bot-field" /></label></p>

                        <div className="grid md:grid-cols-2 gap-6 mb-4">
                            <div>
                                <label htmlFor="name" className="block text-slate-500 dark:text-slate-400 mb-2 font-mono text-sm">Name</label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className={`w-full bg-slate-100 dark:bg-slate-900 border ${errors.name ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'} rounded-md py-2 px-4 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500`} required autoComplete="name" />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-slate-500 dark:text-slate-400 mb-2 font-mono text-sm">Email</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className={`w-full bg-slate-100 dark:bg-slate-900 border ${errors.email ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'} rounded-md py-2 px-4 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500`} required autoComplete="email" />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>
                        </div>

                        <div className="mb-4 relative">
                            <label htmlFor="message" className="block text-slate-500 dark:text-slate-400 mb-2 font-mono text-sm">Nachricht</label>
                            <textarea ref={textareaRef} id="message" name="message" value={formData.message} onChange={handleInputChange} className={`w-full bg-slate-100 dark:bg-slate-900 border ${errors.message ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'} rounded-md py-2 px-4 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 resize-none`} style={{height: '120px'}} required></textarea>
                            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                            <div id="custom-resize-handle" onMouseDown={handleResizeMouseDown} className="absolute cursor-none p-1" style={{ bottom: '2px', right: '-1px' }}><svg width="10" height="10" viewBox="0 0 10 10" className="stroke-current text-green-500/60 dark:text-green-400/60" style={{ filter: 'drop-shadow(0 0 2px #4ade80)' }}><line x1="1" y1="9" x2="9" y2="1" strokeWidth="1.5" /><line x1="5" y1="9" x2="9" y2="5" strokeWidth="1.5" /></svg></div>
                        </div>

                        <div className="text-center mt-6">
                            <button type="submit" disabled={formStatus.submitting} className="bg-green-500 hover:bg-green-600 text-slate-900 font-bold py-3 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/20 disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center gap-2 w-full md:w-auto mx-auto cursor-none">
                                {formStatus.submitting && <LoaderCircle className="animate-spin" size={20} />}
                                {formStatus.submitting ? 'Wird gesendet...' : 'Nachricht senden'}
                            </button>
                        </div>
                        {formStatus.error && <p className="text-red-500 dark:text-red-400 text-center mt-4">{formStatus.error}</p>}
                    </form>
                )}
            </SectionCard>
        </Section>
    );
});
