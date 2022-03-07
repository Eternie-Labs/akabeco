import Image from "next/image";
import { ReactElement, ReactNode } from "react";
import useSWR from "swr"
import classNames from "../utilities/classNames";
import productsFetcher from "../utilities/productsFetcher"

const PRODUCTS_SHOW_COUNT = 3 as const
const PRODUCTS_SHOW_COUNT_XL = 4 as const

interface ItemLinkProps {
    children: ReactNode
    url: string
}

const ItemLink = ({children, url}: ItemLinkProps) => (
    <a href={url} rel="noopener noreferrer nofollow" target="_blank">{children}</a>
);

const ProductsModule: React.FC = () => {
    const { data, error } = useSWR('/api/prd', productsFetcher)

    let productsViewChild: ReactElement
    if (error) {
        productsViewChild = (
            <div>データ読み込み中にエラーが発生しました。</div>
        )
    } else if (!data) {
        productsViewChild = (
            <div>読み込み中...</div>
        )
    } else {
        const items = data.Items
            .slice(0, Math.max(PRODUCTS_SHOW_COUNT, PRODUCTS_SHOW_COUNT_XL))
            .map((item, index) => {
                const {itemName, mediumImageUrls, itemUrl, itemCode} = item
                const image = mediumImageUrls[0]
                const setClass = [
                    "grid-cols-2",
                    "my-2",
                    "md:my-0",
                    "md:grid-cols-1",
                ]
                if (index < PRODUCTS_SHOW_COUNT) {
                    setClass.unshift("grid")
                } else {
                    setClass.unshift("hidden")
                    setClass.unshift("xl:grid")
                }
                return (
                    <div className={classNames(setClass)} key={itemCode}>
                        <div className="md:mx-auto">
                            <ItemLink url={itemUrl}><Image src={image} className="w-32" alt="" width={128} height={128} /></ItemLink>
                        </div>
                        <div className="md:text-center">
                            <ItemLink url={itemUrl}>{itemName}</ItemLink>
                        </div>
                    </div>
                )
            })
        productsViewChild = (
            <div className="m-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items}
            </div>
        )
    }

    return productsViewChild
}

export default ProductsModule
