const { LibraWallet, LibraClient, LibraNetwork } = require('kulap-libra')
const Bignumber = require('bignumber.js')

const client = new LibraClient({network: LibraNetwork.Testnet})

const createWallet = async () =>{
    // const wallet = new LibraWallet()
    const wallet = new LibraWallet({
        mnemonic: 'fade space unfair observe chimney shaft dove blouse vintage father window dawn lucky peasant omit lobster melody receive deal edit trial donor velvet rude',
    })
    const account = wallet.newAccount()

    // console.log("Hello", account)
    return {
        account : account,
        address :  account.getAddress().toHex(),
        mnemonic : wallet.config.mnemonic
    }
}

    const queryBalance = async (address) => {
        const accountState = await client.getAccountState(address)
        const balanceMicrio = accountState.balance.toString()
        const balance = Bignumber(balanceMicrio).dividedBy(Bignumber(1e6))
        return {
            balanceMicrio : balanceMicrio
        }
    }

    const transferCoin = async (account, toAddress, amount) => {
        const data = await client.transferCoins(
            account,
            toAddress,
            Bignumber(amount).times(1e6)
        )
    }

// function main
(async ()=> {
    const wallet = await createWallet()

    // Get Balance
    const balance = await queryBalance(wallet.address)
    console.log('Balance', balance)

    const result = await transferCoin(
        wallet.account,
        '6d8c5764ed96374bd567e1e2107faed35bd077a8411614ada89f1cac543a94b8',
        '0.1'
    )

    const balanceAfter = await queryBalance(wallet.address)
    console.log('Balance after : ', balanceAfter)
})()



