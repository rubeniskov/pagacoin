db.getCollection('wallets').aggregate([
  // This is needed until a valid converter is implemented at mongo config level
  { $addFields: { "walletId": { "$toString": "$_id" }}},
  {
     $lookup:
     {
         from: "transactions",
         localField: "walletId",
         foreignField: "walletId",
         as: "incomeTransactions"
     }
 },
 {
     $lookup:
     {
         from: "transactions",
         localField: "walletId",
         foreignField: "sourceId",
         as: "outcomeTransactions"
     }
 },
 {
     $project: {
         userId: 1,
         cdate: 1,
         incomes: {
             $reduce: {
                 input: '$incomeTransactions',
                 initialValue: 0,
                 in: { $add: ["$$value", "$$this.amount"] }
             }
         },
         outcomes: {
             $reduce: {
                 input: '$outcomeTransactions',
                 initialValue: 0,
                 in: { $add: ["$$value", "$$this.amount"] }
             }
         }
     }
 },
 {
     $project: {
         userId: 1,
         cdate: 1,
         incomes: 1,
         outcomes: 1,
         balance: {
          $divide: [{
              $trunc: {
                  $multiply: [{
                      $subtract: ["$incomes", "$outcomes"]
                     }, 100]
               }
          }, 100]
      }
     }
 }
])
