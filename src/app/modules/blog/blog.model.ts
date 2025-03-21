import { model, Schema } from 'mongoose';
import { BlogModel, IBlog } from './blog.interface';

const blogSchema = new Schema<IBlog, BlogModel>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// check the user with the id
blogSchema.statics.isBlogExistById = async function (id: string) {
  return await Blog.findById(id);
};

export const Blog = model<IBlog, BlogModel>('Blog', blogSchema);
