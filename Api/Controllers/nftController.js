
// // const fs = require('fs');

// // const nfts = JSON.parse(fs.readFileSync(`${__dirname}/../../data/nft-simple.json`));


// // exports.checkId = (req,res,next,value) =>{
    
// //     // if (nftIndex === -1) {
// //     //     return res.status(404).json({
// //     //         status: "error",
// //     //         message: "NFT not found",
// //     //     });
// //     // }
// //      next();

// // }

// // exports.checkBody =(req,res,next)=>{
// //     if (!req.body.name ||!req.body.description ||!req.body.image ||!req.body.price ) {
// //         return res.status(400).json({
// //             status: "error",
// //             message: "Missing required fields: name, description, and image  or price",
// //         });
// //     }
// //     next();
// // }

// exports.getAllNfts = (req, res) => {
//     console.log(req.requestTime);
//     res.status(200).json({
//         status: "success",
//         requestTime: req.requestTime,
//         // result: nfts.length,
//         // data: {
//         //     nfts,
//         // },
//     });
// };
// // Create a new NFT
// exports.createNFt = (req, res) => {
//     // const newId = nfts.length > 0 ? nfts[nfts.length - 1].id + 1 : 1;
//     // const newNFt = { id: newId, ...req.body };
//     // nfts.push(newNFt);

//     // fs.writeFile(`${__dirname}/../../data/nft-simple.json`, JSON.stringify(nfts), err => {
//     //     if (err) {
//     //         return res.status(500).json({
//     //             status: "error",
//     //             message: "Failed to create NFT",
//     //         });
//     //     }
//     //     res.status(201).json({
//     //         status: "success",
//     //         nft: newNFt,
//     //     });
//     // });
// };

// // Get a single NFT by ID
// exports.getSingleNft = (req, res) => {
//     const id = parseInt(req.params.id, 10);
//     // const nft = nfts.find(el => el.id === id);

//     // if (!nft) {
//     //     return res.status(404).json({
//     //         status: "error",
//     //         message: "NFT not found",
//     //     });
//     // }

//     res.status(200).json({
//         status: "success",
//     //     data: {
//     //         nft,
//     //     },
//     });
// };

// // Update an NFT by ID
// exports.update = (req, res) => {
//     // const id = parseInt(req.params.id, 10);
//     // const nftIndex = nfts.findIndex(el => el.id === id);

//     // if (nftIndex === -1) {
//     //     return res.status(404).json({
//     //         status: "error",
//     //         message: "NFT not found",
//     //     });
//     // }

//     // const updatedNft = { ...nfts[nftIndex], ...req.body };
//     // nfts[nftIndex] = updatedNft;

//     // fs.writeFile(`${__dirname}/../../data/nft-simple.json`, JSON.stringify(nfts), err => {
//     //     if (err) {
//     //         return res.status(500).json({
//     //             status: "error",
//     //             message: "Failed to update NFT",
//     //         });
//     //     }
//         res.status(200).json({
//             status: "success",
//             message: "NFT updated successfully",
//             // data: {
//             //     nft: updatedNft,
//             // },
//         });
//     // });
// };

// // Delete an NFT by ID
// exports.deleteNft = (req, res) => {
//     // const id = parseInt(req.params.id, 10);
//     // const nftIndex = nfts.findIndex(el => el.id === id);


//     // nfts.splice(nftIndex, 1);

//     // fs.writeFile(`${__dirname}/../../data/nft-simple.json`, JSON.stringify(nfts), err => {
//     //     if (err) {
//     //         return res.status(500).json({
//     //             status: "error",
//     //             message: "Failed to delete NFT",
//     //         });
//     //     }
//         res.status(204).json({
//             status: "success",
//             message: "NFT deleted successfully",
//             data: null,
//         });
//     // });
// };


//  PART-2 --------------------------------------


// // const fs = require('fs');

// // const nfts = JSON.parse(fs.readFileSync(`${__dirname}/../../data/nft-simple.json`));


