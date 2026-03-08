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
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full bg-rek-magenta/10 border border-rek-magenta/20"
          >
            <span className="text-sm font-bold tracking-widest text-rek-magenta uppercase">
              Ihre Stimme zählt
            </span>
          </motion.div>
          <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
            Bürgerbrief verfassen
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Teile dein Anliegen mit. Hänge bei Bedarf ein Bild an und nutze unsere <span className="text-rek-magenta font-semibold">KI-Assistenz</span>.
          </p>
        </div>


        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl p-6 md:p-12 border border-gray-100"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-bold text-gray-700 ml-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-rek-magenta focus:ring-0 transition-all bg-gray-50/50 hover:bg-white focus:bg-white outline-none"
                  placeholder="Max Mustermann"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 ml-1">E-Mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-rek-magenta focus:ring-0 transition-all bg-gray-50/50 hover:bg-white focus:bg-white outline-none"
                  placeholder="max@beispiel.de"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="kommune" className="block text-sm font-bold text-gray-700 ml-1">Kommune</label>
                <select
                  id="kommune"
                  name="kommune"
                  value={formData.kommune}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-rek-magenta focus:ring-0 transition-all bg-gray-50/50 hover:bg-white focus:bg-white outline-none appearance-none cursor-pointer"
                  required
                >
                  <option value="" disabled>Bitte wählen...</option>
                  {KOMMUNEN.map((k) => (
                    <option key={k} value={k}>{k}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="thema" className="block text-sm font-bold text-gray-700 ml-1">Thema</label>
                <input
                  type="text"
                  id="thema"
                  name="thema"
                  value={formData.thema}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-rek-magenta focus:ring-0 transition-all bg-gray-50/50 hover:bg-white focus:bg-white outline-none"
                  placeholder="z.B. Radwegausbau"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="infos" className="block text-sm font-bold text-gray-700 ml-1">Zusätzliche Infos</label>
              <textarea
                id="infos"
                name="infos"
                rows={5}
                value={formData.infos}
                onChange={handleInputChange}
                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-rek-magenta focus:ring-0 transition-all bg-gray-50/50 hover:bg-white focus:bg-white outline-none resize-none"
                placeholder="Weitere Details zu Ihrem Anliegen..."
              />
            </div>


            {/* Image Attachment Section */}
            <div className="bg-gray-50/50 rounded-3xl p-8 border border-gray-100">
              <div className="mb-6">
                <h4 className="text-xl font-bold text-gray-900 flex items-center">
                  <div className="p-2 rounded-lg bg-white shadow-sm mr-3">
                    <ImageIcon className="w-5 h-5 text-rek-magenta" />
                  </div>
                  Briefanhang (Optional)
                </h4>
                <p className="text-sm text-gray-500 mt-2 font-light">
                  Laden Sie ein Foto hoch, um Ihr Anliegen zu verdeutlichen. Nutzen Sie unsere <span className="text-rek-magenta font-semibold">KI</span>, um Details zu markieren oder Unnötiges zu entfernen.
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
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.01, borderColor: "var(--color-rek-magenta)" }}
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex flex-col items-center justify-center px-4 py-12 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 hover:text-rek-magenta transition-all bg-white"
                  >
                    <ImageIcon className="w-10 h-10 mb-3 opacity-20" />
                    <span className="font-semibold text-gray-600">Bild auswählen oder ablegen</span>
                    <span className="text-xs mt-1 text-gray-400">JPG, PNG bis 5MB</span>
                  </motion.button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm flex items-center justify-center min-h-[250px]">
                    <img src={imageBase64} alt="Anhang Vorschau" className="w-full h-full object-contain p-2" />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 hover:bg-white shadow-xl transition-all opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex flex-col justify-center space-y-4">
                    <label className="block text-sm font-bold text-gray-700 ml-1 ring-offset-background">
                      KI-Bildbearbeitung
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={imagePrompt}
                        onChange={(e) => setImagePrompt(e.target.value)}
                        placeholder="z.B. Gesichter unkenntlich machen..."
                        className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-rek-gelb focus:ring-0 transition-all bg-white outline-none pr-12 text-sm"
                      />
                      <Wand2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-rek-gelb" />
                    </div>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleEditImage}
                      disabled={isEditingImage || !imagePrompt}
                      className="w-full flex items-center justify-center px-6 py-4 bg-rek-gelb text-gray-900 rounded-2xl font-bold hover:shadow-lg hover:shadow-rek-gelb/20 transition-all disabled:opacity-50"
                    >
                      {isEditingImage ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                      ) : (
                        <>
                          <Wand2 className="w-5 h-5 mr-3" />
                          Bild bearbeiten mit KI
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              )}
            </div>


            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center px-8 py-5 text-xl font-bold rounded-2xl text-white bg-rek-magenta hover:bg-rek-magenta-dark transition-all shadow-xl shadow-rek-magenta/20"
            >
              Bürgerbrief absenden
              <Send className="ml-3 w-6 h-6" />
            </motion.button>

          </form>
        </motion.div>
      </div>
    </section>
  );
}
