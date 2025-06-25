import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FiMail, FiUser, FiMessageSquare, FiSend, FiX, FiLinkedin, FiGithub } from "react-icons/fi";

// Componente del Modal con mejor tema dark
function ModalContent({ isOpen, onClose }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío del formulario
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Cerrar modal después de 2 segundos
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2000);
    }, 1500);
  };

  const isFormValid = formData.name && formData.email && formData.message;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999999] flex items-center justify-center p-4"
        >
          {/* Backdrop mejorado */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm dark:bg-black/75"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-hidden"
          >
            {/* Modal Card */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Header */}
              <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {t('contact.title', 'Get In Touch')}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {t('contact.subtitle', "Let's work together on something great!")}
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 dark:text-gray-400"
                  >
                    <FiX size={20} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] bg-white dark:bg-gray-900">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <FiUser className="inline w-4 h-4 mr-2" />
                        {t('contact.name', 'Name')} *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                          bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                          focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 focus:border-transparent
                          transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder={t('contact.namePlaceholder', 'Your full name')}
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <FiMail className="inline w-4 h-4 mr-2" />
                        {t('contact.email', 'Email')} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                          bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                          focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 focus:border-transparent
                          transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder={t('contact.emailPlaceholder', 'your.email@example.com')}
                      />
                    </div>

                    {/* Subject Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <FiMessageSquare className="inline w-4 h-4 mr-2" />
                        {t('contact.subject', 'Subject')}
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                          bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                          focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 focus:border-transparent
                          transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder={t('contact.subjectPlaceholder', 'Project collaboration, job opportunity, etc.')}
                      />
                    </div>

                    {/* Message Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <FiMessageSquare className="inline w-4 h-4 mr-2" />
                        {t('contact.message', 'Message')} *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                          bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                          focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 focus:border-transparent
                          transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                        placeholder={t('contact.messagePlaceholder', 'Tell me about your project or how we can work together...')}
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={!isFormValid || isSubmitting}
                      className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2
                        ${isFormValid && !isSubmitting
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                          : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                        }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>{t('contact.sending', 'Sending...')}</span>
                        </>
                      ) : (
                        <>
                          <FiSend className="w-5 h-5" />
                          <span>{t('contact.send', 'Send Message')}</span>
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  // Success Message
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {t('contact.success.title', 'Message Sent!')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {t('contact.success.message', "Thanks for reaching out! I'll get back to you soon.")}
                    </p>
                  </motion.div>
                )}

                {/* Social Links */}
                {!submitted && (
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
                      {t('contact.alternative', 'Or connect with me on:')}
                    </p>
                    <div className="flex justify-center gap-4">
                      <a
                        href="https://linkedin.com/in/tu-linkedin"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 
                          hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all duration-200 hover:scale-105"
                      >
                        <FiLinkedin className="w-5 h-5" />
                      </a>
                      <a
                        href="https://github.com/tu-github"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 
                          hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
                      >
                        <FiGithub className="w-5 h-5" />
                      </a>
                      <a
                        href="mailto:tu@email.com"
                        className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 
                          hover:bg-green-100 dark:hover:bg-green-900/40 transition-all duration-200 hover:scale-105"
                      >
                        <FiMail className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Componente principal que usa Portal
export default function ContactModal({ isOpen, onClose }) {
  // Cerrar modal con Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Renderizar el modal en un Portal
  return createPortal(
    <ModalContent isOpen={isOpen} onClose={onClose} />,
    document.body
  );
}