// const NFT = require("../Model/nftModel");
// exports.aliasTopNFTs = (req, res, next) => {
//     req.query.limit = '5';  // Limit to 5 results
//     req.query.sort = '-ratingAverage,price';  // Sort by rating average (descending) and price (ascending)
//     req.query.fields = 'name,price,ratingAverage,difficulty';  // Select specific fields
//     next();
// };
// class APIFeatures{
//     constructor(query, queryString){
//         this.query = query;
//         this.queryString = queryString;
//     }
//     filter(){
//         const queryObj = {...this.queryString };
//         const allowedFields = ['name', 'price', 'ratingAverage', 'difficulty'];
//         const filteredObj = {};
// }
// exports.getAllNfts = async (req, res) => {
//     try {
//         // Create a query object from the request query parameters
//         const queryObj = { ...req.query };

//         // Fields to exclude from the query object
//         const excludeFields = ["page", "limit", "fields", "sort"];
//         excludeFields.forEach(el => delete queryObj[el]);

//         // Convert query object to a JSON string and replace operators
//         let queryStr = JSON.stringify(queryObj);
//         queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
//         const query = JSON.parse(queryStr);

//         // Build the Mongoose query
//         let mongoQuery = NFT.find(query);

//         // Handle sorting
//         if (req.query.sort) {
//             const sortBy = req.query.sort.split(',').join(' ');
//             mongoQuery = mongoQuery.sort(sortBy);
//         } else {
//             // Default sorting if no sort query parameter is provided
//             mongoQuery = mongoQuery.sort("-createdAt");
//         }

//         // Handle field selection
//         if (req.query.fields) {
//             const fields = req.query.fields.split(',').join(' ');
//             mongoQuery = mongoQuery.select(fields);
//         }

//         // Handle pagination
//         const page = parseInt(req.query.page, 10) || 1; // Default to page 1
//         const limit = parseInt(req.query.limit, 10) || 10; // Default to 10 results per page
//         const skip = (page - 1) * limit; // Calculate how many documents to skip

//         mongoQuery = mongoQuery.skip(skip).limit(limit);


//         // Execute the query and get the results
//         const nfts = await mongoQuery;

//         res.status(200).json({
//             status: "success",
//             results: nfts.length,
//             data: {
//                 nfts,
//             },
//         });
//     } catch (error) {
//         res.status(400).json({
//             status: "fail",
//             message: "NFT not found",
//         });
//     }
// };
// // Create a new NFT
// exports.createNFt = async (req, res) => {
//     try {
//         const newNFt = await NFT.create(req.body);
//         res.status(201).json({
//             status: "success",
//             data: {
//                 nft: newNFt,
//             }
//         });
//     } catch (error) {
//         res.status(400).json({
//             status: "error",
//             message: error.message || "Server Error",
//         });
//     }
// };
// // Get a single NFT by ID
// exports.getSingleNft = async (req, res) => {
//    try{
// const nfts =await NFT.findById(req.params.id);
// res.status(200).json({
//     status: "success",
//     data: {
//         nfts,
//     },
// })
//    }
//    catch{
//     res.status(400).json({
//         status: "fail",
//         message: "NFT not found",
//     });
//    }

  
// };

// // Update an NFT by ID
// exports.update = async (req, res) => {
//     // const id = parseInt(req.params.id, 10);
//     // const nftIndex = nfts.findIndex(el => el.id === id);

//     // if (nftIndex === -1) {
//     //     return res.status(404).json({
//     //         status: "error",
//     //         message: "NFT not found",
//     //     });
//     // }

//     // const updatedNft = { ...nfts[nftIndex], ...req.body };
//     // nfts[nftIndex] = updatedNft;

//     // fs.writeFile(`${__dirname}/../../data/nft-simple.json`, JSON.stringify(nfts), err => {
//     //     if (err) {
//     //         return res.status(500).json({
//     //             status: "error",
//     //             message: "Failed to update NFT",
//     //         });
//     //     }
//     try{
//         const nfts =await NFT.findByIdAndUpdate(req.params.id,req.body,{
//             new:true,
//             runValidatoes:true,
//         });
// res.status(200).json({
//     status: "success",
//     message: "NFT updated successfully",
//     data: {
//         nfts,
//     },
            

// })

//     }
//     catch (error) {
//         res.status(200).json({
//             status: "success",
//             message: "NFT updated successfully",
//             // data: {
//             //     nft: updatedNft,
//             // },
//         });}
//     // });
// };

// // Delete an NFT by ID
// exports.deleteNft = async(req, res) => {
//     // const id = parseInt(req.params.id, 10);
//     // const nftIndex = nfts.findIndex(el => el.id === id);


//     // nfts.splice(nftIndex, 1);

//     // fs.writeFile(`${__dirname}/../../data/nft-simple.json`, JSON.stringify(nfts), err => {
//     //     if (err) {
//     //         return res.status(500).json({
//     //             status: "error",
//     //             message: "Failed to delete NFT",
//     //         });
//     //     }
//     try{
//         await NFT.findByIdAndDelete(req.params.id);
//     res.status(204).json({
//         status: "success",
//         message: "NFT deleted successfully",
//         data: null,
//     })}

//       catch(err) {
//         res.status(400).json({
//             status: "fail",
//             message: "NFT not found",
//         });
//       }
//     // });
// };


// //PART-3.----------------------------------------------#---



// const NFT = require("../Model/nftModel");

// exports.aliasTopNFTs = (req, res, next) => {
//     req.query.limit = '5';  // Limit to 5 results
//     req.query.sort = '-ratingAverage,price';  // Sort by rating average (descending) and price (ascending)
//     req.query.fields = 'name,price,ratingAverage,difficulty';  // Select specific fields
//     next();
// };

// class APIFeatures {
//     constructor(query, queryString) {
//         this.query = query;
//         this.queryString = queryString;
//     }

//     filter() {
//         const queryObj = { ...this.queryString }; // Use this.queryString

//         // Fields to exclude from the query object
//         const excludeFields = ["page", "limit", "fields", "sort"];
//         excludeFields.forEach(el => delete queryObj[el]);

//         // Convert query object to a JSON string and replace operators
//         let queryStr = JSON.stringify(queryObj);
//         queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        
//         // Apply filter to the query
//         this.query = this.query.find(JSON.parse(queryStr));
//         return this;
//     }

//     sort() {
//         if (this.queryString.sort) {
//             const sortBy = this.queryString.sort.split(',').join(' ');
//             this.query = this.query.sort(sortBy);
//         } else {
//             // Default sorting if no sort query parameter is provided
//             this.query = this.query.sort("-createdAt");
//         }
//         return this;
//     }

//     limitFields() {
//         if (this.queryString.fields) {
//             const fields = this.queryString.fields.split(',').join(' ');
//             this.query = this.query.select(fields);
//         } else {
//             this.query = this.query.select("-__v");
//         }
//         return this;
//     }

//     pagination() {
//         const page = parseInt(this.queryString.page, 10) || 1; // Default to page 1
//         const limit = parseInt(this.queryString.limit, 10) || 10; // Default to 10 results per page
//         const skip = (page - 1) * limit; // Calculate how many documents to skip

//         this.query = this.query.skip(skip).limit(limit);
//         return this;
//     }
// }

// exports.getAllNfts = async (req, res) => {
//     try {
//         // Use the APIFeatures class to build the query
//         const features = new APIFeatures(NFT.find(), req.query)
//             .filter()
//             .sort()
//             .limitFields()
//             .pagination();

//         // Execute the query and get the results
//         const nfts = await features.query;

//         res.status(200).json({
//             status: "success",
//             results: nfts.length,
//             data: {
//                 nfts,
//             },
//         });
//     } catch (error) {
//         res.status(400).json({
//             status: "fail",
//             message: error.message || "NFT not found",
//         });
//     }
// };
// // Create a new NFT
// exports.createNFt = async (req, res) => {
//     try {
//         const newNFt = await NFT.create(req.body);
//         res.status(201).json({
//             status: "success",
//             data: {
//                 nft: newNFt,
//             }
//         });
//     } catch (error) {
//         res.status(400).json({
//             status: "error",
//             message: error.message || "Server Error",
//         });
//     }
// };
// // Get a single NFT by ID
// exports.getSingleNft = async (req, res) => {
//    try{
// const nfts =await NFT.findById(req.params.id);
// res.status(200).json({
//     status: "success",
//     data: {
//         nfts,
//     },
// })
//    }
//    catch{
//     res.status(400).json({
//         status: "fail",
//         message: "NFT not found",
//     });
//    }

  
// };

// // Update an NFT by ID
// exports.update = async (req, res) => {
//     // const id = parseInt(req.params.id, 10);
//     // const nftIndex = nfts.findIndex(el => el.id === id);

//     // if (nftIndex === -1) {
//     //     return res.status(404).json({
//     //         status: "error",
//     //         message: "NFT not found",
//     //     });
//     // }

//     // const updatedNft = { ...nfts[nftIndex], ...req.body };
//     // nfts[nftIndex] = updatedNft;

//     // fs.writeFile(`${__dirname}/../../data/nft-simple.json`, JSON.stringify(nfts), err => {
//     //     if (err) {
//     //         return res.status(500).json({
//     //             status: "error",
//     //             message: "Failed to update NFT",
//     //         });
//     //     }
//     try{
//         const nfts =await NFT.findByIdAndUpdate(req.params.id,req.body,{
//             new:true,
//             runValidatoes:true,
//         });
// res.status(200).json({
//     status: "success",
//     message: "NFT updated successfully",
//     data: {
//         nfts,
//     },
            

// })

//     }
//     catch (error) {
//         res.status(200).json({
//             status: "success",
//             message: "NFT updated successfully",
//             // data: {
//             //     nft: updatedNft,
//             // },
//         });}
//     // });
// };

// // Delete an NFT by ID
// exports.deleteNft = async(req, res) => {
//     // const id = parseInt(req.params.id, 10);
//     // const nftIndex = nfts.findIndex(el => el.id === id);


//     // nfts.splice(nftIndex, 1);

//     // fs.writeFile(`${__dirname}/../../data/nft-simple.json`, JSON.stringify(nfts), err => {
//     //     if (err) {
//     //         return res.status(500).json({
//     //             status: "error",
//     //             message: "Failed to delete NFT",
//     //         });
//     //     }
//     try{
//         await NFT.findByIdAndDelete(req.params.id);
//     res.status(204).json({
//         status: "success",
//         message: "NFT deleted successfully",
//         data: null,
//     })}

//       catch(err) {
//         res.status(400).json({
//             status: "fail",
//             message: "NFT not found",
//         });
//       }
//     // });
// };



//PART-4.----------------------------------------------#---



const NFT = require("../Model/nftModel");
const APIFeatures =require("../../Utils/apiFeatures")
exports.aliasTopNFTs = (req, res, next) => {
    req.query.limit = '5';  // Limit to 5 results
    req.query.sort = '-ratingAverage,price';  // Sort by rating average (descending) and price (ascending)
    req.query.fields = 'name,price,ratingAverage,difficulty';  // Select specific fields
    next();
};



exports.getAllNfts = async (req, res) => {
    try {
        // Use the APIFeatures class to build the query
        const features = new APIFeatures(NFT.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .pagination();

        // Execute the query and get the results
        const nfts = await features.query;

        res.status(200).json({
            status: "success",
            results: nfts.length,
            data: {
                nfts,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message || "NFT not found",
        });
    }
};
// Create a new NFT
exports.createNFt = async (req, res) => {
    try {
        const newNFt = await NFT.create(req.body);
        res.status(201).json({
            status: "success",
            data: {
                nft: newNFt,
            }
        });
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: error.message || "Server Error",
        });
    }
};
// Get a single NFT by ID
exports.getSingleNft = async (req, res) => {
   try{
const nfts =await NFT.findById(req.params.id);
res.status(200).json({
    status: "success",
    data: {
        nfts,
    },
})
   }
   catch{
    res.status(400).json({
        status: "fail",
        message: "NFT not found",
    });
   }

  
};

// Update an NFT by ID
exports.update = async (req, res) => {
    // const id = parseInt(req.params.id, 10);
    // const nftIndex = nfts.findIndex(el => el.id === id);

    // if (nftIndex === -1) {
    //     return res.status(404).json({
    //         status: "error",
    //         message: "NFT not found",
    //     });
    // }

    // const updatedNft = { ...nfts[nftIndex], ...req.body };
    // nfts[nftIndex] = updatedNft;

    // fs.writeFile(`${__dirname}/../../data/nft-simple.json`, JSON.stringify(nfts), err => {
    //     if (err) {
    //         return res.status(500).json({
    //             status: "error",
    //             message: "Failed to update NFT",
    //         });
    //     }
    try{
        const nfts =await NFT.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true,
        });
res.status(200).json({
    status: "success",
    message: "NFT updated successfully",
    data: {
        nfts,
    },
            

})

    }
    catch (error) {
        res.status(200).json({
            status: "success",
            message: "NFT updated successfully",
            // data: {
            //     nft: updatedNft,
            // },
        });}
    // });
};

// Delete an NFT by ID
exports.deleteNft = async(req, res) => {
    // const id = parseInt(req.params.id, 10);
    // const nftIndex = nfts.findIndex(el => el.id === id);


    // nfts.splice(nftIndex, 1);

    // fs.writeFile(`${__dirname}/../../data/nft-simple.json`, JSON.stringify(nfts), err => {
    //     if (err) {
    //         return res.status(500).json({
    //             status: "error",
    //             message: "Failed to delete NFT",
    //         });
    //     }
    try{
        await NFT.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status: "success",
        message: "NFT deleted successfully",
        data: null,
    })}

      catch(err) {
        res.status(400).json({
            status: "fail",
            message: "NFT not found",
        });
      }
    // });
};

//Aggraation PipeLine

exports.getNFTsStats = async (req, res) => { 
    try {
        const stats = await NFT.aggregate([
          
             
            { $group: { _id: null, totalNfts: { $sum: 1 }, averagePrice: { $avg: "$price" }, maxPrice: { $max: "$price" }, minPrice: { $min: "$price" }, totalRating: { $sum: "$ratingAverage" }, averageRating: { $avg: "$ratingAverage" } } },
       {
        $sort:{averageRating:1}
       },
       {
        $match:{
            _id:{$ne:"EASY"}, 
        }
       }
        ]);
        res.status(200).json({
            status: "success",
            data: stats,
        });

}
    catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message || "Failed to get NFTs statistics",
        });
    }

}
//Calculating Number of NFT Create in the month Plan

exports.getMonthlyNFtCreate = async (req, res) => { 
    try {
        const year = req.params.year * 1; // Convert the year to a number
        const plan = await NFT.aggregate([
            { 
                $unwind: "$startDates" 
            },
            {
                $match: {
                    startDates: {
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`)
                    }
                }
            },
            {
                $group: {
                    _id: { 
                        year: { $year: "$startDates" }, 
                        month: { $month: "$startDates" } 
                    },
                    nfts: { $push: "$name" }, // Grouped NFTs by month
                    totalNFt: { $sum: 1 } // Count total NFTs
                }
            },
            {
                $addFields: {
                    month: "$_id" // Add the grouped ID as month
                }
            },
            {
                $project: {
                    _id: 0,
                    month: 1,
                    nfts: 1,
                    totalNFt: 1
                }
            },
            {
                $sort: { totalNFt: -1 } // Sort by total NFTs in descending order
            },
            {
                $limit: 10 // Limit the results to the top 10 months
            }
        ]);

        res.status(200).json({
            status: "success",
            data: plan,
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message || "Failed to get monthly NFT creation statistics",
        });
    }
};


