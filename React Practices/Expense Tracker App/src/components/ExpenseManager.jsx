import React, { useState } from 'react';

function ExpenseTracker() {
  
  const [list, setList] = useState([]);
  const [balance, setBalance] = useState(0);

  // 2. Simple input states
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('Debit');

  const handleSave = (e) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);


    if (type === 'Debit') {
      setBalance(balance - numAmount);
    } else {
      setBalance(balance + numAmount);
    }

    
    const newEntry = {
      id: Date.now(),
      name: name,
      amount: numAmount,
      type: type
    };

    setList([...list, newEntry]);

    
    setName('');
    setAmount('');
  };

  const handleDelete = (item) => {
    
    if (item.type === 'Debit') {
      setBalance(balance + item.amount);
    } else {
      setBalance(balance - item.amount);
    }


    setList(list.filter(x => x.id !== item.id));
  };

  return (
    <div>
      <h1>Balance: {balance}</h1>

      <form onSubmit={handleSave}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Debit">Debit (Minus)</option>
          <option value="Credit">Credit (Plus)</option>
        </select>

        <button type="submit">Save</button>
      </form>

      <hr />

      
      <ul>
        {list.map((item) => (
          <li key={item.id}>
            {item.name} - {item.type}: {item.amount}
            <button onClick={() => handleDelete(item)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseTracker;