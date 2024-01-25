class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        if (this.queryStr.keyword) {
            const keywordFilter = {
                ref: {
                    $regex: this.queryStr.keyword,
                    $options: 'i',
                },
            };
            this.query = this.query.find(keywordFilter);
        }

        if (this.queryStr.number) {
            const numberFilter = {
                number: {
                    $regex: this.queryStr.number,
                    $options: 'i',
                },
            };
            this.query = this.query.find(numberFilter);
        }

        if (this.queryStr.date) {
            const [month, day, year] = this.queryStr.date.split('/');
            const startDate = new Date(`${year}/${month}/${day}`);
            const endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + 1);

            const dateFilter = {
                date: {
                    $gte: startDate,
                    $lt: endDate,
                },
            };
            this.query = this.query.find(dateFilter);
        }

        return this;
    }
}

module.exports = ApiFeatures;
