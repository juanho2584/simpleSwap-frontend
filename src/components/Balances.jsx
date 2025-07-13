import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useBlockchain } from "../context/BlockchainContext";

const Balances = () => {
  const { wallet, contracts } = useBlockchain();
  const [balances, setBalances] = useState({ A: "0", B: "0" });

  useEffect(() => {
    const fetchBalances = async () => {
      if (!wallet || !contracts.tokenA || !contracts.tokenB) return;

      const balA = await contracts.tokenA.balanceOf(wallet);
      const balB = await contracts.tokenB.balanceOf(wallet);

      setBalances({
        A: ethers.formatUnits(balA, 18),
        B: ethers.formatUnits(balB, 18),
      });
    };

    fetchBalances();
  }, [wallet, contracts]);

  return (
    <div className="alert alert-light text-center">
      <strong>💼 Tus balances:</strong> TokenA: {balances.A} | TokenB: {balances.B}
    </div>
  );
};

export default Balances;
