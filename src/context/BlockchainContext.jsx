import { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import tokenAAbi from "../abi/tokenA.json";
import tokenBAbi from "../abi/tokenB.json";
import simpleSwapAbi from "../abi/SimpleSwap.json";

// Crear contexto
const BlockchainContext = createContext();

// Hook personalizado para usar el contexto
export const useBlockchain = () => useContext(BlockchainContext);

// Componente proveedor del contexto
export const BlockchainProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contracts, setContracts] = useState({});

  // Función para conectar la wallet de MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      const ethProvider = new ethers.BrowserProvider(window.ethereum);
      try {
        const accounts = await ethProvider.send("eth_requestAccounts", []);
        const signer = await ethProvider.getSigner();
        setWallet(accounts[0]);
        setProvider(ethProvider);

        // Inicializar los contratos con signer
        const tokenA = new ethers.Contract(
          "0x18a5321E8D655d846c67A1441bd88FEF3DCDf391",
          tokenAAbi,
          signer
        );
        const tokenB = new ethers.Contract(
          "0x26a1E5E72fda2a3F000205B981627cE8aC6205CB",
          tokenBAbi,
          signer
        );
        const simpleSwap = new ethers.Contract(
          "0x2fcB0a5C9Fa846A7A950Cdb191d9F3Fc03161FA8",
          simpleSwapAbi,
          signer
        );

        setContracts({ tokenA, tokenB, simpleSwap });
      } catch (err) {
        console.error("Error conectando con la wallet: ", err);
        alert("❌ Error al conectar con MetaMask");
      }
    } else {
      alert("🛑 MetaMask no está instalado.");
    }
  };

  // Función para desconectar la wallet
  const disconnectWallet = () => {
    setWallet(null);
    setContracts({});
    setProvider(null);
  };

  // Detectar cambios en la cuenta conectada (cambio de cuenta o red)
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => window.location.reload());
      window.ethereum.on("chainChanged", () => window.location.reload());
    }
  }, []);

  // Valor del contexto
  return (
    <BlockchainContext.Provider
      value={{ wallet, connectWallet, disconnectWallet, provider, contracts }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};
