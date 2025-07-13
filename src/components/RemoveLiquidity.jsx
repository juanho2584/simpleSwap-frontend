import { useState } from "react";
import { ethers } from "ethers";
import { useBlockchain } from "../context/BlockchainContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RemoveLiquidity = () => {
  const { wallet, contracts } = useBlockchain();
  const [liquidityAmount, setLiquidityAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRemoveLiquidity = async () => {
    if (!wallet || !contracts?.simpleSwap || !contracts?.tokenA || !contracts?.tokenB) {
      toast.error("⚠️ Wallet o contratos no disponibles");
      return;
    }

    setLoading(true);
    try {
      const liquidity = ethers.parseUnits(liquidityAmount, 18);
      const deadline = Math.floor(Date.now() / 1000) + 600;

      // Aprobar el uso del LP Token (token de liquidez)
      const approveTx = await contracts.simpleSwap.approve(
        contracts.simpleSwap.target,
        liquidity
      );
      await approveTx.wait();

      // Ejecutar la función de removeLiquidity
      const tx = await contracts.simpleSwap.removeLiquidity(
        contracts.tokenA.target,
        contracts.tokenB.target,
        liquidity,
        0, // amountAMin
        0, // amountBMin
        wallet,
        deadline
      );
      await tx.wait();

      toast.success("✅ Liquidez retirada con éxito");
      setLiquidityAmount("");

      // Notificar a otros componentes
      window.dispatchEvent(new Event("reservesUpdated"));
    } catch (err) {
      console.error("Error al remover liquidez:", err);
      toast.error(`❌ Error: ${err.reason || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="card shadow border-danger">
        <div className="card-header bg-danger text-white text-center">
          <h2 className="mb-0">💥 Remove Liquidity</h2>
        </div>
        <div className="card-body">
          <div className="form-group mb-4">
            <label htmlFor="liquidityAmount" className="form-label">
              Cantidad de Liquidez a Retirar (LP tokens)
            </label>
            <input
              id="liquidityAmount"
              className="form-control"
              type="number"
              placeholder="0.0"
              value={liquidityAmount}
              onChange={(e) => setLiquidityAmount(e.target.value)}
            />
          </div>

          <button
            onClick={handleRemoveLiquidity}
            className="btn btn-danger w-100"
            disabled={loading || !liquidityAmount}
          >
            {loading ? "⏳ Procesando..." : "Remover Liquidez"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveLiquidity;
