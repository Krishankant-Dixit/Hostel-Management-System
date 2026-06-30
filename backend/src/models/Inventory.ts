import mongoose, { Document, Schema, Types } from 'mongoose';

export type InventoryItemType = 'bed' | 'mattress' | 'fan' | 'table' | 'chair' | 'water_cooler';
export type InventoryCondition = 'good' | 'needs_repair' | 'broken';

export interface IInventory extends Document {
  itemType: InventoryItemType;
  hostelId: Types.ObjectId; // ref Hostel
  quantity: number;
  condition: InventoryCondition;
  maintenanceHistory: {
    date: Date;
    description: string;
    cost?: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const inventorySchema = new Schema<IInventory>(
  {
    itemType: {
      type: String,
      enum: ['bed', 'mattress', 'fan', 'table', 'chair', 'water_cooler'],
      required: true,
    },
    hostelId: { type: Schema.Types.ObjectId, ref: 'Hostel', required: true },
    quantity: { type: Number, required: true, min: 0 },
    condition: {
      type: String,
      enum: ['good', 'needs_repair', 'broken'],
      default: 'good',
    },
    maintenanceHistory: [
      {
        date: { type: Date, default: Date.now },
        description: { type: String, required: true },
        cost: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

export const Inventory = mongoose.model<IInventory>('Inventory', inventorySchema);
