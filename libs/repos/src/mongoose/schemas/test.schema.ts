import _ = require('lodash');
import { Schema } from 'mongoose';
import { Test } from '@rfjs/common';

export const testSchema = new Schema<Test>(
  {
    uuid: { type: String, required: true },
    value: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  },
);

testSchema.set('toJSON', {
  transform: (doc: any, ret: any) =>
    _.assign({ id: ret._id.toString() }, _.omit(ret, ['_id'])),
});

testSchema.set('toObject', {
  transform: (doc: any, ret: any) =>
    _.assign({ id: doc._id.toString() }, _.omit(doc, ['_id'])),
});
