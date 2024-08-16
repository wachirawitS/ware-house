"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CirclePlus, Pencil } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TAddProduct, addProductSchema } from "../schema/add-product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { appConfig } from "../configs/app.config";
import { IProduct } from "../models/product.model";
import { TEditProduct, editProductSchema } from "../schema/edit-product.schema";

type Props = {
  product: IProduct,
  editProductEvent(): void;
};

const EditProductDialog = ({ editProductEvent, product }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<TEditProduct>({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      productName: "",
      productNo: "",
      qty: 0,
      description: "",
      id: ''
    },
  });
  const onSubmit = async (values: TEditProduct) => {
    try {
      setIsLoading(true);
      await fetch(`${appConfig.BASE_URL}/api/product`, {
        method: "PUT",
        mode: "cors",
        body: JSON.stringify(values),
      });
      toast({
        title: "ทำรายการสำเร็จ",
        description: "แก้ไขสินค้าสำเร็จ",
      });
      form.reset();
      setIsLoading(false);
      editProductEvent();
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "ไม่สามารถทำรายการได้",
        description: "กรุณาลองใหม่ภายหลักนะจ๊ะคนดี",
        variant: "destructive",
      });
    }
  };
  const initialForm = () => {
    form.setValue("id", product.id);
    form.setValue("productName", product.productName);
    form.setValue("productNo", product.productNo);
    form.setValue("qty", product.qty);
    form.setValue("description", product.description);
  }
  useEffect(() => {
    initialForm();
  }, [product])
  
  return (
    <Form {...form}>
      <Dialog>
        <DialogTrigger asChild>
          <Pencil className="w-4 h-4 cursor-pointer text-blue-600" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>เพิ่มสินค้า</DialogTitle>
              <DialogDescription>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 my-4">
              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      ชื่อสินค้า <span className="text-rose-600">*</span> :
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="productNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      รหัสสินค้า <span className="text-rose-600">*</span> :
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>รายละเอียด :</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="qty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>จำนวน :</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  ปิด
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button disabled={isLoading} type="submit">
                  บันทึกสินค้า
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  );
};

export default EditProductDialog;
