import mongoose from "mongoose";

interface OrgAttrs {
  name: string;
  address: string;
  phone: string;
  website: string;
}

interface OrgDoc extends mongoose.Document {
  name: string;
  address: string;
  phone: string;
  website: string;
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
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    website: {
      type: String,
    },
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
