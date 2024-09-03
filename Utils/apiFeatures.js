class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        const queryObj = { ...this.queryString }; // Use this.queryString

        // Fields to exclude from the query object
        const excludeFields = ["page", "limit", "fields", "sort"];
        excludeFields.forEach(el => delete queryObj[el]);

        // Convert query object to a JSON string and replace operators
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        
        // Apply filter to the query
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            // Default sorting if no sort query parameter is provided
            this.query = this.query.sort("-createdAt");
        }
        return this;
    }

    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select("-__v");
        }
        return this;
    }

    pagination() {
        const page = parseInt(this.queryString.page, 10) || 1; // Default to page 1
        const limit = parseInt(this.queryString.limit, 10) || 10; // Default to 10 results per page
        const skip = (page - 1) * limit; // Calculate how many documents to skip

        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

module.exports = APIFeatures;