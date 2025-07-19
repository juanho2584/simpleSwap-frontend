# SimpleSwap Frontend (React + Vite)

This project is a **dApp (Decentralized Application)** built with **React + Vite** to interact with the **TokenA**, **TokenB**, and **SimpleSwap** smart contracts deployed on the **Sepolia** network.

---
## 🚀 Technologies used

- [React 19](https://react.dev/)
- [Vite 6](https://vitejs.dev/)
- [Ethers.js 6](https://docs.ethers.org/v6/)
- [Bootstrap 5](https://getbootstrap.com/)
- [React Toastify](https://fkhadra.github.io/react-toastify/introduction/)
- Environment configuration with **dotenv**

---

## 📜 Contracts deployed in Sepolia

### **Token A**
- **Address:** `0x18a5321E8D655d846c67A1441bd88FEF3DCDf391`  
- **Etherscan:** [View code](https://sepolia.etherscan.io/address/0x18a5321E8D655d846c67A1441bd88FEF3DCDf391#code)

### **Token B**
- **Address:** `0x26a1E5E72fda2a3F000205B981627cE8aC6205CB`  
- **Etherscan:** [View code](https://sepolia.etherscan.io/address/0x26a1E5E72fda2a3F000205B981627cE8aC6205CB#code)

### **SimpleSwap**
- **Address:** `0x2fcB0a5C9Fa846A7A950Cdb191d9F3Fc03161FA8`  
- **Etherscan:** [View code](https://sepolia.etherscan.io/address/0x2fcB0a5C9Fa846A7A950Cdb191d9F3Fc03161FA8#code)

---

## **📦 Installation**

Clone the repository and then install the dependencies:

**git clone `https://github.com/juanho2584/simpleSwap-frontend.git`**

*cd simpleSwap-frontend*
*npm install*

### **▶️ Scripts**

Start development server:
*npm run dev*

Build for production:
*npm run build*

Preview build:
*npm run preview*


## 🌐 Frontend repository on GitHub `(https://github.com/juanho2584/simpleSwap-frontend.git)`

📌 **Notes**
The frontend is optimized for connection to MetaMask and EVM networks.
Bootstrap is included for a responsive design.
Ethers.js is used for all on-chain interactions.
Includes React Toastify for dynamic notifications.
## ✨ Frontend Features

### 🔗 Wallet Connection
- Integration with MetaMask and EIP-1193-compliant wallets
- Automatic network detection (Sepolia Testnet)
- Display of user address and ETH balance
- Error handling for connection refused or incorrect network
### 💱 Token Swap
- Token selector with dropdown
- Real-time swap fee calculation
- Validation of sufficient balances
- Approve/Transfer in one step (UX optimized)
- "Max" button for maximum swappable amount

### 📊 Information Dashboard
- Display balances of both tokens
- Estimated price and exchange rates
- Recent transaction history
- Network status (block number, gas price)

### 🛠 Utilities
- Slippage tolerance selector
- Transaction time settings
- Direct links to Etherscan for each transaction
- Toast notifications for transaction statuses:
- ✅ Success
- ⏳ Pending
- ❌ Error
- 📝 Confirmation required

### 🔄 User Flow
1. Wallet connection
2. Selecting tokens to trade
3. Entering the amount
4. Initial approval (if necessary)
5. Trade confirmation
6. Visual status feedback
7. Automatic balance update

### 🛡 Security
- Amount validation before transactions
- Warning when slippage is too high
- Clear testnet indicators (Sepolia)
- All contracts verifiable via Etherscan