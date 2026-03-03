import { X } from "lucide-react";
import { useEffect } from "react";

interface LegalModalsProps {
    activeModal: "impressum" | "datenschutz" | null;
    onClose: () => void;
}

export default function LegalModals({ activeModal, onClose }: LegalModalsProps) {
    // Prevent body scrolling when modal is open
    useEffect(() => {
        if (activeModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [activeModal]);

    if (!activeModal) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white w-full max-w-3xl max-h-full rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                    <h2 className="text-xl font-bold text-gray-900">
                        {activeModal === "impressum" ? "Impressum" : "Datenschutzerklärung"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Scrollable Body */}
                <div className="p-6 md:p-8 overflow-y-auto prose prose-gray max-w-none">
                    {activeModal === "impressum" ? (
                        <>
                            <h3 className="text-lg font-bold text-rek-magenta mt-0 mb-3">Angaben gemäß § 5 TMG</h3>
                            <p className="mb-6">
                                Alexander Rheindorf<br />
                                Pankratiusstraße 31<br />
                                50129 Bergheim<br />
                                Deutschland
                            </p>

                            <h3 className="text-lg font-bold text-rek-magenta mb-3">Kontakt</h3>
                            <p className="mb-6">
                                E-Mail: alexander.rheindorf@fdp-rek.de
                            </p>

                            <h3 className="text-lg font-bold text-rek-magenta mb-3">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
                            <p className="mb-6">
                                Alexander Rheindorf<br />
                                Pankratiusstraße 31<br />
                                50129 Bergheim
                            </p>

                            <h3 className="text-lg font-bold text-rek-magenta mb-3">Haftungsausschluss</h3>
                            <h4 className="font-semibold text-gray-900 mb-2">Haftung für Inhalte</h4>
                            <p className="mb-4">
                                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und
                                Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7
                                Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
                            </p>

                            <h4 className="font-semibold text-gray-900 mb-2">Haftung für Links</h4>
                            <p className="mb-6">
                                Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben.
                                Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
                            </p>

                            <h3 className="text-lg font-bold text-rek-magenta mb-3">Urheberrecht</h3>
                            <p className="mb-6">
                                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
                                Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
                                Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                            </p>

                            <h3 className="text-lg font-bold text-rek-magenta mb-3">Streitschlichtung</h3>
                            <p className="mb-0">
                                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a
                                    href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-rek-magenta hover:underline">https://ec.europa.eu/consumers/odr</a>. Wir
                                sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
                                teilzunehmen.
                            </p>
                        </>
                    ) : (
                        <>
                            <h3 className="text-lg font-bold text-rek-magenta mt-0 mb-3">1. Verantwortlicher</h3>
                            <p className="mb-6">
                                Alexander Rheindorf<br />
                                Pankratiusstraße 31<br />
                                50129 Bergheim<br />
                                E-Mail: alexander.rheindorf@fdp-rek.de
                            </p>

                            <h3 className="text-lg font-bold text-rek-magenta mb-3">2. Erhebung und Verarbeitung personenbezogener Daten</h3>
                            <p className="mb-2">
                                Wenn Sie das Kontaktformular auf dieser Seite nutzen, werden folgende Daten erhoben:
                            </p>
                            <ul className="list-disc pl-5 mb-6 space-y-1">
                                <li>Name (Pflichtfeld)</li>
                                <li>E-Mail-Adresse (Pflichtfeld)</li>
                                <li>Wohnort in der Kommune</li>
                                <li>Themenbereich</li>
                                <li>Ihre Nachricht / Zusätzliche Infos</li>
                                <li>Optional: Hochgeladene Bilder</li>
                            </ul>

                            <h3 className="text-lg font-bold text-rek-magenta mb-3">3. Zweck der Datenverarbeitung</h3>
                            <p className="mb-2">
                                Die Daten werden ausschließlich zur Bearbeitung Ihres Anliegens sowie zur möglichen Rückmeldung verwendet.
                            </p>
                            <ul className="list-disc pl-5 mb-6 space-y-1">
                                <li><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)</li>
                                <li><strong>Speicherdauer:</strong> Ihre Daten werden gelöscht, sobald sie für den Zweck ihrer Erhebung
                                    nicht mehr erforderlich sind, spätestens jedoch nach 12 Monaten.</li>
                            </ul>

                            <h3 className="text-lg font-bold text-rek-magenta mb-3">4. Dienstleister</h3>
                            <h4 className="font-semibold text-gray-900 mb-2">Hosting</h4>
                            <p className="mb-4">
                                Diese Website wird bei GitHub Pages gehostet. Weitere Informationen finden Sie in der Datenschutzerklärung von GitHub.
                            </p>

                            <h4 className="font-semibold text-gray-900 mb-2">KI-Bildbearbeitung & Textgenerierung</h4>
                            <p className="mb-6">
                                Für die Verarbeitung von Texten und Bildern nutzen wir die Google Gemini API. Bitte beachten Sie, dass Daten zur Verarbeitung an Google-Server übermittelt werden können. Weitere Informationen: <a
                                    href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-rek-magenta hover:underline">Google Datenschutz</a>.
                            </p>

                            <h3 className="text-lg font-bold text-rek-magenta mb-3">5. Ihre Rechte</h3>
                            <p className="mb-2">Sie haben jederzeit das Recht auf:</p>
                            <ul className="list-disc pl-5 mb-6 space-y-1">
                                <li>Auskunft über Ihre gespeicherten Daten</li>
                                <li>Berichtigung unrichtiger Daten</li>
                                <li>Löschung Ihrer Daten</li>
                                <li>Einschränkung der Verarbeitung</li>
                                <li>Widerruf Ihrer Einwilligung</li>
                                <li>Datenübertragbarkeit</li>
                                <li>Beschwerde bei einer Aufsichtsbehörde</li>
                            </ul>

                            <h3 className="text-lg font-bold text-rek-magenta mb-3">6. Kontakt</h3>
                            <p className="mb-6">
                                Bei Fragen zum Datenschutz wenden Sie sich an:<br />
                                alexander.rheindorf@fdp-rek.de
                            </p>

                            <p className="text-sm text-gray-500 italic mt-8">Stand: Februar 2026</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
