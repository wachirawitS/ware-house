"use client";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tabs } from "@radix-ui/react-tabs";
import AddProductDialog from "./components/add-product.dialog";
import { useEffect, useState } from "react";
import { IProduct } from "./models/product.model";
import { appConfig } from "./configs/app.config";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import EditProductDialog from "./components/edit-product.dialog";
import { Trash2 } from "lucide-react";

export default function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const fetchProducts = async () => {
    const response = await fetch(`${appConfig.BASE_URL}/api/product`, {
      method: "GET",
    });
    const data = await response.json();
    setProducts(data.result);
  };
  const handleAddProductEvent = () => {
    fetchProducts();
  };
  const handleDeleteEvent = async (id: string) => {
    await fetch(`${appConfig.BASE_URL}/api/product?id=${id}`, {
      method: "DELETE",
    });
    fetchProducts();
  };
  const handleEditEvent = () => {
    fetchProducts();
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <main className="m-6">
      <div className="w-full max-w-screen-lg mx-auto space-y-4">
        <div className="flex justify-between">
          <h1 className="font-bold text-lg">จัดการสินค้า</h1>
          <AddProductDialog addProductEvent={handleAddProductEvent} />
        </div>
        <Tabs defaultValue="product" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="product">สร้างรายการสินค้าในคลัง</TabsTrigger>
            <TabsTrigger value="warehouse">รายการคลังสินค้า</TabsTrigger>
          </TabsList>
          <TabsContent value="product">
            <div className="border rounded-lg bg-slate-50">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="border-r">ชื่อสินค้า</TableHead>
                    <TableHead className="border-r">รหัสสินค้า</TableHead>
                    <TableHead className="border-r">รายละเอียด</TableHead>
                    <TableHead className="text-right border-r">จำนวน</TableHead>
                    <TableHead className="text-center w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium border-r">
                        <div className="flex items-center space-x-2.5">
                          <Input type="checkbox" className="w-4 h-4" />
                          <p>{item.productName}</p>
                        </div>
                      </TableCell>
                      <TableCell className="border-r">
                        {item.productNo}
                      </TableCell>
                      <TableCell className="border-r">
                        {item.description}
                      </TableCell>
                      <TableCell className="text-right border-r">
                        {item.qty}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center space-x-4">
                          <EditProductDialog
                            product={item}
                            editProductEvent={handleEditEvent}
                          />
                          <Trash2
                            onClick={() => handleDeleteEvent(item.id)}
                            className="w-4 h-4 cursor-pointer text-rose-600"
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          <TabsContent value="warehouse">
            <div className="p-4 border rounded-lg">ไม่มีอะไรให้เล่นหร๊อก</div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
