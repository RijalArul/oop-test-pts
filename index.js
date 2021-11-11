class Item {
  constructor (name, type, prices) {
    this.name = name
    this.type = type
    this.prices = prices
  }
}

class Transaction {
  constructor (item, qty, buyer) {
    this.item = item
    this.qty = qty
    this.buyer = buyer
  }
}
class Summary {
  constructor (items, buyers, transactions) {
    this.items = items
    this.buyers = buyers
    this.transactions = transactions
    this.totalTransactions = this.showTotalTransactions()
    this.bestSellingItem = this.showMostSold()
    this.bestSellingCategory = this.showSellingCategory()
    this.rpc = this.showRevenueCategory()
    this.revenue = this.showTotalSold()
    this.bestSpenders = this.showUserSpend()
  }

  showTotalTransactions () {
    return this.transactions.length
  }

  showMostSold () {
    const { transactions } = this
    let totalQty = 0
    let newArr = []
    let newObj = {}
    const duplicates = transactions.reduce((a, i) => {
      a[i.item] = ++a[i.item] || 0
      return a
    }, {})

    if (duplicates) {
      let dupArr = []
      let sortDup
      const itemsQuantity = transactions.filter(i => duplicates[i.item])
      const itemQuantity = transactions.filter(i => !duplicates[i.item])

      itemsQuantity.forEach(items => {
        totalQty += items.qty
        newObj = {
          item: items.item,
          qty: totalQty
        }
        dupArr.push(newObj)
      })

      sortDup = dupArr.sort((a, b) => a.qty - b.qty)
      newArr.push(sortDup[sortDup.length - 1])

      itemQuantity.forEach(items => {
        newObj = {
          item: items.item,
          qty: items.qty
        }
        newArr.push(newObj)
      })
    }

    const resultSort = newArr.sort((a, b) => a.qty - b.qty)
    return resultSort[resultSort.length - 1].item
  }

  showSellingCategory () {
    const { transactions, items } = this
    let totalHats = 0
    let totalTops = 0
    let totalShorts = 0
    let string = ''
    for (let i = 0; i < transactions.length; i++) {
      for (let j = 0; j < items.length; j++) {
        if (items[j].name === transactions[i].item) {
          if (items[j].type === 'hats' && transactions[i].item) {
            totalHats += transactions[i].qty
            string = items[j].type
          }

          if (items[j].type === 'tops' && transactions[i].item) {
            totalTops += transactions[i].qty
            string = items[j].type
          }

          if (items[j].type === 'shorts' && transactions[i].item) {
            totalShorts += transactions[i].qty
            string = items[j].type
          }
        }
      }
    }
    if (totalHats > totalTops && totalHats > totalShorts) {
      return string
    } else if (totalTops > totalHats && totalTops > totalShorts) {
      return string
    } else if (totalShorts > totalHats && totalShorts > totalTops) {
      return string
    }
  }

