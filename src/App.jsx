import { useState, useEffect } from 'react';

function App() {
  const [codigo, setCodigo] = useState('');
  const [taxa, setTaxa] = useState('');
  const [custo, setCusto] = useState('');
  const [precoVenda, setPrecoVenda] = useState('');
  const [lucro, setLucro] = useState(0);
  const [lucroPercentual, setLucroPercentual] = useState(0);

  useEffect(() => {
    const pv = parseFloat(precoVenda);
    const tx = parseFloat(taxa);
    const ct = parseFloat(custo);

    if (!isNaN(pv) && !isNaN(tx) && !isNaN(ct) && pv !== 0) {
      const valorTaxa = pv * (tx / 100);
      const lucroCalculado = pv - valorTaxa - ct;
      const lucroPercentualCalculado = (lucroCalculado / pv) * 100;
      setLucro(lucroCalculado);
      setLucroPercentual(lucroPercentualCalculado);
    } else {
      setLucro(0);
      setLucroPercentual(0);
    }
  }, [precoVenda, taxa, custo]);

  const getLucroColor = () => {
    if (lucro > 0) return 'text-emerald-500';
    if (lucro < 0) return 'text-red-500';
    return 'text-slate-800';
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <header className="bg-slate-800 p-5 shadow-xl w-full">
        <h1 className="text-3xl font-bold text-center text-white tracking-wider uppercase">
          Viabilidade ML
        </h1>
      </header>

      <main className="p-4 sm:p-6 md:p-10 flex justify-center">
        <div className="max-w-6xl w-full bg-white p-8 rounded-2xl shadow-lg">

          <div className="mb-10">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-3 font-semibold text-slate-600 uppercase tracking-wider text-sm">CÓDIGO</th>
                  <th className="text-left p-3 font-semibold text-slate-600 uppercase tracking-wider text-sm">% TAXA</th>
                  <th className="text-left p-3 font-semibold text-slate-600 uppercase tracking-wider text-sm">CUSTO</th>
                  <th className="text-left p-3 font-semibold text-slate-600 uppercase tracking-wider text-sm">PREÇO DE VENDA</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2">
                    <input
                      type="text"
                      value={codigo}
                      onChange={(e) => setCodigo(e.target.value)}
                      placeholder="Ex: SKU-001"
                      className="w-full p-3 bg-slate-100 border-2 border-slate-200 rounded-lg shadow-inner focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      value={taxa}
                      onChange={(e) => setTaxa(e.target.value)}
                      placeholder="Ex: 16.5"
                      className="w-full p-3 bg-slate-100 border-2 border-slate-200 rounded-lg shadow-inner focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      value={custo}
                      onChange={(e) => setCusto(e.target.value)}
                      placeholder="Ex: 75.50"
                      className="w-full p-3 bg-slate-100 border-2 border-slate-200 rounded-lg shadow-inner focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      value={precoVenda}
                      onChange={(e) => setPrecoVenda(e.target.value)}
                      placeholder="Ex: 120.00"
                      className="w-full p-3 bg-slate-100 border-2 border-slate-200 rounded-lg shadow-inner focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="border-t-2 border-slate-200 pt-10">
            <h2 className="text-2xl font-bold text-slate-700 mb-8 text-center uppercase tracking-wide">Resultado da Análise</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              <div className="bg-slate-100 p-8 rounded-xl text-center shadow-md border border-slate-200">
                <p className="text-lg font-semibold text-slate-600 mb-2 uppercase tracking-wider">LUCRO (R$)</p>
                <p className={`text-5xl font-bold ${getLucroColor()}`}>
                  {lucro.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
              </div>

              <div className="bg-slate-100 p-8 rounded-xl text-center shadow-md border border-slate-200">
                <p className="text-lg font-semibold text-slate-600 mb-2 uppercase tracking-wider">MARGEM DE LUCRO (%)</p>
                <p className={`text-5xl font-bold ${getLucroColor()}`}>
                  {lucroPercentual.toFixed(2)}%
                </p>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;