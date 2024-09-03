
const express =require('express');
 const nftController = require("../Controllers/nftController");
const nftsRouter =express.Router();
nftsRouter.route('/top-5-nfts').get(nftController.aliasTopNFTs, nftController.getAllNfts);
// nftsRouter.param("id",nftController.checkId);
nftsRouter.route("/")
    .get(nftController.getAllNfts)
    // .post(nftController.checkBody,nftController.createNFt);
    .post(nftController.createNFt);
    nftsRouter.route("/nfts-stats").get(nftController.getNFTsStats)
nftsRouter.route("/monthly-plan/:year").get(nftController.getMonthlyNFtCreate);

nftsRouter.route("/:id")
    .get(nftController.getSingleNft)
    .patch(nftController.update)
    .delete(nftController.deleteNft);

    module.exports = nftsRouter; 
    