import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useBlockchain } from "../context/BlockchainContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Swap = () => {
  const { wallet, contracts } = useBlockchain();
  const [amountIn, setAmountIn] = useState("");
  const [estimatedOut, setEstimatedOut] = useState("0");
  const [loading, setLoading] = useState(false);
  const [isReversed, setIsReversed] = useState(false); // swap A→B o B→A

  const tokenIn = isReversed ? contracts?.tokenB : contracts?.tokenA;
  const tokenOut = isReversed ? contracts?.tokenA : contracts?.tokenB;
  const labelIn = isReversed ? "Token B" : "Token A";
  const labelOut = isReversed ? "Token A" : "Token B";

  useEffect(() => {
    const fetchAmountOut = async () => {
      if (!contracts?.simpleSwap || !tokenIn || !tokenOut || !amountIn) return;

      try {
        const input = ethers.parseUnits(amountIn, 18);
        const out = await contracts.simpleSwap.getAmountOut(
          tokenIn.target,
          tokenOut.target,
          input
        );
        setEstimatedOut(ethers.formatUnits(out, 18));
      } catch (err) {
        console.error("Error estimando salida:", err);
        setEstimatedOut("0");
      }
    };

    fetchAmountOut();
  }, [amountIn, isReversed, contracts]);

  const handleSwap = async () => {
    if (!wallet || !contracts?.simpleSwap || !tokenIn || !tokenOut) return;
    setLoading(true);

    try {
      const input = ethers.parseUnits(amountIn, 18);
      const minOut = ethers.parseUnits(
        (Number(estimatedOut) * 0.95).toString(), // 5% slippage
        18
      );
      const deadline = Math.floor(Date.now() / 1000) + 600;
      const path = [tokenIn.target, tokenOut.target];

      // Aprobar el token de entrada
      const approvalTx = await tokenIn.approve(contracts.simpleSwap.target, input);
      await approvalTx.wait();

      // Ejecutar el swap correctamente
      const tx = await contracts.simpleSwap.swapExactTokensForTokens(
        input,
        minOut,
        path,
        wallet,
        deadline
      );
      await tx.wait();

      toast.success("✅ Swap realizado con éxito");
      setAmountIn("");
      setEstimatedOut("0");
    } catch (err) {
      console.error("Error en la transacción de swap:", err);
      toast.error(`❌ Error en la transacción: ${err.reason || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const toggleDirection = () => {
    setIsReversed(!isReversed);
    setAmountIn("");
    setEstimatedOut("0");
  };

  return (
    <div className="container py-5">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="card shadow border-success">
        <div className="card-header bg-success text-white text-center">
          <h2 className="mb-0">🔁 Swap Tokens</h2>
        </div>
        <div className="card-body">
          <div className="form-group mb-3">
            <label>Cantidad de {labelIn}</label>
            <input
              type="number"
              className="form-control"
              value={amountIn}
              onChange={(e) => setAmountIn(e.target.value)}
              placeholder="0.0"
            />
          </div>

          <div className="text-center mb-3">
            <button
              onClick={toggleDirection}
              className="btn btn-outline-secondary"
            >
              🔄 Invertir dirección
            </button>
          </div>

          <div className="form-group mb-4">
            <label>Recibirás (estimado) en {labelOut}</label>
            <input
              className="form-control"
              value={estimatedOut}
              disabled
            />
          </div>

          <button
            className="btn btn-success w-100"
            onClick={handleSwap}
            disabled={loading || !amountIn}
          >
            {loading ? "⏳ Procesando..." : `Swap ${labelIn} ➡ ${labelOut}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Swap;
