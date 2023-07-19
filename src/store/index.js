import {createStore} from 'vuex'
import {ethers} from 'ethers'
import {ContractABI} from "@/contract/contract.abi.js";
import {ContractBin} from "@/contract/ContractBin.js";

let provider = new ethers.providers.Web3Provider(window.ethereum)

export default createStore({
    state: {
        address: "",
        chainId: "",
        contract: {},
        contAddress: "",
        transactionHash: "",
    },
    getters: {
        getAddress: state => {
            return state.contAddress
        },
    },
    mutations: {},
    actions: {
        async connectWallet({state}) {
            if (window.ethereum !== "underfind") {
                console.log("Ethereum client installed")
                if (window.ethereum.isMetaMask === true) {
                    console.log("MetaMask installed")
                    if (window.ethereum.isConnected !== true) {
                        console.log("MetaMask is not connected")
                        await window.ethereum.enable()
                    }
                    console.log("Metamask connected")
                } else {
                    console.log("MetaMask is not installed")
                }
            } else {
                console.log("Ethereum client is not installed")
            }
            this.state.address = await provider.getSigner().getAddress()
            this.state.chainId = await window.ethereum.request({method: 'eth_chainId'});
            console.log("Chain Id:", this.state.chainId)

            window.ethereum.on('accountsChanged', (accounts) => {
                state.address = ethers.utils.getAddress(accounts[0])
            })

            window.ethereum.on('chainChanged', async () => {
                provider = ethers.providers.Web3Provider(window.ethereum)
                state.chainId = await window.ethereum.request({method: 'eth_chainId'});
                console.log('ChainId changed to ', state.chainId)
            })

        },


        async deployContract({state}) {

            let signer = provider.getSigner();
            const contFactory = new ethers.ContractFactory(ContractABI, ContractBin, signer);
            const contract = await contFactory.deploy();
            await contract.deployed();
            console.log(contract.address)
            state.contract = contract;
            state.contAddress = state.contract.address;
            await this.connectContract({state}, contract.address);
        },
        async connectContract({state}, address) {
            let signer = provider.getSigner();
            const contract = new ethers.Contract(address, ContractABI, signer)
            console.log("CONNECTED")
            state.contract = contract;
            state.contAddress = contract.address;
        },

        async sendEth({state}, args) {
            console.log("SEND ETH WORK")
            console.log(state.contAddress)
            try {
                let amount = ethers.utils.parseEther(args[1]);
                const tx = {
                    to: args[0],
                    value: amount.toString(),
                }
                let signer = await provider.getSigner();
                let receipt = await signer.sendTransaction(tx);
                return receipt;
            } catch (error) {
                console.log(error)
            }

        },


        async GetNumber({state}) {
            alert(`Number: ${await state.contract.getNumber()}`)
        },
        async GetStr({state}) {
            alert(`Str: ${await state.contract.getStr()}`)
        },
        async GetNumberFromArr({state}, index) {
            alert(`Number: ${await state.contract.getNumberFormArray(Number(index))}`)
        },


        async SetNumber({state}, number) {
            try {
                const tx = await state.contract.setNumber(Number(number));
                alert(tx.hash)
                await tx.wait(3);
                alert("Transaction passed")
                const receipt = await provider.getTransactionReceipt(tx.hash);
                let cond = receipt.status === 1 ? 'Success' : "Error"
                alert("Condition of Transaction: ", cond);
            } catch (error) {
                alert("ERROR")
                console.log(error)
            }
        },
        async SetStr({state}, str) {
            try {
                const tx = await state.contract.setStr(str);
                alert(tx.hash)
                await tx.wait(3);
                alert("Transaction passed")
                const receipt = await provider.getTransactionReceipt(tx.hash);
                let cond = receipt.status === 1 ? 'Success' : "Error"
                alert("Condition of Transaction: ", cond);
            } catch (error) {
                alert("ERROR")
                console.log(error)
            }

        },
        async PushNumber({state}, number) {
            try {
                const tx = await state.contract.callPushNumber(number);
                alert(tx.hash)
                await tx.wait(3);
                alert("Transaction passed")
                const receipt = await provider.getTransactionReceipt(tx.hash);
                let cond = receipt.status === 1 ? 'Success' : "Error"
                alert("Condition of Transaction: ", cond);
            } catch (error) {
                alert("ERROR")
                console.log(error)
            }
        },

    },
    modules: {}
})
