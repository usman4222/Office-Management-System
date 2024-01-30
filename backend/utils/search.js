// class ApiFeatures {
//     constructor(query, queryStr) {
//         this.query = query;
//         this.queryStr = queryStr;
//     }

//     async search() {
//         if (this.queryStr.keyword) {
//             const keywordFilter = {
//                 ref: {
//                     $regex: this.queryStr.keyword,
//                     $options: 'i',
//                 },
//             };
//             this.query = await this.query.find(keywordFilter).lean();
//         }
//         return this.query;
//     }
// }

// module.exports = ApiFeatures;

class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    async search() {
        if (this.queryStr.keyword) {
            const keywordFilter = {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: 'i',
                },
            };
            this.query = await this.query.find(keywordFilter).lean();
        }
<<<<<<< HEAD
=======

        if (this.queryStr.month) {
            const [month, year] = this.queryStr.month.split('/');
            console.log('Original event dates:', Array.isArray(this.query) ? this.query.map(entry => entry.eventDate) : 'Not an array');

            // Validate if month and year are provided in the correct format
            if (month && year && !isNaN(month) && !isNaN(year)) {
                // Assuming your date property is named 'eventDate'
                const startOfMonth = new Date(year, month - 1, 1);
                const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999); // Set end of the month

                // Build the dateFilter condition separately
                const dateFilter = {
                    date: {
                        $gte: startOfMonth,
                        $lte: endOfMonth,
                    },
                };

                // Check if this.query is an array before applying the filter
                if (Array.isArray(this.query)) {
                    // Apply the dateFilter condition to the Query instance
                    this.query = await this.query.find(dateFilter).lean();
                    console.log('Before filtering:', this.queryStr.month);
                    console.log('Filtered event dates:', this.query.map(entry => entry.eventDate));
                } else {
                    console.log('Before filtering: Not an array');
                }
            }
        }

>>>>>>> 5e4c09dd8b5848618fe357e655a3216ab5fd9568
        return this.query;
    }
}

module.exports = ApiFeatures;

<<<<<<< HEAD
=======







;






// if (this.queryStr.date) {
//     const [month, day, year] = this.queryStr.date.split('/');
//     const startDate = new Date(`${year}/${month}/${day}`);
//     const endDate = new Date(startDate);
//     endDate.setDate(endDate.getDate() + 1);

//     const dateFilter = {
//         date: {
//             $gte: startDate,
//             $lt: endDate,
//         },
//     };
//     this.query = this.query.find(dateFilter);
// }
>>>>>>> 5e4c09dd8b5848618fe357e655a3216ab5fd9568
