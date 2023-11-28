'use client'

import Link from "next/link";
import Product from "@/app/components/Product";
import React, { useEffect } from "react";
import getData from "@/lib/products";
import type { ProductProps } from "@/types/product";


export default function Home() {
    const [products, setProducts] = React.useState<ProductProps[]>([])
    const [page, setPage] = React.useState<number>(1)
    const [limit, setLimit] = React.useState<number>(10)
    const [search, setSearch] = React.useState<string>('')

    let typingTimer : NodeJS.Timeout;
    let doneTypingInterval: number = 500;

    //render products with pagination
    const renderProducts = () => {
        const start = (page - 1) * limit;
        const end = page * limit;
        let paginatedProducts = products.slice(start, end);

        //search products by name or category substring
        if (search.length) {
            paginatedProducts = paginatedProducts.filter((product: any) => {
                return product.name.toLowerCase().includes(search.toLowerCase())
            })
        }

        return paginatedProducts.map((product: any, index: number) => (
            <li className={'flex-shrink h-auto'} key={product.id}>
                <Link
                    key={product.id}
                    href={`/${product.id}`}
                >
                    <Product
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        currency={product.currency}
                        category={product.category}
                        description={product.description}
                    />
                </Link>
            </li>
        ))
    }

    //render pagination
    const renderPagination = () => {
        return Array.from({ length: Math.ceil(products.length / limit) }, (_, i) => i + 1).map((number) => (
            <button
                key={number}
                className={`join-item btn ${page === number ? 'btn-primary' : ''}`}
                onClick={() => setPage(number)}
            >
                {number}
            </button>
        ))
    }

    const handleSearch = (e: any) => {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => setSearch(e.target.value), doneTypingInterval);
    }

    useEffect(() => {
        if (products.length) return
        console.log('fetching data')

        getData()
            .then((products) => {
                setProducts((prevState) => [...prevState, ...products]);
            })
            .catch((err) => {
                console.error(err)
            })
    }, [products])

    if (!products.length) return (<div>Loading...</div>)

    return (
        <div className={'flex flex-col h-full min-h-screen w-screen md:h-full m-0 p-5 justify-between items-center'}>
            <div className={'flex justify-center items-center h-24'}>
                <input onInput={handleSearch} type="text" placeholder="Search" className="input input-bordered input-primary w-full max-w-xs" />
            </div>
            <div className={'flex'}>
                <ul className={'flex h-full w-screen m-0 gap-1 flex-wrap justify-start items-center'}>
                    {renderProducts()}
                </ul>
            </div>
            <div className="join pagination">
                {renderPagination()}
            </div>
        </div>
    )
}
