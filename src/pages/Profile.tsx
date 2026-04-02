import { useState, useEffect } from "react";

export function Profile() {
  const [name, setName] = useState("Profile Name");
  const [email, setEmail] = useState("profile@email.com");
  const [image, setImage] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("profile");
    if (savedData) {
      const data = JSON.parse(savedData);
      setName(data.name);
      setEmail(data.email);
      setImage(data.image);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem(
      "profile",
      JSON.stringify({ name, email, image })
    );

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">👤 Perfil</h1>

      <div className="bg-gray-800 p-6 rounded shadow grid md:grid-cols-2 gap-6 items-center">
        
        {/* LADO ESQUERDO - FOTO */}
        <div className="text-center">
          <img
            src={image || "https://i.pravatar.cc/150"}
            alt="avatar"
            className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-blue-500"
          />

          <input
  type="file"
  className="text-sm text-gray-400"
  onChange={(e) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  }}
/>
        </div>

        {/* LADO DIREITO - FORM */}
        <div>
          <input
            className="w-full p-3 mb-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome"
          />

          <input
            className="w-full p-3 mb-4 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu email"
          />

          <button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600 active:scale-95 transition px-4 py-2 rounded w-full"
          >
            Salvar alterações
          </button>

          {/* FEEDBACK */}
          {saved && (
            <p className="text-green-400 text-sm mt-3">
              ✔️ Perfil salvo!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}