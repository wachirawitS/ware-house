"use client";
import React, { useState } from "react";
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
import { CirclePlus } from "lucide-react";
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
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { appConfig } from "../configs/app.config";

const AddProductDialog = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<TAddProduct>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      productName: "",
      productNo: "",
      qty: 0,
      description: "",
    },
  });
  const onSubmit = async (values: TAddProduct) => {
    try {
      setIsLoading(true);
      await axios.post(`${appConfig.BASE_URL}/api/product`, values);
      toast({
        title: "ทำรายการสำเร็จ",
        description: "เพิ่มสินค้าสำเร็จ",
      });
      form.reset();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "ไม่สามารถทำรายการได้",
        description: "กรุณาลองใหม่ภายหลักนะจ๊ะคนดี",
        variant: "destructive",
      });
    }
  };
  return (
    <Form {...form}>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex space-x-2">
            <CirclePlus className="w-4 h-4" />
            <p>เพิ่มสินค้า</p>
          </Button>
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
                <Button disabled={isLoading} type="submit">บันทึกสินค้า</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  );
};

export default AddProductDialog;
