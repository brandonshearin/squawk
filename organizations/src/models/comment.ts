import mongoose from "mongoose";

interface CommentAttrs {
  id: string;
  content: string;
  userEmail: string;
}

export interface CommentDoc extends mongoose.Document {
  content: string;
  userEmail: string;
}

interface CommentModel extends mongoose.Model<CommentDoc> {
  build(attrs: CommentAttrs): CommentDoc;
}

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(dot, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

commentSchema.statics.build = (attrs: CommentAttrs) => {
  return new Comment({
    _id: attrs.id,
    content: attrs.content,
    userEmail: attrs.userEmail,
  });
};

const Comment = mongoose.model<CommentDoc, CommentModel>(
  "Comment",
  commentSchema
);

export { Comment };
