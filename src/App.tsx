import { useState } from 'react';

function App() {
  const [code, setCode] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim() && email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="font-bold text-lg">CertTrust</span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm">
              <a href="#certificati" className="hover:text-cyan-400 transition">Certificati</a>
              <a href="#vantaggi" className="hover:text-cyan-400 transition">Vantaggi</a>
              <a href="#come-ottenere" className="hover:text-cyan-400 transition">Come Ottenere</a>
              <a href="#faq" className="hover:text-cyan-400 transition">FAQ</a>
            </div>
            <a href="#codice" className="bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 rounded-lg font-medium text-sm hover:from-blue-600 hover:to-cyan-600 transition">
              Ottieni Gratis
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6 text-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Offerta limitata — Certificati gratuiti con codice
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Certificati Digitali{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              QWAC, PSD2 & eIDAS
            </span>
            <br />
            <span className="text-3xl md:text-4xl lg:text-5xl text-white/80">100% Gratuiti</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-10">
            Ottieni tutti i certificati digitali qualificati necessari per la conformità PSD2, 
            Open Banking e il regolamento eIDAS. Inserisci il tuo codice e scarica immediatamente 
            i certificati QWAC, QSeal, eIDAS e molto altro.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#codice" className="bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-cyan-600 transition shadow-lg shadow-blue-500/25">
              🎫 Inserisci il Codice
            </a>
            <a href="#certificati" className="border border-white/20 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition">
              Scopri di più →
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-white/50 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Conforme eIDAS
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              PSD2 Compliant
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              QTSP Certificato
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              EBA Standards
            </div>
          </div>
        </div>
      </section>

      {/* Certificati Section */}
      <section id="certificati" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tutti i Certificati Disponibili</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Una suite completa di certificati digitali qualificati per banche, istituti di pagamento, 
              TPP e tutti gli operatori del settore finanziario.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* QWAC */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">QWAC</h3>
              <p className="text-sm text-white/60 mb-3">Qualified Website Authentication Certificate</p>
              <p className="text-white/70 text-sm">
                Autentica l'identità del tuo sito web e garantisce comunicazioni sicure TLS/SSL. 
                Obbligatorio per gli istituti finanziari secondo la direttiva PSD2.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">TLS/SSL</span>
                <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">PSD2</span>
                <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">eIDAS</span>
              </div>
            </div>

            {/* PSD2 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition group">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">PSD2 Certificates</h3>
              <p className="text-sm text-white/60 mb-3">Payment Services Directive 2</p>
              <p className="text-white/70 text-sm">
                Certificati per TPP (Third Party Providers), AISP e PISP. Necessari per accedere 
                alle API bancarie e fornire servizi di pagamento conformi.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">AISP</span>
                <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">PISP</span>
                <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">Open Banking</span>
              </div>
            </div>

            {/* eIDAS */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition group">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">eIDAS</h3>
              <p className="text-sm text-white/60 mb-3">Electronic Identification and Trust Services</p>
              <p className="text-white/70 text-sm">
                Certificati conformi al regolamento europeo eIDAS per l'identificazione elettronica 
                e i servizi fiduciari qualificati in tutta l'UE.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">EU Regulation</span>
                <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">Qualified</span>
              </div>
            </div>

            {/* QSealC */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition group">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">QSealC</h3>
              <p className="text-sm text-white/60 mb-3">Qualified Electronic Seal Certificate</p>
              <p className="text-white/70 text-sm">
                Sigillo elettronico qualificato per persone giuridiche. Garantisce l'origine e 
                l'integrità dei documenti elettronici con valore legale in tutta l'UE.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded">Legal Value</span>
                <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded">EU-wide</span>
              </div>
            </div>

            {/* QWAC for TPP */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition group">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">QWAC per TPP</h3>
              <p className="text-sm text-white/60 mb-3">Third Party Provider QWAC</p>
              <p className="text-white/70 text-sm">
                Certificato QWAC specifico per TPP con ruoli PSD2 (PSP_AS, PSP_IC, PSP_PI) 
                nei campi dei privilegi. Richiesto per l'accesso alle API Open Banking.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded">PSP_AS</span>
                <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded">PSP_IC</span>
                <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded">PSP_PI</span>
              </div>
            </div>

            {/* QSealC for TPP */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition group">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">QSealC per TPP</h3>
              <p className="text-sm text-white/60 mb-3">Third Party Provider Seal</p>
              <p className="text-white/70 text-sm">
                Sigillo elettronico per TPP con estensioni PSD2. Utilizzato per firmare le 
                richieste alle API bancarie e garantire autenticità e non ripudio.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs bg-rose-500/20 text-rose-300 px-2 py-1 rounded">mTLS</span>
                <span className="text-xs bg-rose-500/20 text-rose-300 px-2 py-1 rounded">Signing</span>
                <span className="text-xs bg-rose-500/20 text-rose-300 px-2 py-1 rounded">Non-repudiation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vantaggi */}
      <section id="vantaggi" className="py-20 px-4 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Perché Scegliere i Nostri Certificati</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Certificati qualificati emessi da QTSP autorizzati, riconosciuti in tutta l'Unione Europea
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="font-bold text-lg mb-2">Emissione Immediata</h3>
              <p className="text-white/60 text-sm">Ricevi i tuoi certificati in pochi minuti dopo la validazione del codice</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="font-bold text-lg mb-2">Sicurezza Massima</h3>
              <p className="text-white/60 text-sm">Chiavi crittografiche a 2048/4096 bit con algoritmi SHA-256 e superiori</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🇪🇺</div>
              <h3 className="font-bold text-lg mb-2">Riconosciuti in UE</h3>
              <p className="text-white/60 text-sm">Validi in tutti gli stati membri dell'Unione Europea secondo eIDAS</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="font-bold text-lg mb-2">100% Gratuiti</h3>
              <p className="text-white/60 text-sm">Nessun costo nascosto. Inserisci il codice e ottieni tutti i certificati</p>
            </div>
          </div>
        </div>
      </section>

      {/* Come Ottenere */}
      <section id="come-ottenere" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Come Ottenere i Certificati</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Tre semplici passaggi per ottenere tutti i certificati digitali necessari
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">1</div>
                <h3 className="text-xl font-bold mb-3">Inserisci il Codice</h3>
                <p className="text-white/60">
                  Inserisci il codice promozionale che hai ricevuto nella sezione dedicata qui sotto
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 text-white/30 text-3xl">→</div>
            </div>

            <div className="relative">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">2</div>
                <h3 className="text-xl font-bold mb-3">Verifica Identità</h3>
                <p className="text-white/60">
                  Completa la verifica dell'identità aziendale con i documenti richiesti
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 text-white/30 text-3xl">→</div>
            </div>

            <div className="relative">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">3</div>
                <h3 className="text-xl font-bold mb-3">Scarica Certificati</h3>
                <p className="text-white/60">
                  Scarica immediatamente tutti i certificati QWAC, PSD2, eIDAS e QSeal
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Codice Form */}
      <section id="codice" className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎫</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Inserisci il Tuo Codice</h2>
              <p className="text-white/60">
                Inserisci il codice promozionale e la tua email per ricevere tutti i certificati gratuitamente
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Codice Promozionale</label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="es. QWAC2024-FREE-PSD2"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Email Aziendale</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nome@azienda.com"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-cyan-600 transition shadow-lg shadow-blue-500/25 mt-4"
                >
                  🚀 Ottieni i Certificati Gratuitamente
                </button>
                <p className="text-center text-white/40 text-xs mt-4">
                  I tuoi dati sono protetti e non saranno condivisi con terze parti
                </p>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">Codice Validato!</h3>
                <p className="text-white/70 mb-4">
                  Il tuo codice <span className="text-cyan-400 font-mono">{code}</span> è stato accettato.
                </p>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
                  <p className="text-sm text-white/60">
                    I certificati saranno inviati all'indirizzo <span className="text-white font-medium">{email}</span> entro pochi minuti.
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
                    <div className="text-blue-300 font-bold">QWAC</div>
                    <div className="text-white/50 text-xs">✓ Incluso</div>
                  </div>
                  <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3">
                    <div className="text-green-300 font-bold">PSD2</div>
                    <div className="text-white/50 text-xs">✓ Incluso</div>
                  </div>
                  <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-3">
                    <div className="text-purple-300 font-bold">eIDAS</div>
                    <div className="text-white/50 text-xs">✓ Incluso</div>
                  </div>
                  <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-3">
                    <div className="text-orange-300 font-bold">QSealC</div>
                    <div className="text-white/50 text-xs">✓ Incluso</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Domande Frequenti</h2>
            <p className="text-white/60 text-lg">Tutto quello che devi sapere sui certificati digitali</p>
          </div>

          <div className="space-y-4">
            <FaqItem 
              question="Cos'è un certificato QWAC?"
              answer="Un QWAC (Qualified Website Authentication Certificate) è un certificato digitale qualificato che autentica l'identità di un sito web. Secondo la PSD2, tutti gli istituti di pagamento devono utilizzare QWAC per le comunicazioni con le API bancarie, garantendo che il sito sia legittimo e le comunicazioni siano crittografate."
            />
            <FaqItem 
              question="Cosa sono i certificati PSD2?"
              answer="I certificati PSD2 sono certificati digitali specifici per i Third Party Providers (TPP) che operano nell'ambito della Payment Services Directive 2. Includono i ruoli PSP_AS (Account Servicing), PSP_IC (Card Issuing) e PSP_PI (Payment Initiation) e sono necessari per accedere alle API Open Banking degli istituti finanziari."
            />
            <FaqItem 
              question="Il regolamento eIDAS cos'è?"
              answer="eIDAS (electronic IDentification, Authentication and trust Services) è il regolamento europeo n. 910/2014 che stabilisce il quadro normativo per l'identificazione elettronica e i servizi fiduciari nell'UE. I certificati qualificati eIDAS hanno lo stesso valore legale dei certificati cartacei in tutti gli stati membri."
            />
            <FaqItem 
              question="Come posso ottenere i certificati gratuitamente?"
              answer="È semplice: inserisci il tuo codice promozionale nella sezione dedicata, completa la verifica dell'identità aziendale e riceverai immediatamente tutti i certificati QWAC, PSD2, eIDAS e QSeal direttamente nella tua email. I certificati sono emessi da QTSP (Qualified Trust Service Provider) autorizzati."
            />
            <FaqItem 
              question="I certificati sono validi in tutta Europa?"
              answer="Sì, i certificati qualificati eIDAS sono riconosciuti automaticamente in tutti gli stati membri dell'Unione Europea. Questo significa che un certificato emesso in Italia ha lo stesso valore legale in Germania, Francia, Spagna e in tutti gli altri paesi UE."
            />
            <FaqItem 
              question="Qual è la durata dei certificati?"
              answer="I certificati qualificati hanno una durata tipica di 1 anno dalla data di emissione. Al termine del periodo di validità, è possibile rinnovarli gratuitamente utilizzando lo stesso codice promozionale, previa verifica dell'identità aziendale."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="font-bold text-lg">CertTrust</span>
              </div>
              <p className="text-white/50 text-sm">
                Certificati digitali qualificati per il settore finanziario europeo. Conformi a PSD2, eIDAS e regolamenti EBA.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Certificati</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li><a href="#" className="hover:text-white transition">QWAC</a></li>
                <li><a href="#" className="hover:text-white transition">PSD2</a></li>
                <li><a href="#" className="hover:text-white transition">eIDAS</a></li>
                <li><a href="#" className="hover:text-white transition">QSealC</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Risorse</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li><a href="#" className="hover:text-white transition">Documentazione</a></li>
                <li><a href="#" className="hover:text-white transition">Guide Tecniche</a></li>
                <li><a href="#" className="hover:text-white transition">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition">Supporto</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legale</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Termini di Servizio</a></li>
                <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white transition">GDPR</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">© 2024 CertTrust. Tutti i diritti riservati.</p>
            <div className="flex gap-4">
              <a href="#" className="text-white/40 hover:text-white transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="text-white/40 hover:text-white transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition"
      >
        <span className="font-medium">{question}</span>
        <svg 
          className={`w-5 h-5 text-white/50 transition-transform ${open ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-6 pb-4 text-white/60 text-sm leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

export default App;
