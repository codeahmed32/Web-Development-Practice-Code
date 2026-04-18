import React, { useState } from 'react';

function ProductStore() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    const newProduct = { id: Date.now(), name, image, price, desc };
    setProducts([...products, newProduct]);
    setName(''); setImage(''); setPrice(''); setDesc('');
  };

  const removeProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div>
      <form onSubmit={handleSave}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
        <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <input placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
        <button type="submit">Save</button>
      </form>

      <div>
        {products.map((p) => (
          <div key={p.id}>
            <img src={p.image} alt="" />
            <p>{p.name}</p>
            <p>{p.price}PKR</p>
            <p>{p.desc}</p>
            {/* <p>{p.}</p> */}
            <button onClick={() => removeProduct(p.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductStore;