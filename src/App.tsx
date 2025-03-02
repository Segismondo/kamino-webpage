import React from 'react';
import { Menu, X, Clock, MessageCircle, Phone, Mail, MapPin, ChevronRight, Heart, Users, Brain, Sparkles, Facebook } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import emailjs from 'emailjs-com';

function App() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: false,
    error: false,
    message: ''
  });

  const services = [
    { icon: <Heart className="w-12 h-12 text-teal-600" />, title: t('services.individual.title'), description: t('services.individual.description') },
    { icon: <Users className="w-12 h-12 text-teal-600" />, title: t('services.couples.title'), description: t('services.couples.description') },
    { icon: <Brain className="w-12 h-12 text-teal-600" />, title: t('services.anxiety.title'), description: t('services.anxiety.description') },
    { icon: <Sparkles className="w-12 h-12 text-teal-600" />, title: t('services.stress.title'), description: t('services.stress.description') },
  ];

  const pricing = [
    { type: t('pricing.consultation.title'), duration: t('pricing.consultation.duration'), price: "$150", description: t('pricing.consultation.description') },
    { type: t('pricing.individual.title'), duration: t('pricing.individual.duration'), price: "$130", description: t('pricing.individual.description') },
    { type: t('pricing.couples.title'), duration: t('pricing.couples.duration'), price: "$180", description: t('pricing.couples.description') },
    { type: t('pricing.online.title'), duration: t('pricing.online.duration'), price: "$120", description: t('pricing.online.description') },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ ...formStatus, submitting: true, error: false, success: false, message: '' });

   
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      from_phone: formData.phone,
      message: formData.message,
      to_email: 'gabinetkamino@gmail.com'
    };

    
    const serviceID = 'service_d8qhuyf'
    const templateID = 'template_alq2x3t';
    const userID = 'lHRQfs_725a_nJ457';
    
    emailjs.init('lHRQfs_725a_nJ457')

    try {
      await emailjs.send(
        serviceID,
        templateID, 
        templateParams
        
      );
      
      setFormStatus({
        submitting: false,
        success: true,
        error: false,
        message: t('contact.form.successMessage')
      });
      
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      
      
      setTimeout(() => {
        setFormStatus(prev => ({ ...prev, success: false, message: '' }));
      }, 5000);
      
    } catch (error) {
      console.error('Error sending email:', error);
      setFormStatus({
        submitting: false,
        success: false,
        error: true,
        message: t('contact.form.errorMessage')
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-serif text-teal-800">mgr Agata Plura</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-teal-900 hover:text-teal-600">{t('nav.home')}</a>
              <a href="#services" className="text-teal-900 hover:text-teal-600">{t('nav.services')}</a>
              <a href="#about" className="text-teal-900 hover:text-teal-600">{t('nav.about')}</a>
              <a href="#pricing" className="text-teal-900 hover:text-teal-600">{t('nav.pricing')}</a>
              <a href="#contact" className="text-teal-900 hover:text-teal-600">{t('nav.contact')}</a>
              <LanguageSwitcher />
              <a href="#contact" className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition">
                {t('nav.bookNow')}
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <LanguageSwitcher />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-500 hover:text-gray-600"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#home" className="block px-3 py-2 text-teal-900 hover:text-teal-600">{t('nav.home')}</a>
              <a href="#services" className="block px-3 py-2 text-teal-900 hover:text-teal-600">{t('nav.services')}</a>
              <a href="#about" className="block px-3 py-2 text-teal-900 hover:text-teal-600">{t('nav.about')}</a>
              <a href="#pricing" className="block px-3 py-2 text-teal-900 hover:text-teal-600">{t('nav.pricing')}</a>
              <a href="#contact" className="block px-3 py-2 text-teal-900 hover:text-teal-600">{t('nav.contact')}</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-24 bg-gradient-to-b from-teal-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif text-teal-900 mb-6">{t('hero.title')}</h2>
              <p className="text-lg text-gray-600 mb-8">{t('hero.subtitle')}</p>
              <a href="#contact" className="bg-teal-600 text-white px-8 py-3 rounded-md hover:bg-teal-700 transition flex items-center inline-block">
                {t('hero.cta')}
                <ChevronRight className="ml-2 h-5 w-5" />
              </a>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80"
                alt="Professional Psychologist"
                className="w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif text-center text-teal-900 mb-16">{t('services.title')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-teal-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
<section id="about" className="py-24 bg-teal-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      {/* Image */}
      <div className="rounded-lg overflow-hidden shadow-xl">
        <img
          src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80"
          alt="mgr Agata Plura"
          className="w-full h-[600px] object-cover"
        />
      </div>

      {/* Text Content */}
      <div>
        {/* Title */}
        <h2 className="text-3xl font-serif font-bold text-teal-900 mb-6">{t('about.title')}</h2>
        
        {/* Description */}
        <p className="text-gray-700 mb-6">{t('about.description')}</p>

        {/* Experience */}
        <h3 className="text-xl font-semibold text-teal-800 mb-3">📌 Doświadczenie</h3>
        <p className="text-gray-700 mb-6">{t('about.experience')}</p>

        {/* Approach */}
        <h3 className="text-xl font-semibold text-teal-800 mb-3">💡 Podejście</h3>
        <p className="text-gray-700 mb-6">{t('about.approach')}</p>

        {/* Credentials */}
        <h3 className="text-xl font-semibold text-teal-800 mb-3">🎓 Wykształcenie i Szkolenia</h3>
        <ul className="space-y-4">
          <li className="flex items-start">
            <ChevronRight className="h-6 w-6 text-teal-600" />
            <p className="ml-4 text-gray-700">
              <span className="font-semibold">📖 </span> {t('about.credentials.education')}
            </p>
          </li>
          <li className="flex items-start">
            <ChevronRight className="h-6 w-6 text-teal-600" />
            <p className="ml-4 text-gray-700">
              <span className="font-semibold">🧠 </span> {t('about.credentials.therapy')}
            </p>
          </li>
          <li className="flex items-start">
            <ChevronRight className="h-6 w-6 text-teal-600" />
            <p className="ml-4 text-gray-700">
              <span className="font-semibold">🤝 </span> {t('about.credentials.tus')}
            </p>
          </li>
          <li className="flex items-start">
            <ChevronRight className="h-6 w-6 text-teal-600" />
            <p className="ml-4 text-gray-700">
              <span className="font-semibold">🔍 </span> {t('about.credentials.tsr')}
            </p>
          </li>
          <li className="flex items-start">
            <ChevronRight className="h-6 w-6 text-teal-600" />
            <p className="ml-4 text-gray-700">
              <span className="font-semibold">🧩 </span> {t('about.credentials.cbt')}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>


      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif text-center text-teal-900 mb-16">{t('pricing.title')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricing.map((plan, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-teal-900">{plan.type}</h3>
                  <Clock className="h-6 w-6 text-teal-600" />
                </div>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-teal-600">{plan.price}</span>
                  <span className="text-gray-500">{plan.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-serif text-teal-900 mb-6">{t('contact.title')}</h2>
              <p className="text-gray-600 mb-8">{t('contact.subtitle')}</p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-teal-600" />
                  <span className="ml-4 text-gray-600">509 251 499</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-teal-600" />
                  <span className="ml-4 text-gray-600">gabinetkamino@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 text-teal-600" />
                  <span className="ml-4 text-gray-600">ul. Żupańskiego 7/5 <br />61-582 Poznań</span>
                </div>
                <div className="flex items-center">
                  <Facebook className="h-6 w-6 text-teal-600" />
                  <a 
                    href="https://www.facebook.com/profile.php?id=61573692717357" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="ml-4 text-gray-600 hover:text-teal-600 transition"
                  >
                    Kamino - Gabinet Psychologiczny
                  </a>
                </div>
              </div>
            </div>
            <div>
              <form className="space-y-6" onSubmit={handleSubmit}>
                {formStatus.success && (
                  <div className="p-4 bg-green-100 text-green-800 rounded-md">
                    {formStatus.message || t('contact.form.successMessage')}
                  </div>
                )}
                {formStatus.error && (
                  <div className="p-4 bg-red-100 text-red-800 rounded-md">
                    {formStatus.message || t('contact.form.errorMessage')}
                  </div>
                )}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('contact.form.name')}</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('contact.form.email')}</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">{t('contact.form.phone')}</label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">{t('contact.form.message')}</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={formStatus.submitting}
                  className={`w-full bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition ${formStatus.submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {formStatus.submitting ? t('contact.form.sending') : t('contact.form.submit')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-teal-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-serif mb-4">mgr Agata Plura</h3>
              <p className="text-teal-200">{t('footer.slogan')}</p>
            </div>
            <div>
              <h3 className="text-xl font-serif mb-4">{t('footer.hours.title')}</h3>
              <p className="text-teal-200">
                {t('footer.hours.weekdays')}<br />
                {t('footer.hours.saturday')}
              </p>
            </div>
            <div>
              <a 
                href="https://www.znanylekarz.pl" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block"
              >
                <svg width="215" height="34" viewBox="0 0 215 34" className="h-12 mb-4">
                  <rect width="215" height="34" fill="#00B39B"/>
                  <path d="M198.468 11.181v3.035h6.945l-7.368 10.732v2.207h11.955v-3.035h-7.626l7.396-10.699v-2.24h-11.301zm-10.863 0v15.973h3.644v-7.992c0-2.005 1.53-4.215 4.862-4.866v-3.354c-2.288.126-4.253 1.634-5.059 2.811h-.033l-.258-2.572h-3.155zm-14.353-.309c1.583-.131 3.3-.17 4.958-.17 3.906 0 6.237 1.51 6.237 5.777v10.675h-3.276l-.163-1.598h-.043c-1.123 1.21-2.755 1.917-4.845 1.917-2.768 0-4.967-1.793-4.967-5.345 0-3.304 2.755-6.381 9.651-4.917v-.962c0-1.904-1.116-2.436-3.315-2.436-1.35 0-2.495.091-4.236.24v-3.182zm7.551 8.867c-2.921-.743-5.843.17-5.843 2.428 0 1.498.994 2.378 2.476 2.312 1.168-.052 2.454-.57 3.367-1.379v-3.361zm-19.878 1.652c.463-.296.991-.626 1.487-1.021l3.999 6.784h4.098l-5.387-9.123c1.983-1.943 3.602-4.216 4.957-6.85h-3.867c-1.355 2.404-3.272 4.644-5.288 6.356v-12.746l-3.643.422v21.94h3.643v-5.764zm-20.426-2.174v-.065c0-4.912 2.391-8.449 7.336-8.449 4.585 0 6.714 2.653 6.714 8.22 0 .589-.041 1.403-.105 2.003h-10.123c.262 2.25 1.573 3.594 4.264 3.594 1.703 0 3.303-.159 4.786-.353v3.051c-1.666.261-3.08.417-4.882.417-5.24 0-7.991-2.62-7.991-8.417zm3.766-1.008h6.583c0-2.499-.655-4.472-3.111-4.472-2.554 0-3.406 2.105-3.471 4.472zm-16.478-13.417v22.362h11.815v-3.616h-7.834v-18.746h-3.981zm-16.215 6.389c1.153 4.545 3.853 13.114 5.264 16.452-.912 2.063-2.387 3.106-5.165 2.951v2.865c5.997.804 7.628-3.66 8.76-6.295 1.132-2.636 4.018-11.428 5.204-15.973h-3.82c-.659 2.997-2.305 8.892-3.162 11.889h-.066c-.889-2.964-2.536-8.859-3.162-11.889h-3.853zm-15.893 0v15.973h3.644v-8.401c0-2.543 1.985-4.577 3.765-4.702 1.964-.138 2.964.879 2.964 3.476v9.626h3.644v-10.377c0-4.069-1.87-6.075-5.637-6.075-2.231 0-4.075 1.259-4.953 2.636h-.043c-.065-.571-.212-2.156-.212-2.156h-3.171zm-14.353-.309c1.583-.131 3.3-.17 4.958-.17 3.906 0 6.237 1.51 6.237 5.777v10.675h-3.276l-.163-1.598h-.043c-1.123 1.21-2.755 1.917-4.845 1.917-2.768 0-4.967-1.793-4.967-5.345 0-3.304 2.755-6.381 9.65-4.917v-.962c0-1.904-1.116-2.436-3.315-2.436-1.35 0-2.495.091-4.236.24v-3.182zm7.551 8.867c-2.921-.743-5.843.17-5.843 2.428 0 1.498.994 2.378 2.476 2.312 1.168-.052 2.454-.57 3.367-1.379v-3.361zm-26.023-8.557v15.973h3.644v-8.401c0-2.543 1.985-4.577 3.765-4.702 1.964-.138 2.964.879 2.964 3.476v9.626h3.644v-10.377c0-4.069-1.87-6.075-5.637-6.075-2.231 0-4.075 1.259-4.953 2.636h-.043c-.065-.571-.212-2.156-.212-2.156h-3.171zm-17.541-6.389v3.616h9.356l-9.945 15.657v3.089h15.121v-3.616h-10.086l9.92-15.727v-3.019h-14.366zm-26.71 21.027l5.272 6.127 5.255-3.818-5.13-8.488c-2.317 1.429-4.589 4.199-5.396 6.179zm-7.578 6.118c4.332-8.834 12.605-15.378 22.519-17.331l-2.015-6.206c-12.028 1.358-22.261 8.648-27.737 18.884l7.233 4.652zm1.579-21.069l-10.598-2.495-2.006 6.188 7.358 3.106c1.509-1.526 3.196-2.857 5.05-3.994 2.512-1.544 4.705-2.566 8.433-3.844l-.826-9.828h-6.498l-.914 10.868z" fill="#fff"/>
                </svg>
                <p className="text-teal-200">Sprawdź opinie i umów wizytę na ZnanyLekarz.pl</p>
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-teal-800 text-center text-teal-200">
            <p>&copy; {new Date().getFullYear()} mgr Agata Plura. {t('footer.rights')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;