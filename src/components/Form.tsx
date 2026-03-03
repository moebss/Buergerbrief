import { useState, useRef } from "react";
import { motion } from "motion/react";
import { Send, Image as ImageIcon, Loader2, Wand2, X } from "lucide-react";
import { editImageWithPrompt } from "../services/gemini";

const KOMMUNEN = [
  "Bedburg",
  "Bergheim",
  "Brühl",
  "Elsdorf",
  "Erftstadt",
  "Frechen",
  "Hürth",
  "Kerpen",
  "Pulheim",
  "Wesseling",
];

export default function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    kommune: "",
    thema: "",
    infos: "",
  });

  // Image Editing State
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imagePrompt, setImagePrompt] = useState("");
  const [isEditingImage, setIsEditingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImageBase64(null);
    setImagePrompt("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleEditImage = async () => {
    if (!imageBase64 || !imagePrompt) return;
    setIsEditingImage(true);

    // Extract base64 data and mime type
    const match = imageBase64.match(/^data:(image\/[a-zA-Z]*);base64,(.*)$/);
    if (!match) {
      setIsEditingImage(false);
      return;
    }

    const mimeType = match[1];
    const base64Data = match[2];

    const result = await editImageWithPrompt(base64Data, mimeType, imagePrompt);
    if (result) {
      setImageBase64(result);
      setImagePrompt(""); // Clear prompt after success
    } else {
      alert("Fehler bei der Bildbearbeitung.");
    }
    setIsEditingImage(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Bürgerbrief erfolgreich gesendet! (Demo)");
  };

  return (
    <section id="buergerbrief" className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-rek-magenta uppercase mb-3">
            Ihre Stimme zählt
          </h2>
          <h3 className="text-4xl font-extrabold text-gray-900 mb-4">
            Bürgerbrief verfassen
          </h3>
          <p className="text-lg text-gray-600">
            Teile dein Anliegen mit. Hänge bei Bedarf ein Bild an.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl p-6 md:p-12 border border-gray-100"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rek-magenta focus:border-transparent transition-all"
                  placeholder="Max Mustermann"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rek-magenta focus:border-transparent transition-all"
                  placeholder="max@beispiel.de"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="kommune" className="block text-sm font-medium text-gray-700 mb-1">Kommune</label>
                <select
                  id="kommune"
                  name="kommune"
                  value={formData.kommune}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rek-magenta focus:border-transparent transition-all bg-white"
                  required
                >
                  <option value="" disabled>Bitte wählen...</option>
                  {KOMMUNEN.map((k) => (
                    <option key={k} value={k}>{k}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="thema" className="block text-sm font-medium text-gray-700 mb-1">Thema</label>
                <input
                  type="text"
                  id="thema"
                  name="thema"
                  value={formData.thema}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rek-magenta focus:border-transparent transition-all"
                  placeholder="z.B. Radwegausbau"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="infos" className="block text-sm font-medium text-gray-700 mb-1">Zusätzliche Infos</label>
              <textarea
                id="infos"
                name="infos"
                rows={5}
                value={formData.infos}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rek-magenta focus:border-transparent transition-all resize-none"
                placeholder="Weitere Details zu Ihrem Anliegen..."
              />
            </div>

            {/* Image Attachment Section */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                  <ImageIcon className="w-5 h-5 text-rek-magenta mr-2" />
                  Briefanhang (Optional)
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Laden Sie ein Foto hoch, um Ihr Anliegen zu verdeutlichen. Sie können das Bild mit unserer KI bearbeiten (z.B. "Gesichter unkenntlich machen").
                </p>
              </div>

              {!imageBase64 ? (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex flex-col items-center justify-center px-4 py-8 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-rek-magenta hover:text-rek-magenta transition-all bg-white"
                  >
                    <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                    <span className="font-medium">Bild auswählen oder hier ablegen</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative bg-white rounded-xl border border-gray-200 overflow-hidden flex items-center justify-center min-h-[200px]">
                    <img src={imageBase64} alt="Anhang Vorschau" className="w-full h-full object-contain" />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 hover:text-red-600 hover:bg-white shadow-sm transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex flex-col justify-center space-y-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Bild mit KI bearbeiten
                    </label>
                    <input
                      type="text"
                      value={imagePrompt}
                      onChange={(e) => setImagePrompt(e.target.value)}
                      placeholder="z.B. Füge einen roten Kreis um das Schlagloch hinzu"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rek-magenta focus:border-transparent transition-all text-sm"
                    />
                    <button
                      type="button"
                      onClick={handleEditImage}
                      disabled={isEditingImage || !imagePrompt}
                      className="w-full flex items-center justify-center px-4 py-3 bg-rek-gelb text-gray-900 rounded-xl font-semibold hover:bg-[#e6d500] transition-all disabled:opacity-50"
                    >
                      {isEditingImage ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <Wand2 className="w-5 h-5 mr-2" />
                          Bild bearbeiten
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center px-6 py-4 text-lg font-semibold rounded-xl text-white bg-rek-magenta hover:bg-[#c4006a] transition-all shadow-lg hover:shadow-rek-magenta/30"
            >
              Bürgerbrief absenden
              <Send className="ml-2 w-5 h-5" />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
