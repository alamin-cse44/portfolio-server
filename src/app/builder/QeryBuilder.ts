import { FilterQuery, Query } from 'mongoose';

class QeryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.search;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }

  filter() {
    const queryObj = { ...this.query };

    const excludeFields = [
      'search',
      'sortBy',
      'sortOrder',
      'limit',
      'page',
      'fields',
    ];
    excludeFields.forEach((field) => delete queryObj[field]);

    // console.log('filtering: ', queryObj);

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }

  sort() {
    const sort = (this?.query?.sortBy as string)?.split(',')?.join(' ');
    this.modelQuery = this.modelQuery.sort(sort as string);

    return this;
  }

  sortByAscOrDesc() {
    const sortBy = (this?.query?.sortOrder as string) || 'asc';

    // console.log('sortBy: ' + sortBy);

    const sortField = sortBy === 'asc' ? 'createdAt' : '-createdAt';

    this.modelQuery = this.modelQuery.sort(sortField as string);

    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';
    // console.log('fields: ', fields);
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  // last
}

export default QeryBuilder;
