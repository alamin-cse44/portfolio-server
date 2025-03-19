import { model, Schema } from 'mongoose';
import { IProject, ProjectModel } from './project.interface';

const projectSchema = new Schema<IProject, ProjectModel>(
  {
    title: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    // price: {
    //   type: Number,
    //   required: [true, 'Please enter the price of the house'],
    //   validate: {
    //     validator: (value: number) => value >= 0,
    //     message: 'The house price must be a non-negative number',
    //   },
    // },
    images: [
      {
        url: { type: String, required: true },
        _id: false,
      },
    ],
    technologies: [
      {
        name: { type: String, required: true },
        _id: false,
      },
    ],
  },
  {
    timestamps: true,
  },
);

// check the user with the id
projectSchema.statics.isProjectExistById = async function (id: string) {
  return await Project.findById(id);
};

export const Project = model<IProject, ProjectModel>('Project', projectSchema);
