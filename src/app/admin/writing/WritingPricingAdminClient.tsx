"use client";

import { useState } from "react";

import {
  MoreHorizontal,
  PenSquareIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  createWritingPrice,
  deleteWritingPrice,
  fetchWritingPricesServer,
  updateWritingPrice,
} from "@/lib/writingPricingCrud";

import { updateTransactionStatus, updateWritingStatus } from "./actions";
import { ALLOWED_STATUSES } from "./constants";

const TIER_COLORS: Record<string, string> = {
  Basic: "bg-blue-100 text-blue-800 border-blue-200",
  Standard: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Premium: "bg-purple-100 text-purple-800 border-purple-200",
  Professional: "bg-pink-100 text-pink-800 border-pink-200",
};

const STATUS_COLORS: Record<string, string> = {
  success: "bg-green-100 text-green-700 border-green-200",
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  cancel: "bg-red-100 text-red-700 border-red-200",
  failed: "bg-red-100 text-red-700 border-red-200",
  paid: "bg-green-100 text-green-700 border-green-200",
  refunded: "bg-blue-100 text-blue-700 border-blue-200",
};

export default function WritingPricingAdminClient({
  writingTypes,
  tiers,
  initialPrices,
  writings,
  transactions,
}: {
  writingTypes: { id: number; name: string }[];
  tiers: { id: number; name: string }[];
  initialPrices: any[];
  writings: any[];
  transactions: any[];
}) {
  const [prices, setPrices] = useState<any[]>(initialPrices);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "writings" | "pricing" | "transactions"
  >("writings");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState(0);
  const [addMode, setAddMode] = useState(false);
  const [newTypeId, setNewTypeId] = useState("");
  const [newTierId, setNewTierId] = useState("");
  const [newPrice, setNewPrice] = useState("");

  const [statusLoadingId, setStatusLoadingId] = useState<number | null>(null);
  const [transactionStatusLoadingId, setTransactionStatusLoadingId] = useState<
    number | null
  >(null);

  const fetchPrices = async () => {
    setLoading(true);
    const data = await fetchWritingPricesServer();
    setPrices(data);
    setLoading(false);
  };

  const handleEdit = (id: number, price: number) => {
    setEditingId(id);
    setEditValue(price);
  };
  const handleSave = async (id: number) => {
    await updateWritingPrice({ id, price: editValue });
    setEditingId(null);
    fetchPrices();
  };
  const handleDelete = async (id: number) => {
    await deleteWritingPrice({ id });
    fetchPrices();
  };
  const handleAdd = async () => {
    if (!newTypeId || !newTierId || !newPrice) return;
    await createWritingPrice({
      writingTypeId: Number(newTypeId),
      tierId: Number(newTierId),
      price: Number(newPrice),
    });
    setAddMode(false);
    setNewTypeId("");
    setNewTierId("");
    setNewPrice("");
    fetchPrices();
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    setStatusLoadingId(id);
    await updateWritingStatus(id, newStatus);
    setStatusLoadingId(null);
    fetchPrices();
  };

  const handleTransactionStatusChange = async (
    id: number,
    newStatus: string
  ) => {
    setTransactionStatusLoadingId(id);
    await updateTransactionStatus(id, newStatus);
    setTransactionStatusLoadingId(null);
    fetchPrices();
  };

  return (
    <div className="p-8">
      <h1 className="mb-8 flex items-center gap-2 text-3xl font-bold">
        <PenSquareIcon className="text-primary h-8 w-8" /> Writing Pricing
        Management
      </h1>
      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as any)}
        className="w-full"
      >
        <TabsList className="mb-6">
          <TabsTrigger value="writings">User Writings</TabsTrigger>
          <TabsTrigger value="pricing">Edit Pricing</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        <TabsContent value="writings">
          <Card>
            <CardHeader>
              <CardTitle>User Writings</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Writing Type</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Visa Type</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {writings.map((w) => (
                    <TableRow key={w.id}>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{w.userName}</span>
                          <span className="text-muted-foreground text-xs">
                            {w.userEmail}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{w.writingTypeName}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            TIER_COLORS[w.tierName] ||
                            "border-gray-200 bg-gray-100 text-gray-700"
                          }
                        >
                          {w.tierName}
                        </Badge>
                      </TableCell>
                      <TableCell>{w.country}</TableCell>
                      <TableCell>{w.visaTypeName}</TableCell>
                      <TableCell>{w.price}</TableCell>
                      <TableCell>
                        {w.status === "success" && (
                          <Badge className="border-green-200 bg-green-100 text-green-700">
                            Success
                          </Badge>
                        )}
                        {w.status === "pending" && (
                          <Badge className="border-yellow-200 bg-yellow-100 text-yellow-800">
                            Pending
                          </Badge>
                        )}
                        {w.status === "cancel" && (
                          <Badge className="border-red-200 bg-red-100 text-red-700">
                            Cancel
                          </Badge>
                        )}
                        {!["success", "pending", "cancel"].includes(
                          w.status
                        ) && (
                          <Badge className="border-gray-200 bg-gray-100 text-gray-700">
                            {w.status}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {w.createdAt
                          ? new Date(w.createdAt).toLocaleString()
                          : ""}
                      </TableCell>
                      <TableCell className="flex gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-5 w-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {ALLOWED_STATUSES.map((status) => (
                              <DropdownMenuItem
                                key={status}
                                onClick={() => handleStatusChange(w.id, status)}
                                disabled={
                                  w.status === status ||
                                  statusLoadingId === w.id
                                }
                                className={`capitalize ${w.status === status ? "bg-green-100 font-semibold text-green-700" : ""}`}
                              >
                                {w.status === status && (
                                  <span className="mr-2 text-green-600">✓</span>
                                )}
                                {status}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pricing">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Edit Pricing</CardTitle>
              <Button
                onClick={() => setAddMode((v) => !v)}
                variant="default"
                size="sm"
              >
                <PlusIcon className="mr-1 h-4 w-4" /> Add Pricing
              </Button>
            </CardHeader>
            <CardContent>
              {addMode && (
                <div className="mb-6 flex items-end gap-2">
                  <Select value={newTypeId} onValueChange={setNewTypeId}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {writingTypes.map((t) => (
                        <SelectItem key={t.id} value={String(t.id)}>
                          {t.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={newTierId} onValueChange={setNewTierId}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Select Tier" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiers.map((t) => (
                        <SelectItem key={t.id} value={String(t.id)}>
                          {t.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    placeholder="Price"
                    className="w-32"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                  />
                  <Button onClick={handleAdd} variant="default" size="sm">
                    Save
                  </Button>
                  <Button
                    onClick={() => setAddMode(false)}
                    variant="outline"
                    size="sm"
                  >
                    Cancel
                  </Button>
                </div>
              )}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Writing Type</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Price (Rs)</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prices.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.writingTypeName}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            TIER_COLORS[row.tierName] ||
                            "border-gray-200 bg-gray-100 text-gray-700"
                          }
                        >
                          {row.tierName}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {editingId === row.id ? (
                          <Input
                            type="number"
                            value={editValue}
                            onChange={(e) =>
                              setEditValue(Number(e.target.value))
                            }
                            className="w-24"
                          />
                        ) : (
                          row.price
                        )}
                      </TableCell>
                      <TableCell className="flex gap-2">
                        {editingId === row.id ? (
                          <>
                            <Button
                              onClick={() => handleSave(row.id)}
                              size="sm"
                            >
                              Save
                            </Button>
                            <Button
                              onClick={() => setEditingId(null)}
                              variant="outline"
                              size="sm"
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              onClick={() =>
                                handleEdit(row.id, Number(row.price))
                              }
                              variant="secondary"
                              size="sm"
                            >
                              Edit
                            </Button>
                            <Button
                              onClick={() => handleDelete(row.id)}
                              variant="destructive"
                              size="sm"
                            >
                              <Trash2Icon className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Writing Type</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Screenshot</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((t) => (
                    <TableRow key={t.id}>
                      <TableCell>{t.userName}</TableCell>
                      <TableCell>{t.userEmail}</TableCell>
                      <TableCell>{t.writingTypeName}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            TIER_COLORS[t.tierName] ||
                            "border-gray-200 bg-gray-100 text-gray-700"
                          }
                        >
                          {t.tierName}
                        </Badge>
                      </TableCell>
                      <TableCell>{t.price}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            STATUS_COLORS[t.status] ||
                            "border-gray-200 bg-gray-100 text-gray-700"
                          }
                        >
                          {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {t.createdAt
                          ? new Date(t.createdAt).toLocaleString()
                          : ""}
                      </TableCell>
                      <TableCell>
                        {t.imageUrl ? (
                          <a
                            href={t.imageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={t.imageUrl}
                              alt="Payment Screenshot"
                              className="h-16 w-16 rounded object-cover"
                            />
                          </a>
                        ) : (
                          <span className="text-muted-foreground text-xs">
                            No image
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="flex gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-5 w-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {ALLOWED_STATUSES.map((status) => (
                              <DropdownMenuItem
                                key={status}
                                onClick={() =>
                                  handleTransactionStatusChange(t.id, status)
                                }
                                disabled={
                                  t.status === status ||
                                  transactionStatusLoadingId === t.id
                                }
                                className={`capitalize ${t.status === status ? "bg-green-100 font-semibold text-green-700" : ""}`}
                              >
                                {t.status === status && (
                                  <span className="mr-2 text-green-600">✓</span>
                                )}
                                {status}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
