import React, { useEffect, useState } from "react";
import s from "./ItemList.module.css";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch("http://localhost:3000/items");
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.log("Kunne ikke hente items", err);
      setError("Kunne ikke hente items");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/items", {
        method: "POST",
        heasder: {
          "Content-Type": "application.json",
        },
        body: JSON.stringify({ name, description }),
      });

      const errorData = await res.json();
      if (!res.ok) throw new Error(errorData.error);

      setName("");
      setDescription("");
      setItems();
    } catch (err) {
      console.error("Fejl ved hentning:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div>
        <form className={s.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name={name}
            minlength="2"
            maxlength="20"
            placeholder="Name"
            onChange={(e) => setItems(e.target.value)}
          />

          <textarea
            value={description}
            name="message"
            cols="30"
            rows="10"
            placeholder="Message"
            onChange={(e) => setItems(e.target.value)}
          ></textarea>
          <input
            type="submit"
            value={loading ? "Sender" : "Send besked"}
            disabled={loading}
          />
        </form>
        {error && <p>{error}</p>}
      </div>
      {items.map((i) => {
        <div key={i.id} className="">
          <h3>{i.name}</h3>
          <p>{i.description}</p>
        </div>;
      })}
    </section>
  );
};

export default ItemList;
