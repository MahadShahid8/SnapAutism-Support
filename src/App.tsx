import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { toast, Toaster } from 'react-hot-toast';
import { Send, Mail, Clock, MessageSquare } from 'lucide-react';
import logoImage from './logo-playstore.png';  // Add this at the top with other imports


// Type definitions for environment variables
declare global {
  interface ImportMetaEnv {
    VITE_EMAILJS_SERVICE_ID: string;
    VITE_EMAILJS_TEMPLATE_ID: string;
    VITE_EMAILJS_PUBLIC_KEY: string;
  }
}

function App() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState('contact');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    // Check if environment variables are available
    if (!import.meta.env.VITE_EMAILJS_SERVICE_ID || 
        !import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 
        !import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
      toast.error('EmailJS configuration is missing');
      return;
    }

    setIsSubmitting(true);
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      toast.success('Message sent successfully!');
      formRef.current.reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast.error('Failed to send message. Please try again.');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#0A192F] text-white">
      <Toaster position="top-center" />
      
      {/* Header Section */}
      <header className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <img 
            src={logoImage} 
            alt="SnapAutism Logo" 
            className="w-48 h-48 mx-auto mb-6"
          />
          <h1 className="text-4xl font-bold text-[#00A3FF] mb-2">SnapAutism</h1>
          <p className="text-xl text-gray-300 mb-8">Official Support Center</p>
          
          {/* Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveSection('about')}
              className={`px-6 py-2 rounded-full ${
                activeSection === 'about' ? 'bg-[#00A3FF]' : 'bg-[#112240]'
              }`}
            >
              About App
            </button>
            <button
              onClick={() => setActiveSection('faq')}
              className={`px-6 py-2 rounded-full ${
                activeSection === 'faq' ? 'bg-[#00A3FF]' : 'bg-[#112240]'
              }`}
            >
              FAQ
            </button>
            <button
              onClick={() => setActiveSection('contact')}
              className={`px-6 py-2 rounded-full ${
                activeSection === 'contact' ? 'bg-[#00A3FF]' : 'bg-[#112240]'
              }`}
            >
              Contact Support
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          
          {/* About Section */}
          {activeSection === 'about' && (
            <div className="bg-[#112240] p-8 rounded-lg shadow-xl mb-8">
              <h2 className="text-2xl font-bold text-[#00A3FF] mb-6">About SnapAutism</h2>
              <div className="space-y-6">
                <p className="text-gray-300">
                  SnapAutism is a revolutionary app designed to support children with autism through 
                  innovative screening system with added communication tools. Our app helps bridge communication 
                  gaps and promotes early diagnosis.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-[#1E3A8A] rounded-lg">
                    <h3 className="font-bold text-[#00A3FF] mb-2">Key Features</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>• AI Supported Diagnostic System</li>
                      <li>• Visual Communication Tools</li>
                      <li>• Test History</li>
                      <li>• Professional Psychologist Consultation</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-[#1E3A8A] rounded-lg">
                    <h3 className="font-bold text-[#00A3FF] mb-2">Support Hours</h3>
                    <p className="text-gray-300">
                      Our support team is available Monday through Friday, 9:00 AM to 5:00 PM EST.
                      Typical response time is within 24 hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FAQ Section */}
          {activeSection === 'faq' && (
            <div className="bg-[#112240] p-8 rounded-lg shadow-xl mb-8">
              <h2 className="text-2xl font-bold text-[#00A3FF] mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div className="p-4 bg-[#1E3A8A] rounded-lg">
                  <h3 className="font-bold text-white mb-2">How do I get started with SnapAutism?</h3>
                  <p className="text-gray-300">
                    After downloading the app, sign up after creating an account. Use a valid email address to sign up to our app. A one time verification code would be sent to your entered email. Enter the sent code in the space provided to register to our app
                  </p>
                </div>
                <div className="p-4 bg-[#1E3A8A] rounded-lg">
                  <h3 className="font-bold text-white mb-2">How can I consult a psychologist?</h3>
                  <p className="text-gray-300">
                    We have professional psychologists registered with our app. View their available timing and book a slot. Only after the confirmation from the psychologist, one can have a online Google meet with the Psychologist
                  </p>
                </div>
               
                <div className="p-4 bg-[#1E3A8A] rounded-lg">
                  <h3 className="font-bold text-white mb-2">What devices are supported?</h3>
                  <p className="text-gray-300">
                    SnapAutism is available on iOS devices running iOS 13.0 or later. We're actively 
                    working on Android support.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Contact Form Section */}
          {activeSection === 'contact' && (
            <div className="space-y-8">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#112240] p-6 rounded-lg text-center">
                  <Mail className="w-8 h-8 text-[#00A3FF] mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Email Support</h3>
                  <p className="text-gray-300">snapautismapp@gmail.com</p>
                </div>
                <div className="bg-[#112240] p-6 rounded-lg text-center">
                  <Clock className="w-8 h-8 text-[#00A3FF] mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Response Time</h3>
                  <p className="text-gray-300">Within 24 hours</p>
                </div>
                <div className="bg-[#112240] p-6 rounded-lg text-center">
                  <MessageSquare className="w-8 h-8 text-[#00A3FF] mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Support Hours</h3>
                  <p className="text-gray-300">Mon-Fri, 9AM-5PM EST</p>
                </div>
              </div>

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-6 bg-[#112240] p-8 rounded-lg shadow-xl"
              >
                <h2 className="text-2xl font-bold text-[#00A3FF] mb-6">Contact Support</h2>
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="user_name"
                    required
                    className="w-full px-4 py-2 rounded-md bg-[#1E3A8A] border border-[#2E4FB0] focus:border-[#00A3FF] focus:ring-1 focus:ring-[#00A3FF] outline-none transition"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="user_email"
                    required
                    className="w-full px-4 py-2 rounded-md bg-[#1E3A8A] border border-[#2E4FB0] focus:border-[#00A3FF] focus:ring-1 focus:ring-[#00A3FF] outline-none transition"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-2 rounded-md bg-[#1E3A8A] border border-[#2E4FB0] focus:border-[#00A3FF] focus:ring-1 focus:ring-[#00A3FF] outline-none transition"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full px-4 py-2 rounded-md bg-[#1E3A8A] border border-[#2E4FB0] focus:border-[#00A3FF] focus:ring-1 focus:ring-[#00A3FF] outline-none transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#00A3FF] hover:bg-[#0081CC] text-white font-medium py-3 px-6 rounded-md transition duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;