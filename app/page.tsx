import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tabs } from "@radix-ui/react-tabs";
import AddProductDialog from "./components/add-product.dialog";

export default function Home() {
  return (
    <main className="m-6">
      <div className="w-full max-w-screen-xl mx-auto space-y-4">
        <div className="flex justify-between">
          <h1 className="font-bold text-lg">จัดการสินค้า</h1>
          <AddProductDialog />
        </div>
        <Tabs defaultValue="product" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="product">สร้างรายการสินค้าในคลัง</TabsTrigger>
            <TabsTrigger value="warehouse">รายการคลังสินค้า</TabsTrigger>
          </TabsList>
          <TabsContent value="product">
            <div className="p-4 border rounded-lg bg-slate-50"></div>
          </TabsContent>
          <TabsContent value="warehouse">
            <div className="p-4 border rounded-lg">GG กำลังทำอยู่</div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
