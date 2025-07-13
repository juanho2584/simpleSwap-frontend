import { useState } from "react";
import { ethers } from "ethers";
import { useBlockchain } from "../context/BlockchainContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Liquidity = () => {
  const { wallet, contracts } = useBlockchain();
  const [amountA, setAmountA] = useState("");
  const [amountB, setAmountB] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddLiquidity = async () => {
    if (!wallet || !contracts?.simpleSwap || !contracts?.tokenA || !contracts?.tokenB) {
      toast.error("⚠️ Wallet o contratos no disponibles");
      return;
    }

    setLoading(true);
    try {
      const inputA = ethers.parseUnits(amountA, 18);
      const inputB = ethers.parseUnits(amountB, 18);
      const deadline = Math.floor(Date.now() / 1000) + 600;

      // Aprobar Token A
      const txA = await contracts.tokenA.approve(contracts.simpleSwap.target, inputA);
      await txA.wait();

      // Aprobar Token B
      const txB = await contracts.tokenB.approve(contracts.simpleSwap.target, inputB);
      await txB.wait();

      // Agregar liquidez
      const addTx = await contracts.simpleSwap.addLiquidity(
        contracts.tokenA.target,
        contracts.tokenB.target,
        inputA,
        inputB,
        0,
        0,
        wallet,
        deadline
      );
      await addTx.wait();

      toast.success("✅ Liquidez agregada con éxito");

      // Limpiar inputs
      setAmountA("");
      setAmountB("");

      // Notificar al resto de componentes (como PoolInfo)
      window.dispatchEvent(new Event("reservesUpdated"));
    } catch (err) {
      console.error("Error al agregar liquidez:", err);
      toast.error(`❌ Error: ${err.reason || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="card shadow border-info">
        <div className="card-header bg-info text-white text-center">
          <h2 className="mb-0">💧 Add Liquidity</h2>
        </div>
        <div className="card-body">
          <div className="row mb-4">
            <div className="col-md-6">
              <label htmlFor="amountA" className="form-label">Cantidad Token A</label>
              <input
                id="amountA"
                className="form-control"
                type="number"
                placeholder="0.0"
                value={amountA}
                onChange={(e) => setAmountA(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="amountB" className="form-label">Cantidad Token B</label>
              <input
                id="amountB"
                className="form-control"
                type="number"
                placeholder="0.0"
                value={amountB}
                onChange={(e) => setAmountB(e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={handleAddLiquidity}
            className="btn btn-info w-100"
            disabled={loading || !amountA || !amountB}
          >
            {loading ? "⏳ Agregando..." : "Agregar Liquidez"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Liquidity;
