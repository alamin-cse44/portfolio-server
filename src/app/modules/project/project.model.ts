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
    briefDescription: {
      type: String,
      trim: true,
      required: true,
    },
    service: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    images: [
      {
        url: { type: String, required: true },
        _id: false,
      },
    ],
    technologies: [
      {
        value: { type: String, required: true },
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
