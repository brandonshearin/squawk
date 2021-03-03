import mongoose from "mongoose";
import { CommentDoc } from "./comment";
interface OrgAttrs {
  name: string;
  city: string; // general region
  address: string; // specific addr
  phone: string;
  website: string;
  description: string;
  comments?: [CommentDoc];
}

interface OrgDoc extends mongoose.Document {
  name: string;
  city: string;
  address: string;
  phone: string;
  website: string;
  description: string;
  comments: [CommentDoc];
}

interface OrgModel extends mongoose.Model<OrgDoc> {
  build(attrs: OrgAttrs): OrgDoc;
}

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    website: {
      type: String,
    },
    description: {
      type: String,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

organizationSchema.statics.build = (attrs: OrgAttrs) => {
  return new Organization(attrs);
};

const Organization = mongoose.model<OrgDoc, OrgModel>(
  "Organization",
  organizationSchema
);

export { Organization };
