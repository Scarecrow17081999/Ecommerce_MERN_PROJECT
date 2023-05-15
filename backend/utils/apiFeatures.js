class ApiFeatures {
  constructor(query, queryString) {
    (this.query = query), (this.queryString = queryString);
  }
  search() {
    const keyword = this.queryString.keyword
      ? {
          name: { $regex: this.queryString.keyword, $options: "i" },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const queryCopy = { ...this.queryString };
    const filterQuery = ["keyword", "page", "limit"];
    const category = filterQuery.forEach((key) => delete queryCopy[key]);

    /// code for price and rating

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|lt|gte|lte)\b/g, (key) => `$${key}`);
    queryStr = JSON.parse(queryStr);

    this.query = this.query.find(queryStr);
    return this;
  }
  pagination(resultPerPage) {
    const currentPage = Number(this.queryString.page) || 1;

    const skip = (currentPage - 1) * resultPerPage;

    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}
export default ApiFeatures;
