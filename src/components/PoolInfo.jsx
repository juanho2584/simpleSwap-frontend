import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useBlockchain } from "../context/BlockchainContext";

const PoolInfo = () => {
  const { contracts } = useBlockchain();
  const [reserveA, setReserveA] = useState("0");
  const [reserveB, setReserveB] = useState("0");
  const [loading, setLoading] = useState(false);

  const fetchReserves = async () => {
    if (!contracts?.simpleSwap) return;

    setLoading(true);
    try {
      const reserves = await contracts.simpleSwap.getReserves(
        contracts.tokenA.target,
        contracts.tokenB.target
      );
      setReserveA(ethers.formatUnits(reserves[0], 18));  // tokenA
      setReserveB(ethers.formatUnits(reserves[1], 18));  // tokenB
    } catch (err) {
      console.error("Error al obtener reservas:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReserves(); // Actualizar reservas al cargar el componente

    // Escuchar evento "reservesUpdated" cuando las reservas cambien
    const handler = () => fetchReserves(); // Llamar nuevamente a fetchReserves
    window.addEventListener("reservesUpdated", handler);  // Escuchar evento

    return () => window.removeEventListener("reservesUpdated", handler); // Limpiar el evento al desmontar
  }, [contracts]);

  return (
    <div className="container mb-4">
      <div className="card shadow border-secondary">
        <div className="card-header bg-secondary text-white text-center">
          <h2 className="mb-0">📊 Información del Pool</h2>
        </div>
        <div className="card-body text-center">
          <p>
            <strong>Reservas Token A:</strong> {loading ? "..." : reserveA}
          </p>
          <p>
            <strong>Reservas Token B:</strong> {loading ? "..." : reserveB}
          </p>
          <button
            className="btn btn-outline-secondary btn-sm mt-2"
            onClick={fetchReserves}
          >
            🔄 Actualizar reservas
          </button>
        </div>
      </div>
    </div>
  );
};

export default PoolInfo;
