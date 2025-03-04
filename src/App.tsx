import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Menu, X, Clock, Phone, Mail, MapPin, ChevronRight, Users, Brain, Sparkles, Facebook } from 'lucide-react';
import { useState } from 'react';
import emailjs from 'emailjs-com';
import personalPicture from "../assets/images/personal_picture.jpeg"
import transparentLogo from "../assets/images/FullLogo_Transparent.png"
import transparentLogoOnlyText from "../assets/images/FullLogo_Transparent_Text.png"
import transparentLogoOnlyTextWhite from "../assets/images/FullLogo_Transparent_Text_white.png"
import znanyLekarzLogo from "../assets/images/znanylekarz_logo.png";
import icon from '../assets/images/icon.png';

function App() {
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
    { icon: <Sparkles className="w-12 h-12 text-teal-600" />, title: "Terapia indywidualna", description: "Zaburzenia lękowe, Zaburzenia nastroju, Zaburzenia osobowości" },
    { icon: <Brain className="w-12 h-12 text-teal-600" />, title: "Trening Słuchowy Metodą Tomatisa", description: "Metoda stymulacji słuchowej poprawiająca koncentrację, naukę i komunikację" },
    { icon: <Users className="w-12 h-12 text-teal-600" />, title: "Diagnoza ADHD u osób dorosłych", description: "Profesjonalna diagnoza i wsparcie dla osób z ADHD" },
  ];

  const pricing = [
    { type: "Sesja indywidualna", duration: "50 min", price: "150 PLN", description: "" },
    { 
        type: "Trening Słuchowy Metodą Tomatisa", 
        duration: "", 
        price: [
            { label: "Konsultacja", amount: "150 PLN" },
            { label: "Terapia Tomatisa (etap)", amount: "1800 PLN" },
            { label: "Test przed kolejnym etapem", amount: "100 PLN" }
        ], 
        description: "" 
    },
    { type: "Diagnoza ADHD", duration: "ok 5h", price: "450 PLN", description: "" },
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
        message: "Twoja wiadomość została wysłana pomyślnie. Wkrótce się z Tobą skontaktujemy!"
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
        message: "Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie lub skontaktuj się z nami bezpośrednio."
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>Kamino | Gabinet Psychologiczny | Agata Plura | Poznań</title>
        <meta name="description" content="Kamino | Gabinet Psychologiczny | Agata Plura | Poznań. Oferujemy profesjonalną pomoc psychologiczną, terapię indywidualną, diagnozę ADHD oraz Trening Słuchowy Metodą Tomatisa." />
        <link rel="icon" href={icon} />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Kamino | Gabinet Psychologiczny | Agata Plura | Poznań",
              "image": "${transparentLogo}",
              "url": "https://www.gabinetkamino.com",
              "telephone": "509251499",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "ul. Żupańskiego 7/5",
                "addressLocality": "Poznań",
                "postalCode": "61-582",
                "addressCountry": "PL"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 52.3991,
                "longitude": 16.9242
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "09:00",
                  "closes": "19:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Saturday",
                  "opens": "09:00",
                  "closes": "15:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Sunday",
                  "opens": "09:00",
                  "closes": "15:00"
                }
              ],
              "priceRange": "150-1800 PLN",
              "description": "Profesjonalna pomoc psychologiczna, terapia indywidualna, diagnoza ADHD oraz Trening Słuchowy Metodą Tomatisa w Poznaniu.",
              "sameAs": [
                "https://www.facebook.com/profile.php?id=61573692717357",
                "https://www.znanylekarz.pl/agata-plura/"
              ]
            }
          `}
        </script>
      </Helmet>
      
      {/* Navigation */}
      <nav className="bg-white shadow-sm w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
            <img
          src={transparentLogoOnlyText}
          alt="Kamino - Gabinet Psychologiczny mgr Agata Plura"
          className="h-12 object-contain"
        />
              
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-teal-900 hover:text-teal-600">Strona główna</a>
              <a href="#services" className="text-teal-900 hover:text-teal-600">Usługi</a>
              <a href="#about" className="text-teal-900 hover:text-teal-600">O mnie</a>
              <a href="#pricing" className="text-teal-900 hover:text-teal-600">Cennik</a>
              <a href="#contact" className="text-teal-900 hover:text-teal-600">Kontakt</a>
              <a href="#contact" className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition">
                Umów wizytę
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-500 hover:text-gray-600"
                aria-label="Menu"
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
              <a href="#home" className="block px-3 py-2 text-teal-900 hover:text-teal-600">Strona główna</a>
              <a href="#services" className="block px-3 py-2 text-teal-900 hover:text-teal-600">Usługi</a>
              <a href="#about" className="block px-3 py-2 text-teal-900 hover:text-teal-600">O mnie</a>
              <a href="#pricing" className="block px-3 py-2 text-teal-900 hover:text-teal-600">Cennik</a>
              <a href="#contact" className="block px-3 py-2 text-teal-900 hover:text-teal-600">Kontakt</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
<section id="home" className="pt-20 pb-24 bg-gradient-to-b from-teal-50 to-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      
      {/* Left Side - Text */}
      <div>
        <h1 className="text-4xl md:text-5xl font-serif text-teal-900 mb-6">
          Gabinet Psychologiczny 
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Kamino to przestrzeń w której wspólnie będziemy wędrować ku pełniejszemu i bardziej świadomemu życiu. Twoja droga do zmiany i zrozumienia
        </p>
        <a 
          href="#contact" 
          className="bg-teal-600 text-white px-8 py-3 rounded-md hover:bg-teal-700 transition flex items-center inline-block"
        >
          Zarezerwuj pierwszą wizytę
          <ChevronRight className="ml-2 h-5 w-5" />
        </a>
      </div>

      {/* Right Side - Image */}
<div className="flex justify-center items-center">
  <img
    src={transparentLogo}
    alt="Gabinet Kamino | Gabinet Psychologiczny w Poznaniu"
    className="max-w-xs md:max-w-sm h-auto bg-transparent"
  />
</div>


    </div>
  </div>
</section>

      {/* Services Section */}
<section id="services" className="py-24 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-serif text-center text-teal-900 mb-16">
      Oferowane usługi
    </h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
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
          src={personalPicture}
          alt="mgr Agata Plura - psycholog i psychoterapeuta w Poznaniu"
          className="w-full h-[600px] object-cover"
        />
      </div>

      {/* Text Content */}
      <div>
        {/* Title */}
        <h2 className="text-3xl font-serif font-bold text-teal-900 mb-6">O mgr Agacie Plura</h2>
        
        {/* Description */}
        <p className="text-gray-700 mb-6">Jestem psycholożką i psychoterapeutką w trakcie szkolenia psychodynamicznego w Międzynarodowej Szkole Psychoterapii Psychodynamicznej. Ukończyłam pięcioletnie studia magisterskie na kierunku psychologia kliniczna dzieci i młodzieży na Uniwersytecie SWPS w Poznaniu. Nieustannie rozwijam swoje kompetencje, poszukując skutecznych metod pracy, które pozwalają lepiej dopasować pomoc do indywidualnych potrzeb..</p>

        {/* Experience */}
        <h3 className="text-xl font-semibold text-teal-800 mb-3">📌 Doświadczenie</h3>
        <p className="text-gray-700 mb-6">Doświadczenie zdobywałam podczas praktyk w Wojewódzkim Szpitalu dla Nerwowo i Psychicznie Chorych 'Dziekanka', Domu Pomocy Społecznej, Stowarzyszeniach wspierających osoby w kryzysie, a także podczas pracy w Liceum Ogólnokształcącym. Na co dzień pracuję w Poradni Psychologiczno-Pedagogicznej, gdzie diagnozuję oraz wspieram dzieci i młodzież w trudnościach emocjonalnych, rozwojowych i edukacyjnych.</p>

        {/* Approach */}
        <h3 className="text-xl font-semibold text-teal-800 mb-3">💡 Podejście</h3>
        <p className="text-gray-700 mb-6">Pomagam lepiej zrozumieć siebie, swoje emocje i mechanizmy działania, co pozwala na bardziej świadome podejmowanie decyzji i budowanie satysfakcjonujących relacji. Wspieram w radzeniu sobie ze stresem, lękiem i trudnościami życiowymi, a także w odkrywaniu własnego potencjału i wewnętrznych zasobów.</p>

        {/* Credentials */}
        <h3 className="text-xl font-semibold text-teal-800 mb-3">🎓 Wykształcenie i Szkolenia</h3>
        <ul className="space-y-4">
          <li className="flex items-start">
            <ChevronRight className="h-6 w-6 text-teal-600" />
            <p className="ml-4 text-gray-700">
              <span className="font-semibold">📖 </span> Magister psychologii klinicznej dzieci i młodzieży, Uniwersytet SWPS w Poznaniu
            </p>
          </li>
          <li className="flex items-start">
            <ChevronRight className="h-6 w-6 text-teal-600" />
            <p className="ml-4 text-gray-700">
              <span className="font-semibold">🧠 </span> W trakcie szkolenia w Międzynarodowej Szkole Psychoterapii Psychodynamicznej
            </p>
          </li>
          <li className="flex items-start">
            <ChevronRight className="h-6 w-6 text-teal-600" />
            <p className="ml-4 text-gray-700">
              <span className="font-semibold">🤝 </span> Certyfikowany trener umiejętności społecznych (TUS)
            </p>
          </li>
          <li className="flex items-start">
            <ChevronRight className="h-6 w-6 text-teal-600" />
            <p className="ml-4 text-gray-700">
              <span className="font-semibold">🔍 </span> Podstawowy kurs Terapii Skoncentrowanej na Rozwiązaniach (TSR)
            </p>
          </li>
          <li className="flex items-start">
            <ChevronRight className="h-6 w-6 text-teal-600" />
            <p className="ml-4 text-gray-700">
              <span className="font-semibold">🧩 </span> Kurs terapii poznawczo-behawioralnej (CBT) w pracy z lękiem
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
        <h2 className="text-3xl font-serif text-center text-teal-900 mb-16">Cennik</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition flex flex-col justify-between min-h-[250px]">
                    {/* Title */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-teal-900">{plan.type}</h3>
                            <Clock className="h-6 w-6 text-teal-600" />
                        </div>
                        <p className="text-gray-600">{plan.description}</p>
                    </div>

                    {/* Pricing Section - Always centered */}
                    <div className="mt-auto">
                        {Array.isArray(plan.price) ? (
                            <div className="space-y-2">
                                {plan.price.map((item, i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <span className="text-gray-700">{item.label}</span>
                                        <span className="text-2xl font-bold text-teal-600">{item.amount}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex items-center justify-between">
                                <span className="text-2xl font-bold text-teal-600">{plan.price}</span>
                                <span className="text-gray-500">{plan.duration}</span>
                            </div>
                        )}
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
              <h2 className="text-3xl font-serif text-teal-900 mb-6">Skontaktuj się</h2>
              <p className="text-gray-600 mb-8">Gotowy na pierwszy krok? Skontaktuj się ze mną, aby umówić konsultację lub zadać pytania.</p>
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
                  <a 
                    href="https://maps.app.goo.gl/sjxxF7iCpx7yUQZVA" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:text-teal-700 transition"
                    aria-label="Lokalizacja na mapie"
                  >
                    <MapPin className="h-6 w-6" />
                  </a>
                  <a 
                    href="https://maps.app.goo.gl/sjxxF7iCpx7yUQZVA" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="ml-4 text-gray-600 hover:text-teal-600 transition"
                  >
                    ul. Żupańskiego 7/5 <br />61-582 Poznań
                  </a>
                </div>
                <div className="flex items-center">
                <a 
                  href="https://www.facebook.com/profile.php?id=61573692717357" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-teal-600 hover:text-teal-700 transition"
                  aria-label="Facebook"
                >
                  <Facebook className="h-6 w-6" />
                </a>
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
                    {formStatus.message || "Twoja wiadomość została wysłana pomyślnie. Wkrótce się z Tobą skontaktujemy!"}
                  </div>
                )}
                {formStatus.error && (
                  <div className="p-4 bg-red-100 text-red-800 rounded-md">
                    {formStatus.message || "Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie lub skontaktuj się z nami bezpośrednio."}
                  </div>
                )}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Imię i nazwisko</label>
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
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
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
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefon</label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Wiadomość</label>
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
                  {formStatus.submitting ? "Wysyłanie..." : "Wyślij wiadomość"}
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
            <div className="flex-grow flex justify-center">
              <img
              src={transparentLogoOnlyTextWhite}
              alt="Kamino - Gabinet Psychologiczny"
              className="h-12 object-contain"
            />
            </div>
            <div>
              <h3 className="text-xl font-serif mb-4">Godziny przyjęć</h3>
              <p className="text-teal-200">
                Poniedziałek - Piątek: 9:00 - 19:00<br />
                Sobota: 09:00 - 15:00<br />
                Niedziela: 09:00 - 15:00
              </p>
            </div>
            <div>
              <a 
                href="https://www.znanylekarz.pl/agata-plura/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block"
              >
                <img
                  src={znanyLekarzLogo}
                  alt="ZnanyLekarz"
                  className="h-12 mb-4 object-contain"
                />
                <p className="text-teal-200">Sprawdź opinie i umów wizytę na ZnanyLekarz.pl</p>
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-teal-800 text-center text-teal-200">
            <p>&copy; {new Date().getFullYear()} KAMINO Wszelkie prawa zastrzeżone</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;