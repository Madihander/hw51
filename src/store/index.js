import {createStore} from 'vuex'
import Web3 from 'web3';
import {ContractABI} from "@/contract/contract.abi";
import {ContractBin} from "@/contract/ContractBin";

let web3

async function initWeb3() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum)
        try {
            // Запрашиваем доступ к аккаунту пользователя
            await window.ethereum.enable
            alert("Connected to Provider")
        } catch (error) {
            alert("Access denied: ", error)
        }
    } else {
        alert("Install Web3 wallet, for example MetaMask")
    }
}

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
            if (!web3) {
                await initWeb3();
            }
            // Получаем адрес и ID сети
            try {
                const accounts = await web3.eth.getAccounts();
                state.address = accounts[0];
                state.chainId = await web3.eth.getChainId();

                // Слушаем изменения аккаунта и сети
                window.ethereum.on('accountChanged', (accounts) => {
                    state.address = accounts[0];
                });
                window.ethereum.on('chainChanged', async () => {
                    state.chainId = await web3.eth.getChainId();
                });
            } catch (error) {
                alert("Error connecting wallet")
                console.log("Error connecting wallet: ", error)
            }
        },

        async deployContract({state}) {
            try {
                initWeb3();
                const accounts = await web3.eth.getAccounts();
                const contFactory = new web3.eth.Contract(ContractABI);
                const contract = await contFactory.deploy({data: ContractBin})
                    .send({
                        from: accounts[0],
                        gas: '5000000'
                    });
                console.log(contract.options.address);
                state.contract = contract;
                state.contAddress = contract.options.address;
                await this.connectContract({state}, contract.options.address);
            } catch (error) {
                alert("Deploy error")
                console.log("Deploy Error: ", error)
            }
        },

        connectContract({state}, address) {
            try {
                initWeb3();
                console.log(web3)
                const contract = new web3.eth.Contract(ContractABI, address);
                console.log("Connected");
                state.contract = contract;
                state.contAddress = contract.options.address;
            } catch (error) {
                console.log("Error connecting: ", error);
            }
        },

        async sendEth({state},args) {
            console.log(state.address)
            try {
                initWeb3();
                console.log(args[0])
                console.log(args[1])
                const amount = web3.utils.toWei(args[1], 'ether');
                const tx = {
                    to: args[0],
                    value: amount,
                };
                const accounts = await web3.eth.getAccounts();
                const receipt = await web3.eth.sendTransaction({
                    ...tx,
                    from: accounts[0],
                })
                return receipt;
            } catch (error) {
                alert("Error sending ETH");
                console.log(args[0])
                console.log(args[1])
                console.log("Error sending ETH: ",error)
            }
        },

        async GetNumber({state}) {
            alert(`Number: ${await state.contract.methods.getNumber().call()}`)
        },
        async GetStr({state}) {
            alert(`Str: ${await state.contract.methods.getStr().call()}`)
        },
        async GetNumberFromArr({state}, index) {
            alert(`Number: ${await state.contract.methods.getNumberFormArray(Number(index)).call()}`)
        },


        async SetNumber({ state }, number) {
            try {
                const accounts = await web3.eth.getAccounts();
                const tx = await state.contract.methods.setNumber(Number(number)).send({ from: accounts[0] });

                alert(`Transaction hash: ${tx.transactionHash}`);
                alert("Transaction passed");
            } catch (error) {
                alert("Error")
                console.error("ERROR:", error);
            }
        },
        async SetStr({ state }, str) {
            try {
                const accounts = await web3.eth.getAccounts();
                const tx = await state.contract.methods.setStr(str).send({ from: accounts[0] });

                alert(`Transaction hash: ${tx.transactionHash}`);
                alert("Transaction passed");
            } catch (error) {
                alert("Error")
                console.error("ERROR:", error);
            }
        },
        async PushNumber({ state }, number) {
            try {
                const accounts = await web3.eth.getAccounts();
                const tx = await state.contract.methods.pushNumber(number).send({ from: accounts[0] });

                alert(`Transaction hash: ${tx.transactionHash}`);
                alert("Transaction passed");
            } catch (error) {
                console.error("ERROR:", error);
            }
        },

    }
})
