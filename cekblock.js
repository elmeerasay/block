const { ethers } = require('ethers');

// Menggunakan import() dinamis untuk chalk
(async () => {
    const chalk = (await import('chalk')).default;

    const providerUrl = "https://betanet-rpc1.artela.network";
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);
    const targetBlock = 11541563;

    async function getBlockInfo() {
        try {
            const currentBlock = await provider.getBlockNumber();
            const remainingBlocks = targetBlock - currentBlock;

            console.log("Block :", currentBlock);
            console.log(chalk.green("Remaining block : " + remainingBlocks));

            // Cek apakah sudah mencapai target block
            if (remainingBlocks <= 0) {
                console.log(chalk.yellow("Target block telah tercapai!"));
                process.exit(0); // Hentikan program
            }
        } catch (error) {
            console.error("Error mendapatkan block:", error);
        }
    }

    // Jalankan loop untuk pengecekan setiap 10 detik
    setInterval(getBlockInfo, 10000);

    // Jalankan pertama kali sebelum interval dimulai
    getBlockInfo();
})();
