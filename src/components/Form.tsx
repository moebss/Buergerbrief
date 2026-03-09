import { useState, useRef } from "react";
import { motion } from "motion/react";
import { Send, Image as ImageIcon, Loader2, Wand2, X } from "lucide-react";
import { editImageWithPrompt } from "../services/gemini";

export default function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    infos: "",
  });

  // Image Editing State
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imagePrompt, setImagePrompt] = useState("");
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Prepare form data for Web3Forms
      // Web3Forms access key needs to be swapped with the user's real key
      const submissionData = {
        access_key: "7c04e848-ebdb-45ca-bea1-09174c75cd8d", // Real Web3Forms Access Key
        name: formData.name,
        email: formData.email,
        subject: `Neuer Bürgerbrief von ${formData.name}`,
        infos: formData.infos,
        // Web3Forms allows custom data fields
        attachment_base64: imageBase64 || "Kein Anhang",
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", infos: "" });
        handleRemoveImage();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {

      console.error("Submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <section id="schreib-mir" className="py-20 md:py-32 bg-gray-50 relative overflow-hidden">


      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">

        <div className="text-center mb-20">
          <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
            Schreib mir – ich höre zu.
          </h3>
        </div>


        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl p-6 md:p-12 border border-gray-100 mx-1 md:mx-0"
        >
          {submitStatus === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Send className="w-10 h-10" />
              </div>
              <h4 className="text-3xl font-black text-gray-900 mb-4">Brief gesendet!</h4>
              <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                Danke für dein Vertrauen. Ich lese deinen Brief persönlich und melde mich so schnell wie möglich bei dir.
              </p>
              <button
                onClick={() => setSubmitStatus("idle")}
                className="px-8 py-4 bg-rek-magenta text-white font-bold rounded-2xl shadow-xl shadow-rek-magenta/20"
              >
                Weiteren Brief schreiben
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-bold text-gray-700 ml-1">Dein Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-rek-magenta focus:ring-0 transition-all bg-gray-50/50 hover:bg-white focus:bg-white outline-none text-base"
                    placeholder="Wie heißt du?"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-bold text-gray-700 ml-1">Deine E-Mail</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-rek-magenta focus:ring-0 transition-all bg-gray-50/50 hover:bg-white focus:bg-white outline-none text-base"
                    placeholder="damit ich dir antworten kann"
                    required
                  />
                </div>
              </div>



              <div className="space-y-2">
                <label htmlFor="infos" className="block text-sm font-bold text-gray-700 ml-1">Was beschäftigt dich?</label>
                <textarea
                  id="infos"
                  name="infos"
                  rows={6}
                  value={formData.infos}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-rek-magenta focus:ring-0 transition-all bg-gray-50/50 hover:bg-white focus:bg-white outline-none resize-none text-base"
                  placeholder="Was beschäftigt dich? Das kann ein Straßenproblem sein, eine Sorge um die Schule deiner Kinder – oder einfach etwas, das du schon lange loswerden wolltest."
                  required
                />
              </div>



              {/* Simplified Image Attachment Section */}
              <div className="py-4 border-t border-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-bold text-gray-700 flex items-center cursor-pointer" onClick={() => !imageBase64 && fileInputRef.current?.click()}>
                    <ImageIcon className="w-4 h-4 mr-2 text-gray-400" />
                    Foto mitschicken? (Optional)
                  </label>
                  {imageBase64 && (
                    <button type="button" onClick={handleRemoveImage} className="text-xs text-red-500 font-semibold">Entfernen</button>
                  )}
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
                      className="w-full flex items-center justify-center px-4 py-8 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 hover:text-rek-magenta transition-all bg-white"
                    >
                      <ImageIcon className="w-6 h-6 mr-3 opacity-20" />
                      <span className="font-semibold text-gray-600 text-sm">Bild auswählen</span>
                    </motion.button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative rounded-2xl border border-gray-100 overflow-hidden bg-gray-50 max-h-48 flex items-center justify-center">
                      <img src={imageBase64} alt="Vorschau" className="max-h-48 object-contain" />
                    </div>
                  </div>
                )}
              </div>



              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center px-8 py-5 text-xl font-bold rounded-2xl text-white bg-rek-magenta hover:bg-rek-magenta-dark transition-all shadow-xl shadow-rek-magenta/20 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    Brief senden
                    <Send className="ml-3 w-6 h-6" />
                  </>
                )}
              </motion.button>

              <p className="text-center text-sm text-gray-500 mt-6">
                Deine Nachricht geht nur an mich. Ich behandle sie vertraulich.
              </p>

              {submitStatus === "error" && (

                <p className="text-center text-red-500 font-bold mt-4">
                  Ein Fehler ist aufgetreten. Bitte versuche es später erneut.
                </p>
              )}
            </form>
          )}
        </motion.div>

      </div>
    </section>
  );
}
