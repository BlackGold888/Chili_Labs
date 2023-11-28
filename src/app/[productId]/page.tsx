'use client'

import React, { useEffect } from 'react';
import getData from "@/lib/products";
import type { ProductProps } from "@/types/product";
import Link from "next/link";

const Page = ({ params } : {
    params: {
        productId: string
        product: ProductProps
    }
}) => {
    const [product, setProduct] = React.useState<ProductProps | null>()
    useEffect(() => {
        getData().then((products : ProductProps[]) => {
            const product = products.find((p : ProductProps) => p.id == +params.productId)
            setProduct(product)
        }).catch(err => console.log(err))
    }, [])

    return (
        <div className="flex flex-col h-full min-h-screen w-screen md:h-full m-0 p-5 justify-between items-center">
            <div className="flex flex-col gap-3 card w-60 h-60 bg-primary text-primary-content opacity-90 hover:opacity-100">
                <div className="card-body">
                    <h2 className="card-title">{product?.name}</h2>
                    <p>{product?.price} {product?.currency}</p>
                    <p>{product?.category}</p>
                    <p>{product?.description}</p>
                </div>
                <Link href={'/'}><button className="btn btn-primary">Back</button></Link>
            </div>
        </div>
    );
};

export default Page;