  showRevenueCategory () {
    const { transactions, items, buyers } = this
    let resultArr = []
    let totalHats = 0
    let totalTops = 0
    let totalShorts = 0
    let objHats = {
      category: 'hats',
      revenue: 0
    }
    let objTops = {
      category: 'tops',
      revenue: 0
    }
    let objShorts = {
      category: 'shorts',
      revenue: 0
    }
    for (let i = 0; i < transactions.length; i++) {
      for (let j = 0; j < buyers.length; j++) {
        if (transactions[i].buyer === buyers[j].name) {
          for (let k = 0; k < items.length; k++) {
            for (let l = 0; l < items[k].prices.length; l++) {
              if (transactions[i] && buyers[j].type === 'regular') {
                if (
                  transactions[i].item === items[k].name &&
                  items[k].type === 'hats'
                ) {
                  if (buyers[j].type === items[k].prices[l].priceFor) {
                    totalHats += transactions[i].qty * items[k].prices[l].price
                    objHats = {
                      category: items[k].type,
                      revenue: totalHats
                    }
                  }
                } else if (
                  transactions[i].item === items[k].name &&
                  items[k].type === 'tops'
                ) {
                  if (buyers[j].type === items[k].prices[l].priceFor) {
                    totalTops += transactions[i].qty * items[k].prices[l].price
                    objTops = {
                      category: items[k].type,
                      revenue: totalTops
                    }
                  }
                } else if (
                  transactions[i].item === items[k].name &&
                  items[k].type === 'shorts'
                ) {
                  if (buyers[j].type === items[k].prices[l].priceFor) {
                    totalShorts +=
                      transactions[i].qty * items[k].prices[l].price
                    objTops = {
                      category: items[k].type,
                      revenue: totalShorts
                    }
                  }
                }
              } else if (transactions[i] && buyers[j].type === 'VIP') {
                if (
                  transactions[i].item === items[k].name &&
                  items[k].type === 'hats'
                ) {
                  if (buyers[j].type === items[k].prices[l].priceFor) {
                    totalHats += transactions[i].qty * items[k].prices[l].price
                  }
                  objHats = {
                    category: items[k].type,
                    revenue: totalHats
                  }
                } else if (
                  transactions[i].item === items[k].name &&
                  items[k].type === 'tops'
                ) {
                  if (buyers[j].type === items[k].prices[l].priceFor) {
                    totalTops += transactions[i].qty * items[k].prices[l].price
                    objTops = {
                      category: items[k].type,
                      revenue: totalTops
                    }
                  }
                } else if (
                  transactions[i].item === items[k].name &&
                  items[k].type === 'shorts'
                ) {
                  if (buyers[j].type === items[k].prices[l].priceFor) {
                    totalShorts +=
                      transactions[i].qty * items[k].prices[l].price
                    objTops = {
                      category: items[k].type,
                      revenue: totalShorts
                    }
                  }
                }
              } else if (transactions[i] && buyers[j].type === 'wholesale') {
                if (
                  transactions[i].item === items[k].name &&
                  items[k].type === 'hats'
                ) {
                  if (buyers[j].type === items[k].prices[l].priceFor) {
                    totalHats += transactions[i].qty * items[k].prices[l].price
                  }

                  objHats = {
                    category: items[k].type,
                    revenue: totalHats
                  }
                } else if (
                  transactions[i].item === items[k].name &&
                  items[k].type === 'tops'
                ) {
                  if (buyers[j].type === items[k].prices[l].priceFor) {
                    totalTops += transactions[i].qty * items[k].prices[l].price
                    objTops = {
                      category: items[k].type,
                      revenue: totalTops
                    }
                  }
                } else if (
                  transactions[i].item === items[k].name &&
                  items[k].type === 'shorts'
                ) {
                  if (buyers[j].type === items[k].prices[l].priceFor) {
                    totalShorts +=
                      transactions[i].qty * items[k].prices[l].price
                    objShorts = {
                      category: items[k].type,
                      revenue: totalShorts
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    resultArr.push(objHats, objTops, objShorts)
    return resultArr
  }

  showTotalSold () {
    const { transactions, items, buyers } = this
    let total = 0
    for (let i = 0; i < transactions.length; i++) {
      for (let j = 0; j < buyers.length; j++) {
        if (transactions[i].buyer === buyers[j].name) {
          for (let k = 0; k < items.length; k++) {
            for (let l = 0; l < items[k].prices.length; l++) {
              if (transactions[i] && buyers[j].type === 'regular') {
                if (transactions[i].item === items[k].name) {
                  if (buyers[j].type === items[k].prices[l].priceFor) {
                    total += transactions[i].qty * items[k].prices[l].price
                  }
                }
              } else if (transactions[i] && buyers[j].type === 'VIP') {
                if (transactions[i].item === items[k].name) {
                  if (buyers[j].type === items[k].prices[l].priceFor) {
                    total += transactions[i].qty * items[k].prices[l].price
                  }
                }
              } else if (transactions[i] && buyers[j].type === 'wholesale') {
                if (transactions[i].item === items[k].name) {
                  if (buyers[j].type === items[k].prices[l].priceFor) {
                    total += transactions[i].qty * items[k].prices[l].price
                  }
                }
              }
            }
          }
        }
      }
    }
    return total
  }

  showUserSpend () {
    const { transactions, items, buyers } = this
    let arr = []
    let obj = {}
    let totalRegular = 0
    for (let i = 0; i < transactions.length; i++) {
      for (let j = 0; j < buyers.length; j++) {
        if (transactions[i].buyer === buyers[j].name) {
          for (let k = 0; k < items.length; k++) {
            for (let l = 0; l < items[k].prices.length; l++) {
              if (transactions[i].item === items[k].name) {
                if (buyers[j].type === items[k].prices[l].priceFor) {
                  if (buyers[j].type === 'regular') {
                    if (transactions[i].buyer === buyers[j].name) {
                      totalRegular +=
                        transactions[i].qty * items[k].prices[l].price
                      obj = {
                        name: transactions[i].buyer,
                        type: buyers[j].type,
                        spend: transactions[i].qty * items[k].prices[l].price
                      }

                      arr.push(obj)
                    }
                  }

                  if (buyers[j].type === 'VIP') {
                    if (transactions[i].buyer === buyers[j].name) {
                      totalRegular +=
                        transactions[i].qty * items[k].prices[l].price
                      obj = {
                        name: transactions[i].buyer,
                        type: buyers[j].type,
                        spend: transactions[i].qty * items[k].prices[l].price
                      }

                      arr.push(obj)
                    }
                  }

                  if (buyers[j].type === 'wholesale') {
                    if (transactions[i].buyer === buyers[j].name) {
                      totalRegular +=
                        transactions[i].qty * items[k].prices[l].price
                      obj = {
                        name: transactions[i].buyer,
                        type: buyers[j].type,
                        spend: transactions[i].qty * items[k].prices[l].price
                      }

                      arr.push(obj)
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    let totalDuplicates = 0
    let totalNotDuplicates = 0
    let newArr = []
    let newObj = {}
    let resultArr = []
    const duplicates = arr.reduce((a, i) => {
      a[i.name] = ++a[i.name] || 0
      return a
    }, {})

    if (duplicates) {
      let dupArr = []
      const items = arr.filter(i => duplicates[i.name])
      const item = arr.filter(i => !duplicates[i.name])
      items.forEach(item => {
        totalDuplicates += item.spend
        newObj = {
          name: item.name,
          type: item.type,
          spent: totalDuplicates
        }
        dupArr.push(newObj)
      })

      newArr.push(dupArr[dupArr.length - 1])

      item.forEach(item => {
        totalNotDuplicates = item.spend
        newObj = {
          name: item.name,
          type: item.type,
          spent: totalNotDuplicates
        }
        newArr.push(newObj)
      })

      const result = newArr.sort((a, b) => b.spent - a.spent)
      for (let i = 0; i < 3; i++) {
        resultArr.push(result[i])
      }
    }
    return resultArr
  }
}

const newSummary = new Summary(
  [
    {
      name: 'oval hat', // product name
      type: 'hats', // product type
      prices: [
        {
          priceFor: 'regular', // price is valid for
          price: 20000 // the price
        },
        {
          priceFor: 'VIP', // price is valid for
          price: 15000 // the price
        }
      ]
    },
    {
      name: 'square hat', // product name
      type: 'hats', // product type
      prices: [
        {
          priceFor: 'regular', // price is valid for
          price: 30000 // the price
        },
        {
          priceFor: 'VIP', // price is valid for
          price: 20000 // the price
        },
        {
          priceFor: 'wholesale', // price is valid for
          price: 15000 // the price
        }
      ]
    },
    {
      name: 'magic shirt', // product name
      type: 'tops', // product type
      prices: [
        {
          priceFor: 'regular', // price is valid for
          price: 50000 // the price
        }
      ]
    }
  ],
  [
    {
      name: 'Ani', // buyer name
      type: 'regular' // buyer type - VIP, regular, wholesale
    },
    {
      name: 'Budi', // buyer name
      type: 'VIP' // buyer type - VIP, regular, wholesale
    },
    {
      name: 'Charlie',
      type: 'regular'
    },
    {
      name: 'Dipta',
      type: 'wholesale'
    }
  ],
  [
    {
      item: 'magic shirt', // product name
      qty: 1, // buying quantity
      buyer: 'Ani' // buyer name
    },
    {
      item: 'square hat', // product name
      qty: 2, // buying quantity
      buyer: 'Budi' // buyer name
    },
    {
      item: 'magic shirt', // product name
      qty: 1, // buying quantity
      buyer: 'Ani' // buyer name
    },
    {
      item: 'oval hat', // product name
      qty: 1, // buying quantity
      buyer: 'Ani' // buyer name
    },
    {
      item: 'square hat',
      qty: 100,
      buyer: 'Dipta'
    }
  ]
)
// console.log(newSummary)
// console.log(newSummary.showTotalTransactions())
// console.log(newSummary.showMostSold())
console.log(newSummary.showSellingCategory())
// console.log(newSummary.showRevenueCategory())
// console.log(newSummary.showTotalSold())
// console.log(newSummary.showUserSpend())
;`PTS Test - OOP and Data Structure

Please save your file as PTS_SE_CandidateName (e.g. PTS_SE_AthiraFajrina). If you have more than one file, please zip the file.

Please use your OOP and data structure knowledge.
What is graded:
1. Data structure effectiveness
2. Data structure efficiency
3. Program correctness
4. OOP understandings
5. Understanding of the task

The Islander Shop (TIS) is a small clothing shop which requires a simple POS (Point of Sales) application which accepts items, 
buyers, and transactions and generate a summary of the sales. TIS sells 3 types of clothings: hats, tops, and shorts. 
There are 3 types of buyers: regular, VIP, and wholesale which prices for each of the items varies for certain types of buyers. 

Every item must have a price for regular buyers; if they don't then the POS should print an error and the summary cannot 
be printed. If an item does not have special price for VIP or wholesale then the regular price is used. 
Item names and buyer names are unique; if the input contains duplicated item or buyer then the POS should print an error 
and the summary cannot be printed. 

*please print error in english


If all conditions are met, then an output summary should be printed. The summary contains of:
1. Total number of transactions
2. Best selling item name
3. Best selling category
4. Revenue per category
5. Revenue of the day
6. Three most spender customers

Sample of:

Input: 
{
    Items:
    [
      {
        name: 'oval hat', // product name
        type: 'hats', // product type
        prices: [
          {
            priceFor: 'regular', // price is valid for
            price: 20000, // the price
          },
          {
            priceFor: 'VIP', // price is valid for
            price: 15000, // the price
          },
        ]
      }, {
        name: 'square hat', // product name
        type: 'hats', // product type
        prices: [
          {
            priceFor: 'regular', // price is valid for
            price: 30000, // the price
          },
          {
            priceFor: 'VIP', // price is valid for
            price: 20000, // the price
          },
          {
            priceFor: 'wholesale', // price is valid for
            price: 15000, // the price					
          }
        ]
      }, {
        name: 'magic shirt', // product name
        type: 'tops', // product type
        prices: [
          {
            priceFor: 'regular', // price is valid for
            price: 50000, // the price
          }
        ]
      }
    ],
    Buyers:
    [
      {
        name: 'Ani', // buyer name
        type: 'regular', // buyer type - VIP, regular, wholesale
      }, {
        name: 'Budi', // buyer name
        type: 'VIP', // buyer type - VIP, regular, wholesale
      }, {
        name: 'Charlie',
        type: 'regular'
      }, {
        name: 'Dipta',
        type: 'wholesale'
      }
    ],
    Transaction:
    [
      {
        item: 'magic shirt', // product name
        qty: 1, // buying quantity
        buyer: 'Ani' // buyer name
      }, {
        item: 'square hat', // product name
        qty: 2, // buying quantity
        buyer: 'Budi' // buyer name
      }, {
        item: 'magic shirt', // product name
        qty: 1, // buying quantity
        buyer: 'Ani' // buyer name
      }, {
        item: 'oval hat', // product name
        qty: 1, // buying quantity
        buyer: 'Ani' // buyer name
      }, {
        item: 'square hat',
        qty: 100,
        buyer: 'Dipta'
      }
    ]
}
2. Output:
	Summary:
	{
		totalTransactions: 5, // total number of transactions
		bestSellingItem: 'square hat', // best selling item
		bestSellingCategory: 'hats', // best selling category
		rpc: [ // revenue per category
			{
				category: 'hats',
				revenue: 1560000,
			}, 
			{
				category: 'tops',
				revenue: 100000,
			},
			{
				category: 'shorts',
				revenue: 0,
			}
		],
		revenue: 1660000, // revenue of the day
		bestSpenders: [{ // best spender
			name: 'Dipta',
			type: 'wholesale',
			spent: 1500000,
		}, {
			name: 'Ani',
			type: 'regular',
			spent: 120000,
		}, {
			name: 'Budi',
			type: 'VIP',
			spent: 40000,
		}]
  }
`
