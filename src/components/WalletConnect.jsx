import { useBlockchain } from "../context/BlockchainContext";

const WalletConnect = () => {
  const { wallet, connectWallet, disconnectWallet } = useBlockchain();

  return (
    <div className="text-center mb-4">
      {wallet ? (
        <>
          <p className="text-success">✅ Conectado: {wallet}</p>
          <button
            onClick={disconnectWallet}
            className="btn btn-danger"
          >
            ❌ Desconectar Wallet
          </button>
        </>
      ) : (
        <button onClick={connectWallet} className="btn btn-primary">
          🔌 Conectar Wallet
        </button>
      )}
    </div>
  );
};

export default WalletConnect;
