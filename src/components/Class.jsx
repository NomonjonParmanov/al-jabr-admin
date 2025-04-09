import React, { useState } from "react";

const ClassForm = () => {
  const [sinfUz, setSinfUz] = useState("");
  const [sinfRu, setSinfRu] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    const newClass = {
      name: {
        uz: sinfUz,
        ru: sinfRu,
      },
    };

    try {
      const response = await fetch(
        "https://matematika.al-jabr-edu.uz/api/classes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // "Authorization": "Bearer YOUR_TOKEN_HERE" // agar kerak bo‘lsa
          },
          body: JSON.stringify(newClass),
        }
      );

      if (!response.ok) {
        throw new Error("Xatolik yuz berdi. So‘rov bajarilmadi.");
      }

      const data = await response.json();
      setSuccessMsg("Sinf muvaffaqiyatli yaratildi!");
      setSinfUz("");
      setSinfRu("");
      console.log("Yaratilgan sinf:", data);
    } catch (error) {
      setErrorMsg(error.message || "Xatolik yuz berdi.");
      console.error("POST error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "1rem" }}>
      <h2>Yangi sinf qo‘shish</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>O'zbekcha nom:</label>
          <input
            type="text"
            value={sinfUz}
            onChange={(e) => setSinfUz(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Ruscha nom:</label>
          <input
            type="text"
            value={sinfRu}
            onChange={(e) => setSinfRu(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Yuborilmoqda..." : "Yaratish"}
        </button>
      </form>
      {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
    </div>
  );
};

export default ClassForm;
